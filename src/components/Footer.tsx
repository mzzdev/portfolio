'use client';

import Link from "next/link";
import { LanguageSelector } from "./LanguageSelector";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function Footer() {
  const t = useTranslations('Footer');

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsFooterVisible(scrollTop + windowHeight >= documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = "hover:underline pointer-events-auto";
  const textNeutralClasses = "text-neutral-500";

  return (
    <footer className={`bg-black text-white py-10 px-4 w-full sticky bottom-0 ${isFooterVisible ? "z-0" : "-z-10"} pointer-events-none`}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FooterSection title={t('sections.title')}>
          <FooterLink href="#title" text={t('sections.home')} />
          <FooterLink href="#about-me" text={t('sections.aboutMe')} />
          <FooterLink href="#projects" text={t('sections.projects')} />
          <FooterLink href="#contact" text={t('sections.contact')} />
        </FooterSection>

        <FooterSection title={t('social.title')}>
          <FooterLink href="https://www.github.com" text={t('social.github')} />
          <FooterLink href="https://www.linkedin.com" text={t('social.linkedin')} />
          <FooterLink href="https://www.twitter.com" text={t('social.twitter')} />
          <FooterLink href="mailto:someone@example.com" text={t('social.email')} />
        </FooterSection>

        <FooterSection title={t('bio.title')}>
          <p className="text-sm leading-relaxed text-justify">{t('bio.bio1')}</p>
          <p className="text-sm leading-relaxed text-justify mt-4">{t('bio.bio2')}</p>
        </FooterSection>
      </div>

      <div className="mt-10 text-center text-2xl font-bold">
        <a href="mailto:someone@example.com" className={linkClasses}>someone@example.com</a>
      </div>

      <div className="flex justify-center items-center mt-6 text-center space-x-8 text-sm pointer-events-auto">
        <LanguageSelector locales="en" />
      </div>

      <div className="mt-10 flex justify-between items-center text-sm">
        <p className={textNeutralClasses}>{t('info')}</p>
        <p className={textNeutralClasses}>{new Date().getFullYear()} Pablo Belló</p>
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
