"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./MovingBorders";
import { IconX } from "@tabler/icons-react";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
  
  const handleHover = (id: number | null) => {
    setIsHovered(id);
  };

  return (
    <div className="w-full h-full p-5 sm:p-8 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto gap-3 sm:gap-5 md:gap-8 lg:gap-10">
      {cards.map((card, i) => (
        <Button
          key={i}
          borderRadius="1.75rem"
          duration={8000}
          className={cn(
            card.className,
            isHovered === card.id ? "scale-[1.02] shadow-xl" : "",
            "transition-all duration-300 hover:shadow-2xl"
          )}
        >
          <div
            className={cn(
              "relative rounded-xl overflow-hidden",
              selected?.id === card.id ? "ring-2 ring-purple-500 ring-offset-2" : ""
            )}
            onMouseEnter={() => handleHover(card.id)}
            onMouseLeave={() => handleHover(null)}
          >
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                "relative overflow-hidden",
                selected?.id === card.id
                  ? "rounded-lg cursor-pointer absolute inset-0 h-3/4 w-full md:w-3/4 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40 bg-white dark:bg-gray-800 rounded-xl h-full w-full"
                  : "bg-white dark:bg-gray-800 rounded-xl h-full w-full"
              )}
              layout
              whileHover={selected?.id !== card.id ? { scale: 1.02 } : {}}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }
              }}
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <BlurImage card={card} />
            </motion.div>
          </div>
        </Button>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card }: { card: Card }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full aspect-[4/3] overflow-hidden">
      <Image
        src={card.thumbnail}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover object-center transition-all duration-500",
          loaded ? "blur-none scale-100" : "blur-md scale-105"
        )}
        alt={`Imagen de proyecto ${card.id}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  if (!selected) return null;
  
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-xl shadow-2xl relative z-[60]">
      <motion.div 
        className="absolute top-4 right-4 z-[80] p-2 rounded-full bg-white/80 dark:bg-gray-800/80 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconX size={18} className="text-gray-700 dark:text-gray-200" />
      </motion.div>
      
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.75,
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/80 to-black/95 backdrop-blur-sm z-10"
      />
      
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="relative px-8 py-8 z-[70] max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};

// Estilos para el scrollbar personalizado
// Agregar a globals.css
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,0.3);
  border-radius: 10px;
}
*/
