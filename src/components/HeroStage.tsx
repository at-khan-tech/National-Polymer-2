"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

// 1. Classic Hero Slides (Original Design for Comparison Toggle)
const classicHeroSlides = [
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
    src: "/images/hero/hero3.png?v=2",
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

// 2. New Hero Slides (Refined Font Sizes, Brand Colours & Spacing)
const newHeroSlides = [
  {
    src: "/images/hero/hero1.png",
    alt: "Petrochemical refining and polymer manufacturing plant",
    headlineLines: [
      { text: "Connecting", color: "text-navy" },
      { text: "Global Polymer", color: "text-primary" },
      { text: "Supply with", color: "text-navy" },
      { text: "Industrial Demand", color: "text-navy" },
    ],
    headlineClass:
      "text-[26px] sm:text-[34px] md:text-[40px] lg:text-[46px] leading-[1.12] tracking-[-0.6px]",
    supportingText: "Reliable sourcing. Right grades. Worldwide reach.",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero2.png",
    alt: "Multimodal logistics and polymer raw materials distribution",
    headlineLines: [
      { text: "Premium", color: "text-navy" },
      { text: "Polymer Materials", color: "text-primary" },
      { text: "for Diverse Applications", color: "text-navy" },
    ],
    headlineClass:
      "text-[25px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.14] tracking-[-0.5px]",
    supportingText:
      "Discover polymer grades for diverse industrial applications.",
    primaryCta: { label: "Explore Our Products", href: "/products" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero3.png?v=2",
    alt: "Deep-sea container shipping terminal and maritime network",
    headlineLines: [
      { text: "Global Sourcing.", color: "text-navy" },
      { text: "Reliable Supply Chain.", color: "text-primary" },
    ],
    headlineClass:
      "text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-[1.14] tracking-[-0.6px]",
    supportingText: "Connecting key markets across the world.",
    primaryCta: { label: "Explore Our Markets", href: "/markets" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero4.png",
    alt: "Advanced polymer compounding and manufacturing facility",
    headlineLines: [
      { text: "Modern", color: "text-navy" },
      { text: "Processing.", color: "text-navy" },
      { text: "Consistent Quality.", color: "text-primary" },
    ],
    headlineClass:
      "text-[25px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.14] tracking-[-0.5px]",
    supportingText:
      "Explore materials and sourcing solutions for industrial applications.",
    primaryCta: { label: "Explore Solutions", href: "/solutions" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero5.png",
    alt: "Virgin polymer pellets and recycled circular materials",
    headlineLines: [
      { text: "Material Quality", color: "text-navy" },
      { text: "You Can Rely On", color: "text-primary" },
    ],
    headlineClass:
      "text-[25px] sm:text-[32px] md:text-[38px] lg:text-[42px] leading-[1.14] tracking-[-0.5px]",
    supportingText:
      "Explore polymer grades and available technical information.",
    primaryCta: { label: "Find a Grade", href: "/enquiry" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
];

export const HeroStage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Toggle state to compare before & now: "new" (Light & Brand colors) vs "classic" (Original dark overlay)
  const [heroDesign, setHeroDesign] = useState<"new" | "classic">("new");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % newHeroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [currentSlide]);

  return (
    <section
      id="home"
      className="relative min-h-[620px] h-[78vh] w-full overflow-hidden bg-[#F7F9FC] sm:h-[84vh] md:h-[90vh]"
      aria-label="National Polymers Hero Slider"
    >
      {/* Design Comparison Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-1.5 rounded-full bg-white/95 p-1 shadow-md backdrop-blur-md border border-gray-200">
        <button
          type="button"
          onClick={() => setHeroDesign("classic")}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
            heroDesign === "classic"
              ? "bg-navy text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          title="Switch to previous dark hero design"
        >
          Previous (Dark)
        </button>
        <button
          type="button"
          onClick={() => setHeroDesign("new")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
            heroDesign === "new"
              ? "bg-primary text-white shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          title="Switch to new light & brand colors hero design"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          New (Brand Colors)
        </button>
      </div>

      {/* 5 Background Slide Images with Existing Zoom-Out Animation */}
      <div className="absolute inset-0 z-0">
        {newHeroSlides.map((image, index) => (
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
              className={`object-cover object-right md:object-center ${
                currentSlide === index ? "hero-carousel-zoom-out" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Overlays: Adapts based on Toggle */}
      {heroDesign === "new" ? (
        // New Design: Subtle white-to-transparent gradient on left for 100% text readability
        <div className="pointer-events-none absolute inset-0 z-10 flex">
          <div className="h-full w-full sm:w-[70%] lg:w-[54%] bg-gradient-to-r from-white/95 via-white/85 to-transparent backdrop-blur-[0.5px]" />
          <div className="hidden lg:block flex-1 h-full bg-gradient-to-l from-black/10 via-transparent to-transparent" />
        </div>
      ) : (
        // Classic Design: Full dark gradient overlays
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
          <div className="h-1/3 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
          <div className="h-2/3 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
        </div>
      )}

      {/* Hero Content Container with comfortable top headroom & bottom padding */}
      <div className="relative z-20 flex h-full w-full flex-col justify-center px-5 sm:px-8 md:px-14 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14">
        <h1 className="sr-only">
          National Polymers FZ LLC — Global Polymer Supply with Industrial Demand
        </h1>

        {/* Dynamic Slides Overlay Content */}
        <div className="relative w-full max-w-xl lg:max-w-2xl min-h-[260px] sm:min-h-[290px] flex flex-col justify-center my-auto">
          {heroDesign === "new" ? (
            // ==================== NEW DESIGN SLIDES ====================
            newHeroSlides.map((slide, index) => {
              const isActive = currentSlide === index;
              return (
                <div
                  key={`new-${slide.src}`}
                  className={`transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 relative z-10"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none z-0"
                  }`}
                >
                  {/* Multi-line Colored Headline with refined balanced font sizes */}
                  <h2
                    className={`font-montserrat font-[800] ${slide.headlineClass}`}
                  >
                    {slide.headlineLines.map((line, lIdx) => (
                      <span key={lIdx} className={`${line.color} block`}>
                        {line.text}
                      </span>
                    ))}
                  </h2>

                  {/* Supporting Text */}
                  <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] text-[#5B6470] font-normal leading-[1.6] max-w-lg">
                    {slide.supportingText}
                  </p>

                  {/* Action Buttons brought lower with generous top margin */}
                  <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-wrap items-center gap-3 sm:gap-4">
                    {/* Primary Button */}
                    <Link
                      href={slide.primaryCta.href}
                      className="inline-flex items-center justify-center rounded-[8px] bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-primary-darker hover:shadow-lg active:scale-95"
                    >
                      {slide.primaryCta.label}
                    </Link>

                    {/* Secondary Button */}
                    <Link
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-[8px] border-2 border-navy bg-white px-6 py-3.5 text-[15px] font-semibold text-navy shadow-sm transition-all hover:bg-navy hover:text-white hover:shadow-md active:scale-95"
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            // ==================== CLASSIC (ORIGINAL) SLIDES ====================
            classicHeroSlides.map((slide, index) => {
              const isActive = currentSlide === index;
              return (
                <div
                  key={`classic-${slide.src}`}
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

                  <h2 className="max-w-[85vw] text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md text-white">
                    {slide.title}
                  </h2>

                  <p className="mt-2 max-w-xl text-xs sm:text-sm md:text-base text-gray-200 font-normal drop-shadow leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                    <a
                      href="#material-finder"
                      className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-primary-darker shadow-lg transition-all hover:bg-gray-100 rounded"
                    >
                      Find a Material
                      <Icon
                        name="search"
                        className="h-4 w-4 text-primary-darker"
                      />
                    </a>
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 border border-white/80 bg-black/40 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white hover:text-primary-darker rounded"
                    >
                      Enquiry Now
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Indicators (Slide Pagination Dots only - bottom arrows removed) */}
        <div className="mt-6 sm:mt-8 flex items-center">
          <div
            className="flex items-center gap-2"
            aria-label="Choose a hero slide"
          >
            {newHeroSlides.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1} of ${newHeroSlides.length}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? heroDesign === "new"
                      ? "w-8 bg-primary shadow-sm"
                      : "w-8 bg-white shadow-sm"
                    : heroDesign === "new"
                    ? "w-3 bg-gray-400/60 hover:bg-gray-600"
                    : "w-3 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
