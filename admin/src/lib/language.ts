/**
 *
 * IMPORTANT:
 * - For each locale listed here, a corresponding JSON translation file
 *   must exist in the `/public/locales` directory (e.g., `en.json`, `ar.json`, `bn.json`).
 * - If a locale is added here without a corresponding JSON file,
 *   fallback behavior should be handled to avoid runtime issues.
 *
 * Example:
 *   Adding "de" to this list requires creating `/public/locales/de.json`.
 *
 **/

export const availableLocales = ["pt-BR", "en", "ar", "es"] as const;

export function getLanguageName(locale: string): string {
  switch (locale) {
    case "en":
      return "English";
    case "ar":
      return "Arabic";
    case "es":
      return "Spanish";
    case "pt-BR":
      return "Portuguese (Brazil)";
    default:
      return locale.toUpperCase();
  }
}
