"use client";

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEOMetaTags({
  title = "EMB Portfolio - Proyectos y servicios",
  description = "EMB ofrece soluciones tecnológicas innovadoras para empresas. Descubre nuestros proyectos y servicios.",
  keywords = "desarrollo web, diseño, tecnología, soluciones digitales, EMB",
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emb-portfolio.com";
  const currentUrl = canonicalUrl || `${siteUrl}${pathname}`;
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
    </Head>
  );
}
