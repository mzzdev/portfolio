export const techStack = {
  frontend: ["React", "Next.js", "TypeScript"],
  backend: ["Java", "Spring Boot", "Node"],
  database: ["Oracle", "PostgreSQL"],
} as const;

export interface JourneyItem {
  id: string;
  company?: string;
  url?: string;
  type: "work" | "education";
}

export const journey: JourneyItem[] = [
  {
    id: "teknei",
    company: "Teknei",
    url: "https://teknei.com",
    type: "work",
  },
  {
    id: "education",
    type: "education",
  },
];

