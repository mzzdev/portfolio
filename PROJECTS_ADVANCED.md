# 🎨 Ejemplos de Personalización Avanzada

## 1. Filtrar Proyectos Destacados

Muestra solo proyectos destacados en la página principal:

```typescript
// En page.tsx
const featuredProjects = projects.filter(p => p.featured);

<Section.Body>
  {featuredProjects.map((project, index) => (
    <ProjectCard
      key={project.id}
      project={project}
      isLast={index === featuredProjects.length - 1}
    />
  ))}
</Section.Body>
```

## 2. Ordenar por Fecha (Más Recientes Primero)

Agrega una propiedad `date` a tus proyectos:

```typescript
// En projects.ts
export interface Project {
  // ... otras propiedades
  date: string; // formato: "2024-03"
}

// En page.tsx
const sortedProjects = [...projects].sort((a, b) => 
  b.date.localeCompare(a.date)
);
```

## 3. Layout de Grid (2 columnas)

Usa la variante grid para un diseño más visual:

```tsx
// En page.tsx
import ProjectCardGrid from "@/components/ProjectCard.grid"

<Section.Body className="p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {projects.map((project) => (
      <ProjectCardGrid key={project.id} project={project} />
    ))}
  </div>
</Section.Body>
```

## 4. Agregar Animaciones con Framer Motion

```tsx
import { motion } from "framer-motion";

<Section.Body>
  {projects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <ProjectCard project={project} isLast={index === projects.length - 1} />
    </motion.div>
  ))}
</Section.Body>
```

## 5. Agregar Estado de Proyecto

```typescript
// En projects.ts
export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface Project {
  // ... otras propiedades
  status: ProjectStatus;
}

// En ProjectCard.tsx
const statusColors = {
  completed: "bg-green-100 text-green-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  archived: "bg-gray-100 text-gray-700",
};

<span className={`text-xs px-2 py-1 ${statusColors[project.status]}`}>
  {project.status}
</span>
```

## 6. Agregar Categorías/Filtros

```typescript
// En projects.ts
export type ProjectCategory = "web" | "mobile" | "desktop" | "api";

export interface Project {
  // ... otras propiedades
  category: ProjectCategory;
}

// Crear un componente de filtro
const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

const filteredProjects = activeCategory === "all" 
  ? projects 
  : projects.filter(p => p.category === activeCategory);
```

## 7. Agregar Métricas del Proyecto

```typescript
// En projects.ts
export interface Project {
  // ... otras propiedades
  stats?: {
    stars?: number;
    forks?: number;
    commits?: number;
  };
}

// En ProjectCard.tsx
{project.stats && (
  <div className="flex gap-4 text-xs text-neutral-600">
    {project.stats.stars && <span>⭐ {project.stats.stars}</span>}
    {project.stats.forks && <span>🔱 {project.stats.forks}</span>}
  </div>
)}
```

## 8. Modo Compacto vs Expandido

```tsx
// Crear una prop para controlar el modo
interface ProjectCardProps {
  project: Project;
  isLast?: boolean;
  compact?: boolean;
}

// En el componente
{!compact && (
  <p className="text-sm text-neutral-600 mb-3">
    {t(project.descriptionKey)}
  </p>
)}
```

## 9. Enlaces Múltiples

```typescript
// En projects.ts
export interface Project {
  // ... otras propiedades
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
}

// En ProjectCard.tsx
<div className="flex gap-2">
  {project.links.github && (
    <Link href={project.links.github} className="text-xs underline">
      GitHub
    </Link>
  )}
  {project.links.demo && (
    <Link href={project.links.demo} className="text-xs underline">
      Demo
    </Link>
  )}
</div>
```

## 10. Cargar Proyectos desde API

```typescript
// Crear un hook personalizado
import { useState, useEffect } from 'react';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}

// En page.tsx
const { projects, loading } = useProjects();

{loading ? (
  <div>Cargando proyectos...</div>
) : (
  projects.map(project => <ProjectCard key={project.id} project={project} />)
)}
```

## 11. Skeleton Loading

```tsx
function ProjectCardSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-24 h-20 bg-neutral-200" />
        <div className="flex-1">
          <div className="h-4 bg-neutral-200 mb-2 w-3/4" />
          <div className="h-3 bg-neutral-200 mb-4 w-full" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-neutral-200" />
            <div className="h-6 w-20 bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 12. Búsqueda de Proyectos

```tsx
const [searchQuery, setSearchQuery] = useState("");

const filteredProjects = projects.filter(project => {
  const title = t(project.titleKey).toLowerCase();
  const description = t(project.descriptionKey).toLowerCase();
  const tags = project.tags.join(" ").toLowerCase();
  const query = searchQuery.toLowerCase();
  
  return title.includes(query) || 
         description.includes(query) || 
         tags.includes(query);
});

<input
  type="text"
  placeholder="Buscar proyectos..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full px-4 py-2 border border-neutral-200"
/>
```

---

## 💡 Tips de Rendimiento

1. **Lazy Loading de Imágenes**: Next.js Image ya lo hace automáticamente
2. **Paginación**: Si tienes más de 10 proyectos, considera agregar paginación
3. **Infinite Scroll**: Para muchos proyectos, usa bibliotecas como `react-infinite-scroll-component`
4. **Caching**: Usa SWR o React Query para cachear datos de API

## 🎯 Mejores Prácticas

- Mantén las descripciones cortas y al punto
- Usa imágenes optimizadas (WebP cuando sea posible)
- Asegúrate de que los enlaces funcionen
- Prueba en diferentes dispositivos
- Mantén un máximo de 5 tags por proyecto
- Usa alt text descriptivo en las imágenes
