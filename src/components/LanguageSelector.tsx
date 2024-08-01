import { useRouter, usePathname } from "@/navigation"; // <-- next-intl navigation
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";

export function LanguageSelector({ locales }: { locales: "en" | "es" | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  // const t = useTranslations("Home");

  const handleLocaleChange = (locale: "en" | "es" | undefined): void => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <div className="flex flex-row h-full w-auto items-center">
      <Button variant="link" onClick={() => handleLocaleChange('en')}>en</Button>
      <Separator orientation="vertical" className="bg-black" />
      <Button variant="link" onClick={() => handleLocaleChange('es')}>es</Button>
    </div>
  );
};
