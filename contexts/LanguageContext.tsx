"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Importar todas las traducciones
import es from '../messages/es.json';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { es, en, fr };
const availableLanguages: Language[] = ['es', 'en', 'fr'];

// Función para obtener el idioma del navegador o usar español por defecto
const getInitialLanguage = (): Language => {
  // Solo ejecutar en el cliente
  if (typeof window !== 'undefined') {
    // Comprobar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Detectar el idioma del navegador
    const browserLanguage = navigator.language.split('-')[0] as Language;
    if (browserLanguage && availableLanguages.includes(browserLanguage)) {
      return browserLanguage;
    }
  }
  
  // Si no hay coincidencia o estamos en el servidor, usar español por defecto
  return 'es';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  
  // Inicializar el idioma al cargar el componente
  useEffect(() => {
    const initialLanguage = getInitialLanguage();
    setLanguage(initialLanguage);
  }, []);
  
  // Guardar el idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      result = result?.[k];
    }
    
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
