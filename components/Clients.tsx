"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteCards";
import { companies, testimonials } from "@/data";
import { useLanguage } from "../contexts/LanguageContext";

const Clients = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        {t("testimonials.title")}{" "}
        <span className="text-purple">{t("testimonials.subtitle")}</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials.map((item, index) => ({
              id: index + 1,
              quote: t(`testimonials.testimonial${index + 1}.quote`),
              name: t(`testimonials.testimonial${index + 1}.name`),
              title: t(`testimonials.testimonial${index + 1}.title`),
            }))}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <img
                  src={company.img}
                  alt={company.name}
                  className="md:w-10 w-5"
                />
                <img
                  src={company.nameImg}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
