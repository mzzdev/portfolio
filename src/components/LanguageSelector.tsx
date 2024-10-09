import { useRouter, usePathname } from "@/navigation"; // <-- next-intl navigation
import { Button } from "@/components/ui/button"
import { US, ES } from 'country-flag-icons/react/3x2';

export function LanguageSelector({ locales }: { locales: "en" | "es" | undefined }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (locale: "en" | "es" | undefined): void => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <div className="flex flex-row h-full w-auto items-center">
      <Button variant="link" onClick={() => handleLocaleChange('en')}><US className="w-5 h-auto"/></Button>
      <Button variant="link" onClick={() => handleLocaleChange('es')}><ES className="w-5 h-auto"/></Button>
    </div>
  );
};
