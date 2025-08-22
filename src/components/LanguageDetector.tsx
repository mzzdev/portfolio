'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { detectBrowserLanguage, hasManualLanguageSelection } from '@/lib/languageDetection';

interface LanguageDetectorProps {
  currentLocale: string;
}

export function LanguageDetector({ currentLocale }: LanguageDetectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasManualLanguageSelection()) {
      const detectedLanguage = detectBrowserLanguage();
      
      if (detectedLanguage !== currentLocale) {
        router.replace(pathname, { locale: detectedLanguage });
      }
    }
  }, [currentLocale, router, pathname]);

  return null;
}
