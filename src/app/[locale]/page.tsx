'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Section from "@/components/Section"
import { Separator } from "@/components/ui/separator"
import { TitleEffect } from "@/components/ui/title-effect"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"
import ContactForm from "@/components/ContactForm"

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
            id="hero"
            className="h-screen w-full select-none border-[#e5e5e5] border-b-[1px] sticky top-0 z-0"
          >
            <TitleEffect text={t('title')} />
          </section>

          <div className="bg-transparent relative z-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <Section
              id="about"
              title={t('sections.about.title')}
              bodyClassName="flex flex-col md:flex-row h-[25vh] w-full p-0"
            >
              <div className="w-full md:w-4/5 h-full px-6 py-4 leading-tight tracking-tight uppercase text-base">
                <ul className="text-base leading-tight">
                  <li className="mb-6"><span className="select-none">* </span>{t('sections.about.bio1')}</li>
                  <li className="mb-6"><span className="select-none">* </span>{t('sections.about.bio2')}</li>
                </ul>

              </div>
              <Separator className="bg-[#e5e5e5] md:hidden" />
              <Separator className="bg-[#e5e5e5] hidden md:block" orientation="vertical" />
              <div className="w-full md:w-1/5 h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
                <Link
                  href="resume.pdf"
                  className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center text-base py-6 md:py-0"
                >
                  {t('sections.about.resume')}
                </Link>
              </div>
            </Section>
            <Section id="projects" title={t('sections.projects')} >
              {["dope", "ahh", "boy", "from", "the", "projects"].map((item, index, array) => (
                <div key={item} className="h-16 w-full hover:bg-neutral-200 hover:underline transition-all duration-300 hover:duration-0">
                  <Link href="" className={`group flex justify-between px-6 py-4 items-center leading-tight tracking-tight uppercase text-base h-full ${index === array.length - 1 ? '' : 'shadow-[0_1px_0_#e5e5e5]'}`}>
                    {item}
                    <div className="opacity-0 group-hover:opacity-100 duration-300 hover:duration-0">
                      <ArrowRight className="w-5 animate-pulse" />
                    </div>
                  </Link>
                </div>
              ))}
            </Section>
            {/* <div className="flex-row flex w-full pb-4"> */}
              <Section
                id="contact"
                title={t('sections.contact.title')}
                contentClassName="w-full mx-auto max-w-xl shadow-[0px_0px_8px_0px_rgba(0,_0,_0,_0.075)]"
              >
                <ContactForm />
              </Section>
              {/* <Section
                id="resume"
                title={t('sections.about.resume')}
                bodyClassName="flex flex-col md:flex-row h-[25vh] w-full p-0"
              >
                <div className="w-full h-full hover:bg-neutral-200 hover:underline transition-all duration-300">
                  <Link
                    href="resume.pdf"
                    className="leading-tight tracking-tight uppercase h-full w-full flex items-center justify-center text-base py-6 md:py-0"
                  >
                    {t('sections.about.resume')}
                  </Link>
                </div>
              </Section>
            </div> */}
          </div>
        </motion.div>
      </main>

      <div id="placeholder" ref={placeholderRef} className="relative"></div>
      <Footer footerRef={footerRef} />
    </>
  );
}
