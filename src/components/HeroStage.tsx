"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

const heroImages = [
  {
    src: "/images/hero/hero1.png",
    alt: "Petrochemical refining and polymer manufacturing plant",
    tagline: "Global Polymer Distribution",
    title: "World-Class Polymer Supply & Trading",
    subtitle:
      "Connecting premier global petrochemical producers with leading plastic manufacturers worldwide.",
  },
  {
    src: "/images/hero/hero2.png",
    alt: "Multimodal logistics and polymer raw materials distribution",
    tagline: "Multimodal Supply Chain",
    title: "Reliable Global Logistics & Express Delivery",
    subtitle:
      "Delivering prime, near-prime, and engineering resins with seamless ocean, air, and inland freight.",
  },
  {
    src: "/images/hero/hero3.png",
    alt: "Deep-sea container shipping terminal and maritime network",
    tagline: "International Trade Reach",
    title: "Connecting Continents with High-Grade Polymers",
    subtitle:
      "Strategic sourcing from USA, Canada, Australia & Far East to reliably supply global manufacturing hubs.",
  },
  {
    src: "/images/hero/hero4.png",
    alt: "Advanced polymer compounding and manufacturing facility",
    tagline: "Industrial Grade Solutions",
    title: "Tailored Engineering Resins & Raw Materials",
    subtitle:
      "High-performance polymer grades formulated for injection molding, extrusion, packaging, and automotive.",
  },
  {
    src: "/images/hero/hero5.png",
    alt: "Virgin polymer pellets and recycled circular materials",
    tagline: "Virgin & Circular Polymers",
    title: "Prime Resins, Recycled Granules & Regrinds",
    subtitle:
      "Committed to quality and circularity with sustainable virgin, off-grade, and recycled plastic materials.",
  },
];

export const HeroStage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [currentSlide]);

  return (
    <section
      id="home"
      className="relative h-[65vh] w-full overflow-hidden bg-black sm:h-[75vh] md:h-[95vh]"
      aria-label="National Polymers highlights"
    >
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${
                currentSlide === index ? "hero-carousel-zoom-out" : ""
              }`}
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
        <div className="h-1/3 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
        <div className="h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
      </div>

      <div className="relative z-20 flex h-full w-full flex-col items-start justify-end px-5 pb-8 text-white sm:pb-12 md:px-12 md:pb-14">
        <h1 className="sr-only">
          National Polymers FZ LLC — Global Distribution &amp; Trading in Plastic Raw Materials
        </h1>

        {/* Dynamic Slide Overlay Text */}
        <div className="relative w-full max-w-3xl min-h-[100px] sm:min-h-[120px] md:min-h-[135px]">
          {heroImages.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={slide.src}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0 relative z-10"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none z-0"
                }`}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[11px] sm:text-xs font-medium uppercase tracking-wider text-primary-lighter backdrop-blur-md mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {slide.tagline}
                </div>

                <h2 className="max-w-[85vw] text-xl font-bold leading-tight drop-shadow-md sm:text-2xl md:text-3xl lg:text-4xl text-white">
                  {slide.title}
                </h2>

                <p className="mt-1.5 max-w-xl text-xs sm:text-sm md:text-base text-gray-200/90 font-normal drop-shadow leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex max-w-full flex-wrap gap-2 sm:gap-3 md:mt-6 md:gap-4">
          <a
            href="#material-finder"
            className="inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap bg-white px-4 py-2.5 text-xs font-semibold text-primary-darker shadow-lg transition-all hover:bg-gray-100 sm:px-6 sm:py-3.5 sm:text-sm"
          >
            Find a Material
            <Icon name="search" className="h-4 w-4 text-primary-darker" />
          </a>
          <Link
            href="#contact"
            className="inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap border border-white/80 bg-black/40 px-4 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-primary-darker sm:px-6 sm:py-3.5 sm:text-sm"
          >
            Enquiry Now
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        {/* Indicators and Navigation */}
        <div className="mt-6 flex items-center gap-4 md:mt-8">
          <div className="flex items-center gap-2" aria-label="Choose a hero image">
            {heroImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1} of ${heroImages.length}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white shadow-sm"
                    : "w-3 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setCurrentSlide((current) => (current - 1 + heroImages.length) % heroImages.length)
              }
              aria-label="Previous slide"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900"
            >
              <Icon name="arrow-back" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((current) => (current + 1) % heroImages.length)}
              aria-label="Next slide"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-white hover:text-gray-900"
            >
              <Icon name="arrow-forward" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
