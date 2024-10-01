'use client';

import { LanguageSelector } from "@/components/LanguageSelector";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SCROLL_THRESHOLD = 100;

export default function Home() {
  const t = useTranslations('HomePage');

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <>
      <Separator className="bg-neutral-200" />
      <section id={id} className="section h-screen w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl mb-4">{title}</h2>
          <p className="text-lg">{children}</p>
        </div>
      </section>
    </>
  );

  return (
    <main className="w-full bg-white">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50"
      >
        <Menubar className="justify-between">
          <MenubarMenu>
            <MenubarTrigger className="font-lexend">Pablo Belló</MenubarTrigger>
            <MenubarContent className="ml-2 mt-1">
              <MenubarItem asChild>
                <Link href="#about-me">ABOUT ME</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="#projects">PROJECTS</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href="#contact">CONTACT</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <LanguageSelector locales="en" />
        </Menubar>
      </motion.div>

      <section id="title" className="flex flex-col items-center justify-center min-h-screen w-full py-20">
        <h1 className="text-4xl">{t('title')}</h1>
      </section>

      <Section id="about-me" title="ABOUT ME">
        [placeholder for about me content]
      </Section>

      <Section id="projects" title="PROJECTS">
        [placeholder for projects content]
      </Section>

      <Section id="contact" title="CONTACT">
        [placeholder for contact content]
      </Section>
      <footer className="bg-neutral-100 py-10 shadow-2xl shadow-neutral-500">
      <div className="container mx-auto px-4 text-center">
        {/* Separator para mantener consistencia visual */}
        <Separator className="bg-neutral-300 mb-6" />

        {/* Links de navegación */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="#title" className="text-sm text-neutral-700 hover:text-neutral-900">
            Home
          </Link>
          <Link href="#about-me" className="text-sm text-neutral-700 hover:text-neutral-900">
            About Me
          </Link>
          <Link href="#projects" className="text-sm text-neutral-700 hover:text-neutral-900">
            Projects
          </Link>
          <Link href="#contact" className="text-sm text-neutral-700 hover:text-neutral-900">
            Contact
          </Link>
        </div>

        {/* Redes sociales o contacto (Placeholder para íconos o enlaces sociales) */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://www.linkedin.com" className="text-sm text-neutral-700 hover:text-neutral-900">
            LinkedIn
          </Link>
          <Link href="https://www.github.com" className="text-sm text-neutral-700 hover:text-neutral-900">
            GitHub
          </Link>
          <Link href="mailto:someone@example.com" className="text-sm text-neutral-700 hover:text-neutral-900">
            Email
          </Link>
        </div>

        {/* Créditos */}
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} Pablo Belló. All rights reserved.
        </p>
      </div>
    </footer>
    </main>
  );
}
