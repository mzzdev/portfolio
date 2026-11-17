import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { TextLink } from "@/components/ui/text-link";
import { SOCIAL_LINKS } from "@/lib/site";

export default function Footer({ footerRef }: { footerRef: React.Ref<HTMLDivElement> }) {
  const t = useTranslations('Footer');

  return (
    <footer ref={footerRef} className="bg-muted pt-6 pb-2 w-full h-auto fixed bottom-0 z-0">
      <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FooterSection title={t('social')}>
          <FooterLink href={SOCIAL_LINKS.linkedin} text="LinkedIn" />
          <FooterLink href={SOCIAL_LINKS.github} text="GitHub" />
          <FooterLink href={`mailto:${SOCIAL_LINKS.email}`} text="Email" />
        </FooterSection>

        <FooterSection title={t('disclaimer.title')}>
          <p className="py-1">{t('disclaimer.i1')}</p>
          <p className="py-1">{t('disclaimer.i2')}</p>
        </FooterSection>
      </div>

      <div className="mt-4 text-center">
        <TextLink href={`mailto:${SOCIAL_LINKS.email}`} variant="subtle" className="font-bold text-xl mb-8">
          {SOCIAL_LINKS.email}
        </TextLink>
        <p className="text-muted-foreground font-normal text-xs">
          {'©'} {new Date().getFullYear()} {t('title')}
        </p>
        <p className="text-muted-foreground font-normal text-xs">
           {t('copyright')}
        </p>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="uppercase">
      <h3 className="type-title mb-4 border-b border-border-strong pb-1">{title}</h3>
      <div className="flex flex-col text-sm">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, text }: { href: string, text: string }) {
  return (
    <TextLink href={href} external className="group flex justify-between py-1.5">
      <span>{text}</span>
      <ArrowRight className="interactive mr-1 size-5 opacity-0 group-hover:opacity-100 group-hover:duration-0" />
    </TextLink>
  );
}
