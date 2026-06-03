import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PagesForm from "../PageForm";

const storeMutate = jest.fn();
const updateMutate = jest.fn();
const dispatchMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/pt-BR/admin/pages/add",
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      "label.title": "Title",
      "label.status": "Status",
      "label.content": "Content",
      "label.meta_title": "Meta title",
      "label.meta_description": "Meta description",
      "label.meta_keywords": "Meta keywords",
      "button.add_page": "Add page",
      "button.update_page": "Update page",
      "place_holder.enter_title": "Enter title",
      "place_holder.enter_meta_title": "Enter meta title",
      "place_holder.enter_meta_description": "Enter meta description",
      "place_holder.enter_meta_key": "Enter meta keyword",
      "tooltip.enter_meta_key": "Use comma separated keywords.",
      "meta.keywords_title": "Meta keywords",
      "label.draft": "Draft",
      "label.publish": "Publish",
      "lang.df": "Default",
      "lang.en": "English",
      "lang.es": "Spanish",
      "lang.ar": "Arabic",
    };

    return messages[key] ?? key;
  },
}));

jest.mock("@/redux/hooks", () => ({
  useAppDispatch: () => dispatchMock,
}));

jest.mock("@/redux/slices/refetchSlice", () => ({
  setRefetch: (value: boolean) => ({ type: "refetch", payload: value }),
}));

jest.mock("@/modules/admin-section/pages/pages.action", () => ({
  usePageStoreMutation: () => ({
    mutate: storeMutate,
    isPending: false,
  }),
  usePageUpdateMutation: () => ({
    mutate: updateMutate,
    isPending: false,
  }),
}));

