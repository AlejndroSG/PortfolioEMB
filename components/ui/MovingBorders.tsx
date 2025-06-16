"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  borderSize?: string;
  duration?: number;
  className?: string;
  glowColor?: string;
  borderGradient?: string;
  hoverEffect?: 'pulse' | 'glow' | 'speed-up' | 'reverse' | 'none';
  variant?: 'default' | 'outline' | 'ghost' | 'solid';
  [key: string]: any;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  borderSize = "1px",
  duration = 2000,
  className,
  glowColor = "rgba(203, 172, 249, 0.8)",
  borderGradient = "radial-gradient(#CBACF9 40%,transparent 60%)",
  hoverEffect = 'glow',
  variant = 'default',
  ...otherProps
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isHovered || isFocused;
  
  // Calcular la duración basada en el efecto hover
  const effectiveDuration = isActive && hoverEffect === 'speed-up' ? duration / 2 : duration;
  const effectiveDirection = isActive && hoverEffect === 'reverse' ? -1 : 1;
  
  // Determinar estilos basados en variantes
  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'bg-transparent border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-100/10 text-slate-900 dark:text-white';
      case 'solid':
        return 'bg-slate-900 text-white dark:bg-white dark:text-slate-900';
      default:
        return 'bg-slate-900/[0.1] dark:bg-slate-900/[0.7] border border-slate-800 backdrop-blur-xl text-slate-900 dark:text-white';
    }
  };

  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1 transition-all",
        isActive && hoverEffect === 'pulse' && "animate-pulse",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder 
          duration={effectiveDuration} 
          rx="30%" 
          ry="30%" 
          direction={effectiveDirection}
        >
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8]",
              isActive && hoverEffect === 'glow' && "animate-glow-pulse",
              borderClassName
            )}
            style={{
              background: borderGradient,
              filter: isActive && hoverEffect === 'glow' ? 'blur(20px)' : 'blur(10px)',
              transformOrigin: 'center',
              transform: isActive && hoverEffect === 'glow' ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-center w-full h-full text-sm antialiased transition-all",
          getVariantStyles(),
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
          boxShadow: isActive && hoverEffect === 'glow' ? `0 0 15px 2px ${glowColor}` : 'none',
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  pathShape?: 'rect' | 'ellipse' | 'custom';
  pathDefinition?: string;
  direction?: number;
  width?: string;
  height?: string;
  [key: string]: any;
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  pathShape = 'rect',
  pathDefinition,
  direction = 1,
  width = "100%",
  height = "100%",
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);
  const directionRef = useRef(direction);
  
  // Actualizar la dirección si cambia
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      // Usamos la dirección (1 o -1) para controlar el sentido
      progress.set(((time * pxPerMillisecond * directionRef.current) % length + length) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  
  // Renderizar la forma SVG adecuada
  const renderPath = () => {
    switch (pathShape) {
      case 'ellipse':
        return (
          <ellipse
            cx="50%"
            cy="50%"
            rx={rx}
            ry={ry}
            fill="none"
            ref={pathRef}
          />
        );
      case 'custom':
        return (
          <path
            d={pathDefinition || "M0,0 L100,0 L100,100 L0,100 Z"}
            fill="none"
            ref={pathRef}
          />
        );
      default:
        return (
          <rect
            fill="none"
            width={width}
            height={height}
            rx={rx}
            ry={ry}
            ref={pathRef}
          />
        );
    }
  };

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        {renderPath()}
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
          zIndex: 1,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Componente complementario para crear bordes brillantes estáticos
export const GlowingBorder: React.FC<{
  className?: string;
  glowColor?: string;
  borderRadius?: string;
  children: React.ReactNode;
  glowOpacity?: number;
  borderWidth?: string;
  as?: any;
}> = ({
  className,
  glowColor = "rgba(203, 172, 249, 0.8)",
  borderRadius = "0.75rem",
  children,
  glowOpacity = 0.7,
  borderWidth = "2px",
  as: Component = "div",
}) => {
  return (
    <Component
      className={cn(
        "relative p-[2px] overflow-hidden",
        className
      )}
      style={{
        borderRadius: borderRadius
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to right, ${glowColor}, ${glowColor}AA, ${glowColor}77)`,
          borderRadius: `calc(${borderRadius} - 1px)`,
          opacity: glowOpacity,
        }}
      />
      
      <div
        className="relative bg-slate-900/[0.8] dark:bg-slate-900 backdrop-blur-sm flex items-center justify-center w-full h-full z-10"
        style={{
          borderRadius: `calc(${borderRadius} - 2px)`,
          boxShadow: `inset 0 0 10px rgba(0,0,0,0.3)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

// Componente para crear una tarjeta con efecto de borde en movimiento
export const MovingBorderCard = ({
  children,
  containerClassName,
  contentClassName,
  borderRadius = "1.5rem",
  duration = 2000,
  backgroundColor = "rgba(0,0,0,0.8)",
  borderGradient = "radial-gradient(#CBACF9 30%,transparent 70%)",
  glowColor = "rgba(203, 172, 249, 0.4)",
  borderSize = "20px",
  direction = 1,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  borderRadius?: string;
  duration?: number;
  backgroundColor?: string;
  borderGradient?: string;
  glowColor?: string;
  borderSize?: string;
  direction?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden p-[1px]",
        containerClassName
      )}
      style={{ borderRadius }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder 
          duration={isHovered ? duration / 1.5 : duration}
          rx="30%" 
          ry="30%" 
          direction={direction}
        >
          <div
            style={{
              width: borderSize,
              height: borderSize,
              background: borderGradient,
              filter: `blur(${parseInt(borderSize) / 2}px)`,
              opacity: 0.8,
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            }}
          />
        </MovingBorder>
      </div>
      
      <div
        className={cn(
          "relative backdrop-blur-md z-10 w-full h-full",
          contentClassName
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
          background: backgroundColor,
          boxShadow: isHovered ? `0 0 20px ${glowColor}` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
};
