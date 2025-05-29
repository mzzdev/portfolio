'use client'

import { useEffect, useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { MoveRight } from "lucide-react"
import Section from "@/components/Section"
import { Separator } from "@/components/ui/separator"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
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

  // const smootherRef = useRef<ScrollSmoother | null>(null);

  // useLayoutEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  //     const smoother = ScrollSmoother.create({
  //       smooth: 1,
  //       effects: true,
  //     });

  //     return () => {
  //       smoother.kill();
  //     };
  //   }
  // }, []);


  return (
    <>
      {/* <div id="smooth-wrapper" className="relative overflow-hidden">
        <div id="smooth-content"> */}
      <NavMenu />

      <main className="bg-white relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .6 }}
          className="bg-white">
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
        </motion.div>
      </main>
      {/* </div>
      </div> */}

      <div id="placeholder" ref={placeholderRef} className="relative -z-10"></div>
      <Footer footerRef={footerRef} />
    </>
  );
}
