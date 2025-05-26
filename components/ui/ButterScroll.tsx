"use client";

import { useEffect } from "react";

interface ButterScrollProps {
  children: React.ReactNode;
}

const ButterScroll = ({ children }: ButterScrollProps) => {
  useEffect(() => {
    // Asegurarse de que el cu00f3digo solo se ejecute en el cliente
    if (typeof window === "undefined") return;

    let targetY = window.scrollY || window.pageYOffset;
    let currentY = targetY;
    let scrolling = false;
    const smoothness = 0.25; // Aumentado para mayor velocidad de respuesta

    // Funciu00f3n para actualizar la posiciu00f3n de scroll con efecto suave
    const smoothScroll = () => {
      currentY = currentY + (targetY - currentY) * smoothness;
      window.scrollTo(0, currentY);

      // Detener la animaciu00f3n cuando estemos muy cerca del objetivo
      if (Math.abs(targetY - currentY) < 0.05) {
        currentY = targetY;
        scrolling = false;
        return;
      }

      // Continuar la animaciu00f3n
      requestAnimationFrame(smoothScroll);
    };

    // Interceptar eventos de scroll
    const handleScroll = () => {
      targetY = window.scrollY || window.pageYOffset;
      
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Interceptar eventos de rueda para un control mu00e1s preciso
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Ajustar la velocidad de desplazamiento (aumentada para mayor rapidez)
      const scrollSpeed = 2.5;
      targetY += e.deltaY * scrollSpeed;
      
      // Limitar el scroll al tamau00f1o del documento
      targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
      
      if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    // Aplicar estilos para scroll suave
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.overscrollBehavior = "none";

    // Agregar event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("wheel", handleWheel, { passive: false });

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("wheel", handleWheel);
      document.documentElement.style.scrollBehavior = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
};

export default ButterScroll;
