"use client";

import { useParams } from "next/navigation";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCalendarAlt, FaBuilding, FaTag, FaLightbulb, FaPuzzlePiece } from "react-icons/fa";
import Image from "next/image";
import { projects } from "@/data";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import HomeButton from "@/components/ui/HomeButton";

const ProyectoDetalle = () => {
  const params = useParams();
  const id = Number(params.id);
  
  // Encontrar el proyecto por ID
  const proyecto = projects.find((p) => p.id === id);
  
  if (!proyecto) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl">Proyecto no encontrado</h1>
      </div>
    );
  }

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto pt-20 sm:px-10 px-5" style={{
      background: 'linear-gradient(125deg, #030509 0%, #040610 50%, #05081a 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      {/* Botón flotante para volver al inicio */}
      <HomeButton />
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
        {/* Efecto de grid solo en la parte superior */}
        <div className="w-full absolute left-0 top-0 h-[40vh]">
          <Image
            src="/footer-grid.svg"
            alt="grid"
            fill
            sizes="100vw"
            className="w-full h-full opacity-20"
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Efecto de luz */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-15" 
          style={{ 
            background: 'linear-gradient(135deg, #2a3ca0 0%, #1c2c80 100%)', 
            filter: 'blur(120px)',
            transform: 'rotate(-25deg)'
          }}
        />
      </div>
      <div className="max-w-7xl w-full relative" style={{ zIndex: 1 }}>
        <FloatingNav navItems={navItems} />
        
        <div className="py-20">
          <div className="flex flex-col items-center">
            {/* Cabecera del proyecto con efecto de gradiente */}
            <h1 className="heading text-center mb-8">
              <span className="text-purple font-bold">{proyecto.title}</span>
            </h1>
            
            {/* Contenido principal del proyecto */}
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl mb-16 shadow-xl border border-white/5 backdrop-blur-sm">
              {proyecto.id === 1 ? (
                // Video de YouTube para Peaky Blinders
                <div className="relative pt-10 pb-16 px-6">
                  <h2 className="text-3xl font-bold mb-6 text-center text-purple">Peaky Blinders</h2>
                  <div className="relative w-full overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-purple/30" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple to-blue-500 rounded-xl opacity-50 blur"></div>
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-xl z-10"
                      src="https://www.youtube.com/embed/qXnJdcdIusM?si=U58Q1ck4ooxiEzSw" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ) : (
                // Imagen para otros proyectos
                <div className="relative w-full h-[60vh] overflow-hidden p-6">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg" style={{ backgroundColor: "#13162D" }}>
                    {/* Efectos de luz de fondo */}
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full opacity-30" 
                      style={{ 
                        background: 'linear-gradient(135deg, #9754CB 0%, #5E35B1 100%)', 
                        filter: 'blur(60px)',
                      }}
                    />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full opacity-30" 
                      style={{ 
                        background: 'linear-gradient(135deg, #2a3ca0 0%, #1c2c80 100%)', 
                        filter: 'blur(60px)',
                      }}
                    />
                    
                    {/* Fondo con efecto de escala al hover */}
                    <Image 
                      src="/bg.png" 
                      alt="fondo" 
                      fill 
                      sizes="100vw"
                      className="transition-transform duration-700 hover:scale-105"
                      style={{ objectFit: 'cover' }} 
                    />
                    
                    {/* Imagen principal con animación */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[80%] max-w-xl aspect-video flex items-center justify-center">
                        <Image
                          src={proyecto.img}
                          alt={proyecto.title}
                          width={500}
                          height={400}
                          className="z-10 object-contain transition-all duration-500 hover:scale-105 hover:rotate-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Descripción del proyecto */}
            <div className="max-w-3xl mb-12 text-center">
              <p className="lg:text-xl text-base" style={{ color: "#BEC1DD" }}>
                {proyecto.des}
              </p>
            </div>
            
            {/* Efecto de luz ambiental para la página */}
            <div className="relative mb-8">
              <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full opacity-10" 
                style={{ 
                  background: 'linear-gradient(135deg, #9754CB 0%, #5E35B1 100%)', 
                  filter: 'blur(100px)',
                  zIndex: -1
                }}
              />
              <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full opacity-10" 
                style={{ 
                  background: 'linear-gradient(135deg, #2a3ca0 0%, #1c2c80 100%)', 
                  filter: 'blur(100px)',
                  zIndex: -1
                }}
              />
            </div>
            
            {/* Tecnologías utilizadas */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 text-purple">Tecnologías utilizadas</h2>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {proyecto.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black/50 backdrop-blur-sm lg:w-20 lg:h-20 w-16 h-16 flex justify-center items-center shadow-lg hover:shadow-purple/20 transition-all duration-300 hover:scale-110 hover:border-purple/30"
                  >
                    <Image 
                      src={icon} 
                      alt={`tecnología-${index}`} 
                      width={40} 
                      height={40} 
                      className="p-3" 
                      style={{ width: 'auto', height: 'auto' }} 
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Enlace al sitio */}
            <a 
              href={proyecto.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-purple/10 hover:bg-purple/20 transition-all duration-300 text-purple py-4 px-8 rounded-full"
            >
              <span className="text-xl">Ver Sitio en Vivo</span>
              <FaLocationArrow />
            </a>
            
            {/* Sección para más detalles */}
            <div className="mt-20 w-full">
              <h2 className="text-2xl font-bold mb-8 text-purple">Detalles del proyecto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#13162D]/70 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg hover:shadow-purple/10 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Desafío</h3>
                  </div>
                  <p className="text-[#BEC1DD] leading-relaxed">
                    {proyecto.challenge}
                  </p>
                </div>
                
                <div className="bg-[#13162D]/70 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg hover:shadow-purple/10 transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Solución</h3>
                  </div>
                  <p className="text-[#BEC1DD] leading-relaxed">
                    {proyecto.solution}
                  </p>
                </div>
                
                {/* Añadimos una tercera sección para resultados */}
                <div className="bg-[#13162D]/70 backdrop-blur-sm p-8 rounded-2xl border border-white/5 shadow-lg hover:shadow-purple/10 transition-all duration-300 hover:translate-y-[-5px] md:col-span-2 mt-4">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple/20 flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Resultados</h3>
                  </div>
                  <p className="text-[#BEC1DD] leading-relaxed">
                    Los resultados del proyecto superaron las expectativas del cliente. La implementación logró mejorar significativamente la experiencia del usuario y optimizar los procesos clave. El diseño moderno y la arquitectura escalable garantizan que la solución seguirá siendo efectiva a largo plazo.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navegación entre proyectos */}
            <div className="mt-20 w-full flex justify-between">
              <a 
                href={`/proyecto/${id > 1 ? id - 1 : projects.length}`}
                className="group flex items-center bg-[#13162D]/70 hover:bg-[#1a1f3d] transition-all duration-300 py-4 px-6 rounded-xl border border-white/5 shadow-lg hover:shadow-purple/10 hover:translate-x-[-5px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple group-hover:translate-x-[-3px] transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Proyecto anterior</span>
              </a>
              <a 
                href={`/proyecto/${id < projects.length ? id + 1 : 1}`}
                className="group flex items-center bg-[#13162D]/70 hover:bg-[#1a1f3d] transition-all duration-300 py-4 px-6 rounded-xl border border-white/5 shadow-lg hover:shadow-purple/10 hover:translate-x-[5px]"
              >
                <span>Siguiente proyecto</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-purple group-hover:translate-x-[3px] transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </main>
  );
};

export default ProyectoDetalle;
