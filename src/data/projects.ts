export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  link: string;
  tags: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    titleKey: "sections.projects.portfolio.title",
    descriptionKey: "sections.projects.portfolio.description",
    image: "/projects/portfolio.svg",
    link: "https://github.com/mzzdev/portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  }
];
