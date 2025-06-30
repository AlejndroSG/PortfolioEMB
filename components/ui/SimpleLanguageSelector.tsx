"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const SimpleLanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  return (
    <div className="flex flex-col space-y-2 w-[75%] m-auto">
      <div className="flex mt-3 space-x-3">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            className={`px-3 py-1.5 rounded-lg ${
              lang.code === language 
                ? "bg-purple-600/80 text-white ring-1 ring-white/20" 
                : "bg-slate-800/60 hover:bg-slate-700/60 text-white/80"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(lang.code as any)}
          >
            <div className="flex items-center space-x-1.5">
              <span>{lang.flag}</span>
              <span className="text-xs font-medium">{lang.code.toUpperCase()}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
