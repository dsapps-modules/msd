"use client";

import { Badge, Button, Card, CardContent } from "@/components/ui";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import type { DivulgadorCampaign } from "@/modules/divulgador-section/divulgador.type";
import { cn } from "@/lib/utils";
import { ArrowLeft, PencilLine } from "lucide-react";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  ativa: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  futura: "bg-sky-100 text-sky-700 hover:bg-sky-100",
  encerrada: "bg-slate-100 text-slate-600 hover:bg-slate-100",
};

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);

export function DivulgadorCampaignDetails({ item }: { item: DivulgadorCampaign }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Campanha</p>
          <h1 className="text-2xl font-semibold text-slate-900">{item.titulo}</h1>
          <p className="mt-1 text-sm text-slate-500">{item.objetivo}</p>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            <Link href={DivulgadorRoutes.campanhas}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
            <Link href={`${DivulgadorRoutes.campanhas}/${item.id}/edit`}>
              <PencilLine className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <CardContent className="grid gap-0 p-0 lg:grid-cols-[1fr_340px]">
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Meta Financeira
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {formatMoney(item.meta_financeira)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Período</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {item.data_inicio_formatada ?? item.data_inicio} até{" "}
                  {item.data_fim_formatada ?? item.data_fim}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge className={cn("rounded-full", statusStyles[item.status] ?? statusStyles.ativa)}>
                {item.status}
              </Badge>
              {item.link_divulgacao ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                  Link principal disponível
                </span>
              ) : null}
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-sm font-medium text-slate-900">Objetivo</p>
              <p className="text-sm leading-7 text-slate-600">{item.objetivo}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 p-6 lg:border-l lg:border-t-0">
            <div className="relative h-64 overflow-hidden rounded-3xl bg-slate-100">
              {item.banner_url ? (
                <img
                  src={item.banner_url}
                  alt={item.titulo}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Banner</p>
              <p className="mt-1 break-all text-xs text-slate-500">
                {item.banner ?? "Sem banner definido"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
