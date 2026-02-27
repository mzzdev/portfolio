import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Lexend_Mega } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LanguageDetector } from "@/components/LanguageDetector";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LOCALES,
  localeAlternates,
  localePath,
  resolveLocale,
} from "@/lib/site";

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});
const lexend = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend",
});

type LocaleParams = Promise<{ locale?: string }>;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const alternateLocales = SUPPORTED_LOCALES.filter((l) => l !== safeLocale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    appleWebApp: {
      title: SITE_NAME,
    },
    applicationName: SITE_NAME,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    keywords: [
      "pablo belló",
      "pablo bello",
      "mzzdev",
      "portfolio",
      "mzz",
    ],
    alternates: {
      canonical: localePath(safeLocale),
      languages: localeAlternates(),
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: safeLocale,
      alternateLocale: alternateLocales,
      url: localePath(safeLocale),
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: LocaleParams;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const messages = await getMessages({ locale: safeLocale });

  return (
    <html lang={safeLocale}>
      
      <body className={`${jbmono.className} ${lexend.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LanguageDetector currentLocale={safeLocale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
