'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  return (
    <main className='flex flex-col min-h-screen items-center justify-center cursor-default bg-white dark:bg-black dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <motion.p
        initial={{ filter: "blur(5px)", opacity: 0, y: 100 }}
        whileInView={{ filter: "blur(0)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .5, delay: 0, ease: "easeInOut" }}
        className='overflow-hidden absolute inset-0 z-0 flex items-center justify-center text-[45vw] font-mono font-bold tracking-widest bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-white dark:from-neutral-500 dark:to-black select-none'
        style={{ zIndex: 1 }}
      >404</motion.p>
      <motion.div 
        initial={{ filter: "blur(5px)", opacity: 0 }}
        whileInView={{ filter: "blur(0)", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .25, delay: 0, ease: "backInOut" }}
        className='flex flex-col z-10 items-center justify-center absolute bottom-0 mb-8'>
        <p className='relative text-black dark:text-white tracking-tight font-bold text-xl mt-10 rounded-lg backdrop-blur-xs'>{t('message')}</p>
        <Link href={'/'} className='mt-4'>
          <Button
            variant="outline"
            title={t('homeButton')}
            aria-label={t('homeButton')}
            role="button"
          >{t('homeButton')}
          </Button>
        </Link>
      </motion.div>
    </main >
  );
}