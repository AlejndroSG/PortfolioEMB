"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { EpicLanguageSelector } from "./EpicLanguageSelector";
import { SimpleLanguageSelector } from "./SimpleLanguageSelector";

// Componente flotante para el selector de idiomas (fuera del navbar)
// Solo visible en pantallas desktop (md:)
const FixedLanguageSelector = () => {
  return (
    <div className="fixed top-4 right-4 z-[6000] hidden md:block">
      <EpicLanguageSelector />
    </div>
  );
};

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const isProjectPage = pathname?.includes('/proyecto/');
  
  // Estado para el menú hamburguesa en móviles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Estado para la visibilidad del navbar al hacer scroll
  const [visible, setVisible] = useState(true);

  // Control de visibilidad del navbar al hacer scroll
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Definir los elementos de navegación
  const navItems = [
<<<<<<< HEAD
    { name: t('navigation.about'), link: "#about", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: t('navigation.projects'), link: "#projects", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: t('navigation.testimonials'), link: "#testimonials", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 9.5H17" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: t('navigation.contact'), link: "#contact", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/></svg> },
=======
    { name: t('navigation.about'), link: "#about", icon: "" },
    { name: t('navigation.projects'), link: "#projects", icon: "" },
    { name: t('navigation.testimonials'), link: "#testimonials", icon: "" },
    { name: t('navigation.contact'), link: "#contact", icon: "" },
>>>>>>> 3d53a36a63bc7a0ffebba5578604820d46b8ee33
  ];

  // Manejar navegación (cerrar menú después de elegir)
  const handleNavigation = (navItem: any, idx: number) => {
    setMobileMenuOpen(false);
    
    // Si el enlace comienza con '/', navegar usando el router
    if (navItem.link.startsWith('/')) {
      router.push(navItem.link);
      return;
    }
    
    // Para enlaces que son anclas (#algo)
    if (isProjectPage) {
      router.push(`/${navItem.link}`);
    } else {
      const targetId = navItem.link.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calcular la altura del navbar (aproximada para dispositivos diferentes)
        const navbarHeight = window.innerWidth < 640 ? 70 : 80;
        // Añadir un offset adicional para mejor visualización
        const additionalOffset = 20;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - additionalOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        if (idx === 0) {
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    }
  };

  return (
    <>
      {/* Selector de idioma fijo (fuera del navbar) */}
      <FixedLanguageSelector />
      
      <AnimatePresence mode="sync">
        <motion.div
          key="navbar"
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
            height: mobileMenuOpen ? "auto" : "auto"
          }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={cn(
            "flex flex-wrap items-center justify-between w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:min-w-fit fixed z-[5000] top-5 sm:top-10 inset-x-0 mx-auto px-5 py-3 sm:py-4 rounded-t-xl md:rounded-xl backdrop-blur-xl border dark:border-white/5 border-black/5 shadow-xl",
            mobileMenuOpen ? "rounded-b-none border-b-0" : "",
            className
          )}
          style={{
            backdropFilter: "blur(12px) saturate(150%)",
            backgroundColor: "rgba(13, 17, 33, 0.85)",
            borderRadius: mobileMenuOpen ? "12px 12px 0 0" : "12px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderBottom: mobileMenuOpen ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
          }}
        >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 mr-1 sm:mr-2 hidden md:block overflow-hidden transition-all duration-300 group-hover:scale-110">
            <Image 
              src="/logofinal.jpg" 
              alt="EMB Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
<<<<<<< HEAD
          <span className="text-white font-semibold text-base sm:text-lg group-hover:text-purple-100 transition-colors">EMB</span>
=======
          <span className="text-white/90 font-semibold hidden md:block text-sm sm:text-base group-hover:text-white transition-colors">EMB</span>
>>>>>>> 3d53a36a63bc7a0ffebba5578604820d46b8ee33
        </Link>

        {/* Divisor visible solo en desktop */}
        <div className="h-6 border-r border-white/10 mx-2 hidden md:block"></div>

        {/* Navegación desktop */}
<<<<<<< HEAD
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
=======
        <nav className="hidden sm:flex items-center gap-1 lg:gap-2">
>>>>>>> 3d53a36a63bc7a0ffebba5578604820d46b8ee33
          {navItems.map((navItem, idx) => (
            <motion.div
              key={`link-${idx}`}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(navItem, idx)}
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-200",
                "text-white/90 hover:text-white cursor-pointer border border-transparent hover:border-white/10"
              )}
            >
              <span className="block lg:hidden text-white/90">{navItem.icon}</span>
              <span className="hidden lg:block text-sm font-medium tracking-wide">{navItem.name}</span>
            </motion.div>
          ))}
        </nav>
        
        {/* El selector de idioma está ahora fuera del navbar como componente independiente */}
        
        {/* Botón de menú hamburguesa (solo móvil) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
          className="block md:hidden ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Menú"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {mobileMenuOpen ? (
              // Cruz mejorada cuando el menú está abierto
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 90 }} 
                className="w-5 h-5 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L15 15M1 15L15 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.div>
            ) : (
              // Menú hamburguesa cuando está cerrado
              <div className="flex flex-col justify-between h-5 w-6">
                <motion.span className="h-[2px] w-full bg-white/90 rounded-full" />
                <motion.span className="h-[2px] w-full bg-white/90 rounded-full" />
                <motion.span className="h-[2px] w-full bg-white/90 rounded-full" />
              </div>
            )}
          </div>
        </motion.button>
      </motion.div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed z-[4999] inset-x-0 mx-auto w-[90%] max-w-xs sm:max-w-sm md:max-w-md top-[72px] sm:top-[76px] rounded-b-xl overflow-hidden backdrop-blur-xl border border-t-0 border-white/5 shadow-xl"
            style={{
              backgroundColor: "rgba(13, 17, 33, 0.85)",
              borderTop: "none",
              marginTop: "-1px",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.nav
              className="flex flex-col py-4 px-3"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05
                  }
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1
                  }
                }
              }}
            >
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`mobile-link-${idx}`}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -15, opacity: 0 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation(navItem, idx)}
<<<<<<< HEAD
                  className="flex items-center gap-3 px-5 py-3 my-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors border-l-2 border-transparent hover:border-l-2 hover:border-white/30"
                >
                  <div className="text-white/80">{navItem.icon}</div>
                  <span className="font-medium text-white/90 tracking-wide">{navItem.name}</span>
=======
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors "
                >
                  <span className="font-medium text-white/90">{navItem.name}</span>
>>>>>>> 3d53a36a63bc7a0ffebba5578604820d46b8ee33
                </motion.div>
              ))}
              
              {/* Selector simple de idioma en móvil (solo aparece en el menú) */}
              <motion.div
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: -15, opacity: 0 }
                }}
                className="mt-3 px-4 py-3 border-t border-white/10"
              >
                <SimpleLanguageSelector />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      </AnimatePresence>
    </>
  );
};
