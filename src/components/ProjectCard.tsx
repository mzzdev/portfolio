import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-6 border-b border-neutral-200 last:border-none">
      <div className="md:hidden relative w-full aspect-video border border-neutral-200">
        <Image
          src={project.image}
          alt={t(`${project.id}.title`)}
          fill
          className="object-cover"
          sizes="100vw"
          draggable={false}
        />
      </div>

      <div className="hidden md:block">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <div className="relative w-40 aspect-video flex-shrink-0 border border-neutral-200 transition-colors cursor-pointer hover-subtle hover:border-black">
              <Image
                src={project.image}
                alt={t(`${project.id}.title`)}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-md z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[75vw] -translate-x-1/2 -translate-y-1/2 outline-none">
              <Dialog.Title className="sr-only">{t(`${project.id}.title`)}</Dialog.Title>
              <Image
                src={project.image}
                alt={t(`${project.id}.title`)}
                width={1920}
                height={1080}
                className="object-contain w-full h-full border border-black"
                draggable={false}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-base-upper font-semibold">
            {t(`${project.id}.title`)}
          </h3>
          <span className="text-xs text-neutral-500">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-neutral-500 mb-3 leading-relaxed">
          {t(`${project.id}.description`)}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2 sm:ml-auto">
            <Button
              variant="outline"
              className="px-4 py-2 hover-subtle-black cursor-pointer rounded-none uppercase bg-black text-white text-base inline-flex items-center gap-1.5"
              onClick={() => window.open(project.githubLink, '_blank', 'noopener,noreferrer')}
            >
              <Github className="w-3.5 h-3.5" />
              {t('buttons.repo')}
            </Button>
            {project.demoLink && (
              <Button
                variant="outline"
                className="px-4 py-2 hover-subtle cursor-pointer rounded-none uppercase bg-white text-black text-base inline-flex items-center gap-1.5"
                onClick={() => window.open(project.demoLink, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('buttons.demo')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
