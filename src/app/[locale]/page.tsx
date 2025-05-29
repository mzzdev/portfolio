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
import { MoveRight } from "lucide-react"

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
          <Menubar className="items-center border-b-[1px] border-black">
            <MenubarMenu>
              <MenubarTrigger className="hover:bg-neutral-200">&#128946;</MenubarTrigger>
              <MenubarContent className="ml-4 mt-3 p-0 border-[1px] rounded-none shadow-none">
                {["projects", "work with me"].map((item) => (
                  <MenubarItem asChild key={item} className="MenubarItem px-1 py-2 rounded-none">
                    <Link href={`#${item.replace(" ", "-")}`} className="leading-tight tracking-tight uppercase font-bold focus:bg-neutral-200 hover:underline duration-300 hover:duration-0">
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
          className="h-screen w-full select-none border-black border-b-[1px]"
        >
          <TextHoverEffect text={t('title')} />
        </section>

        <Section id="projects" title={t('sections.projects')} >
          {["dope", "ahh", "boy", "from", "the", "projects"].map((item) => (
            <div key={item} className="h-full w-full hover:bg-neutral-200 hover:underline transition-all duration-300 hover:duration-0">
              <Link href="" className="group flex justify-between p-4 items-center leading-tight tracking-tight uppercase shadow-[0_1px_0_#e5e5e5]">
                {item}
                <div className="opacity-0 group-hover:opacity-100 duration-300 hover:duration-0">
                  <MoveRight className="w-4 animate-pulse" />
                </div>
              </Link>
            </div>
          ))}
        </Section>

        <Section
          id="wwm"
          title={t('sections.wwm.title')}
          contentClassName="flex flex-col"
          bodyClassName="flex h-full w-full p-0"
        >
          <div className="w-1/2 h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
            <Link
              href="resume.pdf"
              className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center"
            >
              {t('sections.wwm.resume')}
            </Link>
          </div>
          <Separator className="bg-black" orientation="vertical" />
          <div className="w-1/2 h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
            <Link
              href=""
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: document.documentElement.scrollHeight });
              }}
              className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center"
            >
              {t('sections.wwm.contact')}
            </Link>
          </div>
        </Section>
      </main>

      <div id="placeholder" ref={placeholderRef} className="relative -z-10"></div>

      <Footer footerRef={footerRef} />
    </>
  );
}

function Section({ id, title, children, className, contentClassName, bodyClassName, }: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
  bodyClassName?: string
}) {
  return (
    <section
      id={id}
      className={`section h-[50vh] w-full px-4 pt-4 last:pb-4 bg-neutral-200 ${className}`}
    >
      <div
        className={`h-full w-full border-black border-[1px] bg-white ${contentClassName}`}
      >
        <h2 className="font-jbmono text-3xl p-4 leading-tight tracking-tight uppercase pointer-events-none">
          {title}
        </h2>
        <Separator className="bg-black" />
        <div className={`text-lg ${bodyClassName}`}>{children}</div>
      </div>
    </section>
  );
}
