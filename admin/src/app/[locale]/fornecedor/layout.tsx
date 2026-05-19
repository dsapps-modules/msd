"use client";

import { Button, Badge } from "@/components/ui";
import { FornecedorRoutes } from "@/config/fornecedorRoutes";
import { AUTH_CRED, AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMeQuery } from "@/modules/users/users.action";
import { useMutation } from "@tanstack/react-query";
import { Home, LogOut, Menu } from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useBaseService } from "@/modules/core/base.service";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export default function FornecedorAreaLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { me, isPending, isAuthorized } = useMeQuery({
    staleTime: 1000 * 60 * 10,
  });
  const { postEmpty } = useBaseService<any>("/logout");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = me?.data;

  const navItems = useMemo(
    () => [
      {
        label: "Dashboard",
        href: `/${locale}${FornecedorRoutes.dashboard}`,
        icon: Home,
      },
    ],
    [locale]
  );

  const roleName = useMemo(() => {
    const roles = user?.roles;
    if (Array.isArray(roles) && roles.length) {
      return String(roles[0]);
    }
    return "Fornecedor";
  }, [user?.roles]);

  const isAdmin = roleName === "fornecedor_admin";
  const userName = user?.full_name || user?.name || user?.first_name || "Fornecedor";

  const { mutate: logout } = useMutation({
    mutationFn: () => postEmpty(),
    onSuccess: () => {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
      Cookies.remove(AUTH_CRED);
      router.push(`/${locale}${FornecedorRoutes.signin}`);
    },
    onError: () => {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
      Cookies.remove(AUTH_CRED);
      router.push(`/${locale}${FornecedorRoutes.signin}`);
    },
  });

  useEffect(() => {
    if (!isPending) {
      if (!isAuthorized) {
        router.replace(`/${locale}${FornecedorRoutes.signin}`);
        return;
      }

      if (user?.activity_scope !== "fornecedor_level" || user?.account_type !== "fornecedor") {
        router.replace(`/${locale}${FornecedorRoutes.signin}`);
      }
    }
  }, [isAuthorized, isPending, locale, router, user?.account_type, user?.activity_scope]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Carregando area do fornecedor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f5efe7_0%,#f8fafc_40%,#eef2ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-72 border-r border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition-transform lg:static lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex h-full flex-col p-5">
            <div className="mb-6 rounded-3xl bg-slate-900 px-5 py-4 text-white shadow-lg">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Area do Fornecedor
              </p>
              <h1 className="mt-2 text-xl font-semibold leading-tight">
                {userName}
              </h1>
              <div className="mt-3 flex items-center gap-2">
                <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">
                  {isAdmin ? "Admin" : "Colaborador"}
                </Badge>
                <span className="text-xs text-white/65">
                  {isAdmin ? "Visao completa" : "Visao operacional"}
                </span>
              </div>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const active = pathname.endsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start rounded-2xl border-slate-200 bg-white px-4 py-3 text-slate-700 hover:bg-slate-50"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </aside>

        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        ) : null}

        <main className="flex-1 px-4 py-4 lg:px-8 lg:py-6">
          <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl lg:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                onClick={() => setSidebarOpen((value) => !value)}
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  Fornecedor
                </p>
                <h2 className="text-lg font-semibold text-slate-900">
                  Bem-vindo, {userName}
                </h2>
              </div>
            </div>
            <Badge className="rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">
              {isAdmin ? "Admin" : "Colaborador"}
            </Badge>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
