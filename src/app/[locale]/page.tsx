'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import Section from "@/components/Section"
import { TitleEffect } from "@/components/ui/title-effect"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"
import ContactForm from "@/components/ContactForm"
import Image from 'next/image'

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

          <div className="bg-white relative z-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <Section
              id="about"
              title={t('sections.about.title')}
              bodyClassName="flex flex-col md:flex-row min-h-[25vh] md:h-[25vh] w-full px-6 py-4 leading-tight tracking-tight uppercase text-base"
            >
              <ul className="text-base leading-tight">
                <li className="mb-4 sm:mb-6">
                  <span className="select-none">* </span>
                  {t('sections.about.bio1')}
                </li>
                <li className="mb-4 sm:mb-6">
                  <span className="select-none">* </span>
                  {t('sections.about.bio2')}
                </li>
                <li className="mb-4 sm:mb-6">
                  <span className="select-none">* </span>
                  {t('sections.about.bio3')}
                  <Link
                    href="https://teknei.com"
                    target="_blank"
                    className="hover:bg-neutral-200 hover:underline transition-all duration-300"
                  >
                    Teknei
                  </Link>
                  .
                </li>
              </ul>
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
            <div className="flex flex-col md:flex-row gap-4 w-auto md:w-4xl mx-[5vw] md:mx-auto pb-4">
              <div className="flex flex-col w-full md:w-1/2">
                <Section
                  id="contact"
                  title={t('sections.contact.title')}
                  noFixedWidth={true}
                  contentClassName="flex flex-col h-full"
                  bodyClassName="flex-1"
                >
                  <ContactForm />
                </Section>
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <section id="resume" className="flex w-full min-h-[20vh] md:h-1/2 bg-white border-[1px] border-black shadow-[0px_0px_8px_0px_rgba(0,_0,_0,_0.075)]">
                  <Link href="/resume.pdf" className="flex justify-center items-center w-full hover:bg-neutral-200 hover:underline transition-all duration-300">
                    <p className="inline-flex items-center p-6 font-jbmono text-2xl leading-tight tracking-tight uppercase">
                      {t('sections.resume')}
                      <ExternalLink className="w-4" />
                    </p>
                  </Link>
                </section>
                <section id="signature" className="flex justify-center items-center w-full min-h-[20vh] md:h-1/2 bg-white border-[1px] border-black shadow-[0px_0px_8px_0px_rgba(0,_0,_0,_0.075)]">
                  <Image src="sig.svg" alt="Signature" width={100} height={100} className="w-1/2 p-6 select-none" />
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <div id="placeholder" ref={placeholderRef} className="relative"></div>
      <Footer footerRef={footerRef} />
    </>
  );
}
