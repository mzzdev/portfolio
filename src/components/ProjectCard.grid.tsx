import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";

interface ProjectCardGridProps {
  project: Project;
}

export default function ProjectCardGrid({ project }: ProjectCardGridProps) {
  const t = useTranslations('Home');

  return (
    <Link
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-neutral-200 hover:bg-neutral-200 transition-all duration-300 hover:duration-0 overflow-hidden h-full"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-50">
        <Image
          src={project.image}
          alt={t(project.titleKey)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {project.featured && (
          <div className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1 font-semibold uppercase tracking-wide">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold uppercase tracking-tight group-hover:underline">
            {t(project.titleKey)}
          </h3>
          <ExternalLink className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:duration-0" />
        </div>

        <p className="text-sm text-neutral-600 mb-4 flex-1 leading-relaxed normal-case font-normal tracking-normal">
          {t(project.descriptionKey)}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
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
    </Link>
  );
}
