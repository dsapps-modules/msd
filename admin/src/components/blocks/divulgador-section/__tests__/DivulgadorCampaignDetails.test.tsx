import React from "react";
import { render, screen } from "@testing-library/react";
import { DivulgadorCampaignDetails } from "../DivulgadorCampaignDetails";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("DivulgadorCampaignDetails", () => {
  it("renders campaign information and navigation actions", () => {
    render(
      <DivulgadorCampaignDetails
        item={{
          id: 7,
          titulo: "Campanha de Verão",
          objetivo: "Impulsionar vendas sazonais",
          meta_financeira: 15000,
          banner: "banner-campanha.jpg",
          banner_url: null,
          data_inicio: "2026-06-01",
          data_inicio_formatada: "01/06/2026",
          data_fim: "2026-06-30",
          data_fim_formatada: "30/06/2026",
          status: "ativa",
          link_divulgacao: "https://example.com/campanha",
          meta_total: 0,
          progresso_atual: 0,
        }}
      />
    );

    expect(screen.getByText("Campanha de Verão")).toBeInTheDocument();
    expect(screen.getAllByText("Impulsionar vendas sazonais")).toHaveLength(2);
    expect(screen.getByText("01/06/2026 até 30/06/2026")).toBeInTheDocument();
    expect(screen.getByText("Link principal disponível")).toBeInTheDocument();
    expect(screen.getByText("Editar").closest("a")).toHaveAttribute(
      "href",
      "/divulgador/campanhas/7/edit"
    );
  });
});
