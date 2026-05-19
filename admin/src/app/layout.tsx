//app/layout.tsx
import "@/styles/globals.css";
import "@/styles/table.css";

import JotaiProviders from "@/components/molecules/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/utils/theme-provider";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/redux/ReduxProvider";
import { GlobalClientLayer } from "@/lib/GlobalClientLayer";
import { QueryProvider } from "@/lib/QueryProvider";

interface SiteInfo {
  com_site_title: string;
  com_site_subtitle: string;
  com_site_favicon: string;
}

type Props = { children: ReactNode };

async function fetchSiteInfo(): Promise<SiteInfo> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/v1/site-general-info`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );
  if (!res.ok) throw new Error("Failed to fetch site info");
  const data = await res.json();
  const siteSettings = data.site_settings ?? {};

  return {
    com_site_title: siteSettings.com_site_title ?? "Quick Ecommerce",
    com_site_subtitle: siteSettings.com_site_subtitle ?? "Quick Ecommerce",
    com_site_favicon: siteSettings.com_site_favicon ?? "",
  };
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchSiteInfo();
    const iconEntries = data.com_site_favicon
      ? [
          {
            url: data.com_site_favicon,
            type: "image/png",
            sizes: "512x512",
          },
          {
            url: data.com_site_favicon,
            type: "image/png",
            sizes: "192x192",
          },
          {
            url: data.com_site_favicon,
            sizes: "180x180",
            type: "image/png",
          },
        ]
      : [{ url: "/favicon.ico" }];

    return {
      title: data.com_site_title || "Quick Ecommerce",
      description: data.com_site_subtitle || "Quick Ecommerce",
      icons: { icon: iconEntries, apple: iconEntries },
    };
  } catch {
    return {
      title: "Quick Ecommerce",
      description: "Quick Ecommerce",
      icons: { icon: "/favicon.ico" },
    };
  }
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR" dir="ltr" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <TooltipProvider>
                <JotaiProviders>
                  {children}
                  <GlobalClientLayer />
                </JotaiProviders>
              </TooltipProvider>
            </ThemeProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
