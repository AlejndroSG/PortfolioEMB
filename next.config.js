/** @type {import('next').NextConfig} */

const nextConfig = {
  // Salida como sitio estático (importante para next export)
  output: 'export',
  
  // Añadir trailing slash para mejor compatibilidad con hosting estático
  trailingSlash: true,

  // Configuración de imágenes
  images: {
    unoptimized: true, // Necesario para export estático
    domains: ['images.unsplash.com', 'img.youtube.com'],
    formats: ['image/webp'],
  },

  // Ignorar errores de TypeScript al compilar (no recomendado en producción)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignorar errores de ESLint durante la build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configuración experimental (opcional, si no usas SSR ni middleware)
  experimental: {
    workerThreads: false,
    cpus: 1,
    isrFlushToDisk: false,
    optimizeCss: false,
    scrollRestoration: false,
    swcTraceProfiling: true,
  },

  // Modo estricto de React desactivado (útil si tienes librerías antiguas)
  reactStrictMode: false,

  // Mantener páginas en caché más tiempo durante el desarrollo
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hora
    pagesBufferLength: 10,
  },

};

module.exports = nextConfig;