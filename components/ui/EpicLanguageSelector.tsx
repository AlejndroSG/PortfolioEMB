"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
}

export const EpicLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [animatingParticles, setAnimatingParticles] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const languages: Language[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];
  
  // Calcular la posición del mouse relativa al contenedor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Genera partículas para la animación al cambiar de idioma
  const generateParticles = (selectedCode: string) => {
    setAnimatingParticles(Array.from({length: 15}, () => selectedCode));
    
    setTimeout(() => {
      setAnimatingParticles([]);
    }, 2000);
  };

  // Maneja el cambio de idioma con animaciones
  const handleLanguageChange = (lang: Language) => {
    if (lang.code !== language) {
      generateParticles(lang.code);
      
      setTimeout(() => {
        setLanguage(lang.code as any);
        setIsOpen(false);
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  // Calcular posiciones horizontales para las opciones
  const getOrbitalPosition = (index: number, totalItems: number) => {
    // Determinar la dirección horizontal (siempre a los lados, nunca arriba/abajo)
    const spacing = 120; // Espacio entre elementos (aumentado de 55 a 80)
    
    // Si solo hay un elemento alternativo, ponerlo a la izquierda
    if (totalItems === 1) {
      return { x: -spacing, y: 0 };
    }
    
    // Distribuir elementos equitativamente en una línea horizontal
    const offset = (totalItems - 1) * spacing / 2;
    const x = index * spacing - offset;
    
    return { x, y: 0 };
  };
  
  // Calcular perspectiva 3D basada en la posición del mouse
  const get3DTransform = (x: number, y: number) => {
    if (!containerRef.current) return {};
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular deltas desde el centro
    const deltaX = (mousePosition.x - centerX) / centerX; // -1 a 1
    const deltaY = (mousePosition.y - centerY) / centerY; // -1 a 1
    
    // Crear efecto 3D sutilmente basado en la posición del mouse
    return {
      transform: `rotateX(${-deltaY * 15}deg) rotateY(${deltaX * 15}deg)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  return (
    <motion.div 
      ref={containerRef}
      className="relative z-[5100] h-10 w-10 mr-20 mt-5"
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={get3DTransform(mousePosition.x, mousePosition.y)}
    >
      {/* Centro orbital - botón principal */}
      <motion.div 
        className={cn(
          "absolute top-0 left-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-20",
          "bg-gradient-to-br from-purple-600/80 to-purple-900/80 backdrop-blur-md",
          "border border-white/20 shadow-lg glow-effect"
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.7)",
        }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 1.1 : 1,
          transition: { duration: 0.5, type: "spring" }
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-[10px] font-medium text-white mt-[-2px]">{currentLang.code.toUpperCase()}</span>
        </div>
      </motion.div>

      {/* Campo de fuerza / aura alrededor del botón */}
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-10"
        animate={{
          boxShadow: isOpen
            ? "0 0 15px 5px rgba(139, 92, 246, 0.7), 0 0 30px 15px rgba(139, 92, 246, 0.3)"
            : "0 0 5px 2px rgba(139, 92, 246, 0.4)",
          scale: isOpen ? 1.3 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Órbita - elementos flotantes */}
      <AnimatePresence>
        {isOpen && languages
          .filter(lang => lang.code !== language)
          .map((lang, index, filteredArray) => {
            // Calcular posición basada en el índice filtrado
            const position = getOrbitalPosition(index, filteredArray.length);
            
            return (
              <motion.div
                key={`orbital-${lang.code}`}
                className={cn(
                  "absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer perspective-container",
                  "bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg shadow-lg",
                  "border border-white/10 hover:border-white/30"
                )}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: position.x, 
                  y: position.y, 
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.1
                  }
                }}
                exit={{ 
                  scale: 0, 
                  opacity: 0,
                  transition: { duration: 0.2 }
                }}
                onClick={() => handleLanguageChange(lang)}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
                  zIndex: 30
                }}
                title={lang.name}
                style={{
                  // Asegurar que esté centrado en el botón principal
                  left: "50%",
                  top: "50%",
                  marginLeft: "-20px",
                  marginTop: "-20px",
                }}
              >
                {/* Bandera del idioma */}
                <span className="text-lg">{lang.flag}</span>
  
                {/* Halo/brillo alrededor del idioma al pasar el cursor */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/5 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 1, 
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)", 
                  }}
                  transition={{ duration: 0.2 }}
                />
  
                {/* Nombre del idioma que aparece al pasar el cursor */}
                <motion.div
                  className="absolute whitespace-nowrap px-2 py-1 bg-slate-900/90 backdrop-blur-md rounded-md border border-white/10 text-xs text-white pointer-events-none"
                  initial={{ opacity: 0, y: 30 }}
                  whileHover={{ opacity: 1, y: 40 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    left: "50%", 
                    transform: "translateX(-50%)"
                  }}
                >
                  {lang.name}
                </motion.div>
              </motion.div>
            );
          })
        }
      </AnimatePresence>

      {/* Partículas de animación */}
      <AnimatePresence>
        {animatingParticles.map((code, index) => {
          const particleFlag = languages.find(l => l.code === code)?.flag || '✨';
          const randomX = Math.random() * 100 - 50; // -50 a 50
          const randomY = Math.random() * 100 - 50; // -50 a 50
          const randomAngle = Math.random() * 360;
          const randomDuration = 1 + Math.random() * 1;
          const randomScale = 0.4 + Math.random() * 0.4;
          
          return (
            <motion.div
              key={`particle-${index}-${Date.now()}`}
              className="absolute z-[-1] pointer-events-none text-sm"
              initial={{ 
                opacity: 1, 
                scale: 1,
                x: 0, 
                y: 0,
                rotate: 0
              }}
              animate={{ 
                opacity: 0,
                scale: randomScale,
                x: randomX, 
                y: randomY,
                rotate: randomAngle
              }}
              transition={{ 
                duration: randomDuration,
                ease: "easeOut" 
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            >
              {particleFlag}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default EpicLanguageSelector;