import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Lexend_Mega } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LanguageDetector } from "@/components/LanguageDetector";
import { routing } from "@/i18n/routing";

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});
const lexend = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const siteName = "pablo belló";
const siteDescription = "pablo belló portfolio - mzzdev";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mzzdev.com";

const supportedLocales = routing.locales;
const defaultLocale = routing.defaultLocale;
const languages = Object.fromEntries(
  supportedLocales.map((locale) => [locale, `/${locale}`]),
);

function resolveLocale(locale?: string): string {
  return locale && supportedLocales.includes(locale as any) ? locale : defaultLocale;
}

type LocaleParams = Promise<{ locale?: string }>;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const alternateLocales = supportedLocales.filter((l) => l !== safeLocale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    appleWebApp: {
      title: siteName,
    },
    applicationName: siteName,
    creator: siteName,
    publisher: siteName,
    authors: [{ name: siteName }],
    keywords: [
      "pablo belló",
      "pablo bello",
      "mzzdev",
      "portfolio",
      "mzz project",
    ],
    alternates: {
      canonical: `/${safeLocale}`,
      languages,
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
      url: `/${safeLocale}`,
      siteName,
      title: siteName,
      description: siteDescription,
    },
    twitter: {
      card: "summary",
      title: siteName,
      description: siteDescription,
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
