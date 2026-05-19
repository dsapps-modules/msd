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
      nome_campanha: "Aluguel",
      produto_nome: "Kit Clareador Dental Premium",
      fornecedor_nome: "Dental Shop Brasil",
      meta_total: 100,
      progresso_atual: 35,
      link_divulgacao: "https://app.com/r/aluguel123",
      data_inicio: "19/05/2026",
      status: "ativa",
    },
    {
      id: 2,
      nome_campanha: "Acampamento dos Jovens",
      produto_nome: "Escova Elétrica SmartClean",
      fornecedor_nome: "Oral Prime",
      meta_total: 200,
      progresso_atual: 120,
      link_divulgacao: "https://app.com/r/acampamento789",
      data_inicio: "18/05/2026",
      status: "ativa",
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
