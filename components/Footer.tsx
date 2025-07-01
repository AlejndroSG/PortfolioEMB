"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        {/* <img
          // src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        /> */}
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          {t("footer.readyText")}{" "}
          <span className="text-purple">{t("footer.readyHighlight")}</span>
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          {t("footer.contactText")}
        </p>
        <a href="/contacto">
          <MagicButton
            title={t("footer.contactButton")}
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          {t("footer.copyright")}
        </p>

        <div className="flex md:flex-row flex-col md:items-center items-start md:mt-0 mt-8 gap-4">          
          <div className="flex items-center md:gap-4 gap-6">
            {socialMedia.map((info) => (
              <a
                key={info.id}
                href={info.link}
                aria-label={`Enlace a ${info.name}`}
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple/20 hover:border-purple/50 group relative overflow-hidden">
                  {/* Efecto de gradiente que aparece en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Imagen con efecto de zoom suave */}
                  <img 
                    src={info.img} 
                    alt={`${info.name} icon`} 
                    width={20} 
                    height={20} 
                    className="relative z-10 transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <span className="text-xs text-white/50 group-hover:text-white/90 transition-colors duration-300">{info.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
