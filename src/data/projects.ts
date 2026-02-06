export interface Project {
  id: string;
  image: string;
  githubLink: string;
  demoLink?: string;
  tags: string[];
  year: string;
  disabled?: boolean;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    image: "/projects/portfolio.webp",
    githubLink: "https://github.com/mzzdev/portfolio",
    demoLink: "https://mzzdev.com",
    tags: ["Next.js"],
    year: "2025",
    disabled: true,
  },
  {
    id: "opium",
    image: "/projects/opium.webp",
    githubLink: "https://github.com/mzzdev/opium-shop-front",
    demoLink: "https://mzzdev.github.io/opium-shop-front/",
    tags: ["CSS"],
    year: "2023",
  },
  {
    id: "meld",
    image: "/projects/meld.webp",
    githubLink: "https://github.com/mzzdev/meld",
    demoLink: "https://meld-mu.vercel.app/",
    tags: ["Three.js", "Next.js"],
    year: "2024",
  },
  {
    id: "jex",
    image: "/projects/jex.webp",
    githubLink: "https://github.com/mzzdev/jex",
    demoLink: "https://jex.mzzdev.com",
    tags: ["PostgreSQL", "Next.js"],
    year: "[WIP]",
    disabled: true,
  },
];
