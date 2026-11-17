import { useTranslations } from "next-intl";
import { Briefcase, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TextLink } from "@/components/ui/text-link";
import { journey, techStack } from "@/data/about";

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-justify">
          {t('description')}
        </p>

        <div className="pt-6 border-t border-border">
          <h3 className="type-title mb-4">
            {t('journeyTitle')}
          </h3>
          <div className="space-y-4">
            {journey.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                {item.type === 'education'
                  ? <GraduationCap className="size-5 text-muted-foreground" />
                  : <Briefcase className="size-5 text-muted-foreground" />
                }
                <div>
                  <p className="text-base">
                    {t(`journey.${item.id}.role`)}
                    {item.company && (
                      <>
                        {' '}{t('workAt')}{' '}
                        {item.url
                          ? <TextLink href={item.url} external>
                            {item.company} <ExternalLink className="size-3" />
                          </TextLink>
                          : item.company
                        }
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{t(`journey.${item.id}.period`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-border flex items-center gap-4 text-base">
          <MapPin className="size-5 text-muted-foreground" />
          {t('location')}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="type-title">
          {t('techStackTitle')}
        </h3>

        {Object.entries(techStack).map(([category, technologies]) => (
          <div key={category}>
            <p className="type-overline mb-2">{category}</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
