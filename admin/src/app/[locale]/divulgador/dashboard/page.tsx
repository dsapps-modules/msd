"use client";

import {
  BuyersTable,
  ProductsTable,
  SummaryCards,
} from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { CampaignsSection } from "@/components/blocks/divulgador-section/DivulgadorCampaigns";
import { Card, CardContent } from "@/components/ui";
import { useDivulgadorDashboardQuery } from "@/modules/divulgador-section/divulgador.action";
import type { DivulgadorCampaign } from "@/modules/divulgador-section/divulgador.type";

export default function DivulgadorDashboardPage() {
  const { divulgadorDashboard, isPending } = useDivulgadorDashboardQuery({});

  const data = divulgadorDashboard ?? {};
  const fallbackCampaigns: DivulgadorCampaign[] = [
    {
      id: 1,
      titulo: "Aluguel",
      objetivo: "Campanha piloto para demonstração do fluxo de divulgação.",
      meta_financeira: 100,
      banner: null,
      banner_url: null,
      data_inicio: "2026-05-19",
      data_inicio_formatada: "19/05/2026",
      data_fim: "2026-06-19",
      data_fim_formatada: "19/06/2026",
      status: "ativa",
      link_divulgacao: "https://app.com/r/aluguel123",
      meta_total: 100,
      progresso_atual: 35,
    },
    {
      id: 2,
      titulo: "Acampamento dos Jovens",
      objetivo: "Campanha demonstrativa com foco em recorrência e volume.",
      meta_financeira: 200,
      banner: null,
      banner_url: null,
      data_inicio: "2026-05-18",
      data_inicio_formatada: "18/05/2026",
      data_fim: "2026-06-30",
      data_fim_formatada: "30/06/2026",
      status: "ativa",
      link_divulgacao: "https://app.com/r/acampamento789",
      meta_total: 200,
      progresso_atual: 120,
    },
  ];

  const summary = data.summary ?? {
    products_available: 24,
    buyers_captured: 138,
    active_links: 17,
    commission_estimated: 4780,
    role_label: "Admin",
    can_view_financials: true,
  };

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando dashboard...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} isAdmin={Boolean(summary.can_view_financials)} />
      <CampaignsSection
        items={data.campaigns?.length ? data.campaigns : fallbackCampaigns}
      />
      <ProductsTable items={data.products ?? []} />
      <BuyersTable items={data.buyers ?? []} />
    </div>
  );
}
