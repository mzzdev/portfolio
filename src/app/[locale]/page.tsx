'use client'

import { useEffect, useRef, useTransition } from "react"
import { useParams } from 'next/navigation'
import { useRouter, usePathname } from '@/i18n/routing'
import { useTranslations } from "next-intl"
import { motion } from "motion/react"
import { ExternalLink } from "lucide-react"
import { Hero } from "@/components/Hero"
import Footer from "@/components/Footer"
import NavMenu from "@/components/NavMenu"
import ContactForm from "@/components/ContactForm"
import ProjectCard from "@/components/ProjectCard"
import AboutSection from "@/components/AboutSection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextLink } from "@/components/ui/text-link"
import { projects } from "@/data/projects"
import { duration } from "@/lib/motion"
import Image from 'next/image'

export default function Home() {
  const tHome = useTranslations('Home');
  const tAbout = useTranslations('About');
  const tProjects = useTranslations('Projects');
  const tContact = useTranslations('Contact');

  const params = useParams() as { locale?: string } | null
  const locale = params?.locale ?? 'en'
  const resumeHref = locale === 'es' ? '/resume-es.pdf' : '/resume-en.pdf'

  const router = useRouter()
  const pathname = usePathname()
  const [isSwitchingLocale, startLocaleTransition] = useTransition()

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return
    startLocaleTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false })
    })
  }

  const placeholderRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (placeholderRef.current && footerRef.current) {
        placeholderRef.current.style.height = `${footerRef.current.offsetHeight}px`
      }
    }
    const handleUnload = () => document.body.classList.add('page-exit')

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])

  return (
    <div
      className="transition-opacity duration-(--duration-slow) ease-out-expo motion-reduce:transition-none"
      style={{ opacity: isSwitchingLocale ? 0 : 1 }}
      aria-busy={isSwitchingLocale}
    >
      <NavMenu onSwitchLocale={switchLocale} />

      <main className="bg-background relative z-10">
        <h1 className="sr-only">{tHome('heading')}</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow }}
        >
          <section
            id="hero"
            className="h-screen select-none sticky top-0 z-0 flex items-center justify-center"
          >
            <div className="container-page w-full">
              <Hero />
            </div>
          </section>

          <div className="bg-background relative z-10 border-b border-border shadow-edge">
            <div className="container-page flex flex-col gap-section pb-section">
              <section id="about">
                <Card>
                  <CardHeader>
                    <CardTitle>{tAbout('title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AboutSection />
                  </CardContent>
                </Card>
              </section>

              <section id="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>{tProjects('title')}</CardTitle>
                  </CardHeader>
                  <CardContent inset={false}>
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </CardContent>
                </Card>
              </section>

              <div className="flex flex-col gap-section md:grid md:grid-cols-2 md:grid-rows-2">
                <section id="contact" className="md:row-span-2">
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{tContact('title')}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ContactForm />
                    </CardContent>
                  </Card>
                </section>

                <section id="resume" className="flex-1">
                  <Card className="h-32 md:h-full flex overflow-hidden">
                    <TextLink href={resumeHref} external className="flex justify-center w-full h-full gap-1.5 p-card text-xl uppercase">
                      <ExternalLink className="size-4" />
                      {tContact('resume')}
                    </TextLink>
                  </Card>
                </section>

                <section id="signature" className="flex-1">
                  <Card className="h-32 md:h-full flex justify-center items-center overflow-hidden">
                    <Image src="/sig.svg" alt="Signature" width={100} height={100} className="w-1/2 p-6 select-none" draggable="false" />
                  </Card>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <div id="placeholder" ref={placeholderRef} className="relative"></div>
      <Footer footerRef={footerRef} />
    </div>
  );
}
