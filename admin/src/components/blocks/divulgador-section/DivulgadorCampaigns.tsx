"use client";

import { Badge, Button, Card, CardContent } from "@/components/ui";
import type { DivulgadorCampaign } from "@/modules/divulgador-section/divulgador.type";
import { cn } from "@/lib/utils";
import { Check, Copy, Link2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "@/components/blocks/divulgador-section/DivulgadorPanels";

const chartColors = {
  progress: "#0f172a",
  remaining: "#e2e8f0",
};

function formatProgress(campaign: DivulgadorCampaign) {
  const achieved = Math.min(
    100,
    Math.round((campaign.progresso_atual / Math.max(campaign.meta_total, 1)) * 100)
  );
  const remaining = Math.max(0, 100 - achieved);

  return { achieved, remaining };
}

function CampaignPieChart({ campaign }: { campaign: DivulgadorCampaign }) {
  const { achieved, remaining } = formatProgress(campaign);

  const data = useMemo(
    () => [
      { name: "Concluído", value: achieved },
      { name: "Restante", value: remaining },
    ],
    [achieved, remaining]
  );

  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={52}
            outerRadius={74}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={index === 0 ? chartColors.progress : chartColors.remaining}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${String(value)}%`, ""]}
            contentStyle={{ borderRadius: 16, borderColor: "#e2e8f0" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CampaignsSection({ items }: { items: DivulgadorCampaign[] }) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (campaign: DivulgadorCampaign) => {
    try {
      if (!campaign.link_divulgacao) return;
      await navigator.clipboard.writeText(campaign.link_divulgacao);
      setCopiedId(campaign.id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  if (!items?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
        Nenhuma campanha ativa no momento.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          Campanhas ativas mais recentes
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Foco em performance, metas e compartilhamento rápido.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((campaign) => {
          const { achieved, remaining } = formatProgress(campaign);

          return (
            <Card
              key={campaign.id}
              className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
            >
              <CardContent className="p-0">
                <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          Campanha
                        </p>
                        <h4 className="mt-1 text-2xl font-semibold text-slate-900">
                          {campaign.nome_campanha}
                        </h4>
                      </div>
                      <Badge
                        className={cn(
                          "rounded-full px-3 py-1",
                          campaign.status === "ativa"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Meta
                        </p>
                        <p className="mt-1 font-medium text-slate-900">
                          {formatCurrency(campaign.meta_total)}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Progresso atual
                        </p>
                        <p className="mt-1 font-medium text-slate-900">
                          {formatCurrency(campaign.progresso_atual)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        <Link2 className="h-4 w-4" />
                        {campaign.data_inicio}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        {achieved}% concluído
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                        {remaining}% restante para meta
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/60 p-6 lg:border-l lg:border-t-0">
                    <CampaignPieChart campaign={campaign} />

                    <div className="mt-2 text-center text-sm text-slate-600">
                      <p className="font-medium text-slate-900">
                        {formatCurrency(campaign.progresso_atual)} de {formatCurrency(campaign.meta_total)}
                      </p>
                      <p>{remaining}% restante para meta</p>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 break-all">
                        {campaign.link_divulgacao}
                      </div>
                      <Button
                        type="button"
                        className="h-11 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
                        onClick={() => handleCopy(campaign)}
                      >
                        {copiedId === campaign.id ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Link copiado com sucesso!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copiar link
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
