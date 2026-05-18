"use client";

import DivulgadorSignInForm from "@/components/molecules/divulgador-form/DivulgadorSignInForm";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function DivulgadorSignInPage() {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const authUser = Cookies.get(AUTH_USER);

    if (token && authUser === "divulgador_level") {
      router.replace(`/${locale}${DivulgadorRoutes.dashboard}`);
    } else if (token && authUser && authUser !== "divulgador_level") {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
    }
  }, [locale, router]);

  return <DivulgadorSignInForm />;
}
