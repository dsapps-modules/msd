import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DivulgadorCampaignForm } from "../DivulgadorCampaignForm";

const storeMutate = jest.fn();
const updateMutate = jest.fn();

jest.mock("@/modules/divulgador-section/divulgador.action", () => ({
  useDivulgadorCampaignStoreMutation: () => ({
    mutate: storeMutate,
    isPending: false,
  }),
  useDivulgadorCampaignUpdateMutation: () => ({
    mutate: updateMutate,
    isPending: false,
  }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("DivulgadorCampaignForm", () => {
  beforeEach(() => {
    storeMutate.mockReset();
    updateMutate.mockReset();
  });

  it("submits a new campaign with the expected payload", async () => {
    const { container } = render(<DivulgadorCampaignForm />);

    fireEvent.change(container.querySelector('input[name="titulo"]') as HTMLInputElement, {
      target: { value: "Campanha Teste" },
    });
    fireEvent.change(container.querySelector('textarea[name="objetivo"]') as HTMLTextAreaElement, {
      target: { value: "Objetivo da campanha" },
    });
    fireEvent.change(container.querySelector('input[name="meta_financeira"]') as HTMLInputElement, {
      target: { value: "1234.56" },
    });
    fireEvent.change(container.querySelector('input[name="data_inicio"]') as HTMLInputElement, {
      target: { value: "2026-06-01" },
    });
    fireEvent.change(container.querySelector('input[name="data_fim"]') as HTMLInputElement, {
      target: { value: "2026-06-30" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Criar campanha" }));

    await waitFor(() => expect(storeMutate).toHaveBeenCalledTimes(1));
    const payload = storeMutate.mock.calls[0][0] as FormData;

    expect(payload.get("titulo")).toBe("Campanha Teste");
    expect(payload.get("objetivo")).toBe("Objetivo da campanha");
    expect(payload.get("meta_financeira")).toBe("1234.56");
    expect(payload.get("data_inicio")).toBe("2026-06-01");
    expect(payload.get("data_fim")).toBe("2026-06-30");
  });

  it("shows existing values when editing a campaign", () => {
    const { container } = render(
      <DivulgadorCampaignForm
        data={{
          id: 42,
          titulo: "Campanha Editavel",
          objetivo: "Melhorar a meta",
          meta_financeira: 999.9,
          banner: null,
          banner_url: null,
          data_inicio: "2026-06-01",
          data_inicio_formatada: "01/06/2026",
          data_fim: "2026-06-30",
          data_fim_formatada: "30/06/2026",
          status: "ativa",
          link_divulgacao: null,
          meta_total: 0,
          progresso_atual: 0,
        }}
      />
    );

    expect(container.querySelector('input[name="titulo"]')).toHaveValue("Campanha Editavel");
    expect(container.querySelector('textarea[name="objetivo"]')).toHaveValue("Melhorar a meta");
    expect(container.querySelector('input[name="meta_financeira"]')).toHaveValue(999.9);
    expect(container.querySelector('input[name="data_inicio"]')).toHaveValue("2026-06-01");
    expect(container.querySelector('input[name="data_fim"]')).toHaveValue("2026-06-30");
    expect(screen.getByRole("button", { name: "Atualizar campanha" })).toBeInTheDocument();
  });
});
