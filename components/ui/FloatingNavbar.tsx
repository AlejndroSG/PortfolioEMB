"use client";
import React, { useState, useEffect } from "react";
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
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

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

  // set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
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

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Efecto para manejar hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
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
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-8 py-4 rounded-2xl backdrop-blur-xl border dark:border-white/10 border-black/10 shadow-lg dark:shadow-purple-900/20 items-center justify-center space-x-4",
          className
        )}
        style={{
          backgroundColor: "rgba(17, 25, 40, 0.75)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center mr-6 group">
          <div className="relative w-8 h-8 mr-2 overflow-hidden transition-all duration-300 group-hover:scale-110">
            <Image 
              src="/emb-logo.svg" 
              alt="EMB Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-white/90 font-semibold text-base group-hover:text-white transition-colors">EMB</span>
        </Link>

        <div className="h-6 border-r border-white/10 mx-2 hidden sm:block"></div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((navItem: any, idx: number) => (
            <motion.div
              key={`link=${idx}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isProjectPage) {
                  router.push(`/${navItem.link}`);
                } else {
                  const targetId = navItem.link.substring(1);
                  const targetElement = document.getElementById(targetId);
                  
                  if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
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
              }}
              className={cn(
                "relative px-3 py-1.5 rounded-lg transition-all duration-200",
                "dark:text-white/90 text-neutral-700 hover:bg-white/10 dark:hover:bg-black/20 cursor-pointer"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm font-medium">{navItem.name}</span>
            </motion.div>
          ))}
        </nav>
        
        {/* Separador antes del toggle de tema */}
        <div className="flex-grow"></div>
        
        {/* Toggle de tema claro/oscuro */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 transition-all duration-200"
          aria-label="Cambiar tema"
        >
          {mounted ? (
            theme === "dark" ? (
              <IconSun className="h-5 w-5 text-yellow-300" />
            ) : (
              <IconMoon className="h-5 w-5 text-purple-700" />
            )
          ) : (
            // Placeholder transparente para evitar saltos de layout durante la hidratación
            <span className="h-5 w-5" />
          )}
        </motion.button>

      </motion.div>
    </AnimatePresence>
  );
};
