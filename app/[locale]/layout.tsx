

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';


import "../globals.css";
import { ThemeProvider } from "../provider";
import { RestoreCursor } from "@/components/ui/RestoreCursor";
import SkipToContent from "@/components/ui/SkipToContent";


const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});


const locales = ['es', 'en', 'fr'];


export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export async function generateMetadata({
  params: {locale}
}: {
  params: {locale: string}
}): Promise<Metadata> {
  const messages = await getMessages({locale});
  
  return {
    title: {
      template: "%s | EMB Portfolio",
      default: (messages as any).metadata?.title || "EMB Portfolio - Soluciones Tecnológicas Innovadoras"
    },
    description: (messages as any).metadata?.description || "Descubre nuestros proyectos y servicios de desarrollo web, diseño y tecnología",
    keywords: (messages as any).metadata?.keywords || "desarrollo web, diseño, tecnología, soluciones digitales, EMB",
    authors: [{ name: "EMB Team" }],
    creator: "EMB",
    robots: "index, follow",
    openGraph: {
      title: "EMB Portfolio",
      description: (messages as any).metadata?.description || "Soluciones Tecnológicas Innovadoras",
      url: "https://emb-portfolio.com",
      siteName: "EMB Portfolio",
      locale: locale,
      type: "website",
    }
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Obtener mensajes específicos para el locale actual
  const messages = await getMessages({locale});

  return (
    <html lang={locale} suppressHydrationWarning className="cursor-auto scroll-smooth">
      <head>
        <link rel="icon" href="/emb-logo.svg" sizes="any" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            storageKey="emb-theme-preference"
          >
            <SkipToContent />
            <RestoreCursor />
            <main id="skip-content" className="min-h-[100dvh]">
              {children}
            </main>
            <div id="portal-root"></div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );

}
