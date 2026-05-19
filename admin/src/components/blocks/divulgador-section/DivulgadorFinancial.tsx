"use client";

import { Badge, Card, CardContent } from "@/components/ui";
import { formatCurrency } from "@/components/blocks/divulgador-section/DivulgadorPanels";
import type { DivulgadorDonation } from "@/modules/divulgador-section/divulgador.type";
import { cn } from "@/lib/utils";

const placeholderDonations: DivulgadorDonation[] = [
  {
    id: 1,
    donor_name: "Mariana Lopes",
    purchase_value: 250,
    donation_value: 25,
    donation_date: "10/05/2026",
    status: "Recebido",
  },
  {
    id: 2,
    donor_name: "Carlos Mendes",
    purchase_value: 180,
    donation_value: 18,
    donation_date: "12/05/2026",
    status: "Pendente",
  },
  {
    id: 3,
    donor_name: "Fernanda Rocha",
    purchase_value: 320,
    donation_value: 32,
    donation_date: "14/05/2026",
    status: "Recebido",
  },
  {
    id: 4,
    donor_name: "João Almeida",
    purchase_value: 95,
    donation_value: 9.5,
    donation_date: "15/05/2026",
    status: "Pendente",
  },
];

export function FinancialSummaryCards({
  receivedTotal,
  pendingTotal,
  donationsCount,
  purchaseTotal,
}: {
  receivedTotal: number;
  pendingTotal: number;
  donationsCount: number;
  purchaseTotal: number;
}) {
  const cards = [
    { title: "Total em doações recebidas", value: receivedTotal, accent: "from-emerald-100 to-lime-100" },
    { title: "Total pendente", value: pendingTotal, accent: "from-amber-100 to-orange-100" },
    { title: "Quantidade de doações", value: donationsCount, accent: "from-sky-100 to-cyan-100" },
    { title: "Valor total de compras", value: purchaseTotal, accent: "from-violet-100 to-fuchsia-100" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <CardContent className="p-5">
            <div className={cn("rounded-2xl bg-gradient-to-br px-4 py-3", card.accent)}>
              <p className="text-sm font-medium text-slate-600">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {card.title === "Quantidade de doações" ? card.value : formatCurrency(Number(card.value))}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function DonationsTable({ items }: { items: DivulgadorDonation[] }) {
  const rows = items?.length ? items : placeholderDonations;
  const isPlaceholder = !items?.length;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Doações</h3>
            <p className="text-sm text-slate-500">
              Acompanhe as doações geradas pelas compras realizadas por seus links.
            </p>
          </div>
          {isPlaceholder ? (
            <Badge className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-100">
              Dados de exemplo
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Doador</th>
              <th className="px-6 py-3 font-medium">Valor da compra</th>
              <th className="px-6 py-3 font-medium">Valor da doação</th>
              <th className="px-6 py-3 font-medium">Data</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((item) => {
              const isReceived = item.status === "Recebido";
              return (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.donor_name}</td>
                  <td className="px-6 py-4 text-slate-600">{formatCurrency(item.purchase_value)}</td>
                  <td className="px-6 py-4 text-slate-600">{formatCurrency(item.donation_value)}</td>
                  <td className="px-6 py-4 text-slate-600">{item.donation_date}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={cn(
                        "rounded-full",
                        isReceived
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
