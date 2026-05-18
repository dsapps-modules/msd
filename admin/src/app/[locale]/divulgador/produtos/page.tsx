"use client";

import { ProductsTable, SummaryCards } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { Card, CardContent } from "@/components/ui";
import { useDivulgadorDashboardQuery, useDivulgadorProductsQuery } from "@/modules/divulgador-section/divulgador.action";

export default function DivulgadorProductsPage() {
  const { divulgadorProducts, isPending } = useDivulgadorProductsQuery({});
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
        <CardContent className="p-8 text-slate-500">Carregando produtos...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} isAdmin={Boolean(summary.can_view_financials)} />
      <ProductsTable items={divulgadorProducts?.products ?? []} />
    </div>
  );
}
