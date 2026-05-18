"use client";

import { Badge, Button, Card, CardContent } from "@/components/ui";
import type {
  DivulgadorBuyer,
  DivulgadorLink,
  DivulgadorProduct,
  DivulgadorSummary,
} from "@/modules/divulgador-section/divulgador.type";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Copy } from "lucide-react";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);

export function SummaryCards({
  summary,
  isAdmin,
}: {
  summary: DivulgadorSummary;
  isAdmin: boolean;
}) {
  const cards = [
    {
      title: "Produtos disponíveis",
      value: summary.products_available,
      accent: "from-amber-100 to-orange-100",
    },
    {
      title: "Compradores captados",
      value: summary.buyers_captured,
      accent: "from-sky-100 to-cyan-100",
    },
    {
      title: "Links ativos",
      value: summary.active_links,
      accent: "from-emerald-100 to-lime-100",
    },
  ];

  if (isAdmin) {
    cards.push({
      title: "Comissões estimadas",
      value: summary.commission_estimated ?? 0,
      accent: "from-violet-100 to-fuchsia-100",
    });
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={cn(
            "overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
          )}
        >
          <CardContent className="p-5">
            <div className={cn("rounded-2xl bg-gradient-to-br px-4 py-3", card.accent)}>
              <p className="text-sm font-medium text-slate-600">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {typeof card.value === "number" && card.title.includes("Comissões")
                  ? formatCurrency(card.value)
                  : card.value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500">
      {message}
    </div>
  );
}

export function ProductsTable({ items }: { items: DivulgadorProduct[] }) {
  if (!items?.length) {
    return <EmptyState message="Nenhum produto disponível no momento." />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Produtos disponíveis</h3>
          <p className="text-sm text-slate-500">
            Catálogo com fornecedores, preço, estoque e status.
          </p>
        </div>
        <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
          {items.length} itens
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Nome do produto</th>
              <th className="px-6 py-3 font-medium">Fornecedor</th>
              <th className="px-6 py-3 font-medium">Preço</th>
              <th className="px-6 py-3 font-medium">Estoque</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                <td className="px-6 py-4 text-slate-600">{item.supplier_name}</td>
                <td className="px-6 py-4 text-slate-600">{formatCurrency(item.price)}</td>
                <td className="px-6 py-4 text-slate-600">{item.stock}</td>
                <td className="px-6 py-4">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Gerar link
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BuyersTable({ items }: { items: DivulgadorBuyer[] }) {
  if (!items?.length) {
    return <EmptyState message="Nenhum comprador captado até agora." />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Compradores</h3>
        <p className="text-sm text-slate-500">
          Dados básicos dos compradores finais vinculados ao divulgador.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Nome</th>
              <th className="px-6 py-3 font-medium">E-mail</th>
              <th className="px-6 py-3 font-medium">Telefone</th>
              <th className="px-6 py-3 font-medium">Data do cadastro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                <td className="px-6 py-4 text-slate-600">{item.email}</td>
                <td className="px-6 py-4 text-slate-600">{item.phone}</td>
                <td className="px-6 py-4 text-slate-600">{item.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function LinksTable({ items }: { items: DivulgadorLink[] }) {
  if (!items?.length) {
    return <EmptyState message="Nenhum link de divulgação disponível." />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Links de divulgação</h3>
        <p className="text-sm text-slate-500">
          Links ativos e valores estimados de comissão.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Produto</th>
              <th className="px-6 py-3 font-medium">Código</th>
              <th className="px-6 py-3 font-medium">URL</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Comissão</th>
              <th className="px-6 py-3 font-medium text-right">Copiar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="px-6 py-4 font-medium text-slate-900">{item.product_name}</td>
                <td className="px-6 py-4 text-slate-600">{item.code}</td>
                <td className="px-6 py-4 text-slate-600">{item.url}</td>
                <td className="px-6 py-4">
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {formatCurrency(item.commission_value)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FinanceCard({
  estimatedCommissions,
  activeLinks,
}: {
  estimatedCommissions: number;
  activeLinks: number;
}) {
  return (
    <Card className="overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-[0_10px_40px_rgba(15,23,42,0.15)]">
      <CardContent className="p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-white/60">Financeiro</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-white/70">Comissões estimadas</p>
            <p className="mt-2 text-3xl font-semibold">
              {formatCurrency(estimatedCommissions)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm text-white/70">Links ativos</p>
            <p className="mt-2 text-3xl font-semibold">{activeLinks}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
