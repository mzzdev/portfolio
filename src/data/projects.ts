import type { StaticImageData } from "next/image";
import portfolioImg from "../../public/projects/portfolio.webp";
import opiumImg from "../../public/projects/opium.webp";
import meldImg from "../../public/projects/meld.webp";
import jexImg from "../../public/projects/jex.webp";

export interface Project {
  id: string;
  image: StaticImageData;
  githubLink: string;
  demoLink?: string;
  tags: string[];
  year: string;
  disabled?: boolean;
}

export const projects: Project[] = [
  {
    id: "portfolio",
    image: portfolioImg,
    githubLink: "https://github.com/mzzdev/portfolio",
    demoLink: "https://mzzdev.com",
    tags: ["Next.js"],
    year: "2025",
  },
  {
    id: "opium",
    image: opiumImg,
    githubLink: "https://github.com/mzzdev/opium-shop-front",
    demoLink: "https://mzzdev.github.io/opium-shop-front/",
    tags: ["CSS"],
    year: "2023",
  },
  {
    id: "meld",
    image: meldImg,
    githubLink: "https://github.com/mzzdev/meld",
    demoLink: "https://meld-mu.vercel.app/",
    tags: ["Three.js", "Next.js"],
    year: "2024",
  },
  {
    id: "jex",
    image: jexImg,
    githubLink: "https://github.com/mzzdev/jex",
    demoLink: "https://jex.mzzdev.com",
    tags: ["PostgreSQL", "Next.js"],
    year: "[WIP]",
    disabled: true,
  },
];
