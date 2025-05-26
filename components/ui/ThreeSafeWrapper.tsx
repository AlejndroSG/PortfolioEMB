"use client";

import React, { useEffect, useState } from "react";

interface ThreeSafeWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Componente de seguridad para envolver componentes de Three.js
 * y prevenir errores de renderizado
 */
const ThreeSafeWrapper: React.FC<ThreeSafeWrapperProps> = ({ 
  children, 
  fallback = <div className="w-full h-full bg-black/20 backdrop-blur-sm rounded-lg"></div> 
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Sobrescribir temporalmente console.error para capturar errores de Three.js
    const originalConsoleError = console.error;
    
    console.error = (...args: any[]) => {
      // Capturar errores específicos de Three.js
      const errorMessage = args.join(' ');
      if (
        errorMessage.includes('THREE.BufferGeometry') ||
        errorMessage.includes('NaN') ||
        errorMessage.includes('Computed radius is NaN')
      ) {
        setHasError(true);
      }
      
      // Llamar al console.error original
      originalConsoleError(...args);
    };

    // Restaurar console.error al desmontar
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Si hay un error, mostrar el fallback
  if (hasError) {
    return fallback;
  }

  // Si no hay error, renderizar los children normalmente
  return <>{children}</>;
};

export default ThreeSafeWrapper;
