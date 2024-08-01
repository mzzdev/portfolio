'use client';

import { LanguageSelector } from "@/components/LanguageSelector";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <main className="w-full h-screen bg-white">
      <Menubar className="justify-between">
        <MenubarMenu>
          <MenubarTrigger className="font-lexend">Pablo Belló</MenubarTrigger>
          <MenubarContent className="ml-2 mt-1">
            <MenubarItem asChild className="text-xs">
              <Link href="#about-me" className="text-xs">ABOUT ME</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href="#projects" className="text-xs">PROJECTS</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link href="#contact" className="text-xs">CONTACT</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <LanguageSelector locales="en"/>
      </Menubar>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1>{t('title')}</h1>
      </div>
      <div>
        <Separator className="bg-neutral-200" />
        <div id="about-me" className="section h-screen w-full">
          <h2>ABOUT ME</h2>
          <p>[placeholder]</p>
        </div>
        <Separator className="bg-neutral-200" />
        <div id="projects" className="section h-screen w-full">
          <h2>PROJECTS</h2>
          <p>[placeholder]</p>
        </div>
        <Separator className="bg-neutral-200" />
        <div id="contact" className="section h-screen w-full">
          <h2>CONTACT</h2>
          <p>[placeholder]</p>
        </div>
      </div>
    </main>
  );
}
