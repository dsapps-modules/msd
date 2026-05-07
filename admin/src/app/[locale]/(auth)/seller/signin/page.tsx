"use client";
import { PublicNavbar } from "@/components/blocks/shared/PublicNavbar";
import Loader from "@/components/molecules/Loader";
import { PublicNavbarSkeleton } from "@/components/molecules/PublicNavbarSkeleton";
import { SignInFormSkeleton } from "@/components/molecules/SignInFormSkeleton";
import StoreOwnerSignInForm from "@/components/molecules/store-owner-form/StoreOwnerSignInForm";
import { SellerRoutes } from "@/config/sellerRoutes";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { withLocale } from "@/lib/localized-path";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SignInPage() {
  const router = useRouter();
  const locale = useLocale();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);
    const authUser = Cookies.get(AUTH_USER);

    if (token && authUser == "store_level") {
      router.replace(withLocale(locale, SellerRoutes.dashboard));
    } else if (token && authUser == "system_level") {
      Cookies.remove(AUTH_TOKEN_KEY);
      Cookies.remove(AUTH_USER);
      setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
    }
  }, [locale, router]);

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
      <StoreOwnerSignInForm />
    </>
  );
}

export default SignInPage;
