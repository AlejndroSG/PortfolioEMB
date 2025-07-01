
"use client";


import { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaGlobe } from 'react-icons/fa';


const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];


export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];


  const handleLanguageChange = (newLocale: string) => {
    //elimina la configuración regional del idiomaactual de la ruta y agrega la nueva
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);

  };


  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white/90 hover:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:block text-sm font-medium">{currentLanguage.name}</span>
        <FaChevronDown 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/*backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-[rgba(17,25,40,0.95)] backdrop-blur-xl border border-white/10 rounded-xl shadow-lg z-50 "
            >
              <div className="py-2">
                {languages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                      currentLocale === language.code 
                        ? 'text-purple-400 bg-white/5' 
                        : 'text-white/90 hover:text-white'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                    {currentLocale === language.code && (
                      <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
  
}
