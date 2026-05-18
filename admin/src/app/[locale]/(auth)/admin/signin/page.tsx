"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignInForm from "@/components/molecules/forms/sign-in";
import { PublicNavbar } from "@/components/blocks/shared/PublicNavbar";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { withLocale } from "@/lib/localized-path";
import Cookies from "js-cookie";
import { Routes } from "@/config/routes";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { useLocale } from "next-intl";

const SignInPage = () => {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const authUser = Cookies.get(AUTH_USER);

    if (token && authUser == "system_level") {
      void router.replace(withLocale(locale, Routes.dashboard));
    } else if (token && authUser == "divulgador_level") {
      void router.replace(withLocale(locale, DivulgadorRoutes.dashboard));
    } else if (token && authUser == "store_level") {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
    }
  }, [router, locale]);

  return (
    <>
      <PublicNavbar />
      <SignInForm />
    </>
  );
};

export default SignInPage;
