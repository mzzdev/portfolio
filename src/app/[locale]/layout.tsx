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

export const metadata: Metadata = {
  title: "PBV",
  description: "PBV Portfolio - a mzz project",
};

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`antialiased leading-tight font-semibold tracking-tight overflow-y-scroll ${jbmono.className} ${lexend.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <LanguageDetector currentLocale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