jest.mock("@/components/blocks/common", () => ({
  AppSelect: ({ value, groups, onSelect }: any) => (
    <select
      data-testid="app-select"
      value={value ?? ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select</option>
      {groups.map((group: any) => (
        <option key={group.value} value={group.value}>
          {group.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("@/components/blocks/common/TiptapField", () => ({
  __esModule: true,
  default: ({ value, onChange }: any) => (
    <textarea
      data-testid="tiptap-editor"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@/components/ui/tags-input", () => ({
  TagsInput: ({ value, onChange }: any) => (
    <input
      data-testid="tags-input"
      value={(value ?? []).join(",")}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        )
      }
    />
  ),
}));

jest.mock("@/components/blocks/shared", () => ({
  SubmitButton: ({ AddLabel, UpdateLabel, UpdateData, IsLoading }: any) => (
    <button type="submit" disabled={IsLoading}>
      {UpdateData ? UpdateLabel : AddLabel}
    </button>
  ),
}));

jest.mock("@/components/ui", () => {
  const React = require("react");
  const TabsContext = React.createContext<any>(null);

  const Tabs = ({ defaultValue, children }: any) => {
    const [active, setActive] = React.useState(defaultValue);
    return (
      <TabsContext.Provider value={{ active, setActive }}>
        <div>{children}</div>
      </TabsContext.Provider>
    );
  };

  const TabsTrigger = ({ value, children }: any) => {
    const ctx = React.useContext(TabsContext);
    return (
      <button type="button" role="tab" onClick={() => ctx.setActive(value)}>
        {children}
      </button>
    );
  };

  const TabsContent = ({ value, children }: any) => {
    const ctx = React.useContext(TabsContext);
    return ctx.active === value ? <div>{children}</div> : null;
  };

  const Card = ({ children }: any) => <div>{children}</div>;
  const CardContent = ({ children }: any) => <div>{children}</div>;
  const Input = React.forwardRef<HTMLInputElement, any>(({ ...props }, ref) => (
    <input ref={ref} {...props} />
  ));
  const Textarea = React.forwardRef<HTMLTextAreaElement, any>(({ ...props }, ref) => (
    <textarea ref={ref} {...props} />
  ));
  const Tooltip = ({ children }: any) => <>{children}</>;
  const TooltipContent = ({ children }: any) => <div>{children}</div>;
  const TooltipProvider = ({ children }: any) => <>{children}</>;
  const TooltipTrigger = ({ children }: any) => <>{children}</>;

  return {
    Card,
    CardContent,
    Input,
    Tabs,
    TabsContent,
    TabsList: ({ children }: any) => <div>{children}</div>,
    TabsTrigger,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  };
});

describe("PagesForm", () => {
  beforeEach(() => {
    storeMutate.mockReset();
    updateMutate.mockReset();
    dispatchMock.mockReset();
    storeMutate.mockImplementation((_payload: any, options: any) => {
      options?.onSuccess?.();
    });
    updateMutate.mockImplementation((_payload: any, options: any) => {
      options?.onSuccess?.();
    });
  });

  it("submits a new page with translated payload", async () => {
    const { container } = render(<PagesForm />);

    fireEvent.change(container.querySelector('input[name="title_df"]') as HTMLInputElement, {
      target: { value: "About us" },
    });
    fireEvent.change(screen.getByTestId("tiptap-editor"), {
      target: { value: "Default content" },
    });
    fireEvent.change(
      container.querySelector('input[name="meta_title_df"]') as HTMLInputElement,
      { target: { value: "Default meta title" } }
    );
    fireEvent.change(
      container.querySelector('input[name="meta_description_df"]') as HTMLInputElement,
      { target: { value: "Default meta description" } }
    );
    fireEvent.change(container.querySelectorAll('select[data-testid="app-select"]')[0], {
      target: { value: "theme_one" },
    });
    fireEvent.change(container.querySelectorAll('select[data-testid="app-select"]')[1], {
      target: { value: "publish" },
    });
    fireEvent.change(
      container.querySelector('input[name="meta_keywords_df"]') ?? screen.getByTestId("tags-input"),
      {
        target: { value: "about, company" },
      }
    );

    fireEvent.click(screen.getByRole("tab", { name: "English" }));
    fireEvent.change(container.querySelector('input[name="title_en"]') as HTMLInputElement, {
      target: { value: "About us EN" },
    });
    fireEvent.change(screen.getByTestId("tiptap-editor"), {
      target: { value: "English content" },
    });
    fireEvent.change(
      container.querySelector('input[name="meta_title_en"]') as HTMLInputElement,
      { target: { value: "English meta title" } }
    );
    fireEvent.change(
      container.querySelector('input[name="meta_description_en"]') as HTMLInputElement,
      { target: { value: "English meta description" } }
    );
    fireEvent.change(screen.getByTestId("tags-input"), {
      target: { value: "en-one, en-two" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add page" }));

    await waitFor(() => expect(storeMutate).toHaveBeenCalledTimes(1));
    expect(storeMutate.mock.calls[0][0]).toEqual({
      title: "About us",
      content: "Default content",
      meta_title: "Default meta title",
      meta_description: "Default meta description",
      meta_keywords: "about, company",
      status: "publish",
      theme_name: "theme_one",
      id: undefined,
      translations: [
        {
          language_code: "df",
          title: "About us",
          content: "Default content",
          meta_title: "Default meta title",
          meta_description: "Default meta description",
          meta_keywords: "about, company",
        },
        {
          language_code: "en",
          title: "About us EN",
          content: "English content",
          meta_title: "English meta title",
          meta_description: "English meta description",
          meta_keywords: "en-one, en-two",
        },
      ],
    });
  });

  it("submits an update with preloaded values", async () => {
    const { container } = render(
      <PagesForm
        data={{
          data: {
            id: 21,
            title: "Terms",
            content: "Base content",
            meta_title: "Terms meta",
            meta_description: "Terms description",
            meta_keywords: "term, conditions",
            status: "draft",
            theme_name: "theme_two",
            translations: {
              en: {
                title: "Terms EN",
                content: "English content",
                meta_title: "Terms EN meta",
                meta_description: "Terms EN description",
                meta_keywords: "terms-en, legal",
              },
            },
          },
        }}
      />
    );

    await waitFor(() =>
      expect(container.querySelector('input[name="title_df"]')).toHaveValue("Terms")
    );

    fireEvent.click(screen.getByRole("tab", { name: "English" }));
    await waitFor(() =>
      expect(container.querySelector('input[name="title_en"]')).toHaveValue("Terms EN")
    );

    fireEvent.click(screen.getByRole("button", { name: "Update page" }));

    await waitFor(() => expect(updateMutate).toHaveBeenCalledTimes(1));
    expect(updateMutate.mock.calls[0][0]).toMatchObject({
      title: "Terms",
      content: "Base content",
      meta_title: "Terms meta",
      meta_description: "Terms description",
      meta_keywords: "term, conditions",
      status: "draft",
      theme_name: "theme_two",
      id: 21,
    });
  });
});
