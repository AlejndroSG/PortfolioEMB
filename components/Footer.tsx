import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          ¿Listo para llevar <span className="text-purple">tu</span> presencia
          digital al siguiente nivel?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Contáctanos hoy y hablemos sobre cómo podemos ayudarte
          a alcanzar tus objetivos.
        </p>
        <a href="mailto:contact@jsmastery.pro">
          <MagicButton
            title="Pongámonos en contacto"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2025 Equipo EMB
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
    </footer>
  );
};

export default Footer;
