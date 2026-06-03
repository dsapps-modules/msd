import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CreateOrUpdateRoleForm from "../CreateOrUpdateRoleForm";

const permissionsQueryMock = jest.fn();
const rolesStoreMutate = jest.fn();
const refetchMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/pt-BR/admin/system-management/roles/add",
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      "label.basic_information": "Basic information",
      "label.name": "Name",
      "label.available_for": "Available for",
      "label.permissions": "Permissions",
      "label.select_all": "Select all",
      "place_holder.enter_role_name": "Enter role name",
      "button.add_role": "Add role",
      "button.update_role": "Update role",
      "common.not_data_found": "No data found",
    };

    return messages[key] ?? key;
  },
}));

jest.mock("@/modules/admin-section/permissions/permissions.action", () => ({
  useModuleWisePermissionsQuery: () => permissionsQueryMock(),
}));

jest.mock("@/modules/admin-section/roles/roles.action", () => ({
  useRolesStoreMutation: () => ({
    mutate: rolesStoreMutate,
    isPending: false,
  }),
}));

jest.mock("@/components/blocks/common", () => ({
  AppSelect: ({ value, groups, onSelect, disabled }: any) => (
    <select
      aria-label="available-for-select"
      value={value ?? ""}
      disabled={disabled}
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

jest.mock("@/components/blocks/shared", () => ({
  SubmitButton: ({ AddLabel, UpdateLabel, UpdateData, IsLoading }: any) => (
    <button type="submit" disabled={IsLoading}>
      {UpdateData ? UpdateLabel : AddLabel}
    </button>
  ),
}));

jest.mock("@/components/molecules/CardSkletonLoader", () => ({
  __esModule: true,
  default: () => <div data-testid="role-skeleton" />,
}));

jest.mock("@/components/ui", () => {
  const React = require("react");
  const Card = ({ children }: any) => <div>{children}</div>;
  const CardContent = ({ children }: any) => <div>{children}</div>;
  const Input = React.forwardRef<HTMLInputElement, any>(({ ...props }, ref) => (
    <input ref={ref} {...props} />
  ));

  return {
    Card,
    CardContent,
    Input,
  };
});

describe("CreateOrUpdateRoleForm", () => {
  beforeEach(() => {
    permissionsQueryMock.mockReset();
    rolesStoreMutate.mockReset();
    refetchMock.mockReset();
    rolesStoreMutate.mockImplementation((_payload: any, options: any) => {
      options?.onSuccess?.();
    });
  });

  it("submits a new role with selected permissions", async () => {
    permissionsQueryMock.mockReturnValue({
      modules: [
        {
          id: 1,
          perm_title: "Role management",
          options: [
            { label: "view", value: false },
            { label: "edit", value: false },
          ],
          children: [],
        },
      ],
      refetch: refetchMock,
      isPending: false,
      isFetching: false,
    });

    const { container } = render(<CreateOrUpdateRoleForm />);

    fireEvent.change(container.querySelector('input[name="role_name"]') as HTMLInputElement, {
      target: { value: "Managers" },
    });
    fireEvent.change(screen.getByLabelText("available-for-select"), {
      target: { value: "store_level" },
    });
    fireEvent.click(screen.getByLabelText("view"));

    fireEvent.click(screen.getByRole("button", { name: "Add role" }));

    await waitFor(() => expect(rolesStoreMutate).toHaveBeenCalledTimes(1));
    expect(rolesStoreMutate.mock.calls[0][0]).toEqual({
      role_id: "",
      role_name: "Managers",
      available_for: "store_level",
      permissions: [
        {
          id: 1,
          view: true,
        },
      ],
    });
    expect(refetchMock).toHaveBeenCalled();
  });

  it("loads existing role data and submits an update payload", async () => {
    permissionsQueryMock.mockReturnValue({
      modules: [
        {
          id: 2,
          perm_title: "Store management",
          options: [
            { label: "view", value: true },
            { label: "create", value: false },
          ],
          children: [],
        },
      ],
      refetch: refetchMock,
      isPending: false,
      isFetching: false,
    });

    const { container } = render(
      <CreateOrUpdateRoleForm
        data={{
          id: 34,
          name: "Store admin",
          available_for: "store_level",
          permissions: [
            {
              id: 2,
              perm_title: "Store management",
              options: [
                { label: "view", value: true },
                { label: "create", value: false },
              ],
              children: [],
            },
          ],
        }}
      />
    );

    await waitFor(() =>
      expect(container.querySelector('input[name="role_name"]')).toHaveValue("Store admin")
    );
    expect(screen.getByLabelText("available-for-select")).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Update role" }));

    await waitFor(() => expect(rolesStoreMutate).toHaveBeenCalledTimes(1));
    expect(rolesStoreMutate.mock.calls[0][0]).toEqual({
      role_id: 34,
      role_name: "Store admin",
      available_for: "store_level",
      permissions: [
        {
          id: 2,
          view: true,
        },
      ],
    });
  });
});
