import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, SITE_URL, SUPPORTED_LOCALES, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  };

  const localeEntries: MetadataRoute.Sitemap = SUPPORTED_LOCALES.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 0.9 : 0.8,
  }));

  return [homeEntry, ...localeEntries];
}
