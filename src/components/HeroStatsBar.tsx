"use client";

import React from "react";
import Image from "next/image";
import { CountUp } from "./CountUp";

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  badge?: string;
}

const stats: StatItem[] = [
  {
    id: "countries",
    value: 40,
    suffix: "+",
    label: "Countries served",
  },
  {
    id: "volume",
    value: 120,
    suffix: "k",
    label: "MT traded annually",
  },
  {
    id: "partners",
    value: 40,
    suffix: "+",
    label: "Producer partners",
  },
  {
    id: "experience",
    value: 21,
    suffix: "",
    label: "Years in polymers",
  },
];

export const HeroStatsBar: React.FC = () => {
  return (
    <section
      aria-label="Key Company Statistics"
      className="w-full bg-white border-y border-gray-200/80 shadow-xs relative z-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => {
            // Clean responsive grid dividers matching reference design
            const borderClasses = [
              // Mobile 2-column borders
              index % 2 === 0 ? "border-r" : "",
              index < 2 ? "border-b md:border-b-0" : "",
              // Desktop 4-column borders
              index < 3 ? "md:border-r" : "md:border-r-0",
              "border-gray-200/80",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={stat.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`group relative flex flex-col justify-center items-start py-8 sm:py-10 lg:py-12 px-6 sm:px-8 lg:px-10 transition-colors duration-300 hover:bg-slate-50/40 overflow-hidden ${borderClasses}`}
              >
                {/* Logo Watermark centered directly behind each individual stat text */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center p-2 select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="relative h-20 w-36 sm:h-24 sm:w-44 md:h-26 md:w-48 lg:h-28 lg:w-52 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity duration-300">
                    <Image
                      src="/images/logobg.png"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 180px, 220px"
                      className="object-contain object-center pointer-events-none"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Stat Content Layer (z-10 above the logo watermark) */}
                <div className="relative z-10 flex flex-col items-start w-full">
                  {/* Number with smooth count-up animation */}
                  <div className="flex items-baseline">
                    <span className="font-montserrat text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-gray-950 leading-none transition-colors duration-300 group-hover:text-primary">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={1800}
                      />
                    </span>
                  </div>

                  {/* Real Website Text Label */}
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-normal text-gray-500 leading-snug tracking-normal transition-colors duration-300 group-hover:text-gray-700">
                    {stat.label}
                  </p>
                </div>

                {/* Subtle primary accent bar on hover */}
                <div className="absolute bottom-0 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
