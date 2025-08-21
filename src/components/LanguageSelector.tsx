import { MenubarItem } from "@/components/ui/menubar";
import { US, ES } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export const languages = [
  { locale: "en", Flag: US },
  { locale: "es", Flag: ES },
] as const;

export function useLanguageLogic() {
  const t = useTranslations("NavMenu.languages");
  const router = useRouter();

  const handleLocaleChange = (locale: "en" | "es"): void => {
    router.push(`/${locale}`);
  };

  return { t, handleLocaleChange };
}

export function LanguageMenuItems() {
  const { t, handleLocaleChange } = useLanguageLogic();

  return (
    <>
      {languages.map(({ locale, Flag }) => (
        <MenubarItem
          key={locale}
          className="px-4 py-3 rounded-none cursor-pointer focus:bg-neutral-200 duration-300 hover:duration-0"
          onClick={() => handleLocaleChange(locale)}
        >
          <div className="flex items-center space-x-2">
            <Flag className="w-4 h-auto" />
            <span className="leading-tight tracking-tight uppercase font-bold text-base">
              {t(locale)}
            </span>
          </div>
        </MenubarItem>
      ))}
    </>
  );
}
