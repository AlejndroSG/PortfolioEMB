"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHover, setLinkHover] = useState(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [interactionType, setInteractionType] = useState<"default" | "button" | "text" | "image">("default");
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Paleta de colores que combina con el tema de la web
  const colorPalette = [
    "#8b5cf6", // Púrpura (color principal)
    "#6366f1", // Índigo
    "#3b82f6", // Azul
    "#ec4899", // Rosa
    "#f472b6", // Rosa claro
  ];
  
  // Efecto para calcular la velocidad del cursor
  useEffect(() => {
    let lastTimestamp = performance.now();
    
    const updateVelocity = () => {
      const now = performance.now();
      const deltaTime = now - lastTimestamp;
      
      if (deltaTime > 0) {
        const deltaX = position.x - lastPositionRef.current.x;
        const deltaY = position.y - lastPositionRef.current.y;
        
        velocity.current = {
          x: deltaX / deltaTime * 16,
          y: deltaY / deltaTime * 16
        };
      }
      
      lastPositionRef.current = { ...position };
      lastTimestamp = now;
      
      requestAnimationFrame(updateVelocity);
    };
    
    const animation = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(animation);
  }, [position]);

  useEffect(() => {
    // Ocultar el cursor nativo
    document.documentElement.classList.add("cursor-none");
    
    // Mostrar el cursor personalizado cuando el mouse se mueve
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Determinar el tipo de elemento sobre el que está el cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        if (element.tagName === "BUTTON" || element.tagName === "A" || element.closest("button") || element.closest("a")) {
          setInteractionType("button");
        } else if (element.tagName === "IMG" || element.closest("img")) {
          setInteractionType("image");
        } else if (element.tagName === "P" || element.tagName === "H1" || element.tagName === "H2" || element.tagName === "H3" || element.tagName === "SPAN") {
          setInteractionType("text");
        } else {
          setInteractionType("default");
        }
      }
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = (e: MouseEvent) => {
      setClicked(true);
      createParticles(e.clientX, e.clientY, 10);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Detectar cuando el cursor está sobre enlaces e interactivos
    const handleLinkHoverEvents = () => {
      const interactiveElements = document.querySelectorAll("a, button, input, textarea, select");
      
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setLinkHover(true);
          createParticles(position.x, position.y, 3);
        });
        el.addEventListener("mouseleave", () => setLinkHover(false));
      });
    };

    const cleanup = () => {
      document.documentElement.classList.remove("cursor-none");
      removeEventListeners();
    };

    addEventListeners();
    handleLinkHoverEvents();
    return cleanup;
  }, []);

  // Crear partículas con efecto
  const createParticles = (x: number, y: number, count: number) => {
    const newParticles: ParticleProps[] = [];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 20;
      const size = Math.random() * 6 + 2;
      const duration = Math.random() * 1.5 + 0.5;
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      newParticles.push({
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        size,
        color,
        duration,
        id: particleIdRef.current++
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Eliminar partículas después de su duración
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  // Determinar el tamaño y apariencia del cursor según la interacción
  const getCursorSize = () => {
    if (clicked) return 0.6;
    if (linkHover) return 1.2;
    
    switch (interactionType) {
      case "button": return 1.3;
      case "image": return 1.1;
      case "text": return 0.9;
      default: return 1;
    }
  };

  return (
    <>
      {/* Estilo global para ocultar el cursor nativo */}
      <style jsx global>{`
        .cursor-none * {
          cursor: none !important;
        }
        
        /* Estilos para asegurar que el cursor se aplique a toda la web */
        html, body {
          overflow-x: hidden;
        }
      `}</style>
      
      {/* Capa de partículas */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            initial={{ 
              x: position.x, 
              y: position.y, 
              scale: 0,
              opacity: 1
            }}
            animate={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 1,
              opacity: 0
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: particle.duration,
              ease: "easeOut"
            }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: "50%",
              mixBlendMode: "plus-lighter",
              filter: "blur(1px)"
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Cursor principal con efecto de contraste garantizado */}
      <motion.div
        className={`fixed pointer-events-none z-50 ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 9999,
          mixBlendMode: 'exclusion' // Aplicamos mixBlendMode al contenedor principal
        }}
      >
        {/* Cursor circular */}
        <div
          className="rounded-full"
          style={{
            height: `${30 * getCursorSize()}px`,
            width: `${30 * getCursorSize()}px`,
            backgroundColor: 'white', // Color blanco puro para mejor contraste
            border: '0',
            transform: `translate(-50%, -50%) scale(${getCursorSize()})`,
            transition: clicked ? 'transform 0.1s' : 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: 0.95
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;