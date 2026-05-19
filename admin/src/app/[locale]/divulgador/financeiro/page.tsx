"use client";

import { SummaryCards } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { DonationsTable, FinancialSummaryCards } from "@/components/blocks/divulgador-section/DivulgadorFinancial";
import { Card, CardContent } from "@/components/ui";
import {
  useDivulgadorDashboardQuery,
  useDivulgadorFinancialQuery,
} from "@/modules/divulgador-section/divulgador.action";

export default function DivulgadorFinancialPage() {
  const { divulgadorFinancial, isPending } = useDivulgadorFinancialQuery({});
  const { divulgadorDashboard } = useDivulgadorDashboardQuery({});

  const summary = divulgadorDashboard?.summary ?? {
    products_available: 24,
    buyers_captured: 138,
    active_links: 17,
    commission_estimated: 4780,
    role_label: "Admin",
    can_view_financials: true,
  };

  const financial = divulgadorFinancial?.financial ?? {
    received_total: 0,
    pending_total: 0,
    donations_count: 0,
    purchase_total: 0,
  };
  const donations = divulgadorFinancial?.donations ?? [];

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando financeiro...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Financeiro</h1>
        <p className="text-sm text-slate-500">
          Acompanhe as doações geradas pelas compras realizadas por seus links de divulgação.
        </p>
      </div>
      <SummaryCards summary={summary} isAdmin={true} />
      <FinancialSummaryCards
        receivedTotal={financial.received_total}
        pendingTotal={financial.pending_total}
        donationsCount={financial.donations_count}
        purchaseTotal={financial.purchase_total}
      />
      <DonationsTable items={donations} />
    </div>
  );
}
