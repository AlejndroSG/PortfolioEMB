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
    email?: string;
    telephone?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
  };
  page?: {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article' | 'project' | 'service';
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
    author?: string;
  };
  breadcrumb?: {
    items: Array<{
      position: number;
      name: string;
      item: string;
    }>;
  };
}

export default function JSONLDSchema({ 
  organization = {
    name: "EMB Portfolio",
    url: "http://37.59.118.66:8080",
    logo: "http://37.59.118.66:8080/emb-logo.svg",
    sameAs: ["https://twitter.com/emb", "https://linkedin.com/company/emb", "https://github.com/emb", "https://instagram.com/emb"],
    description: "EMB ofrece soluciones tecnológicas innovadoras para empresas",
    email: "contacto@emb-portfolio.com",
    telephone: "+34600000000",
    address: {
      streetAddress: "Calle Principal 123",
      addressLocality: "Madrid",
      addressRegion: "Madrid",
      postalCode: "28001",
      addressCountry: "ES"
    }
  },
  page,
  breadcrumb
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
    "description": organization.description,
    "email": organization.email,
    "telephone": organization.telephone,
    "address": organization.address ? {
      "@type": "PostalAddress",
      "streetAddress": organization.address.streetAddress,
      "addressLocality": organization.address.addressLocality,
      "addressRegion": organization.address.addressRegion,
      "postalCode": organization.address.postalCode,
      "addressCountry": organization.address.addressCountry
    } : undefined
  };
  
  // Schema para la página actual (si se proporciona)
  const pageSchema = page ? {
    "@context": "https://schema.org",
    "@type": page.type === 'article' ? "Article" : 
             page.type === 'project' ? "CreativeWork" : 
             page.type === 'service' ? "Service" : "WebPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "headline": page.title,
    "description": page.description,
    "keywords": page.keywords?.join(', '),
    "image": page.image ? (page.image.startsWith('http') ? page.image : `${siteUrl}${page.image}`) : undefined,
    "datePublished": page.datePublished,
    "dateModified": page.dateModified || page.datePublished,
    "author": {
      "@type": page.author ? "Person" : "Organization",
      "name": page.author || organization.name
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
  
  // Schema para la ruta de navegación (breadcrumb)
  const breadcrumbSchema = breadcrumb ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumb.items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": item.item.startsWith('http') ? item.item : `${siteUrl}${item.item}`
    }))
  } : null;

  // Schema para el sitio web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": organization.name,
    "description": organization.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  
  // Schemas a incluir
  // Usamos Record<string, any> para permitir diferentes estructuras de esquema
  const schemas: Record<string, any>[] = [organizationSchema, websiteSchema];
  if (pageSchema) schemas.push(pageSchema);
  if (breadcrumbSchema) schemas.push(breadcrumbSchema);

  return (
    <Script 
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
