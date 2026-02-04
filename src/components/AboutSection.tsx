import Link from "next/link";
import { useTranslations } from "next-intl";
import { Briefcase, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { journey, techStack } from "@/data/about";

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      <div className="space-y-6">
        <p className="text-base leading-relaxed">
          {t('description')}
        </p>

        <div className="pt-6 border-t border-neutral-200">
          <h3 className="text-base-upper font-semibold mb-4">
            {t('journeyTitle')}
          </h3>
          <div className="space-y-4">
            {journey.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                {item.type === 'education'
                  ? <GraduationCap className="w-5 text-neutral-600" />
                  : <Briefcase className="w-5 text-neutral-600" />
                }
                <div>
                  <p className="text-base font-semibold">
                    {t(`journey.${item.id}.role`)}
                    {item.company && (
                      <>
                        {' '}{t('workAt')}{' '}
                        {item.url
                          ? <Link href={item.url} target="_blank" className="hover-subtle inline-flex items-center gap-1">
                            {item.company} <ExternalLink className="w-3" />
                          </Link>
                          : item.company
                        }
                      </>
                    )}
                  </p>
                  <p className="text-sm text-neutral-500">{t(`journey.${item.id}.period`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 flex items-center gap-4 text-base">
          <MapPin className="w-5 text-neutral-600" />
          {t('location')}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-base-upper font-semibold">
          {t('techStackTitle')}
        </h3>

        {Object.entries(techStack).map(([category, technologies]) => (
          <div key={category}>
            <p className="text-xs uppercase font-semibold text-neutral-500 mb-2">{category}</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
