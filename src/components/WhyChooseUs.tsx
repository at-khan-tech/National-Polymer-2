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
  tagline: string;
  hoverDetail: string;
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
    tagline: "Global Logistics & Sourcing",
    hoverDetail:
      "Direct refinery allocations from USA, Canada & Far East with CIF container delivery to 40+ worldwide ports.",
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
    tagline: "Complete Resin Portfolio",
    hoverDetail:
      "Full-spectrum Prime, Near-Prime, Off-Grade, Recycled pellets, regrinds, and plant scrap tailored for your extrusion needs.",
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
    tagline: "Authenticity & Integrity",
    hoverDetail:
      "Over 21 years of proven Dubai trade finance, transparent specs, certified grades, and zero-risk executions.",
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
    tagline: "Expert Polymer Trading Desk",
    hoverDetail:
      "Dedicated account managers assisting with grade selection, technical data sheets, and custom packaging options.",
    icon: "handshake",
    link: "/contact",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="services"
      aria-label="Why Choose National Polymers"
      className="flex flex-col w-full items-center py-16 sm:py-20 lg:py-24 bg-gray-50/50"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-[1320px] flex flex-col gap-12 sm:gap-14">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span
            data-aos="fade-up"
            className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[2px] text-[#E95220] block"
          >
            Our Core Strengths
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="50"
            className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F3B82] leading-tight tracking-tight"
          >
            Why Choose National Polymers FZ LLC?
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-sm sm:text-base text-[#5B6470] max-w-2xl mx-auto leading-relaxed pt-1"
          >
            Delivering global polymer distribution excellence through direct
            producer allocations, transparent trade execution, and reliable
            destination logistics.
          </p>
        </div>

        {/* 4 Cards Grid Matching Reference Design with 3D Depth & X/Y/Z Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 xl:gap-7 perspective-1200">
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
                data-aos-delay={index * 120}
                className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-400 overflow-hidden hover-card-3d hover:border-primary/40"
              >
                {/* Top Image Section with 3D Flip Glass Overlay */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                  {/* 3D Slide & Flip Glass Overlay on Card Image Hover */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 bg-gradient-to-t from-[#0F3B82]/95 via-[#0F3B82]/85 to-[#0F3B82]/40 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 [transform:perspective(600px)_rotateX(15deg)] group-hover:[transform:perspective(600px)_rotateX(0deg)] transition-all duration-400 ease-out text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#FF6B00]">
                      {card.tagline}
                    </span>
                    <p className="mt-1 text-xs text-white/95 font-medium leading-relaxed drop-shadow-xs">
                      {card.hoverDetail}
                    </p>
                    <Link
                      href={card.link}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-white uppercase tracking-wider transition-transform group-hover:translate-x-1"
                    >
                      <span>Explore details</span>
                      <Icon
                        name="arrow-right"
                        className="w-3.5 h-3.5 text-[#E95220]"
                      />
                    </Link>
                  </div>
                </div>

                {/* Floating Logo Emblem Badge with 3D Pop & Rotation */}
                <div className="-mt-7 ml-6 relative z-10 w-14 h-14 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <div className="w-10 h-10 rounded-full bg-[#E95220] flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:rotate-12">
                    <Icon name={card.icon} className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="px-6 pt-3 pb-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-montserrat text-lg sm:text-[19px] font-bold leading-snug text-[#0F3B82] group-hover:text-[#E95220] transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#5B6470] leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Bar: Animated Line, 3D Watermark & Flip Arrow */}
                  <div className="mt-6 pt-2 flex items-center justify-between relative">
                    {/* Short Accent Line extending on hover */}
                    <div className="h-[3px] w-10 group-hover:w-16 bg-gradient-to-r from-[#E95220] to-[#FF6B00] rounded-full transition-all duration-300" />

                    {/* Large Watermark Number with 3D Float */}
                    <span
                      className="absolute right-14 -bottom-1 font-montserrat text-5xl font-black text-slate-100/90 select-none tracking-tighter pointer-events-none transition-all duration-300 group-hover:text-slate-200/90 group-hover:-translate-y-1"
                      aria-hidden="true"
                    >
                      {card.num}
                    </span>

                    {/* Circular Arrow Button with 3D Rotate */}
                    <Link
                      href={card.link}
                      aria-label={`Learn more about ${card.title}`}
                      className="relative z-10 w-10 h-10 rounded-full border border-[#0F3B82]/30 flex items-center justify-center text-[#0F3B82] bg-white group-hover:bg-[#0F3B82] group-hover:text-white group-hover:border-[#0F3B82] group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-2xs"
                    >
                      <Icon
                        name="arrow-right"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45"
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
