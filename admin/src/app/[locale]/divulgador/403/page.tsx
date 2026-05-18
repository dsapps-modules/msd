"use client";

import { Button, Card, CardContent } from "@/components/ui";
import { DivulgadorRoutes } from "@/config/divulgadorRoutes";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function DivulgadorForbiddenPage() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-lg rounded-[2rem] border border-red-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <CardContent className="space-y-4 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
            403
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Acesso negado</h1>
          <p className="text-sm text-slate-500">
            Esta área está restrita ao papel de admin divulgador.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button
              type="button"
              className="rounded-2xl bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => router.push(`/${locale}${DivulgadorRoutes.dashboard}`)}
            >
              Ir para dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
