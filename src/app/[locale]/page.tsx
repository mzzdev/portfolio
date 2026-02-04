'use client'

import { useEffect, useRef } from "react"
import { useParams } from 'next/navigation'
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
import AboutSection from "@/components/AboutSection"
import { projects } from "@/data/projects"
import Image from 'next/image'

export default function Home() {
  const tAbout = useTranslations('About');
  const tProjects = useTranslations('Projects');
  const tContact = useTranslations('Contact');

  const params = useParams() as { locale?: string } | null
  const locale = params?.locale ?? 'en'
  const resumeHref = locale === 'es' ? '/resume-es.pdf' : '/resume-en.pdf'

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

          <div className="bg-white relative z-10 border-b border-neutral-300 shadow-[0px_8px_8px_-8px_rgba(0,_0,_0,_0.075)]">
            <Section id="about">
              <Section.Card>
                <Section.Header>{tAbout('title')}</Section.Header>
                <Section.Body>
                  <AboutSection />
                </Section.Body>
              </Section.Card>
            </Section>

            <Section id="projects">
              <Section.Card>
                <Section.Header>{tProjects('title')}</Section.Header>
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
                    <Section.Header>{tContact('title')}</Section.Header>
                    <Section.Body className="flex-1">
                      <ContactForm />
                    </Section.Body>
                  </Section.Card>
                </Section>

                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  <Section id="resume" className="flex-1">
                    <Section.Card className="h-full flex">
                      <Section.Body className="w-full h-full flex">
                        <Link href={resumeHref} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center w-full hover-subtle h-full">
                          <p className="inline-flex gap-1.5 items-center p-6 font-jbmono text-xl uppercase">
                            <ExternalLink className="w-4" />
                            {tContact('resume')}
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
