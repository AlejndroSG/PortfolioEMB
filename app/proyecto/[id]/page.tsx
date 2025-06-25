"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaLocationArrow, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import HomeButton from "@/components/ui/HomeButton";

// Componente para efectos de partículas flotantes
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Componente para el hero del proyecto
const ProjectHero = ({ proyecto }: { proyecto: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative mx-0 text-center py-10 md:py-16 px-4 sm:px-6 md:px-8 mb-12 mt-10 md:mt-16 lg:mt-20 w-full h-full"
    >
      {/* Efectos de luz de fondo */}
      <div className="absolute -inset-0 overflow-hidden w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[80%] aspect-square rounded-full opacity-20 bg-gradient-to-br from-purple to-blue-500 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Título con efecto de gradiente */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent px-4 leading-tight"
        >
          {proyecto.title}
        </motion.h1>
        
        {/* Línea decorativa */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-purple to-cyan-400 mx-auto mb-6 md:mb-8"
        />
        
        {/* Descripción con animación */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white-200 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
        >
          {proyecto.des}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Componente para la galería de medios
const MediaGallery = ({ proyecto }: { proyecto: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative mb-20 w-full"
    >
      <div className="relative w-full mx-auto">
        {proyecto.id === 1 ? (
          // Video showcase para Peaky Blinders con título
          <div className="relative bg-gradient-to-br from-[#13162D] to-[#1a1f3d] p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl w-full mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Peaky Blinders
            </h2>
            <div className="relative overflow-hidden rounded-2xl w-full mx-auto max-w-6xl">
              <div
                className="relative w-full overflow-hidden rounded-xl shadow-2xl"
                style={{ paddingBottom: "75%" }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple via-blue-500 to-cyan-400 rounded-xl opacity-75 blur-md"></div>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl z-10"
                  src="https://www.youtube.com/embed/CJH7f12ob1I?autoplay=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen={true}
                />
              </div>
            </div>
          </div>
        ) : (
          // Imagen showcase para otros proyectos
          <div className="relative bg-gradient-to-br from-[#13162D] to-[#1a1f3d] p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="relative w-full h-[70vh] overflow-hidden rounded-2xl">
              {/* Efectos de luz de fondo */}
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-20 bg-gradient-to-br from-purple to-blue-500 blur-3xl"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 bg-gradient-to-br from-cyan-400 to-purple blur-3xl"></div>
              
              {/* Fondo con grid */}
              <Image
                src="/bg.png"
                alt="fondo"
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              
              {/* Imagen principal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-[80%] max-w-2xl aspect-video"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple via-blue-500 to-cyan-400 rounded-xl opacity-75 blur-lg"></div>
                  <Image
                    src={proyecto.img}
                    alt={proyecto.title}
                    fill
                    className="relative z-10 object-contain rounded-xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Componente para las tecnologías
const TechStack = ({ proyecto }: { proyecto: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple to-cyan-400 bg-clip-text text-transparent">
        Tecnologías Utilizadas
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {proyecto.iconLists.map((icon: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.2, rotateY: 180 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple to-cyan-400 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
            <div className="relative border border-white/20 rounded-full bg-black-100/80 backdrop-blur-sm lg:w-20 lg:h-20 w-16 h-16 flex justify-center items-center shadow-lg">
              <Image
                src={icon}
                alt={`tecnología-${index}`}
                width={40}
                height={40}
                className="p-3"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Componente para los detalles del proyecto
const ProjectDetails = ({ proyecto }: { proyecto: any }) => {
  const details = [
    {
      title: "Desafío",
      content: proyecto.challenge || "Crear una solución innovadora que resuelva problemas reales del usuario, implementando las mejores prácticas de desarrollo y diseño UX/UI.",
      icon: "🎯",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "Solución",
      content: proyecto.solution || "Desarrollo de una aplicación moderna utilizando tecnologías de vanguardia, con enfoque en la experiencia del usuario y la escalabilidad del sistema.",
      icon: "💡",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Resultados",
      content: "Implementación exitosa que superó las expectativas del cliente, mejorando significativamente la experiencia del usuario y optimizando los procesos clave del negocio.",
      icon: "📈",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple to-cyan-400 bg-clip-text text-transparent">
        Detalles del Proyecto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {details.map((detail, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative group h-full"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple to-cyan-400 rounded-2xl opacity-25 blur group-hover:opacity-75 transition duration-300"></div>
            <div className="relative bg-gradient-to-br from-[#13162D] to-[#1a1f3d] p-8 rounded-2xl border border-white/10 shadow-xl backdrop-blur-sm h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${detail.gradient} flex items-center justify-center text-2xl mr-4 shadow-lg flex-shrink-0`}>
                  {detail.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{detail.title}</h3>
              </div>
              <p className="text-white-200 leading-relaxed flex-grow">{detail.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Componente para los botones de acción
const ActionButtons = ({ proyecto }: { proyecto: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
    >
      <motion.a
        href={proyecto.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-purple to-cyan-400 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-purple to-blue-600 hover:from-purple/80 hover:to-blue-600/80 transition-all duration-300 text-white py-4 px-8 rounded-full shadow-lg">
          <FaExternalLinkAlt className="text-lg" />
          <span className="text-lg font-semibold">Ver Proyecto</span>
        </div>
      </motion.a>
      
      {proyecto.github && (
        <motion.a
          href={proyecto.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 text-white py-4 px-8 rounded-full shadow-lg">
            <FaGithub className="text-lg" />
            <span className="text-lg font-semibold">Ver Código</span>
          </div>
        </motion.a>
      )}
    </motion.div>
  );
};

// Componente para la navegación entre proyectos
const ProjectNavigation = ({ currentId }: { currentId: number }) => {
  const prevId = currentId > 1 ? currentId - 1 : projects.length;
  const nextId = currentId < projects.length ? currentId + 1 : 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="flex justify-between items-center w-full max-w-4xl mx-auto mb-20"
    >
      <motion.a
        href={`/proyecto/${prevId}`}
        whileHover={{ x: -10, scale: 1.05 }}
        className="group flex items-center bg-gradient-to-r from-[#13162D] to-[#1a1f3d] hover:from-[#1a1f3d] hover:to-[#252b4a] transition-all duration-300 py-4 px-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-purple group-hover:text-cyan-400 transition-colors duration-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-white group-hover:text-white transition-colors duration-300">Anterior</span>
      </motion.a>

      <motion.a
        href={`/proyecto/${nextId}`}
        whileHover={{ x: 10, scale: 1.05 }}
        className="group flex items-center bg-gradient-to-r from-[#13162D] to-[#1a1f3d] hover:from-[#1a1f3d] hover:to-[#252b4a] transition-all duration-300 py-4 px-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm"
      >
        <span className="text-white group-hover:text-white transition-colors duration-300">Siguiente</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-3 text-purple group-hover:text-cyan-400 transition-colors duration-300"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.a>
    </motion.div>
  );
};

const ProyectoDetalle = () => {
  const params = useParams();
  const id = Number(params.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Encontrar el proyecto por ID
  const proyecto = projects.find((p) => p.id === id);

  if (!proyecto) {
    return (
      <div className="flex items-center justify-center h-screen bg-black-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-white-200">Proyecto no encontrado</p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid de fondo */}
        <div className="w-full absolute left-0 top-0 h-screen opacity-20">
          {/* <Image
            src="/footer-grid.svg"
            alt="grid"
            fill
            sizes="100vw"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          /> */}
        </div>
        
        {/* Efectos de luz ambiental */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-purple to-blue-500 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-cyan-400 to-purple blur-3xl"></div>
      </div>

      {/* Partículas flotantes */}
      {mounted && <FloatingParticles />}

      {/* Botón flotante para volver al inicio */}
      <HomeButton />

      <div className="max-w-7xl w-full relative z-10">
        <FloatingNav />

        <div className="py-20">
          <div className="flex flex-col items-center">
            {/* Hero del proyecto */}
            <ProjectHero proyecto={proyecto} />

            {/* Galería de medios */}
            <MediaGallery proyecto={proyecto} />

            {/* Stack de tecnologías */}
            <TechStack proyecto={proyecto} />

            {/* Detalles del proyecto */}
            <ProjectDetails proyecto={proyecto} />

            {/* Botones de acción */}
            <ActionButtons proyecto={proyecto} />

            {/* Navegación entre proyectos */}
            <ProjectNavigation currentId={id} />
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
};

export default ProyectoDetalle;
