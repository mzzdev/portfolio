import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useTranslations } from 'next-intl'
import { LanguageMenuItems } from './LanguageSelector'
import { Globe } from 'lucide-react'

const EXCLUDED_SECTIONS = ['hero', 'placeholder', 'signature']

export default function NavMenu() {
  const t = useTranslations('NavMenu');
  const [showNavbar, setShowNavbar] = useState(true)
  const [menuKey, setMenuKey] = useState(0)
  const [sections, setSections] = useState<string[]>([])
  const lastScrollY = useRef(0)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const allSections = Array.from(document.querySelectorAll('section[id]'))
      .map(section => section.id)
      .filter(id => id && !EXCLUDED_SECTIONS.includes(id))
    
    setSections(allSections)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const shouldShow = currentY < lastScrollY.current

      if (shouldShow !== showNavbar) {
        setShowNavbar(shouldShow)
        if (!shouldShow) {
          setMenuKey(prev => prev + 1)
        }
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showNavbar])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    const navbarHeight = navbarRef.current?.offsetHeight || 0
    
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const vhOffset = window.innerHeight * 0.01
      const offsetPosition = elementPosition - navbarHeight - vhOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const getSectionLabel = (sectionId: string): string => {
    return sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
  }

  return (
    <motion.div
      ref={navbarRef}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 z-50 font-lexend tracking-wide select-none w-full"
    >
      <Menubar key={menuKey} className="items-center border-bottom-standard px-4 justify-between">
        <div className="flex items-center">
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-neutral-200 text-base group">
              <span className="inline-block transition-transform duration-200 group-data-[state=open]:rotate-90">
                &#10033;
              </span>
            </MenubarTrigger>
            <MenubarContent className="ml-1 mt-3 p-0 border-standard rounded-none shadow-none">
              {sections.map((sectionId) => (
                <MenubarItem 
                  key={sectionId} 
                  className="MenubarItem px-4 py-3 rounded-none cursor-pointer hover-subtle"
                  onClick={() => scrollToSection(sectionId)}
                >
                  <span className="text-base-upper font-bold">
                    {getSectionLabel(sectionId)}
                  </span>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </div>

        <p onClick={() => window.scrollTo({ top: 0 })} className="cursor-pointer text-base ml-4">
          {t('title')}
        </p>

        <MenubarMenu>
          <MenubarTrigger className="hover:bg-neutral-200 text-base">
            <Globe className="w-4" />
          </MenubarTrigger>
          <MenubarContent className="mr-4 mt-3 p-0 border-standard rounded-none shadow-none">
            <LanguageMenuItems />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </motion.div>
  );
}
