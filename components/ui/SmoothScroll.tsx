"use client";

import { useEffect, useState } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  // Estado para controlar si el scroll suave estu00e1 activo
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Asegurarse de que el cu00f3digo solo se ejecute en el cliente
    if (typeof window === "undefined") return;

    // Variables para el scroll suave
    let currentScroll = 0;
    let targetScroll = 0;
    let ease = 0.075; // Factor de suavidad - valores mu00e1s bajos = mu00e1s suave
    let rafId: number | null = null;
    let wrapper: HTMLElement | null = null;
    
    // Inicializar
    const init = () => {
      // Crear un wrapper para el contenido
      wrapper = document.createElement("div");
      wrapper.setAttribute("data-smooth-scroll", "");
      
      // Aplicar estilos al body y html
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.top = "0";
      document.body.style.left = "0";
      
      // Mover todo el contenido del body al wrapper
      if (wrapper) {
        const safeWrapper = wrapper; // Variable local que TypeScript reconoce como no-null
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(child => {
          if (child !== safeWrapper && child.tagName !== "SCRIPT") {
            safeWrapper.appendChild(child);
          }
        });
        
        // Añadir el wrapper al body
        document.body.appendChild(safeWrapper);
        
        // Establecer estilos iniciales del wrapper
        safeWrapper.style.position = "absolute";
        safeWrapper.style.width = "100%";
        safeWrapper.style.top = "0";
        safeWrapper.style.left = "0";
      }
      
      // Actualizar altura
      updateHeight();
      
      // Iniciar la animaciu00f3n
      animate();
      
      // Marcar como listo
      setIsReady(true);
    };
    
    // Actualizar la altura del contenedor
    const updateHeight = () => {
      if (!wrapper) return;
      const contentHeight = wrapper.scrollHeight;
      document.body.style.height = `${contentHeight}px`;
    };
    
    // Manejar el evento de scroll
    const handleScroll = () => {
      targetScroll = window.scrollY;
    };
    
    // Manejar el cambio de tamau00f1o de la ventana
    const handleResize = () => {
      updateHeight();
    };
    
    // Funciu00f3n de animaciu00f3n del scroll
    const animate = () => {
      if (!wrapper) return;
      
      // Calcular el nuevo scroll con efecto de suavizado
      currentScroll = currentScroll + (targetScroll - currentScroll) * ease;
      
      // Aplicar la transformaciu00f3n
      // Estamos seguros de que wrapper no es null aquí debido al return anterior
      wrapper.style.transform = `translateY(${-currentScroll}px)`;
      
      // Redondear para evitar valores infinitesimales
      if (Math.abs(targetScroll - currentScroll) < 0.05) {
        currentScroll = targetScroll;
      }
      
      // Continuar la animaciu00f3n
      rafId = requestAnimationFrame(animate);
    };
    
    // Agregar event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    
    // Inicializar
    init();
    
    // Limpiar al desmontar
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      
      // Restaurar estilos originales
      if (wrapper) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        document.body.style.top = "";
        document.body.style.left = "";
        
        // Devolver los elementos al body
        while (wrapper.firstChild) {
          document.body.appendChild(wrapper.firstChild);
        }
        
        if (wrapper.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
