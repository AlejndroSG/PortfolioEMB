"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { useLanguage } from "../contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div id="about" className="pb-20 pt-36 overflow-hidden">
      {/**
       *  UI: Spotlights
       *  Link: https://ui.aceternity.com/components/spotlight
       */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[90vh] w-[60vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[90vh] w-[60vw]" fill="blue" />
        <Spotlight
          className="-left-20 top-[60vh] h-[50vh] w-[40vw]"
          fill="purple"
        />
      </div>

      {/**
       *  UI: grid
       *  change bg color to bg-black-100 and reduce grid color from
       *  0.2 to 0.03
       */}
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        {/*degradado radial para que el contenedor tenga un aspecto descolorido.*/}
        <div
          // chnage the bg to bg-black-100, so it matches the bg color and will blend in
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80 mb-2 font-bold">
            {t("hero.commitment")}
          </p>

          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}
          <div className="backdrop-blur-sm bg-black/10 p-6 rounded-2xl border border-white/5 shadow-xl">
            <TextGenerateEffect
              words={t("hero.title")}
              className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold"
            />
          </div>

          <p className="text-center md:tracking-wider my-6 text-sm md:text-lg lg:text-2xl">
            {t("hero.greeting")}{" "}
            <span className="text-purple font-bold">{t("hero.role")}</span>
          </p>

          <div 
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                // Calcular offset para navbar
                const navbarHeight = window.innerWidth < 640 ? 70 : 80;
                const additionalOffset = 20;
                
                const yPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - additionalOffset;
                
                window.scrollTo({
                  top: yPosition,
                  behavior: 'smooth'
                });
              }
            }} 
            className="mt-4 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <MagicButton
              title={t("hero.projectsButton")}
              icon={<FaLocationArrow />}
              position="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;