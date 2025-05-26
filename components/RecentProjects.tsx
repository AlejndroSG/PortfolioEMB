"use client";

import { FaLocationArrow } from "react-icons/fa6";
import OptimizedImage from "./ui/OptimizedImage";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <div id="projects" className="py-20">
      <div className="mb-16">
        <h1 className="heading bg-black-100 p-4 rounded-lg">
          Una pequeña selección de{" "}
          <span className="text-purple font-bold">proyectos recientes</span>
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title={item.title}
              href={`/proyecto/${item.id}`}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl group"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <OptimizedImage src="/bg.png" alt="bgimg" fill style={{ objectFit: 'cover' }} className="transition-transform duration-700 group-hover:scale-110" />
                </div>
                <OptimizedImage
                  src={item.img}
                  alt="cover"
                  width={300}
                  height={200}
                  className="z-10 absolute bottom-0 transition-transform duration-500 hover:scale-105"
                  style={{ objectFit: 'contain' }}
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <OptimizedImage src={icon} alt="icon5" width={20} height={20} className="p-2" style={{ width: 'auto', height: 'auto' }} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center bg-gradient-to-r from-purple/80 to-blue-500/80 px-4 py-2 rounded-lg hover:from-purple hover:to-blue-600 transition-all duration-300 group/details shadow-lg hover:shadow-purple/30 border border-white/10">
                  <p className="flex text-sm font-medium text-white">
                    Explorar Proyecto
                  </p>
                  <FaLocationArrow className="ms-2 group-hover/details:translate-x-1 transition-transform duration-300" color="white" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
