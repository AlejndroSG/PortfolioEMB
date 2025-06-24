import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { RestoreCursor } from "@/components/ui/RestoreCursor";
import SkipToContent from "@/components/ui/SkipToContent";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Mejora el rendimiento de fuente
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    template: "%s | EMB Portfolio",
    default: "EMB Portfolio - Soluciones Tecnológicas Innovadoras"
  },
  description: "Descubre nuestros proyectos y servicios de desarrollo web, diseño y tecnología",
  keywords: "desarrollo web, diseño, tecnología, soluciones digitales, EMB",
  authors: [{ name: "EMB Team" }],
  creator: "EMB",
  robots: "index, follow",
  openGraph: {
    title: "EMB Portfolio",
    description: "Soluciones Tecnológicas Innovadoras",
    url: "https://emb-portfolio.com",
    siteName: "EMB Portfolio",
    locale: "es_ES",
    type: "website",
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="cursor-auto scroll-smooth">
      <head>
        <link rel="icon" href="/logofinal.jpg" sizes="any" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="emb-theme-preference" // Guarda la preferencia en localStorage
        >
          <SkipToContent />
          <RestoreCursor />
          <main id="skip-content" className="min-h-[100dvh]">
            {children}
          </main>
          <div id="portal-root"></div> {/* Para modales y popups */}
        </ThemeProvider>
      </body>
    </html>
  );
}
