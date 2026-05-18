"use client";

import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@/components/ui";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { AUTH_TOKEN_KEY, AUTH_USER } from "@/lib/constants";
import { ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

export default function DivulgadorSignInForm() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (searchParams.get("error")) {
      setErrorMessage("Não foi possível autenticar. Verifique e-mail e senha.");
    }
  }, [searchParams]);

  const localeDir = pathname.split("/")[1] === "ar" ? "rtl" : "ltr";

  const highlights = useMemo(
    () => [
      "Visão unificada de produtos e compradores",
      "Acesso operacional para colaboradores",
      "Painel financeiro liberado apenas para admin",
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_38%,#fff7ed_100%)] px-4 py-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div
          className="flex items-center rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.28)]"
          dir={localeDir}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70">
              <Sparkles className="h-4 w-4" />
              Área do Divulgador
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight lg:text-6xl">
              Acompanhe produtos, compradores e comissões em um só lugar.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72 lg:text-lg">
              O acesso é separado por papel. O admin vê a parte financeira e o
              colaborador fica na operação, sem expor valores.
            </p>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/85"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="self-center rounded-[2rem] border border-white/70 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          <CardHeader className="px-8 pb-0 pt-8">
            <CardTitle className="text-3xl font-semibold text-slate-900">
              Entrar como divulgador
            </CardTitle>
            <p className="mt-2 text-sm text-slate-500">
              Use as credenciais de teste para acessar o dashboard.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 px-8 py-8">
            <form
              className="space-y-4"
              method="post"
              action={`/${locale}/api/divulgador/login`}
              noValidate
            >
              <input type="hidden" name="locale" value={locale} />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">E-mail</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="admin.divulgador@teste.com"
                  className="h-12 rounded-2xl border-slate-200 bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Senha</label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    className="h-12 rounded-2xl border-slate-200 bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 inline-flex items-center text-slate-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              ) : null}

              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
              >
                Acessar dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <p className="font-medium text-slate-900">Credenciais de teste</p>
              <p className="mt-2">Admin: admin.divulgador@teste.com / password</p>
              <p>Colaborador: colaborador.divulgador@teste.com / password</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
