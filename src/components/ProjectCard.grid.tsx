import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";

interface ProjectCardGridProps {
  project: Project;
}

export default function ProjectCardGrid({ project }: ProjectCardGridProps) {
  const t = useTranslations('Home');

  return (
    <div className="group flex flex-col border border-neutral-200 hover:bg-neutral-200 transition-all duration-300 hover:duration-0 overflow-hidden h-full">
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-50">
        <Image
          src={project.image}
          alt={t(project.titleKey)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold uppercase tracking-tight">
            {t(project.titleKey)}
          </h3>
          <span className="text-xs text-neutral-500 normal-case font-normal tracking-normal">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-neutral-600 mb-4 flex-1 leading-relaxed normal-case font-normal tracking-normal">
          {t(project.descriptionKey)}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium normal-case tracking-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <Link
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-black text-white hover:bg-neutral-800 transition-colors duration-200 font-medium uppercase tracking-wide"
          >
            <Github className="w-3.5 h-3.5" />
            {t('sections.projects.buttons.repo')}
          </Link>
          {project.demoLink && (
            <Link
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 font-medium uppercase tracking-wide"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('sections.projects.buttons.demo')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
