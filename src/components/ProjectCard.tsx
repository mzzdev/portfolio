import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
}

export default function ProjectCard({ project, isLast = false }: ProjectCardProps) {
  const t = useTranslations('Home');

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block hover:bg-neutral-200 transition-all duration-300 hover:duration-0 ${isLast ? '' : 'border-b border-neutral-200'}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 p-6 h-full">
        <div className="relative w-full sm:w-24 h-24 sm:h-20 flex-shrink-0 border border-neutral-200 overflow-hidden bg-neutral-50 rounded-sm">
          <Image
            src={project.image}
            alt={t(project.titleKey)}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 96px"
          />
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base-upper font-semibold mb-2 group-hover:underline">
                {t(project.titleKey)}
              </h3>
              
              <p className="text-sm text-neutral-600 mb-3 leading-relaxed normal-case font-normal tracking-normal">
                {t(project.descriptionKey)}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium normal-case tracking-normal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:duration-0">
              <ExternalLink className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
