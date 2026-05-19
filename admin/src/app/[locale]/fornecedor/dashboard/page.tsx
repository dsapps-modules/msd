"use client";

import { Badge, Button, Card, CardContent } from "@/components/ui";
import { FornecedorRoutes } from "@/config/fornecedorRoutes";
import { useMeQuery } from "@/modules/users/users.action";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const summaryCards = [
  { title: "Produtos disponíveis", value: 24, accent: "from-amber-100 to-orange-100" },
  { title: "Vendas registradas", value: 138, accent: "from-sky-100 to-cyan-100" },
  { title: "Links ativos", value: 17, accent: "from-emerald-100 to-lime-100" },
];

const products = [
  ["Kit Clareador Dental Premium", "Dental Shop Brasil", "R$ 189,90", "42", "Ativo"],
  ["Escova Elétrica SmartClean", "Oral Prime", "R$ 249,90", "18", "Ativo"],
  ["Irrigador Oral Portátil", "Sorriso Distribuidora", "R$ 329,90", "11", "Ativo"],
  ["Creme Dental Sensitive Pro", "Dental Shop Brasil", "R$ 39,90", "86", "Ativo"],
  ["Fio Dental Expansível", "Oral Prime", "R$ 24,90", "104", "Ativo"],
];

export default function FornecedorDashboardPage() {
  const { me, isPending, isAuthorized } = useMeQuery({ staleTime: 1000 * 60 * 10 });
  const locale = useLocale();
  const router = useRouter();
  const user = me?.data;
  const roleName = Array.isArray(user?.roles) ? String(user.roles[0] ?? "") : "";
  const isAdmin = roleName === "fornecedor_admin";

  useEffect(() => {
    if (!isPending && (!isAuthorized || user?.account_type !== "fornecedor")) {
      router.replace(`/${locale}${FornecedorRoutes.signin}`);
    }
  }, [isAuthorized, isPending, locale, router, user?.account_type]);

  if (isPending) {
    return <div className="rounded-3xl bg-white p-8 text-slate-500">Carregando dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Fornecedor</p>
        <div className="mt-1 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Bem-vindo, {user?.full_name || user?.first_name || "Fornecedor"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {isAdmin ? "Visão completa da operação" : "Visão operacional da operação"}
            </p>
          </div>
          <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">
            {isAdmin ? "Admin" : "Colaborador"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.title} className="rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <CardContent className="p-5">
              <div className={`rounded-2xl bg-gradient-to-br px-4 py-3 ${card.accent}`}>
                <p className="text-sm font-medium text-slate-600">{card.title}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Produtos disponíveis</h3>
          <p className="text-sm text-slate-500">Lista base para acompanhamento operacional.</p>
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
              {products.map((product) => (
                <tr key={product[0]} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-medium text-slate-900">{product[0]}</td>
                  <td className="px-6 py-4 text-slate-600">{product[1]}</td>
                  <td className="px-6 py-4 text-slate-600">{product[2]}</td>
                  <td className="px-6 py-4 text-slate-600">{product[3]}</td>
                  <td className="px-6 py-4 text-slate-600">{product[4]}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      type="button"
                      size="sm"
                      className="rounded-full bg-slate-900 text-white hover:bg-slate-800"
                    >
                      Gerar link
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
