"use client";

import { useState } from "react";
import { navItems } from "@/data";
import Image from "next/image";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import HomeButton from "@/components/ui/HomeButton";
// Cursor predeterminado del sistema - CustomCursor eliminado
import FloatingParticles from "@/components/ui/FloatingParticles";
import { AnimatedElement, StaggeredContainer, ParallaxElement, ScrollProgress } from "@/components/ui/ScrollAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";

// Componente para el modal de video profesional
const VideoShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const youtubeId = "tcPjlcTtt20"; // ID del video de YouTube
  
  // Generamos la imagen de thumbnail de YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <>
      <motion.div 
        className="relative my-16 px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple/40 transition-shadow duration-500 cursor-pointer bg-[#13162D]/80 border border-white/5">
            {/* Preview del video con capa de overlay */}
            <div 
              className="relative w-full aspect-video"
              onClick={() => setIsOpen(true)}
            >
              {/* Miniatura del video de YouTube */}
              <div className="w-full h-full">
                <Image 
                  src={thumbnailUrl}
                  alt="Video promocional"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                />
              </div>
              
              {/* Overlay con efecto de gradiente */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <motion.div 
                    className="w-20 h-20 bg-purple/80 rounded-full flex items-center justify-center shadow-lg shadow-purple/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlay className="text-white text-2xl ml-1" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-semibold text-center px-4">Descubre nuestra propuesta de valor</h3>
                  <p className="mt-2 text-white/70 text-center max-w-md px-4">Mira nuestro video promocional y conoce cómo podemos ayudarte a transformar tu visión en realidad.</p>
                </div>
              </div>
              
              {/* Gradiente inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Modal de video de YouTube */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6"
            onClick={() => setIsOpen(false)}
          >
            {/* Contenedor del video - clickable aislado para evitar cerrar cuando se hace click en el video */}
            <motion.div 
              className="w-full max-w-5xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Contenedor del iframe con proporción de aspecto */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl w-full aspect-video">
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Botón de cierre */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Cerrar video"
              >
                <FaTimes className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {/* Usando cursor predeterminado del sistema */}
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
        
        {/* Video Showcase - Integrado estratégicamente después del Hero */}
        <VideoShowcase />
        
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
