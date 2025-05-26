"use client";

import { useEffect, useRef, ReactNode } from "react";

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
  duration = 0.4, // Reducido de 0.6 a 0.4 para animaciones mu00e1s ru00e1pidas
  className = "",
  threshold = 0.05, // Reducido de 0.1 a 0.05 para activar antes las animaciones
}: AnimatedElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuraciu00f3n del observador
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };

    // Animaciones predefinidas
    const animations: Record<string, string> = {
      "fade-up": `opacity: 0; transform: translateY(40px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "fade-in": `opacity: 0; transition: opacity ${duration}s ease-out;`,
      "slide-left": `opacity: 0; transform: translateX(-60px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "slide-right": `opacity: 0; transform: translateX(60px); transition: opacity ${duration}s ease-out, transform ${duration}s ease-out;`,
      "zoom-in": `opacity: 0; transform: scale(0.8); transition: opacity ${duration}s ease-out, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
      "rotate": `opacity: 0; transform: rotate(-10deg) scale(0.9); transition: opacity ${duration}s ease-out, transform ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
    };

    // Aplicar estilo inicial
    if (elementRef.current) {
      elementRef.current.style.cssText = animations[animation];
    }

    // Callback para el observador
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Aplicar la animaciu00f3n con un retraso mu00ednimo para que sea mu00e1s inmediata
          setTimeout(() => {
            if (elementRef.current) {
              elementRef.current.style.opacity = "1";
              elementRef.current.style.transform = "translateY(0) translateX(0) rotate(0) scale(1)";
            }
          }, delay * 200); // Reducido de 1000ms a 200ms (5 veces mu00e1s ru00e1pido)
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
  }, [animation, delay, duration, threshold]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrollY = window.scrollY;
        elementRef.current.style.transform = `translateY(${scrollY * speed}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

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
  color = "#8b5cf6", // Pu00farpura por defecto
  height = 4,
  zIndex = 100,
}: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

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
          transition: "width 0.1s ease-out",
          boxShadow: `0 0 10px ${color}`,
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
