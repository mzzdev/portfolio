import { motion } from 'framer-motion'
import Link from 'next/link'
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

export default function NavMenu() {
  const t = useTranslations('NavMenu');
  const [showNavbar, setShowNavbar] = useState(true)
  const [menuKey, setMenuKey] = useState(0)
  const lastScrollY = useRef(0)

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

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 z-50 font-lexend tracking-wide select-none w-full"
    >
      <Menubar key={menuKey} className="items-center border-b-[1px] border-black px-4 justify-between">
        <div className="flex items-center">
          <MenubarMenu>
            <MenubarTrigger className="hover:bg-neutral-200 text-base group">
              <span className="inline-block transition-transform duration-200 group-data-[state=open]:rotate-90">
                &#10033;
              </span>
            </MenubarTrigger>
            <MenubarContent className="ml-1 mt-3 p-0 border-[1px] rounded-none shadow-none">
              {[t('index.projects'), t('index.about')].map((item) => (
                <MenubarItem asChild key={item} className="MenubarItem px-4 py-3 rounded-none cursor-pointer">
                  <Link
                    href={`#${item.replace(' ', '-')}`}
                    className="focus:bg-neutral-200 hover:underline duration-300 hover:duration-0"
                  >
                    <span className="leading-tight tracking-tight uppercase font-bold text-base">
                      {item}
                    </span>
                  </Link>
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
          <MenubarContent className="mr-4 mt-3 p-0 border-[1px] rounded-none shadow-none">
            <LanguageMenuItems />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </motion.div>
  );
}
