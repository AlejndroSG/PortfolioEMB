import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { LanguageProvider } from "../contexts/LanguageContext";
import SkipToContent from "../components/ui/SkipToContent";
import { RestoreCursor } from "../components/ui/RestoreCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EMB Portfolio",
  description: "Portfolio profesional de EMB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="cursor-auto scroll-smooth">
      <head>
        <link rel="icon" href="/logofinal.jpg" sizes="any" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
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
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
