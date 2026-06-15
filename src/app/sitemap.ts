import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, SITE_URL, SUPPORTED_LOCALES, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, `${SITE_URL}${localePath(locale)}`]),
  );

  return SUPPORTED_LOCALES.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }));
}
