"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

// Hero Slides with Brand Colors & Sizing
const heroSlides = [
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
      "text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] leading-[1.12] tracking-[-0.5px]",
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
      "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.4px]",
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
      "text-[22px] sm:text-[30px] md:text-[38px] lg:text-[42px] leading-[1.14] tracking-[-0.5px]",
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
      "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.4px]",
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
      "text-[22px] sm:text-[28px] md:text-[36px] lg:text-[40px] leading-[1.14] tracking-[-0.4px]",
    supportingText:
      "Explore polymer grades and available technical information.",
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
      className="relative min-h-[520px] h-[78vh] w-full overflow-hidden bg-[#F7F9FC] sm:min-h-[580px] sm:h-[84vh] md:h-[90vh]"
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

      {/* Gradient Readability Overlay - only at the bottom/content area, NOT reaching the top */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-[68%] sm:h-[62%] md:h-[58%] z-10 flex">
        <div className="h-full w-full sm:w-[78%] lg:w-[62%] bg-gradient-to-tr from-white via-white/85 to-transparent" />
        <div className="hidden lg:block flex-1 h-full bg-gradient-to-t from-white/40 via-transparent to-transparent" />
      </div>

      {/* Hero Content Container - aligned towards bottom */}
      <div className="relative z-20 flex h-full w-full flex-col justify-end px-4 sm:px-8 md:px-14 lg:px-20 pb-8 sm:pb-10 md:pb-12 pt-20">
        <h1 className="sr-only">
          National Polymers FZ LLC — Global Polymer Supply with Industrial Demand
        </h1>

        {/* Dynamic Slides Overlay Content - positioned slightly above the bottom buttons */}
        <div className="relative w-full max-w-xl lg:max-w-2xl mb-4 sm:mb-6 min-h-[150px] sm:min-h-[180px]">
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
                <h2 className={`font-montserrat font-[800] ${slide.headlineClass}`}>
                  {slide.headlineLines.map((line, lIdx) => (
                    <span key={lIdx} className={`${line.color} block`}>
                      {line.text}
                    </span>
                  ))}
                </h2>

                {/* Supporting Text */}
                <p className="mt-2.5 sm:mt-3 text-[13px] sm:text-[15px] md:text-[16px] text-[#5B6470] font-normal leading-relaxed max-w-lg no-justify">
                  {slide.supportingText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: Anchored firmly at the bottom of hero section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto z-20 mb-4 sm:mb-5">
          {/* Primary Button */}
          <Link
            href={currentSlideData.primaryCta.href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-white shadow-md transition-all hover:bg-primary-darker hover:shadow-lg active:scale-95 text-center cursor-pointer"
          >
            {currentSlideData.primaryCta.label}
          </Link>

          {/* Secondary Button */}
          <Link
            href={currentSlideData.secondaryCta.href}
            className="inline-flex items-center justify-center rounded-lg border-2 border-navy bg-white/95 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-[15px] font-semibold text-navy shadow-xs transition-all hover:bg-navy hover:text-white hover:shadow-md active:scale-95 text-center cursor-pointer"
          >
            {currentSlideData.secondaryCta.label}
          </Link>
        </div>

        {/* Indicators (Slide Pagination Dots) */}
        <div className="flex items-center z-20">
          <div className="flex items-center gap-2" aria-label="Choose a hero slide">
            {heroSlides.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Show slide ${index + 1} of ${heroSlides.length}`}
                aria-current={currentSlide === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index
                    ? "w-8 bg-primary shadow-sm"
                    : "w-3 bg-gray-400/60 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
