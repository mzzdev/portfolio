import { MenubarItem } from "@/components/ui/menubar";
import { GB, ES } from "country-flag-icons/react/3x2";

const languages = [
  { locale: "en", Flag: GB, nativeName: "English" },
  { locale: "es", Flag: ES, nativeName: "Español" },
] as const;

export function LanguageMenuItems({ onSelect }: { onSelect: (locale: string) => void }) {
  return (
    <>
      {languages.map(({ locale, Flag, nativeName }) => (
        <MenubarItem
          key={locale}
          className="menubar-item"
          onClick={() => onSelect(locale)}
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
