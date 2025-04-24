'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import Footer from "@/components/Footer"

export default function Home() {
  const t = useTranslations('HomePage');

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const placeholderRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (placeholderRef.current && footerRef.current) {
        placeholderRef.current.style.height = `${footerRef.current.offsetHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      <main className="bg-white relative z-10">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: showNavbar ? 0 : -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 z-50 font-lexend tracking-wide select-none w-full"
        >
          <Menubar className="items-center">
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-neutral-200">✣</MenubarTrigger>
              <MenubarContent className="ml-2 mt-1 font-lexend">
                {["about me", "projects", "contact"].map((item) => (
                  <MenubarItem asChild key={item} className="MenubarItem">
                    <Link href={`#${item.replace(" ", "-")}`} className="font-lexend">
                      {item}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
            <p onClick={() => window.scrollTo({ top: 0 })}>pbvdev.com</p>
          </Menubar>
        </motion.div>

        <section
          id="title"
          className="h-screen w-full select-none"
        >
          <TextHoverEffect text={t('title')} />
        </section>

        {/* <Section id="about-me" title="ABOUT ME">
          [placeholder for about me content]
        </Section>

        <Section id="projects" title="PROJECTS">
          [placeholder for projects content]
        </Section>

        <Section id="contact" title="CONTACT">
          [placeholder for contact content]
        </Section> */}
      </main>
      
      <div id="placeholder" ref={placeholderRef} className="relative -z-10"></div>

      <Footer footerRef={footerRef} />
    </>
  );
}

function Section({ id, title, children }: { id: string, title: string, children: React.ReactNode }) {
  return (
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
}
