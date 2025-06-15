import { MetadataRoute } from 'next';

// URL base del sitio
const baseUrl = process.env.SITE_URL || 'https://emb-portfolio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Rutas principales del sitio
  const mainRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/proyecto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Obtener dinámicamente las URLs de los proyectos
  // Aquí podrías importar tus datos de proyectos y generar entradas para cada uno
  // Ejemplo estático por ahora:
  const projectRoutes = [
    {
      url: `${baseUrl}/proyecto/1`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/proyecto/2`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...mainRoutes, ...projectRoutes] as MetadataRoute.Sitemap;
}
