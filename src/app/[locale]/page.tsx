'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Section from "@/components/Section"
import { Hero } from "@/components/ui/hero"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"
import ContactForm from "@/components/ContactForm"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projects"
import Image from 'next/image'
import ProjectCardGrid from "@/components/ProjectCard.grid"

export default function Home() {
  const t = useTranslations('Home');

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
            className="h-screen select-none sticky top-0 z-0 flex items-center justify-center"
          >
            <div className="w-full md:w-4xl md:mx-auto mx-[5vw]">
              <Hero />
            </div>
          </section>

          <div className="bg-white relative z-10 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <Section id="about">
              <Section.Card>
                <Section.Header>{t('sections.about.title')}</Section.Header>
                <Section.Body className="flex flex-col md:flex-row min-h-[25vh] md:h-[25vh] w-full px-6 py-4 text-base-upper">
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
                        className="hover-subtle"
                      >
                        Teknei
                      </Link>
                      .
                    </li>
                  </ul>
                </Section.Body>
              </Section.Card>
            </Section>

            {/* <Section id="projects">
              <Section.Card>
                <Section.Header>{t('sections.projectsTitle')}</Section.Header>
                <Section.Body className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <ProjectCardGrid key={project.id} project={project} />
                    ))}
                  </div>
                </Section.Body>
              </Section.Card>
            </Section> */}

            <Section id="projects">
              <Section.Card>
                <Section.Header>{t('sections.projectsTitle')}</Section.Header>
                <Section.Body>
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </Section.Body>
              </Section.Card>
            </Section>

            <div className="w-auto md:w-4xl mx-[5vw] md:mx-auto pb-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Section id="contact" className="w-full md:w-1/2">
                  <Section.Card className="flex flex-col h-full">
                    <Section.Header>{t('sections.contact.title')}</Section.Header>
                    <Section.Body className="flex-1">
                      <ContactForm />
                    </Section.Body>
                  </Section.Card>
                </Section>

                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  <Section id="resume" className="flex-1">
                    <Section.Card className="h-full flex">
                      <Section.Body className="w-full h-full flex">
                        <Link href="/resume.pdf" className="flex justify-center items-center w-full hover-subtle h-full">
                          <p className="inline-flex gap-1.5 items-center p-6 font-jbmono text-xl uppercase">
                            <ExternalLink className="w-4" />
                            {t('sections.resume')}
                          </p>
                        </Link>
                      </Section.Body>
                    </Section.Card>
                  </Section>

                  <Section id="signature" className="flex-1">
                    <Section.Card className="h-full flex">
                      <Section.Body className="flex justify-center items-center w-full h-full">
                        <Image src="sig.svg" alt="Signature" width={100} height={100} className="w-1/2 p-6 select-none" draggable="false" />
                      </Section.Body>
                    </Section.Card>
                  </Section>
                </div>
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
