import React from "react";
import { render, screen } from "@testing-library/react";
import { DivulgadorCampaignTable } from "../DivulgadorCampaignTable";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("DivulgadorCampaignTable", () => {
  it("shows the empty state when there are no campaigns", () => {
    render(<DivulgadorCampaignTable items={[]} />);

    expect(screen.getByText("Nenhuma campanha encontrada.")).toBeInTheDocument();
  });

  it("renders action links for a campaign row", () => {
    render(
      <DivulgadorCampaignTable
        items={[
          {
            id: 9,
            titulo: "Campanha Comercial",
            objetivo: "Aumentar o alcance",
            meta_financeira: 5000,
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
          },
        ]}
      />
    );

    expect(screen.getByText("Campanha Comercial")).toBeInTheDocument();
    expect(screen.getByText("Visualizar").closest("a")).toHaveAttribute(
      "href",
      "/divulgador/campanhas/9"
    );
    expect(screen.getByText("Editar").closest("a")).toHaveAttribute(
      "href",
      "/divulgador/campanhas/9/edit"
    );
  });
});
