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

        {/* 4 Cards Grid Matching Reference Design with 3D Depth Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 xl:gap-7 perspective-1200">
          {whyCards.map((card, index) => (
            <div
              key={card.id}
              data-aos="3d-depth"
              data-aos-delay={index * 120}
              className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
            >
              {/* Top Image Section with Smooth Bottom Gradient Fade */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent pointer-events-none" />
              </div>

              {/* Floating Logo Emblem Badge */}
              <div className="-mt-7 ml-6 relative z-10 w-14 h-14 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center p-1.5">
                <div className="w-10 h-10 rounded-full bg-[#E95220] flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
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

                {/* Bottom Bar: Red Line, Faint 01 Number Watermark & Arrow Button */}
                <div className="mt-6 pt-2 flex items-center justify-between relative">
                  {/* Short Red Accent Line */}
                  <div className="h-[3px] w-10 bg-[#E95220] rounded-full" />

                  {/* Large Watermark Number */}
                  <span
                    className="absolute right-14 -bottom-1 font-montserrat text-5xl font-black text-slate-100/90 select-none tracking-tighter pointer-events-none transition-colors group-hover:text-slate-200/90"
                    aria-hidden="true"
                  >
                    {card.num}
                  </span>

                  {/* Circular Arrow Button */}
                  <Link
                    href={card.link}
                    aria-label={`Learn more about ${card.title}`}
                    className="relative z-10 w-10 h-10 rounded-full border border-[#0F3B82]/30 flex items-center justify-center text-[#0F3B82] bg-white group-hover:bg-[#0F3B82] group-hover:text-white group-hover:border-[#0F3B82] transition-all duration-300 shadow-2xs"
                  >
                    <Icon
                      name="arrow-right"
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Trading Network Map Section */}
        <GlobalTradingMapSection />
      </div>
    </section>
  );
};
