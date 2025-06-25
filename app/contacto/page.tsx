"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import SEOMetaTags from "@/components/SEOMetaTags";
import { FloatingParticles } from "@/components/FloatingParticles";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Footer from "@/components/Footer";
import { navItems, socialMedia } from "@/data";

const ContactPage = () => {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  
  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // No necesitamos más esta funcionalidad
  

  return (
    <>
      <SEOMetaTags
        title="Contacto | EMB"
        description="Ponte en contacto con el equipo de EMB. Estamos listos para ayudarte con tu próximo proyecto."
      />
      
      {/* Navegación flotante */}
      <FloatingNav />
      
      <main className="relative min-h-screen bg-black-100 overflow-hidden pt-10">
        {/* Partículas flotantes decorativas */}
        <FloatingParticles />
        <div className="absolute top-20 right-10 w-[30vw] h-[30vw] rounded-full bg-purple/20 blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] rounded-full bg-blue-500/20 blur-3xl opacity-30 animate-pulse" />
        
        {/* Contenido principal */}
        <div className="container mx-auto px-4 py-24 md:py-32 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-purple via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Hablemos sobre tu proyecto
              </span>
            </h1>
            
            <p className="text-center text-white-200 max-w-3xl mx-auto mb-16 text-lg">
              Estamos ansiosos por saber más sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-[#13162D] to-[#1a1f3d] p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple to-cyan-400 bg-clip-text text-transparent">
                Envíanos un mensaje
              </h2>
              
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  setError("");
                  
                  try {
                    const response = await fetch('/api/sendmail', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(formData)
                    });
                    
                    // Intentar parsear la respuesta JSON con manejo de errores
                    let data;
                    try {
                      data = await response.json();
                    } catch (jsonError) {
                      console.error('Error al parsear JSON de respuesta:', jsonError);
                      // Si falla el parse, creamos un objeto de error predeterminado
                      data = { 
                        error: 'Error de comunicación con el servidor', 
                        details: 'No se pudo procesar la respuesta' 
                      };
                    }
                    
                    if (response.ok) {
                      // Éxito: mostrar mensaje y limpiar formulario
                      setIsSubmitted(true);
                      setFormData({
                        nombre: "",
                        email: "",
                        telefono: "",
                        mensaje: ""
                      });
                    } else {
                      // Error con respuesta HTTP: usar mensaje del servidor si está disponible
                      let errorMsg = 'Error al enviar el mensaje';
                      if (data && data.error) {
                        errorMsg = data.error;
                        if (data.details) errorMsg += `: ${data.details}`;
                      }
                      throw new Error(errorMsg);
                    }
                  } catch (err: any) {
                    // Capturar y mostrar cualquier error
                    setError(err.message || 'Ha ocurrido un error inesperado');
                    console.error('Error al enviar el formulario:', err);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre completo"
                    required
                    className="w-full py-3 pl-12 pr-4 rounded-xl bg-black-200/50 border border-white/5 focus:border-purple/50 focus:ring-1 focus:ring-purple/30 outline-none transition-all text-white-100"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    required
                    className="w-full py-3 pl-12 pr-4 rounded-xl bg-black-200/50 border border-white/5 focus:border-purple/50 focus:ring-1 focus:ring-purple/30 outline-none transition-all text-white-100"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono (opcional)"
                    className="w-full py-3 pl-12 pr-4 rounded-xl bg-black-200/50 border border-white/5 focus:border-purple/50 focus:ring-1 focus:ring-purple/30 outline-none transition-all text-white-100"
                  />
                </div>
                
                <div>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="¿Cómo podemos ayudarte? Cuéntanos sobre tu proyecto..."
                    required
                    rows={5}
                    className="w-full py-4 px-4 rounded-xl bg-black-200/50 border border-white/5 focus:border-purple/50 focus:ring-1 focus:ring-purple/30 outline-none transition-all text-white-100"
                  />
                </div>
                
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all flex justify-center items-center gap-2 ${isSubmitting ? 'bg-purple/50 cursor-not-allowed' : 'bg-purple hover:bg-purple-dark'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="h-5 w-5 border-2 border-white/80 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </div>
                
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-green-500/10 text-green-400"
                  >
                    ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
                  </motion.div>
                )}
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-lg bg-red-500/10 text-red-400"
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#13162D] to-[#1a1f3d] p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl h-full">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple to-cyan-400 bg-clip-text text-transparent">
                  Información de contacto
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple/20 p-3 rounded-full">
                      <FaEnvelope className="text-purple" />
                    </div>
                    <div>
                      <h3 className="text-white-100 font-medium mb-1">Correo electrónico</h3>
                      <p className="text-white-300">info@embdevs.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/20 p-3 rounded-full">
                      <FaPhone className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-white-100 font-medium mb-1">Teléfono</h3>
                      <p className="text-white-300">+34 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-cyan-400/20 p-3 rounded-full">
                      <FaLocationDot className="text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white-100 font-medium mb-1">Ubicación</h3>
                      <p className="text-white-300">Granada, España</p>
                    </div>
                  </div>
                </div>
                
                {/* Elemento decorativo visual */}
                <div className="mt-8 rounded-xl overflow-hidden border border-white/10 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/30 to-blue-500/20 overflow-hidden">
                    {/* Elementos decorativos animados */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-lg border border-white/10 bg-black-200/50 shadow-lg shadow-purple/20 animate-float"></div>
                    <div className="absolute bottom-6 right-8 w-20 h-8 rounded-full border border-white/10 bg-black-200/50 shadow-lg shadow-blue-500/20 animate-float-delay"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full border border-white/10 bg-black-200/50 shadow-lg shadow-cyan-400/20 animate-pulse"></div>
                    
                    {/* Líneas de código decorativas */}
                    <div className="absolute bottom-8 left-6 text-xs font-mono text-white/30">
                      <div>const EMB = {'{'};</div>
                      <div>&nbsp;&nbsp;location: "Granada",</div>
                      <div>&nbsp;&nbsp;passion: "Development",</div>
                      <div>&nbsp;&nbsp;focus: "Quality"</div>
                      <div>{'}'};</div>
                    </div>
                  </div>
                  
                  {/* Logo EMB grande semitransparente */}
                  <div className="absolute -right-6 -top-6 text-8xl font-bold text-white/5 rotate-12">EMB</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ - Opcional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple to-cyan-400 bg-clip-text text-transparent">
              Preguntas frecuentes
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  pregunta: "¿Cuánto tiempo toma desarrollar un proyecto web?",
                  respuesta: "El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede estar listo en 1 semana, mientras que aplicaciones más complejas pueden requerir hasta 1 mes o más."
                },
                {
                  pregunta: "¿Cómo funciona el proceso de trabajo?",
                  respuesta: "Nuestro proceso incluye: consulta inicial, propuesta detallada, diseño de UI/UX, desarrollo, pruebas de calidad, lanzamiento y soporte post-lanzamiento. Mantenemos comunicación constante durante todo el proyecto."
                },
                {
                  pregunta: "¿Ofrecen mantenimiento después del lanzamiento?",
                  respuesta: "Sí, ofrecemos planes de mantenimiento y soporte continuo para asegurar que tu sitio o aplicación funcione de manera óptima y segura después del lanzamiento."
                },
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-black-200/30 border border-white/5 rounded-2xl p-6 transition-all hover:border-purple/20 hover:bg-gradient-to-r hover:from-purple/5 hover:to-transparent"
                >
                  <h3 className="text-xl font-semibold text-white-100 mb-2">{faq.pregunta}</h3>
                  <p className="text-white-300">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer personalizado - Solo parte inferior */}
      <div className="w-full bg-black-100 pt-10 pb-10 relative z-10">
        {/* Grid de fondo similar al Footer original */}
        <div className="w-full absolute left-0 -bottom-0 min-h-96">
          {/* <img
            src="/footer-grid.svg"
            alt="grid"
            className="w-full h-full opacity-50"
          /> */}
        </div>
        
        {/* Solo la parte inferior del footer con copyright y redes sociales */}
        <div className="container mx-auto px-4">
          <div className="flex mt-8 md:flex-row flex-col justify-between items-center">
            <p className="md:text-base text-sm md:font-normal font-light">
              Copyright © {new Date().getFullYear()} Equipo EMB
            </p>

            <div className="flex items-center md:gap-3 gap-6">
              {socialMedia.map((info) => (
                <div
                  key={info.id}
                  className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple/20 hover:border-purple/50 group relative overflow-hidden"
                >
                  {/* Efecto de gradiente que aparece en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Imagen con efecto de zoom suave */}
                  <img 
                    src={info.img} 
                    alt={`${info.id} social icon`} 
                    width={20} 
                    height={20} 
                    className="relative z-10 transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
