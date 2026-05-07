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
  return data.site_settings as SiteInfo;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchSiteInfo();

    return {
      title: data.com_site_title,
      description: data.com_site_subtitle,
      icons: {
        icon: [
          { url: data.com_site_favicon, type: "image/png", sizes: "512x512" },
          { url: data.com_site_favicon, type: "image/png", sizes: "192x192" },
        ],
        apple: [
          { url: data.com_site_favicon, sizes: "180x180", type: "image/png" },
        ],
      },
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
