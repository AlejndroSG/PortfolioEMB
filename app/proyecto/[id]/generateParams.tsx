import { projects } from "@/data";

// Función para generar parámetros estáticos para rutas dinámicas
export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

// Un layout mínimo para mantener la estructura
export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
