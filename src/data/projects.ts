export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  githubLink: string;
  demoLink?: string;
  tags: string[];
  year: string;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    titleKey: "sections.projects.portfolio.title",
    descriptionKey: "sections.projects.portfolio.description",
    image: "/projects/portfolio.webp",
    githubLink: "https://github.com/mzzdev/portfolio",
    demoLink: "https://mzzdev.com",
    tags: ["Next.js"],
    year: "2025",
  },
  {
    id: "jex",
    titleKey: "sections.projects.jex.title",
    descriptionKey: "sections.projects.jex.description",
    image: "/projects/jex.webp",
    githubLink: "https://github.com/mzzdev/jex",
    demoLink: "https://jex.mzzdev.com",
    tags: ["Next.js", "PostgreSQL"],
    year: "2025",
  },
  {
    id: "opium",
    titleKey: "sections.projects.opium.title",
    descriptionKey: "sections.projects.opium.description",
    image: "/projects/opium.webp",
    githubLink: "https://github.com/mzzdev/opium-shop-front",
    demoLink: "https://mzzdev.github.io/opium-shop-front/",
    tags: ["HTML + CSS"],
    year: "2023",
  },
  {
    id: "meld",
    titleKey: "sections.projects.meld.title",
    descriptionKey: "sections.projects.meld.description",
    image: "/projects/meld.webp",
    githubLink: "https://github.com/mzzdev/meld",
    demoLink: "https://meld-mu.vercel.app/",
    tags: ["Next.js", "Three.js"],
    year: "2024",
  }
];
