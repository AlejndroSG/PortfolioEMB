"use client";

import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface JSONLDSchemaProps {
  organization?: {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
    description?: string;
  };
  page?: {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'project';
    datePublished?: string;
    dateModified?: string;
  }
}

export default function JSONLDSchema({ 
  organization = {
    name: "EMB Portfolio",
    url: "https://emb-portfolio.com",
    logo: "https://emb-portfolio.com/emb-logo.svg",
    sameAs: ["https://twitter.com/emb", "https://linkedin.com/company/emb"],
    description: "EMB ofrece soluciones tecnológicas innovadoras para empresas"
  },
  page
}: JSONLDSchemaProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emb-portfolio.com";
  const currentUrl = `${siteUrl}${pathname}`;
  
  // Schema para la organización
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organization.name,
    "url": organization.url,
    "logo": organization.logo,
    "sameAs": organization.sameAs,
    "description": organization.description
  };
  
  // Schema para la página actual (si se proporciona)
  const pageSchema = page ? {
    "@context": "https://schema.org",
    "@type": page.type === 'article' ? "Article" : 
             page.type === 'project' ? "CreativeWork" : "WebPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "headline": page.title,
    "description": page.description,
    "image": page.image ? `${siteUrl}${page.image}` : undefined,
    "datePublished": page.datePublished,
    "dateModified": page.dateModified || page.datePublished,
    "author": {
      "@type": "Organization",
      "name": organization.name
    },
    "publisher": {
      "@type": "Organization",
      "name": organization.name,
      "logo": {
        "@type": "ImageObject",
        "url": organization.logo
      }
    }
  } : null;
  
  // Schemas a incluir
  const schemas = [organizationSchema];
  if (pageSchema) schemas.push(pageSchema);

  return (
    <Script 
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
