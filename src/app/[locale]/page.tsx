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
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

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

  return (
    <main className="bg-white">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 font-lexend tracking-wide select-none"
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
          <p onClick={() => window.scrollTo({ top: 0 })}>mzzdev.com</p>
        </Menubar>
      </motion.div>

      <section
        id="title"
        className="flex flex-col items-center justify-center min-h-screen w-full py-20 relative select-none"
      >
        <h2 className="text-[10vw] text-white font-bold relative font-lexend"
        // style={{
        //     WebkitTextStroke: "1px black"
        //   }} 
          >{t("title")}</h2>
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
    </main>
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
