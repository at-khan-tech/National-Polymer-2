"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { GlobalTradingMapSection } from "./WorldMap";

interface WhyCard {
  id: string;
  num: string;
  image: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const whyCards: WhyCard[] = [
  {
    id: "sourcing",
    num: "01",
    image: "/images/why/why1.png",
    title: "Global Sourcing & Worldwide Selling",
    description:
      "We buy directly from USA, Canada, Australia and Far East countries, supplying polymers reliably across Indian Sub-Continent, African, European & Latin American markets.",
    icon: "globe",
    link: "/markets",
  },
  {
    id: "solutions",
    num: "02",
    image: "/images/why/why2.png",
    title: "One Window Polymer Solution",
    description:
      "Providing complete raw material options: Prime, Near Prime, Off-Grade, Floor Sweeping, reprocessed materials, recycled granules, regrinds and plant wastes.",
    icon: "workflow",
    link: "/solutions",
  },
  {
    id: "ethics",
    num: "03",
    image: "/images/why/why3.png",
    title: "Trust, Authenticity & Ethical Values",
    description:
      "National Polymers FZ LLC has become a trusted brand name standing for uncompromising quality, ethical transparency, and dependable delivery schedules.",
    icon: "rays",
    link: "/about",
  },
  {
    id: "team",
    num: "04",
    image: "/images/why/why4.png",
    title: "Professional Results Driven Team",
    description:
      "Qualified traders, consultants, managers, and quality control technicians capable of effective planning and execution in accordance with your exact specifications.",
    icon: "handshake",
    link: "/contact",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="services"
      aria-label="Why Choose National Polymers"
      className="flex flex-col w-full items-center py-12 sm:py-18 lg:py-24 bg-gray-50/50 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] flex flex-col gap-10 sm:gap-14">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <span
            data-aos="fade-up"
            className="text-[10px] sm:text-[12px] font-bold uppercase tracking-[2px] text-primary block"
          >
            Our Core Strengths
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-montserrat text-2xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight tracking-tight"
          >
            Why Choose National Polymers FZ LLC?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-xs sm:text-base text-[#5B6470] max-w-2xl mx-auto leading-relaxed pt-1"
          >
            Delivering global polymer distribution excellence through direct
            producer allocations, transparent trade execution, and reliable
            destination logistics.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 xl:gap-7 perspective-1200">
          {whyCards.map((card, index) => {
            const aosType =
              index === 0
                ? "card-3d-left"
                : index === 3
                ? "card-3d-right"
                : "card-3d-depth";
            return (
              <div
                key={card.id}
                data-aos={aosType}
                data-aos-delay={index * 100}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden hover-card-3d"
              >
                {/* Top Image Section */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Floating Logo Emblem Badge */}
                <div className="-mt-6 ml-5 sm:-mt-7 sm:ml-6 relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-xs">
                    <Icon name={card.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="px-5 pt-2 pb-5 sm:px-6 sm:pt-3 sm:pb-6 flex flex-col flex-1 justify-between text-left">
                  <div>
                    <h3 className="font-montserrat text-base sm:text-[19px] font-bold leading-snug text-navy group-hover:text-primary transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#5B6470] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Bar: Line & Arrow */}
                  <div className="mt-5 pt-2 flex items-center justify-between relative">
                    <div className="h-[3px] w-10 group-hover:w-16 bg-gradient-to-r from-primary to-primary-darker rounded-full transition-all duration-300" />

                    <span
                      className="absolute right-12 -bottom-1 font-montserrat text-4xl sm:text-5xl font-black text-slate-100 select-none tracking-tighter pointer-events-none transition-all duration-300 group-hover:text-slate-200"
                      aria-hidden="true"
                    >
                      {card.num}
                    </span>

                    <Link
                      href={card.link}
                      aria-label={`Learn more about ${card.title}`}
                      className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 bg-white group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-2xs"
                    >
                      <Icon
                        name="arrow-right"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Trading Network Map Section */}
        <GlobalTradingMapSection />
      </div>
    </section>
  );
};
