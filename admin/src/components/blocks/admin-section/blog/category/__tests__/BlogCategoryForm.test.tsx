import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BlogCategoryForm from "../BlogCategoryForm";

const storeMutate = jest.fn();
const updateMutate = jest.fn();
const dispatchMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/pt-BR/admin/blog/category/add",
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      "label.title": "Title",
      "label.status": "Status",
      "label.meta_title": "Meta title",
      "label.meta_description": "Meta description",
      "button.add_blog_category": "Add category",
      "button.update_blog_category": "Update category",
      "place_holder.enter_meta_title": "Enter meta title",
      "place_holder.enter_meta_description": "Enter meta description",
      "lang.df": "Default",
      "lang.en": "English",
      "lang.es": "Spanish",
      "lang.ar": "Arabic",
      "label.active": "Active",
      "label.inactive": "Inactive",
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

jest.mock("@/components/ui", () => ({
  Card: ({ children }: any) => <div>{children}</div>,
  CardContent: ({ children }: any) => <div>{children}</div>,
  Input: React.forwardRef<HTMLInputElement, any>(({ ...props }, ref) => (
    <input ref={ref} {...props} />
  )),
  Textarea: React.forwardRef<HTMLTextAreaElement, any>(({ ...props }, ref) => (
    <textarea ref={ref} {...props} />
  )),
  Tabs: ({ children }: any) => <div>{children}</div>,
  TabsContent: ({ children }: any) => <div>{children}</div>,
  TabsList: ({ children }: any) => <div>{children}</div>,
  TabsTrigger: ({ children }: any) => (
    <button type="button" role="tab">
      {children}
    </button>
  ),
}));

jest.mock("@/modules/admin-section/blog/blog-category/blog-category.action", () => ({
  useBlogCategoryStoreMutation: () => ({
    mutate: storeMutate,
    isPending: false,
  }),
  useBlogCategoryUpdateMutation: () => ({
    mutate: updateMutate,
    isPending: false,
  }),
}));

jest.mock("@/components/blocks/common", () => ({
  AppSelect: ({ value, groups, onSelect }: any) => (
    <select aria-label="status-select" value={value ?? ""} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select</option>
      {groups.map((group: any) => (
        <option key={group.value} value={group.value}>
          {group.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock("@/components/blocks/shared", () => ({
  SubmitButton: ({ AddLabel, UpdateLabel, UpdateData, IsLoading }: any) => (
    <button type="submit" disabled={IsLoading}>
      {UpdateData ? UpdateLabel : AddLabel}
    </button>
  ),
}));

describe("BlogCategoryForm", () => {
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

  it("submits a new blog category with default and translated fields", async () => {
    const { container } = render(<BlogCategoryForm />);

    fireEvent.change(container.querySelector('input[name="name_df"]') as HTMLInputElement, {
      target: { value: "News" },
    });
    fireEvent.change(container.querySelector('input[name="meta_title_df"]') as HTMLInputElement, {
      target: { value: "News meta" },
    });
    fireEvent.change(
      container.querySelector('textarea[name="meta_description_df"]') as HTMLTextAreaElement,
      {
        target: { value: "Default description" },
      }
    );

    fireEvent.change(
      container.querySelectorAll('select[aria-label="status-select"]')[0] as HTMLSelectElement,
      {
      target: { value: "1" },
      }
    );

    fireEvent.click(screen.getByRole("tab", { name: "English" }));
    fireEvent.change(container.querySelector('input[name="name_en"]') as HTMLInputElement, {
      target: { value: "English news" },
    });
    fireEvent.change(
      container.querySelector('input[name="meta_title_en"]') as HTMLInputElement,
      {
        target: { value: "English meta" },
      }
    );
    fireEvent.change(
      container.querySelector('textarea[name="meta_description_en"]') as HTMLTextAreaElement,
      {
        target: { value: "English description" },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: "Add category" }));

    await waitFor(() => expect(storeMutate).toHaveBeenCalledTimes(1));
    expect(storeMutate.mock.calls[0][0]).toEqual({
      name: "News",
      meta_title: "News meta",
      meta_description: "Default description",
      status: "1",
      id: undefined,
      translations: [
        {
          language_code: "df",
          name: "News",
          meta_title: "News meta",
          meta_description: "Default description",
        },
        {
          language_code: "en",
          name: "English news",
          meta_title: "English meta",
          meta_description: "English description",
        },
      ],
    });
    expect(dispatchMock).toHaveBeenCalledWith({ type: "refetch", payload: true });
  });

  it("submits updates with existing values preloaded", async () => {
    const { container } = render(
      <BlogCategoryForm
        data={{
          id: 11,
          name: "Categoria",
          meta_title: "Titulo meta",
          meta_description: "Descricao meta",
          status: "0",
          translations: {
            en: {
              name: "Category",
              meta_title: "Meta title EN",
              meta_description: "Meta description EN",
            },
          },
        }}
      />
    );

    await waitFor(() =>
      expect(container.querySelector('input[name="name_df"]')).toHaveValue("Categoria")
    );
    fireEvent.click(screen.getByRole("tab", { name: "English" }));
    await waitFor(() =>
      expect(container.querySelector('input[name="name_en"]')).toHaveValue("Category")
    );

    fireEvent.click(screen.getByRole("button", { name: "Update category" }));

    await waitFor(() => expect(updateMutate).toHaveBeenCalledTimes(1));
    expect(updateMutate.mock.calls[0][0]).toMatchObject({
      name: "Categoria",
      meta_title: "Titulo meta",
      meta_description: "Descricao meta",
      status: "0",
      id: 11,
    });
  });
});
