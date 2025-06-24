"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParticleProps {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  
  useEffect(() => {
    // Generar partículas aleatorias
    const generateParticles = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const numberOfParticles = Math.min(windowWidth * windowHeight / 15000, 50);
      
      const colors = [
        "rgba(139, 92, 246, 0.3)",  // purple
        "rgba(59, 130, 246, 0.3)",  // blue
        "rgba(34, 211, 238, 0.3)",  // cyan
        "rgba(255, 255, 255, 0.15)" // white
      ];
      
      const newParticles = [];
      
      for (let i = 0; i < numberOfParticles; i++) {
        newParticles.push({
          key: i,
          x: Math.random() * windowWidth,
          y: Math.random() * windowHeight,
          size: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(newParticles);
    };
    
    // Generar partículas inicialmente y cuando cambie el tamaño de la ventana
    generateParticles();
    window.addEventListener("resize", generateParticles);
    
    return () => {
      window.removeEventListener("resize", generateParticles);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.key}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            x: [
              0, 
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              0
            ],
            y: [
              0,
              Math.random() * 50 - 25,
              Math.random() * 50 - 25,
              0
            ],
            scale: [1, Math.random() * 0.5 + 0.8, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};
