import {
  AUTH_CRED,
  AUTH_COOKIE_OPTIONS,
  AUTH_TOKEN_KEY,
  AUTH_USER,
} from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

function getCookieOptions(request: NextRequest) {
  return {
    ...AUTH_COOKIE_OPTIONS,
    secure: request.nextUrl.protocol === "https:",
    path: "/",
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: routeLocale } = await params;

  try {
    const formData = await request.formData();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const locale = String(formData.get("locale") ?? routeLocale ?? "pt-BR");

    const apiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/v1/divulgador/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-localization": locale,
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
      }
    );

    const data = await apiResponse.json();
    const loginUrl = new URL(`/${locale}/divulgador/signin`, request.url);

    if (!apiResponse.ok || !data?.token) {
      loginUrl.searchParams.set("error", "1");
      return NextResponse.redirect(loginUrl, 303);
    }

    const cookies = getCookieOptions(request);
    const authCred = JSON.stringify({
      token: data.token,
      permissions: data.permissions ?? [],
      role: data.role ?? null,
    });

    const response = NextResponse.redirect(
      new URL(`/${locale}/divulgador/dashboard`, request.url),
      303
    );
    response.cookies.set(AUTH_TOKEN_KEY, data.token, cookies);
    response.cookies.set(AUTH_USER, "divulgador_level", cookies);
    response.cookies.set(AUTH_CRED, authCred, cookies);

    return response;
  } catch {
    const fallbackUrl = new URL(`/${routeLocale}/divulgador/signin`, request.url);
    fallbackUrl.searchParams.set("error", "1");
    return NextResponse.redirect(fallbackUrl, 303);
  }
}
