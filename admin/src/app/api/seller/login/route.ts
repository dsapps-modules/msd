import { AUTH_COOKIE_OPTIONS, AUTH_CRED, AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

function buildLoginUrl(request: NextRequest, locale: string) {
  return new URL(`/${locale}/seller/signin`, request.url);
}

function buildDashboardUrl(request: NextRequest, locale: string) {
  return new URL(`/${locale}/seller/dashboard`, request.url);
}

function getCookieOptions(request: NextRequest) {
  return {
    ...AUTH_COOKIE_OPTIONS,
    secure: request.nextUrl.protocol === "https:",
    path: "/",
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const locale = String(formData.get("locale") ?? "pt-BR");
    const rememberMe = formData.get("remember_me") === "true";

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/v1/seller/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-localization": locale,
        },
        body: JSON.stringify({
          email,
          password,
          ...(rememberMe ? { remember_me: true } : {}),
        }),
        cache: "no-store",
      }
    );

    const data = await apiResponse.json();
    const loginUrl = buildLoginUrl(request, locale);

    if (!apiResponse.ok || !data?.token) {
      loginUrl.searchParams.set("error", "1");
      return NextResponse.redirect(loginUrl, 303);
    }

    const cookies = getCookieOptions(request);
    const authCred = JSON.stringify({
      token: data.token,
      permissions: data.permissions ?? [],
      role: data.role ?? [],
    });

    const redirectUrl =
      data.email_verified === false &&
      data.email_verification_settings === "on"
        ? new URL(`/${locale}/seller/email-verification`, request.url)
        : buildDashboardUrl(request, locale);

    const response = NextResponse.redirect(redirectUrl, 303);
    response.cookies.set(AUTH_TOKEN_KEY, data.token, cookies);
    response.cookies.set(AUTH_USER, "store_level", cookies);
    response.cookies.set(AUTH_CRED, authCred, cookies);

    return response;
  } catch (error) {
    const fallbackUrl = buildLoginUrl(request, "pt-BR");
    fallbackUrl.searchParams.set("error", "1");
    return NextResponse.redirect(fallbackUrl, 303);
  }
}
