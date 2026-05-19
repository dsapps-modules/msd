//app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { availableLocales } from "../../lib/language";

export const dynamicParams = false;
export const revalidate = 3600;

type Locale = (typeof availableLocales)[number];

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: Promise<{ locale: string }>;
}) {
  const resolvedParams =
    (await params) ?? ({ locale: availableLocales[0] } as const);
  const locale =
    resolvedParams?.locale && availableLocales.includes(resolvedParams.locale as Locale)
      ? (resolvedParams.locale as Locale)
      : availableLocales[0];
  const messages = await getMessages({ locale });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
