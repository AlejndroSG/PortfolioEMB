"use client";

import { useEffect, useRef, ReactNode } from "react";
import useDeviceDetect from "@/hooks/useDeviceDetect";

interface AnimatedElementProps {
  children: ReactNode;
  animation: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "rotate";
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const AnimatedElement = ({
  children,
  animation,
  delay = 0,
  duration = 0.4,
  className = "",
  threshold = 0.05,
}: AnimatedElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowPowerDevice } = useDeviceDetect();
  
  // Reducir la intensidad de las animaciones en dispositivos móviles o de baja potencia
  const optimizedDuration = isLowPowerDevice ? duration * 0.6 : duration;
  const optimizedDelay = isLowPowerDevice ? delay * 0.5 : delay;
  const optimizedThreshold = isLowPowerDevice ? Math.max(threshold, 0.01) : threshold;

  useEffect(() => {
    // Si es un dispositivo de baja potencia, simplificamos la configuración
    const options = {
      root: null,
      rootMargin: isLowPowerDevice ? "20px" : "0px", // Margen extra para dispositivos de baja potencia
      threshold: optimizedThreshold,
    };

    // En dispositivos de baja potencia, reducimos la distancia de las animaciones
    const translateDistance = isLowPowerDevice ? "20px" : "40px";
    
    // Animaciones predefinidas con optimizaciones para dispositivos móviles
    const animations: Record<string, string> = {
      // Si es un dispositivo de baja potencia, usamos animaciones más simples
      "fade-up": isLowPowerDevice 
        ? `opacity: 0; transform: translateY(${translateDistance}); transition: opacity ${optimizedDuration}s ease-out, transform ${optimizedDuration}s ease-out;`
        : `opacity: 0; transform: translateY(40px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "fade-in": `opacity: 0; transition: opacity ${optimizedDuration}s ease-out;`,
      "slide-left": isLowPowerDevice
        ? `opacity: 0; transform: translateX(-${translateDistance}); transition: opacity ${optimizedDuration}s ease-out, transform ${optimizedDuration}s ease-out;`
        : `opacity: 0; transform: translateX(-60px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "slide-right": isLowPowerDevice
        ? `opacity: 0; transform: translateX(${translateDistance}); transition: opacity ${optimizedDuration}s ease-out, transform ${optimizedDuration}s ease-out;`
        : `opacity: 0; transform: translateX(60px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "zoom-in": isLowPowerDevice
        ? `opacity: 0; transform: scale(0.9); transition: opacity ${optimizedDuration}s ease-out, transform ${optimizedDuration}s ease-out;`
        : `opacity: 0; transform: scale(0.8); transition: opacity ${duration}s ease-out, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
      "rotate": isLowPowerDevice
        ? `opacity: 0; transform: rotate(-5deg) scale(0.95); transition: opacity ${optimizedDuration}s ease-out, transform ${optimizedDuration}s ease-out;`
        : `opacity: 0; transform: rotate(-10deg) scale(0.9); transition: opacity ${duration}s ease-out, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
    };

    // Aplicar estilo inicial
    if (elementRef.current) {
      elementRef.current.style.cssText = animations[animation];
    }

    // Callback para el observador
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // En dispositivos de baja potencia, reducimos o eliminamos el retraso
          const actualDelay = isLowPowerDevice ? optimizedDelay * 100 : delay * 200;
          
          setTimeout(() => {
            if (elementRef.current) {
              elementRef.current.style.opacity = "1";
              elementRef.current.style.transform = "translateY(0) translateX(0) rotate(0) scale(1)";
            }
          }, actualDelay);
        }
      });
    };

    // Crear y conectar el observador
    const observer = new IntersectionObserver(handleIntersection, options);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Limpiar el observador al desmontar
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animation, delay, duration, threshold, isLowPowerDevice, optimizedDuration, optimizedDelay, optimizedThreshold]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

interface StaggeredContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  animation: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "rotate";
  className?: string;
  childClassName?: string;
  baseDelay?: number;
}

export const StaggeredContainer = ({
  children,
  staggerDelay = 0.1,
  animation,
  className = "",
  childClassName = "",
  baseDelay = 0,
}: StaggeredContainerProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <AnimatedElement
          key={index}
          animation={animation}
          delay={baseDelay + index * staggerDelay}
          className={childClassName}
        >
          {child}
        </AnimatedElement>
      ))}
    </div>
  );
};

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxElement = ({
  children,
  speed = 0.1,
  className = "",
}: ParallaxElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isLowPowerDevice } = useDeviceDetect();
  
  // Reducir o deshabilitar el parallax en dispositivos de baja potencia
  const optimizedSpeed = isLowPowerDevice ? speed * 0.3 : speed;

  useEffect(() => {
    // Si es un dispositivo de baja potencia, podemos incluso desactivar el parallax
    const handleScroll = () => {
      if (elementRef.current && !isLowPowerDevice) {
        const scrollY = window.scrollY;
        elementRef.current.style.transform = `translateY(${scrollY * optimizedSpeed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [optimizedSpeed, isLowPowerDevice]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

export const ScrollProgress = ({
  color = "#8b5cf6", // Púrpura por defecto
  height = 4,
  zIndex = 100,
}: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { isLowPowerDevice } = useDeviceDetect();
  
  // Simplificamos los efectos visuales en dispositivos de baja potencia

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressRef.current.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: `${height}px`,
        backgroundColor: "transparent",
        zIndex: zIndex,
      }}
    >
      <div
        ref={progressRef}
        style={{
          height: "100%",
          width: "0%",
          backgroundColor: color,
          transition: isLowPowerDevice ? "width 0.2s linear" : "width 0.1s ease-out",
          boxShadow: isLowPowerDevice ? "none" : `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};

export default {
  AnimatedElement,
  StaggeredContainer,
  ParallaxElement,
  ScrollProgress,
};
