"use client";

import { BuyersTable, SummaryCards } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { Card, CardContent } from "@/components/ui";
import { useDivulgadorBuyersQuery, useDivulgadorDashboardQuery } from "@/modules/divulgador-section/divulgador.action";

export default function DivulgadorBuyersPage() {
  const { divulgadorBuyers, isPending } = useDivulgadorBuyersQuery({});
  const { divulgadorDashboard } = useDivulgadorDashboardQuery({});

  const summary = divulgadorDashboard?.summary ?? {
    products_available: 24,
    buyers_captured: 138,
    active_links: 17,
    commission_estimated: null,
    role_label: "Colaborador",
    can_view_financials: false,
  };

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando compradores...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} isAdmin={Boolean(summary.can_view_financials)} />
      <BuyersTable items={divulgadorBuyers?.buyers ?? []} />
    </div>
  );
}
