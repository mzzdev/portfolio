import { routing } from '@/i18n/routing';

const STORAGE_KEY = 'user-selected-language';

export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return routing.defaultLocale;

  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const lang of browserLanguages) {
    const normalizedLang = lang.toLowerCase();
    
    const exactMatch = routing.locales.find(locale => 
      locale.toLowerCase() === normalizedLang
    );
    if (exactMatch) return exactMatch;
    
    const langRegionMatch = routing.locales.find(locale => {
      const [localeLang, localeRegion] = locale.toLowerCase().split('-');
      const [browserLang, browserRegion] = normalizedLang.split('-');
      return localeLang === browserLang && localeRegion === browserRegion;
    });
    if (langRegionMatch) return langRegionMatch;
    
    const primaryLang = normalizedLang.split('-')[0];
    const primaryMatch = routing.locales.find(locale => 
      locale.toLowerCase().startsWith(primaryLang + '-') || locale.toLowerCase() === primaryLang
    );
    if (primaryMatch) return primaryMatch;
  }
  
  return routing.defaultLocale;
}

export function hasManualLanguageSelection(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function markManualLanguageSelection(locale: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}
