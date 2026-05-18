"use client";

import { DivulgadorLayout } from "@/components/blocks/divulgador-section/DivulgadorLayout";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { useDivulgadorLogoutMutation } from "@/modules/divulgador-section/divulgador.action";
import { useMeQuery } from "@/modules/users/users.action";
import { ReactNode, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function DivulgadorAreaLayout({
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
  const { mutate: logout } = useDivulgadorLogoutMutation();

  const user = me?.data;

  const roleName = useMemo(() => {
    const roles = user?.roles;
    if (Array.isArray(roles) && roles.length) {
      return String(roles[0]);
    }
    return "Divulgador";
  }, [user?.roles]);

  const isAdmin = roleName === "divulgador_admin";
  const userName = user?.full_name || user?.name || user?.first_name || "Divulgador";

  useEffect(() => {
    if (!isPending) {
      if (!isAuthorized) {
        router.replace(`/${locale}${DivulgadorRoutes.signin}`);
        return;
      }

      if (user?.activity_scope !== "divulgador_level" || user?.account_type !== "divulgador") {
        router.replace(`/${locale}${DivulgadorRoutes.signin}`);
        return;
      }

      if (pathname.includes(DivulgadorRoutes.financeiro) && !isAdmin) {
        router.replace(`/${locale}${DivulgadorRoutes.forbidden}`);
      }
    }
  }, [isAdmin, isAuthorized, isPending, locale, pathname, router, user?.account_type, user?.activity_scope]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Carregando area do divulgador...
      </div>
    );
  }

  return (
    <DivulgadorLayout
      userName={userName}
      roleLabel={isAdmin ? "Admin" : "Colaborador"}
      isAdmin={isAdmin}
      onLogout={() => logout()}
    >
      {children}
    </DivulgadorLayout>
  );
}
