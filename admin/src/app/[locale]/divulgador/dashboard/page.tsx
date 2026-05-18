"use client";

import { BuyersTable, ProductsTable, SummaryCards } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { Card, CardContent } from "@/components/ui";
import { useDivulgadorDashboardQuery } from "@/modules/divulgador-section/divulgador.action";

export default function DivulgadorDashboardPage() {
  const { divulgadorDashboard, isPending } = useDivulgadorDashboardQuery({});

  const data = divulgadorDashboard ?? {};
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
      <ProductsTable items={data.products ?? []} />
      <BuyersTable items={data.buyers ?? []} />
    </div>
  );
}
