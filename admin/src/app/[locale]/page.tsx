"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import SignInForm from "@/components/molecules/forms/sign-in";
import { PublicNavbar } from "@/components/blocks/shared/PublicNavbar";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import Cookies from "js-cookie";
import Loader from "@/components/molecules/Loader";
import { Routes } from "@/config/routes";
import { PublicNavbarSkeleton } from "@/components/molecules/PublicNavbarSkeleton";
import { SignInFormSkeleton } from "@/components/molecules/SignInFormSkeleton";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";

const SignInPage = () => {
  const router = useRouter();
  const locale = useLocale();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const authUser = Cookies.get(AUTH_USER);

    if (token && authUser == "system_level") {
      router.replace(`/${locale}${Routes.dashboard}`);
    } else if (token && authUser == "divulgador_level") {
      router.replace(`/${locale}${DivulgadorRoutes.dashboard}`);
    } else if (token && authUser == "store_level") {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
      setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div>
        <PublicNavbarSkeleton />
        <SignInFormSkeleton />
      </div>
    );
  }

  return (
    <>
      <PublicNavbar />
      <SignInForm />
    </>
  );
};

export default SignInPage;
