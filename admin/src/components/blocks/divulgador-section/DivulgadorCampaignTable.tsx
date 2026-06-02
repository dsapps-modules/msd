"use client";

import { Badge, Button } from "@/components/ui";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import type { DivulgadorCampaign } from "@/modules/divulgador-section/divulgador.type";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Link2, PencilLine, Trash2 } from "lucide-react";
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

type Props = {
  items: DivulgadorCampaign[];
  onDelete?: (id: number) => void;
  onGenerateLink?: (id: number) => void;
  generatingId?: number | null;
  showActions?: boolean;
  emptyMessage?: string;
};

export function DivulgadorCampaignTable({
  items,
  onDelete,
  onGenerateLink,
  generatingId,
  showActions = true,
  emptyMessage = "Nenhuma campanha encontrada.",
}: Props) {
  if (!items?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Campanhas</h3>
        <p className="text-sm text-slate-500">
          Banner, objetivo, meta financeira e período de validade.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Banner</th>
              <th className="px-6 py-3 font-medium">Título</th>
              <th className="px-6 py-3 font-medium">Objetivo</th>
              <th className="px-6 py-3 font-medium">Meta Financeira</th>
              <th className="px-6 py-3 font-medium">Período</th>
              <th className="px-6 py-3 font-medium">Status</th>
              {showActions ? <th className="px-6 py-3 font-medium text-right">Ações</th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4">
                  <div className="relative h-16 w-24 overflow-hidden rounded-2xl bg-slate-100">
                    {item.banner_url ? (
                      <img
                        src={item.banner_url}
                        alt={item.titulo}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{item.titulo}</td>
                <td className="px-6 py-4 text-slate-600">
                  <p className="max-w-[360px] truncate">{item.objetivo}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">{formatMoney(item.meta_financeira)}</td>
                <td className="px-6 py-4 text-slate-600">
                  <p>{item.data_inicio_formatada ?? item.data_inicio}</p>
                  <p className="text-xs text-slate-400">
                    até {item.data_fim_formatada ?? item.data_fim}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    className={cn(
                      "rounded-full",
                      statusStyles[item.status] ?? statusStyles.ativa
                    )}
                  >
                    {item.status}
                  </Badge>
                </td>
                {showActions ? (
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap justify-end gap-2">
                      {onGenerateLink ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          onClick={() => onGenerateLink(item.id)}
                          disabled={generatingId === item.id || item.status !== "ativa"}
                        >
                          <Link2 className="mr-2 h-4 w-4" />
                          {generatingId === item.id
                            ? "Gerando..."
                            : item.status !== "ativa"
                              ? "Indisponível"
                              : "Gerar link"}
                        </Button>
                      ) : null}

                      <Button
                        asChild
                        size="sm"
                        className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                      >
                        <Link href={`${DivulgadorRoutes.campanhas}/${item.id}`}>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Visualizar
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      >
                        <Link href={`${DivulgadorRoutes.campanhas}/${item.id}/edit`}>
                          <PencilLine className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </Button>

                      {onDelete ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="rounded-full border-rose-200 bg-white text-rose-600 hover:bg-rose-50"
                          onClick={() => onDelete(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </Button>
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
