"use client";

import { FinanceCard, LinksTable, SummaryCards } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import { Card, CardContent } from "@/components/ui";
import {
  useDivulgadorDashboardQuery,
  useDivulgadorFinancialQuery,
  useDivulgadorLinksQuery,
} from "@/modules/divulgador-section/divulgador.action";

export default function DivulgadorFinancialPage() {
  const { divulgadorFinancial, isPending } = useDivulgadorFinancialQuery({});
  const { divulgadorDashboard } = useDivulgadorDashboardQuery({});
  const { divulgadorLinks } = useDivulgadorLinksQuery({});

  const summary = divulgadorDashboard?.summary ?? {
    products_available: 24,
    buyers_captured: 138,
    active_links: 17,
    commission_estimated: 4780,
    role_label: "Admin",
    can_view_financials: true,
  };

  const financial = divulgadorFinancial?.financial ?? {
    estimated_commissions: 4780,
    active_links: 17,
  };

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando financeiro...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} isAdmin={true} />
      <FinanceCard
        estimatedCommissions={financial.estimated_commissions}
        activeLinks={financial.active_links}
      />
      <LinksTable items={divulgadorLinks?.links ?? []} />
    </div>
  );
}
