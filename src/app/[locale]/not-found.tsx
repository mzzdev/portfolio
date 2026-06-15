"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <main className="flex flex-col min-h-screen items-center justify-center cursor-default bg-white">
      <div className="absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_10%,black)]" />

      <motion.p
        initial={{ filter: "blur(5px)", opacity: 0, y: 100 }}
        whileInView={{ filter: "blur(0)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden absolute inset-0 z-1 flex items-center justify-center text-[45vw] font-mono font-bold tracking-widest bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-white select-none"
      >
        404
      </motion.p>

      <motion.div
        initial={{ filter: "blur(5px)", opacity: 0 }}
        whileInView={{ filter: "blur(0)", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, ease: "backInOut" }}
        className="flex flex-col z-10 items-center justify-center absolute bottom-0 mb-8"
      >
        <p className="relative text-black uppercase tracking-tight font-bold text-xl mt-10 rounded-lg backdrop-blur-xs">{t("message")}</p>

        <Link href="/">
          <Button variant="outline" className="mt-4 w-full px-4 py-2 hover-subtle cursor-pointer rounded-none border-input uppercase text-black text-sm">
            {t("homeButton")}
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}