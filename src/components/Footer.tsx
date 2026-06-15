import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function Footer({ footerRef }: { footerRef: React.Ref<HTMLDivElement> }) {
  const t = useTranslations('Footer');

  return (
    <footer ref={footerRef} className="bg-neutral-100 text-black pt-6 pb-2 w-full h-auto fixed bottom-0 z-0">
      <div className="md:w-4xl w-auto mx-[5vw] md:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8" id="contact">
        <FooterSection title={t('social')}>
          <FooterLink href="https://linkedin.com/in/pablo-bell%C3%B3" text="LinkedIn" />
          <FooterLink href="https://github.com/mzzdev" text="GitHub" />
          <FooterLink href="mailto:pablo@mzzdev.com" text="Email" />
        </FooterSection>

        <FooterSection title={t('disclaimer.title')}>
          <p className="py-1">{t('disclaimer.i1')}</p>
          <p className="py-1">{t('disclaimer.i2')}</p>
        </FooterSection>
      </div>

      <div className="mt-4 text-center">
        <Link href="mailto:pablo@mzzdev.com" className="hover:underline font-bold text-xl inline-block mb-8">
            pablo@mzzdev.com
        </Link>
        <p className="text-neutral-400 font-normal text-xs">
          {'\u00A9'} {new Date().getFullYear()} {t('title')}
        </p>
        <p className="text-neutral-400 font-normal text-xs">
           {t('copyright')}
        </p>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="uppercase">
      <h3 className="text-base font-bold mb-4 border-bottom-standard pb-1">{title}</h3>
      <div className="flex flex-col text-sm">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, text }: { href: string, text: string }) {
  return (
    <Link href={href} className="group flex justify-between items-center py-1 hover-subtle pointer-events-auto" target="_blank" rel="noopener noreferrer">
      <span className="block">{text}</span>
      <div className="pr-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:duration-0">
        <ArrowRight className="w-5" />
      </div>
    </Link>
  );
}
