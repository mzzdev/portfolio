import { motion } from 'motion/react'
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
import { duration } from '@/lib/motion'

const MENU_ITEMS = ['about', 'projects', 'contact']


export default function NavMenu({ onSwitchLocale }: { onSwitchLocale: (locale: string) => void }) {
  const t = useTranslations('NavMenu');
  const [showNavbar, setShowNavbar] = useState(true)
  const [menuKey, setMenuKey] = useState(0)
  const lastScrollY = useRef(0)
  const navbarRef = useRef<HTMLDivElement>(null)

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

  return (
    <motion.div
      ref={navbarRef}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: 1 }}
      transition={{ duration: duration.base }}
      className="fixed top-0 z-50 select-none w-full"
    >
      <Menubar key={menuKey} className="justify-between px-4">
        <MenubarMenu>
          <MenubarTrigger aria-label={t('menu')} className="group">
            <span className="inline-block transition-transform duration-(--duration-fast) group-data-[state=open]:rotate-90">
              &#10033;
            </span>
          </MenubarTrigger>
          <MenubarContent>
            {MENU_ITEMS.map((sectionId) => (
              <MenubarItem
                key={sectionId}
                onClick={() => scrollToSection(sectionId)}
              >
                {t(`index.${sectionId}`)}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>

        <button type="button" onClick={() => window.scrollTo({ top: 0 })} className="cursor-pointer text-base ml-4">
          {t('title')}
        </button>

        <MenubarMenu>
          <MenubarTrigger aria-label={t('language')}>
            <Globe className="size-4" />
          </MenubarTrigger>
          <MenubarContent align="end">
            <LanguageMenuItems onSelect={onSwitchLocale} />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </motion.div>
  );
}
