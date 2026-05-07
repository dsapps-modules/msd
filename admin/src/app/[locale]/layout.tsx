//app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode, use } from "react";
import { availableLocales } from "../../lib/language";

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const messages = use(getMessages({ locale }));
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
