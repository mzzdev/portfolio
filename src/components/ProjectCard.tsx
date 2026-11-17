import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Project } from "@/data/projects";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('Projects');
  const isDisabled = project.disabled === true;

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-card border-b border-border last:border-none">
      <div className="md:hidden relative w-full aspect-video border border-border">
        <Image
          src={project.image}
          alt={t(`${project.id}.title`)}
          fill
          sizes="(max-width: 768px) calc(90vw - 3rem), 0px"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div className="hidden md:block">
        <Dialog>
          <DialogTrigger className="interactive relative block w-40 aspect-video border border-border cursor-pointer hover:border-foreground">
            <Image
              src={project.image}
              alt={t(`${project.id}.title`)}
              fill
              sizes="160px"
              className="object-cover"
              draggable={false}
            />
          </DialogTrigger>

          <DialogContent variant="media">
            <DialogTitle className="sr-only">{t(`${project.id}.title`)}</DialogTitle>
            <DialogDescription className="sr-only">{t(`${project.id}.description`)}</DialogDescription>
            <Image
              src={project.image}
              alt={t(`${project.id}.title`)}
              sizes="75vw"
              className="border border-foreground"
              draggable={false}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="type-title">
            {t(`${project.id}.title`)}
          </h3>
          <span className="text-xs text-muted-foreground">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {t(`${project.id}.description`)}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          {!isDisabled && (
            <div className="flex gap-2 sm:ml-auto">
              <Button asChild>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github />
                  {t('buttons.repo')}
                </a>
              </Button>
              {project.demoLink && (
                <Button asChild variant="outline">
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    {t('buttons.demo')}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
