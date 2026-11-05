"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Hero Slides with Brand Colors & Sizing
const heroSlides = [
  {
    src: "/images/hero/hero1.png",
    alt: "Petrochemical refining and polymer manufacturing plant",
    headlineLines: [
      { text: "Connecting", color: "text-navy" },
      { text: "Global Polymer", color: "text-primary" },
      { text: "Supply", color: "text-navy" },
    ],
    headlineClass:
      "text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight",
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
      { text: "Worldwide", color: "text-navy" },
    ],
    headlineClass:
      "text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight",
    supportingText:
      "Discover polymer grades for diverse industrial applications.",
    primaryCta: { label: "Explore Products", href: "/products" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero3.png?v=2",
    alt: "Deep-sea container shipping terminal and maritime network",
    headlineLines: [
      { text: "Global Sourcing.", color: "text-navy" },
      { text: "Reliable Supply", color: "text-primary" },
      { text: "Chain Network", color: "text-navy" },
    ],
    headlineClass:
      "text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight",
    supportingText: "Connecting key polymer markets across the world.",
    primaryCta: { label: "Explore Markets", href: "/markets" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
  {
    src: "/images/hero/hero4.png",
    alt: "Advanced polymer compounding and manufacturing facility",
    headlineLines: [
      { text: "Modern Processing.", color: "text-navy" },
      { text: "Consistent Quality", color: "text-primary" },
      { text: "Polymers", color: "text-navy" },
    ],
    headlineClass:
      "text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight",
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
      { text: "You Can Rely On,", color: "text-primary" },
      { text: "Every Shipment", color: "text-navy" },
    ],
    headlineClass:
      "text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.12] tracking-tight",
    supportingText:
      "Explore verified polymer grades with full technical data.",
    primaryCta: { label: "Find a Grade", href: "/products#grades-explorer" },
    secondaryCta: { label: "Request a Quote", href: "/enquiry" },
  },
];

export const HeroStage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-[580px] h-[calc(100svh-64px)] sm:h-[84vh] md:h-[90vh] w-full overflow-hidden bg-[#F7F9FC]"
      aria-label="National Polymers Hero Slider"
    >
      {/* 5 Background Slide Images with Zoom-Out Animation */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((image, index) => (
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

      {/* Diminishing Multi-Stop Smooth Gradient Overlay */}
      {/* Diminishes continuously from bottom-left to top-right with zero hard cutoffs */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse 95% 82% at 6% 76%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 28%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.38) 68%, rgba(255,255,255,0.12) 82%, rgba(255,255,255,0) 100%),
            linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.75) 12%, rgba(255,255,255,0.2) 26%, rgba(255,255,255,0) 42%)
          `,
        }}
      />

      {/* Hero Content Container - aligned towards bottom */}
      <div className="relative z-20 flex h-full w-full flex-col justify-end px-4 sm:px-8 md:px-14 lg:px-20 pb-4 sm:pb-6 md:pb-8 pt-16 sm:pt-20">
        <h1 className="sr-only">
          National Polymers FZ LLC — Global Polymer Supply with Industrial Demand
        </h1>

        {/* Dynamic Slides Overlay Content - positioned slightly above the bottom buttons */}
        <div className="relative w-full max-w-xl lg:max-w-2xl mb-2 sm:mb-4 min-h-[160px] sm:min-h-[180px]">
          {heroSlides.map((slide, index) => {
            const isActive = currentSlide === index;
            return (
              <div
                key={`slide-${slide.src}`}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0 relative z-10"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none z-0"
                }`}
              >
                {/* Multi-line Colored Headline */}
                <h2 className={`font-montserrat font-[900] ${slide.headlineClass}`}>
                  {slide.headlineLines.map((line, lIdx) => (
                    <span key={lIdx} className={`${line.color} block`}>
                      {line.text}
                    </span>
                  ))}
                </h2>

                {/* Orange Rounded Accent Bar */}
                <div className="w-10 h-1 sm:w-12 sm:h-1.5 bg-primary rounded-full mt-2.5 mb-2.5 sm:mt-3 sm:mb-3" />

                {/* Supporting Text */}
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#4B5565] font-normal leading-relaxed max-w-sm sm:max-w-lg no-justify">
                  {slide.supportingText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Indicators (Slide Pagination Dots) - placed directly above bottom navbar */}
        <div className="flex items-center z-20 my-2.5 sm:my-3.5">
          <div className="flex items-center gap-2" aria-label="Choose a hero slide">
            {heroSlides.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1} of ${heroSlides.length}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  currentSlide === index
                    ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary ring-2 ring-primary/30"
                    : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons: Positioned as Bottom Navbar (side-by-side) */}
        <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-lg z-20">
          {/* Secondary Button: Request a Quote (Left) */}
          <Link
            href={currentSlideData.secondaryCta.href}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-navy bg-white/95 px-3 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm md:text-[15px] font-bold text-navy shadow-sm transition-all hover:bg-navy hover:text-white active:scale-95 text-center cursor-pointer group"
          >
            {/* Chat Bubble Icon with Dots */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-navy group-hover:text-white transition-colors"
              aria-hidden="true"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <circle cx="8" cy="12" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
              <circle cx="16" cy="12" r="0.9" fill="currentColor" stroke="none" />
            </svg>
            <span className="truncate">{currentSlideData.secondaryCta.label}</span>
          </Link>

          {/* Primary Button: Explore Products (Right) */}
          <Link
            href={currentSlideData.primaryCta.href}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm md:text-[15px] font-bold text-white shadow-md transition-all hover:bg-primary-darker active:scale-95 text-center cursor-pointer"
          >
            {/* 3D Isometric Box/Cube Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white"
              aria-hidden="true"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <span className="truncate">{currentSlideData.primaryCta.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
