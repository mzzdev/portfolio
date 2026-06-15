import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Lexend_Mega } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  SITE_HANDLE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
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

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const alternateLocales = SUPPORTED_LOCALES.filter((l) => l !== safeLocale);
  const t = await getTranslations({ locale: safeLocale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    appleWebApp: {
      title: SITE_HANDLE,
    },
    applicationName: SITE_HANDLE,
    creator: SITE_NAME,
    publisher: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    keywords: [
      "Pablo Belló",
      "Pablo Bello",
      "mzzdev",
      "mzz",
      "full-stack developer",
      "portfolio",
      "React",
      "Next.js",
      "Java",
    ],
    alternates: {
      canonical: localePath(safeLocale),
      languages: localeAlternates(),
    },
    icons: {
      icon: [
        { url: "/logo.svg", type: "image/svg+xml" },
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
      siteName: SITE_HANDLE,
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_HANDLE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

function buildJsonLd(locale: string, description: string) {
  const personId = `${SITE_URL}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        alternateName: [SITE_HANDLE, "mzz", "Pablo Bello"],
        url: SITE_URL,
        image: `${SITE_URL}/og.png`,
        description,
        jobTitle: "Full-Stack Developer",
        email: `mailto:${SOCIAL_LINKS.email}`,
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
        },
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Java",
          "Spring Boot",
          "PostgreSQL",
          "Oracle",
        ],
        sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_HANDLE,
        alternateName: [`${SITE_NAME} Portfolio`, SITE_NAME],
        description,
        inLanguage: SUPPORTED_LOCALES,
        publisher: { "@id": personId },
      },
    ],
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: LocaleParams;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  setRequestLocale(safeLocale);
  const messages = await getMessages({ locale: safeLocale });
  const t = await getTranslations({ locale: safeLocale, namespace: "Meta" });
  const jsonLd = buildJsonLd(safeLocale, t("description"));

  return (
    <html lang={safeLocale} data-scroll-behavior="smooth">
      <body className={`${jbmono.className} ${lexend.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
