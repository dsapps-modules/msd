import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import WalletSettingsForm from "../WalletSettingsForm";

const queryMock = jest.fn();
const mutateMock = jest.fn();
const refetchMock = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/pt-BR/admin/system-management/wallet-settings",
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      common_note: "Note",
      common_note_for_deposit: "Use this limit to control deposits.",
      label_deposit_maximum_amount: "Maximum deposit amount",
      tooltip_maximum_deposit: "Maximum amount allowed per deposit.",
      place_holder_enter_amount: "Enter amount",
      button_save_changes: "Save changes",
    };

    return messages[key.replace(/\./g, "_")] ?? key;
  },
}));

jest.mock("@/modules/admin-section/wallet-settings/wallet-settings.action", () => ({
  useWalletSettingsQuery: () => queryMock(),
  useWalletSettingsStoreMutation: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

jest.mock("@/components/molecules/CardSkletonLoader", () => ({
  __esModule: true,
  default: () => <div data-testid="wallet-loader" />,
}));

jest.mock("@/components/blocks/shared", () => ({
  SubmitButton: ({ AddLabel, IsLoading }: any) => (
    <button type="submit" disabled={IsLoading}>
      {AddLabel}
    </button>
  ),
}));

describe("WalletSettingsForm", () => {
  beforeEach(() => {
    queryMock.mockReset();
    mutateMock.mockReset();
    mutateMock.mockImplementation((_payload: any, options: any) => {
      options?.onSuccess?.();
    });
    refetchMock.mockReset();
  });

  it("renders the current limit and submits an updated value", async () => {
    queryMock.mockReturnValue({
      WalletSettingsData: { id: 9, wallet_settings: "250" },
      refetch: refetchMock,
      isPending: false,
      isFetching: false,
    });

    const { container } = render(<WalletSettingsForm />);

    const input = container.querySelector(
      'input[name="max_deposit_per_transaction"]'
    ) as HTMLInputElement;
    expect(input).toHaveValue(250);

    fireEvent.change(input, { target: { value: "300" } });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(mutateMock).toHaveBeenCalledTimes(1));
    expect(mutateMock.mock.calls[0][0]).toEqual({
      max_deposit_per_transaction: "300",
      id: 9,
    });
    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows a skeleton while loading", () => {
    queryMock.mockReturnValue({
      WalletSettingsData: {},
      refetch: refetchMock,
      isPending: true,
      isFetching: false,
    });

    render(<WalletSettingsForm />);

    expect(screen.getByTestId("wallet-loader")).toBeInTheDocument();
  });
});
