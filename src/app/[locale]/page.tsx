'use client';

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

// TODO: Smooth scrolling

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
          <h2>{title}</h2>
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
            <MenubarTrigger className="font-lexend">✣</MenubarTrigger>
            <MenubarContent className="ml-2 mt-1">
              <MenubarItem asChild className="MenubarItem">
                <Link href="#about-me">ABOUT ME</Link>
              </MenubarItem>
              <MenubarItem asChild className="MenubarItem">
                <Link href="#projects">PROJECTS</Link>
              </MenubarItem>
              <MenubarItem asChild className="MenubarItem">
                <Link href="#contact">CONTACT</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </motion.div>

      <section id="title" className="flex flex-col items-center justify-center min-h-screen w-full py-20">
        <h2 className="text-4xl">{t('title')}</h2>
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

      {/* <div className="h-10 w-full bg-transparent relative">
        <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-t from-neutral-950 via-neutral-300 via-75% to-white"></div>
      </div> */}

      {/* <div className="h-[32rem] w-full bg-red-500 -z-20"></div> */}
    </main>
  );
}
