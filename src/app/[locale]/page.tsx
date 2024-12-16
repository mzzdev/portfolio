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
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// TODO: Smooth scrolling

const SCROLL_THRESHOLD = 100;

export default function Home() {
  const t = useTranslations('HomePage');

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    top: 0,
    display: "none",
  });

  const titleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left; // Posición relativa al contenedor
      const mouseY = event.clientY - rect.top;

      setHighlightStyle({
        left: mouseX,
        top: mouseY,
        display: "block",
      });
    }
  };

  const handleMouseLeave = () => {
    setHighlightStyle({ ...highlightStyle, display: "none" });
  };

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

      <section
        id="title"
        className="flex flex-col items-center justify-center min-h-screen w-full py-20 relative select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={titleRef}
      >
        <h2 className="text-[10vw] font-bold text-transparent relative" style={{WebkitTextStroke: "2px gray"}}>{t("title")}</h2>
        <div
          className="absolute pointer-events-none w-[500px] h-[500px] -translate-x-2/4 -translate-y-2/4 mix-blend-color-dodge rounded-[50%]"
          style={{
            background: "radial-gradient(circle, rgb(195, 0, 255) 0%, transparent 60%)",
            left: `${highlightStyle.left}px`,
            top: `${highlightStyle.top}px`,
            display: highlightStyle.display,
          }}
        ></div>
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
