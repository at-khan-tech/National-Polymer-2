"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

const slides = [
  {
    title: "Reliable Polymer Supplier",
    tabSubtitle: "Global Distribution & Plastic Raw Materials",
  },
  {
    title: "Multinational Polymer Distribution",
    tabSubtitle: "Sourcing USA, Canada, Australia & Far East",
  },
  {
    title: "Professional Support & Solutions",
    tabSubtitle: "One Window Solution for Plastic Manufacturers",
  },
  {
    title: "Prime & Off-Grade Resins",
    tabSubtitle: "PE, PP, PVC, Recycled Granules & Regrinds",
  },
  {
    title: "Experienced Results Driven Team",
    tabSubtitle: "Traders, Consultants, QC & Marketers",
  },
  {
    title: "Quality, Trust & Authenticity",
    tabSubtitle: "Serving Indian Sub-Continent, Africa & Europe",
  },
];

const teamPhotos = [
  "/images/team/team-01.png",
  "/images/team/team-02.png",
  "/images/team/team-03.png",
  "/images/team/team-04.png",
  "/images/team/team-05.png",
  "/images/team/team-06.png",
  "/images/team/team-07.png",
  "/images/team/team-08.png",
  "/images/team/team-09.png",
  "/images/team/team-10.png",
  "/images/team/team-11.png",
  "/images/team/team-12.png",
  "/images/team/team-13.png",
];

export const HeroStage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const slideDuration = 6700; // 6.7 seconds
    const intervalTime = 50;
    const step = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <section
      id="home"
      className="w-full h-[65vh] sm:h-[75vh] md:h-[95vh] bg-white relative overflow-hidden"
    >
      {/* Background Watermark Ticker "National Polymers" */}
      <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden z-0 select-none">
        <div className="animate-marquee-left flex items-center whitespace-nowrap">
          <span className="opacity-10 text-gray-500 font-normal text-[14rem] md:text-[28rem] leading-none px-12">
            National Polymers
          </span>
          <span className="opacity-10 text-gray-500 font-normal text-[14rem] md:text-[28rem] leading-none px-12">
            National Polymers
          </span>
          <span className="opacity-10 text-gray-500 font-normal text-[14rem] md:text-[28rem] leading-none px-12">
            National Polymers
          </span>
          <span className="opacity-10 text-gray-500 font-normal text-[14rem] md:text-[28rem] leading-none px-12">
            National Polymers
          </span>
        </div>
      </div>

      {/* Foreground Team Cut-outs Marquee */}
      <div className="absolute inset-x-0 bottom-0 top-10 flex items-end overflow-hidden z-10 pointer-events-none">
        <div className="animate-marquee-right flex items-end -space-x-1 md:-space-x-2 h-full">
          {[...teamPhotos, ...teamPhotos].map((photoSrc, idx) => (
            <div
              key={idx}
              className="h-[80%] md:h-[92%] relative aspect-[600/949] shrink-0"
            >
              <Image
                src={photoSrc}
                alt={`National Polymers team member ${((idx % teamPhotos.length) + 1)
                  .toString()
                  .padStart(2, "0")}`}
                fill
                priority={idx < 5}
                sizes="(max-width: 768px) 300px, 500px"
                className="object-contain object-bottom drop-shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Top & Bottom Vignette Gradients */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
        <div className="h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 h-full w-full px-5 md:px-12 flex flex-col justify-end items-start pb-8 md:pb-12 text-white">
        <h1 className="sr-only">
          National Polymers FZ LLC — Global Distribution &amp; Trading in Plastic Raw Materials
        </h1>

        {/* Dynamic Title */}
        <div className="min-h-[60px] md:min-h-[100px] flex items-end">
          <p className="font-medium max-w-[90vw] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] drop-shadow-md transition-all duration-500 ease-out">
            {slides[currentSlide].title}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex max-w-full flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-6">
          <a
            href="#material-finder"
            className="inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap bg-white px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-primary-darker transition-all hover:bg-gray-100 shadow-lg"
          >
            Find a Material
            <Icon name="search" className="w-4 h-4 text-primary-darker" />
          </a>
          <Link
            href="#contact"
            className="inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap border border-white bg-black/30 px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white hover:text-primary-darker shadow-lg"
          >
            Enquiry Now
            <Icon name="arrow-right" className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom Slide Tabs & Circular Animated Progress Indicator */}
        <div className="w-full mt-6 md:mt-8 pt-4 border-t border-white/20 flex flex-row items-center justify-between gap-4">
          {slides.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={idx}
                onClick={() => handleSelectSlide(idx)}
                className={`flex-1 flex flex-row items-center gap-3 text-left transition-all cursor-pointer ${
                  isActive
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-75 hidden md:flex"
                }`}
              >
                {/* SVG Radial Progress Timer (Active tab) */}
                <div className="w-9 h-9 shrink-0 relative flex items-center justify-center">
                  <svg
                    viewBox="0 0 50 50"
                    className="w-full h-full -rotate-90"
                    fill="none"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="white"
                      strokeWidth="2"
                      className="opacity-20"
                    />
                    {isActive ? (
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="var(--color-primary, #AE872E)"
                        strokeWidth="3"
                        strokeDasharray="125.6"
                        strokeDashoffset={125.6 - (125.6 * progress) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-linear"
                      />
                    ) : (
                      <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="white"
                        strokeWidth="2"
                        className="opacity-10"
                      />
                    )}
                  </svg>
                  <span className="absolute text-[11px] font-semibold text-white">
                    0{idx + 1}
                  </span>
                </div>

                <div className="min-w-0">
                  <h4 className="line-clamp-1 text-xs md:text-sm font-medium text-white">
                    {slide.tabSubtitle}
                  </h4>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
