"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { DivulgadorCampaignTable } from "@/components/blocks/divulgador-section/DivulgadorCampaignTable";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { useDivulgadorDashboardQuery } from "@/modules/divulgador-section/divulgador.action";
import Link from "next/link";

export default function DivulgadorCampaignsPage() {
  const { divulgadorDashboard, isPending } = useDivulgadorDashboardQuery({});

  if (isPending) {
    return (
      <Card className="rounded-3xl border border-white/70 bg-white/80">
        <CardContent className="p-8 text-slate-500">Carregando campanhas...</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Divulgador</p>
          <h1 className="text-2xl font-semibold text-slate-900">Campanhas</h1>
          <p className="mt-1 text-sm text-slate-500">
            Listagem consolidada das campanhas disponíveis no painel do divulgador.
          </p>
        </div>

        <Button asChild className="h-11 rounded-2xl bg-slate-900 px-5 text-white hover:bg-slate-800">
          <Link href={`${DivulgadorRoutes.campanhas}/nova`}>Nova campanha</Link>
        </Button>
      </div>

      <DivulgadorCampaignTable items={divulgadorDashboard?.campaigns ?? []} />
    </div>
  );
}
