"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaArrowUp } from "react-icons/fa";

const HomeButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Mostrar el botón solo después de desplazarse
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  // Función mejorada para desplazarse suavemente hacia arriba
  const scrollToTop = () => {
    // Primero cancelamos cualquier animación de scroll en curso
    if ('scrollBehavior' in document.documentElement.style) {
      // Usamos scroll con comportamiento suave
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // Fallback para navegadores que no soportan scrollBehavior
      // Usamos una animación manual
      const scrollStep = -window.scrollY / 20;
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
    
    // Como medida adicional, forzamos el scroll al inicio después de la animación
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000);
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      {isHomePage ? (
        // Botón para volver arriba en la página principal
        <div className="group relative" onClick={scrollToTop}>
          {/* Efecto de brillo */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple to-blue-500 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
          
          {/* Botón principal */}
          <button 
            className="relative bg-black border border-white/10 text-white p-4 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:bg-black/80 transition-all duration-300 group-hover:scale-105"
            aria-label="Volver arriba"
          >
            <FaArrowUp className="text-2xl text-purple group-hover:text-white transition-colors duration-300" />
          </button>
        </div>
      ) : (
        // Botón para volver a la página de inicio en otras páginas
        <Link href="/" passHref>
          <div className="group relative">
            {/* Efecto de brillo */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple to-blue-500 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
            
            {/* Botón principal */}
            <button 
              className="relative bg-black border border-white/10 text-white p-4 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm hover:bg-black/80 transition-all duration-300 group-hover:scale-105"
              aria-label="Volver al inicio"
            >
              <FaHome className="text-2xl text-purple group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomeButton;
