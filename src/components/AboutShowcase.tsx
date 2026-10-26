"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { CountUp } from "./CountUp";

export const AboutShowcase: React.FC = () => {
  return (
    <section id="about" className="flex flex-col w-full items-center gap-12 md:gap-16 pt-16">
      {/* Introduction Title & Subtitle */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 space-y-4 max-w-5xl text-center md:text-left">
        <span
          data-aos="fade-up"
          className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-darker block"
        >
          About Us
        </span>
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-light text-gray-900 leading-tight"
        >
          National Polymers LLC FZ
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-base md:text-lg leading-relaxed text-gray-700"
        >
          National Polymers LLC FZ is a Global distribution &amp; Trading company involved
          in plastic raw materials. We deal in all kinds of Prime, Near Prime, Off Grade Resins.
          We also deal in Recycle granules, regrinds and waste.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-sm md:text-base leading-relaxed text-gray-600"
        >
          We currently buy from USA, Canada, Australia, Far East Countries and sell polymers to
          Indian Sub-Continent, African, European &amp; Latin American Countries. National
          Polymers FZ LLC stands for quality, trust, authenticity, integrity, and ethical
          values in Polymer Distribution.
        </p>
      </div>

      {/* 21 Years Badge + Office Photo Container */}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="container mx-auto px-5 sm:px-6 lg:px-8"
      >
        <div className="bg-gray-50 flex flex-col md:flex-row justify-between items-center w-full min-h-[460px] md:h-[30rem] lg:h-[34rem] xl:h-[38rem] overflow-hidden shadow-sm">
          {/* Left Column: 21 Years Badge & Description */}
          <div className="flex flex-col justify-center gap-6 w-full md:w-7/12 lg:w-5/12 p-8 md:p-12 lg:pl-16">
            {/* Animated 21 Years Badge */}
            <div className="flex items-center justify-center md:justify-start w-full">
              <div
                className="relative inline-grid place-items-center select-none w-64 h-64 sm:w-72 sm:h-72 group cursor-pointer"
                aria-label="21 Years badge"
              >
                {/* Background Anniversary Badge Graphics */}
                <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src="https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fyear_badge.png&w=1024&q=80"
                    alt="21 Years Experience Badge"
                    fill
                    className="object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                {/* Animated Count-up Numbers & Label */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div
                    className="text-[5.5rem] sm:text-[7rem] leading-none font-light text-primary transition-transform duration-300 group-hover:scale-105"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <CountUp end={21} start={0} duration={2000} />
                  </div>
                  <div className="text-sm sm:text-base mt-2 text-gray-500 uppercase tracking-[0.3em] font-medium leading-tight">
                    Years of <br /> Industrial Experience
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed text-center md:text-left">
              National Polymers LLC FZ has become a brand-name in the polymer trading
              industry, delivering excellence and transparent sourcing globally.
            </p>

            {/* Circular Arrow Button with Animated Hover Ring */}
            <Link
              href="#contact"
              className="group inline-flex items-center gap-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
              aria-label="Find out more about National Polymers"
            >
              <span>Connect With Our Team</span>
              <div className="relative w-12 h-12 rounded-full grid place-items-center">
                <svg
                  viewBox="0 0 144 144"
                  className="w-full h-full -rotate-90 absolute inset-0"
                >
                  <circle
                    cx="72"
                    cy="72"
                    r="49"
                    strokeWidth="3.5"
                    stroke="#000000"
                    fill="none"
                    strokeDasharray="0 308"
                    strokeDashoffset="39"
                    className="transition-all duration-300 group-hover:[stroke-dasharray:231_77] group-hover:stroke-primary"
                  />
                </svg>
                <div className="w-full h-full flex justify-center items-center p-2 transition-transform duration-300 group-hover:translate-x-1">
                  <Icon
                    name="arrow-right"
                    className="w-5 h-5 text-gray-900 group-hover:text-primary transition-colors"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: Office Image */}
          <div className="relative h-72 md:h-full w-full md:w-5/12 lg:w-7/12 overflow-hidden group">
            <Image
              src="https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Foffices%2Fflags.jpeg&w=1536&q=70"
              alt="National Polymers Global Presence"
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
