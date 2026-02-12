import type { Metadata } from "next";
import { JetBrains_Mono, Lexend_Mega } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LanguageDetector } from "@/components/LanguageDetector";

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

export async function generateMetadata({
  params,
}: {
  params: { locale?: string };
}): Promise<Metadata> {
  const locale = params?.locale ?? "en";
  const isEs = locale === "es";

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
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
      },
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
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: [isEs ? "en_US" : "es_ES"],
      url: `/${locale}`,
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

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      
      <body className={`${jbmono.className} ${lexend.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LanguageDetector currentLocale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
