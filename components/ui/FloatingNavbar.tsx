"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const isProjectPage = pathname.includes('/proyecto/');

  // Estado para la visibilidad del navbar al hacer scroll
  const [visible, setVisible] = useState(true);
  
  // Estado para el menú hamburguesa en móviles
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Manejar navegación (cerrar menú después de elegir)
  const handleNavigation = (navItem: any, idx: number) => {
    setMobileMenuOpen(false);
    
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
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          "flex flex-wrap items-center justify-between w-[95%] sm:w-auto max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-5 sm:top-10 inset-x-0 mx-auto px-4 sm:px-8 py-3 sm:py-4 rounded-2xl backdrop-blur-xl border dark:border-white/10 border-black/10 shadow-lg dark:shadow-purple-900/20",
          className
        )}
        style={{
          backgroundColor: "rgba(17, 25, 40, 0.75)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 mr-1 sm:mr-2 overflow-hidden transition-all duration-300 group-hover:scale-110">
            <Image 
              src="/logofinal.jpg" 
              alt="EMB Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <span className="text-white/90 font-semibold text-sm sm:text-base group-hover:text-white transition-colors">EMB</span>
        </Link>

        {/* Divisor visible solo en desktop */}
        <div className="h-6 border-r border-white/10 mx-2 hidden md:block"></div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((navItem, idx) => (
            <motion.div
              key={`link-${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(navItem, idx)}
              className={cn(
                "relative px-3 py-1.5 rounded-lg transition-all duration-200",
                "text-white/90 hover:text-white hover:bg-white/10 cursor-pointer"
              )}
            >
              <span className="block lg:hidden">{navItem.icon}</span>
              <span className="hidden lg:block text-sm font-medium">{navItem.name}</span>
            </motion.div>
          ))}
        </nav>
        
        {/* Botón de menú hamburguesa (solo móvil) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
          className="block md:hidden ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Menú"
        >
          <div className="relative w-5 h-5 flex flex-col justify-between">
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
              className="h-[2px] w-full bg-white/90 rounded-full transform origin-left transition-transform"
            />
            <motion.span 
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className="h-[2px] w-full bg-white/90 rounded-full transition-opacity"
            />
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
              className="h-[2px] w-full bg-white/90 rounded-full transform origin-left transition-transform"
            />
          </div>
        </motion.button>
      </motion.div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed z-[4999] inset-x-0 mx-auto w-[90%] max-w-xs top-20 rounded-xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-lg"
            style={{
              backgroundColor: "rgba(17, 25, 40, 0.95)",
            }}
          >
            <motion.nav
              className="flex flex-col py-3 px-2"
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
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {navItem.icon && <span className="text-white/80">{navItem.icon}</span>}
                  <span className="font-medium text-white/90">{navItem.name}</span>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
