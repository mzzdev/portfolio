import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en-US', 'en-GB', 'es', 'de', 'fr', 'zh'],
  defaultLocale: 'en-US',
  localePrefix: 'as-needed'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);