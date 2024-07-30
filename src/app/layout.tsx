import type { Metadata } from "next";
import { JetBrains_Mono, Lexend_Mega } from "next/font/google";
import "@/styles/globals.css";

const jbmono = JetBrains_Mono({ subsets: ["latin"] });
const lexend = Lexend_Mega({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Pablo Belló",
  description: "Pablo Belló",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`min-h-screen ${jbmono.className} antialiased ${lexend.variable}`}>
        {children}
      </body>
    </html>
  );
}
