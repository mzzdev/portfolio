import { Button } from "@/components/ui/button";
import { US, ES } from "country-flag-icons/react/3x2";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function LanguageSelector() {
  const t = useTranslations("Footer.languages");
  const router = useRouter();

  const handleLocaleChange = (locale: "en" | "es"): void => {
    router.push(`/${locale}`);
  };

  const languages = [
    { locale: "en", Flag: US },
    { locale: "es", Flag: ES },
  ] as const;

  return (
    <div className="flex flex-row h-full w-auto items-center space-x-0">
      {languages.map(({ locale, Flag }) => (
        <Button
          key={locale}
          title={t(locale)}
          variant="link"
          onClick={() => handleLocaleChange(locale)}
          className="hover:cursor-pointer mx-2 p-0"
        >
          <Flag className="w-5 h-auto" />
        </Button>
      ))}
    </div>
  );
}