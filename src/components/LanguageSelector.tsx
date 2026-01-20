import { MenubarItem } from "@/components/ui/menubar";
import { GB, ES, DE, FR, CN } from "country-flag-icons/react/3x2";
import { useRouter, usePathname } from "@/i18n/routing";
import { markManualLanguageSelection } from "@/lib/languageDetection";

const languages = [
  { locale: "en", Flag: GB, nativeName: "English" },
  { locale: "es", Flag: ES, nativeName: "Español" },
  { locale: "de", Flag: DE, nativeName: "Deutsch" },
  { locale: "fr", Flag: FR, nativeName: "Français" },
  { locale: "zh", Flag: CN, nativeName: "中文" },
] as const;

export function LanguageMenuItems() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (locale: string) => {
    markManualLanguageSelection(locale);
    router.replace(pathname, { locale });
  };

  return (
    <>
      {languages.map(({ locale, Flag, nativeName }) => (
        <MenubarItem
          key={locale}
          className="menubar-item"
          onClick={() => handleLocaleChange(locale)}
        >
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-auto" />
            <span className="text-base-upper font-bold">
              {nativeName}
            </span>
          </div>
        </MenubarItem>
      ))}
    </>
  );
}
