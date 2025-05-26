"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import HomeButton from "@/components/ui/HomeButton";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingParticles from "@/components/ui/FloatingParticles";
import { AnimatedElement, StaggeredContainer, ParallaxElement, ScrollProgress } from "@/components/ui/ScrollAnimations";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {/* Cursor personalizado con efectos avanzados */}
      <CustomCursor />
      {/* Efecto de partu00edculas flotantes */}
      <FloatingParticles />
      
      {/* Barra de progreso de scroll */}
      <ScrollProgress color="#8b5cf6" height={3} />
      
      {/* Botón flotante para volver arriba */}
      <HomeButton />
      
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        
        {/* Hero con animación de aparición */}
        <AnimatedElement animation="fade-up" duration={0.4}>
          <Hero />
        </AnimatedElement>
        
        {/* Grid con efecto parallax sutil */}
        <ParallaxElement speed={-0.05}>
          <AnimatedElement animation="fade-in" delay={0.05}>
            <Grid />
          </AnimatedElement>
        </ParallaxElement>
        
        {/* Proyectos recientes con animación */}
        <AnimatedElement animation="fade-up" delay={0.05}>
          <RecentProjects />
        </AnimatedElement>
        
        {/* Experiencia con animación lateral */}
        <AnimatedElement animation="slide-right" delay={0.1}>
          <Experience />
        </AnimatedElement>
        
        {/* Enfoque con animación de zoom */}
        <AnimatedElement animation="zoom-in" delay={0.3}>
          <Approach />
        </AnimatedElement>
        
        {/* Clientes con animación de aparición */}
        <AnimatedElement animation="fade-up" delay={0.2}>
          <Clients />
        </AnimatedElement>
        
        {/* Footer con animación sutil */}
        <AnimatedElement animation="fade-in" delay={0.4}>
          <Footer />
        </AnimatedElement>
      </div>
    </main>
  );
};

export default Home;
