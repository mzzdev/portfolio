import type { Metadata } from "next";
import { JetBrains_Mono, Lexend_Mega, Inter } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
 });
const lexend = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pablo Belló",
  description: "Pablo Belló",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const { locale } = await params;
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={`antialiased leading-tight font-semibold tracking-tight overflow-y-scroll ${jbmono.className} ${lexend.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}