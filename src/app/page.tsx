'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen bg-white">
      <Menubar>
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
      </Menubar>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <h1>Welcome to my Portfolio</h1>
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
