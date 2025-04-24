'use client';

import Link from "next/link";
import { LanguageSelector } from "./LanguageSelector";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import React from "react";


export default function Footer({ footerRef }: { footerRef: React.Ref<HTMLDivElement> }) {
  const t = useTranslations('Footer');

  return (
    <footer ref={footerRef} className="bg-black text-white pt-10 pb-4 px-4 w-full fixed bottom-0 z-0">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FooterSection title={t('social.title')}>
          <FooterLink href="https://github.com" text={t('social.github')} />
          <FooterLink href="https://linkedin.com" text={t('social.linkedin')} />
          <FooterLink href="https://twitter.com" text={t('social.twitter')} />
          <FooterLink href="https://instagram.com" text={t('social.instagram')} />
        </FooterSection>

        <FooterSection title={t('about.title')}>
          <p className="text-sm leading-relaxed text-justify">{t('about.bio1')}</p>
          <p className="text-sm leading-relaxed text-justify">{t('about.bio2')}</p>
        </FooterSection>
      </div>

      <div className="mt-10 text-center text-2xl font-bold">
        <a href="mailto:pablo@pbvdev.com" className="hover:underline pointer-events-auto">pablo@pbvdev.com</a>
      </div>

      <div className="flex justify-center items-center mt-4 text-center space-x-8 pointer-events-auto text-sm">
        <LanguageSelector />
      </div>

      <div className="flex justify-center items-center mt-4 text-sm">
        <p className="text-neutral-500">{'\u00A9'} {new Date().getFullYear()} {t('info')}</p>
      </div>
    </footer>
  );
}

function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className="uppercase text-lg font-bold mb-6 border-b border-gray-600 pb-1">{title}</h3>
      <Separator />
      <div className="flex flex-col space-y-2 text-sm">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ href, text }: { href: string, text: string }) {
  return (
    <Link href={href} className="hover:underline pointer-events-auto">
      {text}
    </Link>
  );
}