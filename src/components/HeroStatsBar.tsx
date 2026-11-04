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
      <div className="container mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => {
            const borderClasses = [
              index % 2 === 0 ? "border-r" : "",
              index < 2 ? "border-b md:border-b-0" : "",
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
                className={`group relative flex flex-col justify-center items-center text-center py-6 sm:py-10 lg:py-12 px-2 sm:px-6 lg:px-8 transition-all duration-300 hover:bg-primary cursor-default overflow-hidden ${borderClasses}`}
              >
                {/* Logo Watermark */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center p-2 select-none overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="relative h-16 w-28 sm:h-24 sm:w-44 md:h-26 md:w-48 lg:h-28 lg:w-52 opacity-15 sm:opacity-20 group-hover:opacity-25 group-hover:brightness-0 group-hover:invert transition-all duration-300">
                    <Image
                      src="/images/logobg.png"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 140px, 220px"
                      className="object-contain object-center pointer-events-none"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Stat Content Layer */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-full no-justify">
                  <div className="flex items-baseline justify-center">
                    <span className="font-montserrat text-2xl sm:text-3xl lg:text-[42px] font-bold tracking-tight text-primary group-hover:text-white leading-none transition-colors duration-300">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        duration={1800}
                      />
                    </span>
                  </div>

                  <p className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-xs md:text-sm font-semibold text-navy group-hover:text-white leading-snug tracking-normal transition-colors duration-300 text-center">
                    {stat.label}
                  </p>
                </div>

                {/* Indicator bar */}
                <div className="absolute bottom-0 left-4 sm:left-8 right-4 sm:right-8 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
