import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function Footer({ footerRef }: { footerRef: React.Ref<HTMLDivElement> }) {
  const t = useTranslations('Footer');

  return (
    <footer ref={footerRef} className="bg-neutral-100 text-black pt-12 pb-6 px-6 w-full fixed bottom-0 z-0">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 pointer-events-none" id="contact">
        <FooterSection title={t('social')}>
          <FooterLink href="https://linkedin.com" text="LinkedIn" />
          <FooterLink href="https://github.com/mzzdev" text="GitHub" />
          <FooterLink href="mailto:pablo@mzzdev.com" text="Email" />
        </FooterSection>

        <FooterSection title={t('disclaimer.title')}>
          <p className="py-1">{t('disclaimer.i1')}</p>
          <p className="py-1">{t('disclaimer.i2')}</p>
          <p className="py-1">{t('disclaimer.i3')}</p>
        </FooterSection>
      </div>

      <div className="mt-12 text-center text-2xl font-bold">
        <a href="mailto:pablo@mzzdev.com" className="hover:underline">pablo@mzzdev.com</a>
      </div>

      <div className="flex justify-center items-center mt-6 text-base pointer-events-none">
        <p className="text-neutral-500">{'\u00A9'} {new Date().getFullYear()} {t('title')}</p>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="uppercase">
      <h3 className="text-xl font-bold mb-6 border-b border-black pb-2">{title}</h3>
      <div className="flex flex-col text-base">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, text }: { href: string, text: string }) {
  return (
    <Link href={href} className="group flex justify-between items-center py-1 hover:underline pointer-events-auto hover:bg-neutral-200 transition-all duration-300 hover:duration-0 text-base">
      <span className="block">{text}</span>
      <div className="pr-1 opacity-0 group-hover:opacity-100 duration-300 hover:duration-0">
        <ArrowRight className="w-5 animate-pulse" />
      </div>
    </Link>
  );
}
