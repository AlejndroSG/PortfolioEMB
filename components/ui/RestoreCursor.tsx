"use client";

import { useEffect } from "react";

export function RestoreCursor() {
  useEffect(() => {
    // Función para asegurar que el cursor sea visible
    const restoreCursor = () => {
      // Eliminar cualquier clase que pueda ocultar el cursor
      document.documentElement.classList.remove("cursor-none");
      document.body.classList.remove("cursor-none");
      
      // Establecer explícitamente el cursor predeterminado del sistema
      document.documentElement.style.cursor = "default";
      document.body.style.cursor = "default";
      
      // Eliminar cualquier otro cursor personalizado
      const allElements = document.querySelectorAll("*");
      allElements.forEach(element => {
        if (getComputedStyle(element).cursor === "none") {
          (element as HTMLElement).style.cursor = "default";
        }
      });
    };
    
    // Restaurar el cursor inmediatamente
    restoreCursor();
    
    // Asegurar que se restaure después de cualquier cambio dinámico
    const observer = new MutationObserver(restoreCursor);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return null; // Este componente no renderiza nada
}
