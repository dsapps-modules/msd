import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import defaultMessages from "../public/locales/en.json";
import { routing } from "./routing";

function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function mergeMessages(base: Record<string, any>, override: Record<string, any>) {
  const result: Record<string, any> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (isPlainObject(value) && isPlainObject(base[key])) {
      result[key] = mergeMessages(base[key], value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export default getRequestConfig(async (context: any) => {
  const locale = await context.requestLocale;

  if (!routing.locales.includes(locale as any)) notFound();

  const now = (await headers()).get("x-now");
  const timeZone = (await headers()).get("x-time-zone") ?? "Europe/Vienna";
  const localeMessages = (await import(`../public/locales/${locale}.json`))
    .default;
  const messages = mergeMessages(defaultMessages, localeMessages);

  return {
    locale,
    now: now ? new Date(now) : undefined,
    timeZone,
    messages,
    defaultTranslationValues: {
      globalString: "Global string",
      highlight: (chunks: string) => <strong>{chunks}</strong>,
    },
    formats: {
      dateTime: {
        medium: {
          dateStyle: "medium",
          timeStyle: "short",
          hour12: false,
        },
      },
    },
    onError(error) {
      if (
        error.message ===
        (process.env.NODE_ENV === "production"
          ? "MISSING_MESSAGE"
          : "MISSING_MESSAGE: Could not resolve `missing` in `Index`.")
      ) {
      } else {
      }
    },
    getMessageFallback({ key, namespace }) {
      return (
        "`getMessageFallback` called for " +
        [namespace, key].filter((part) => part != null).join(".")
      );
    },
  };
});


