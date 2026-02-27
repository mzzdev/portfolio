import { routing } from "@/i18n/routing";

export const SITE_NAME = "pablo belló";
export const SITE_DESCRIPTION = "pablo belló portfolio - mzzdev";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzzdev.com").replace(
  /\/$/,
  "",
);

export const SUPPORTED_LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

export function resolveLocale(locale?: string): string {
  return locale && SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE;
}

export function localePath(locale: string): string {
  return `/${locale}`;
}

export function localeAlternates(): Record<string, string> {
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, localePath(locale)]),
  );

  return {
    ...languages,
    "x-default": localePath(DEFAULT_LOCALE),
  };
}
