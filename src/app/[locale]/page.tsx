'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import Section from "@/components/Section"
import { Separator } from "@/components/ui/separator"
import { TitleEffect } from "@/components/ui/title-effect"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"

export default function Home() {
  const t = useTranslations('HomePage');

  const placeholderRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (placeholderRef.current && footerRef.current) {
        placeholderRef.current.style.height = `${footerRef.current.offsetHeight}px`
      }
    }
    const handleUnload = () => document.body.classList.add('unloadTransition')

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  return (
    <>
      <NavMenu />

      <main className="bg-white relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .6 }}
        >
          <section
            id="title"
            className="h-screen w-full select-none border-[#e5e5e5] border-b-[1px] sticky top-0 z-0"
          >
            <TitleEffect text={t('title')} />
          </section>

          <div className="bg-transparent relative z-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <Section id="projects" title={t('sections.projects')} >
              {["dope", "ahh", "boy", "from", "the", "projects", "test", "test2"].map((item, index, array) => (
                <div key={item} className="h-16 w-full hover:bg-neutral-200 hover:underline transition-all duration-300 hover:duration-0">
                  <Link href="" className={`group flex justify-between px-6 py-4 items-center leading-tight tracking-tight uppercase text-base h-full ${index === array.length - 1 ? '' : 'shadow-[0_1px_0_#e5e5e5]'}`}>
                    {item}
                    <div className="opacity-0 group-hover:opacity-100 duration-300 hover:duration-0">
                      <MoveRight className="w-5 animate-pulse" />
                    </div>
                  </Link>
                </div>
              ))}
            </Section>
            <Section
              id="wwm"
              title={t('sections.wwm.title')}
              contentClassName="flex flex-col"
              bodyClassName="flex flex-col md:flex-row h-[25vh] w-full p-0"
            >
              <div className="w-full md:w-1/2 h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
                <Link
                  href="resume.pdf"
                  className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center text-base py-6 md:py-0"
                >
                  {t('sections.wwm.resume')}
                </Link>
              </div>
              <Separator className="bg-[#e5e5e5] md:hidden" />
              <Separator className="bg-[#e5e5e5] hidden md:block" orientation="vertical" />
              <div className="w-full md:w-1/2 h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: document.documentElement.scrollHeight });
                  }}
                  className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center text-base py-6 md:py-0"
                >
                  {t('sections.wwm.contact')}
                </Link>
              </div>
            </Section>
          </div>
        </motion.div>
      </main>

      <div id="placeholder" ref={placeholderRef} className="relative"></div>
      <Footer footerRef={footerRef} />
    </>
  );
}
