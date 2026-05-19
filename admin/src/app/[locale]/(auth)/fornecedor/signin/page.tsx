"use client";

import FornecedorSignInForm from "@/components/molecules/fornecedor-form/FornecedorSignInForm";
import { FornecedorRoutes } from "@/config/fornecedorRoutes";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function FornecedorSignInPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const authUser = Cookies.get(AUTH_USER);

    if (token && authUser === "fornecedor_level") {
      router.replace(`/${locale}${FornecedorRoutes.dashboard}`);
    } else if (token && authUser && authUser !== "fornecedor_level") {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
    }
  }, [locale, router]);

  return <FornecedorSignInForm />;
}
