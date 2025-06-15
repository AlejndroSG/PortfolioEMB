"use client";

import { useState, useEffect, ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  placeholder?: ReactNode;
  className?: string;
}

/**
 * Componente de carga lazy que renderiza su contenido solo cuando entra en la vista
 * Útil para componentes pesados que no necesitan ser renderizados hasta que son visibles
 */
export default function LazyLoad({
  children,
  threshold = 0.1,
  placeholder,
  className = "",
}: LazyLoadProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  useEffect(() => {
    if (isInView && !isLoaded) {
      // Pequeño retraso para permitir animaciones de entrada si es necesario
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, isLoaded]);
  
  return (
    <div ref={ref} className={className}>
      {isLoaded ? children : placeholder || (
        <div 
          className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"
          style={{
            width: '100%',
            height: '100%',
            minHeight: '200px'
          }}
        />
      )}
    </div>
  );
}
