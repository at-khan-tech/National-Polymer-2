"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { MAJOR_BRANDS, BrandInfo } from "@/data/gradesCatalog";

interface SupplierLogo {
  id: number;
  src: string;
  alt: string;
}

const suppliers: SupplierLogo[] = [
  { id: 1, src: "/images/suppliers/1.png", alt: "Supplier Partner 1" },
  { id: 2, src: "/images/suppliers/2.png", alt: "Supplier Partner 2" },
  { id: 3, src: "/images/suppliers/3.jpeg", alt: "Supplier Partner 3" },
  { id: 4, src: "/images/suppliers/4.png", alt: "Supplier Partner 4" },
  { id: 5, src: "/images/suppliers/5.png", alt: "Supplier Partner 5" },
  { id: 6, src: "/images/suppliers/6.png", alt: "Supplier Partner 6" },
  { id: 7, src: "/images/suppliers/7.png", alt: "Supplier Partner 7" },
  { id: 8, src: "/images/suppliers/8.png", alt: "Supplier Partner 8" },
  { id: 9, src: "/images/suppliers/9.png", alt: "Supplier Partner 9" },
  { id: 10, src: "/images/suppliers/10.png", alt: "Supplier Partner 10" },
  { id: 11, src: "/images/suppliers/11.png", alt: "Supplier Partner 11" },
  { id: 12, src: "/images/suppliers/12.png", alt: "Supplier Partner 12" },
  { id: 13, src: "/images/suppliers/13.png", alt: "Supplier Partner 13" },
  { id: 14, src: "/images/suppliers/14.svg", alt: "Supplier Partner 14" },
  { id: 15, src: "/images/suppliers/15.webp", alt: "Supplier Partner 15" },
];

const getOriginDisplay = (origin: string) => {
  if (origin.includes("Saudi")) return "🇸🇦 Saudi Arabia";
  if (origin.includes("Korea")) return "🇰🇷 South Korea";
  if (origin.includes("USA") || origin.includes("United States")) return "🇺🇸 USA";
  if (origin.includes("Vietnam")) return "🇻🇳 Vietnam";
  if (origin.includes("Egypt")) return "🇪🇬 Egypt";
  return origin;
};

const HexagonBrandCard: React.FC<{ brand: BrandInfo; index: number }> = ({ brand, index }) => {
  // Alternate double-bond accent position across cards for authentic benzene ring resonance
  const isAlt = index % 2 === 1;

  return (
    <Link
      href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
      className="group relative flex flex-col items-center justify-between w-full h-full p-3 sm:p-4 md:p-5 select-none focus:outline-none transition-transform duration-300 hover:-translate-y-1.5 active:scale-95"
      aria-label={`View ${brand.name} candidate grades`}
    >
      {/* Chemical Hexagon Vector Background with Benzene Bond Accents */}
      <svg
        viewBox="0 0 280 260"
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_3px_8px_rgba(15,23,42,0.06)] group-hover:drop-shadow-[0_12px_24px_rgba(249,115,22,0.22)] transition-all duration-300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`hex-glow-${brand.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fff7ed" />
          </linearGradient>
        </defs>

        {/* Outer Hexagon Polygon (Polymer benzene ring) */}
        <polygon
          points="70,8 210,8 272,130 210,252 70,252 8,130"
          className="fill-white group-hover:fill-[url(#hex-glow-${brand.id})] stroke-slate-200 group-hover:stroke-primary transition-all duration-300"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Chemical Double Bond Inner Accent Lines (mirroring user's uploaded drawing) */}
        {!isAlt ? (
          <>
            {/* Top-left double bond */}
            <path
              d="M 24,126 L 76,22 L 140,22"
              fill="none"
              className="stroke-slate-300/80 group-hover:stroke-primary/70 transition-all duration-300"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bottom-right double bond */}
            <path
              d="M 256,134 L 204,238 L 140,238"
              fill="none"
              className="stroke-slate-200 group-hover:stroke-primary/40 transition-all duration-300"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Top-right double bond */}
            <path
              d="M 140,22 L 204,22 L 256,126"
              fill="none"
              className="stroke-slate-300/80 group-hover:stroke-primary/70 transition-all duration-300"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Bottom-left double bond */}
            <path
              d="M 24,134 L 76,238 L 140,238"
              fill="none"
              className="stroke-slate-200 group-hover:stroke-primary/40 transition-all duration-300"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>

      {/* Internal Content (Z-10 over SVG) */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full py-1 text-center">
        {/* Top: Origin Pill */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100/90 group-hover:bg-primary/10 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-slate-700 group-hover:text-primary transition-colors tracking-wide">
            {getOriginDisplay(brand.origin)}
          </span>
        </div>

        {/* Middle: Refinery Official Logo */}
        <div className="relative w-full h-10 sm:h-12 md:h-13 my-0.5 flex items-center justify-center px-3 sm:px-4">
          <Image
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            fill
            sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
            className="object-contain filter group-hover:scale-108 transition-transform duration-300 drop-shadow-2xs"
          />
        </div>

        {/* Bottom: Name, Categories & View Action */}
        <div className="w-full flex flex-col items-center">
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
            {brand.name}
          </h3>
          <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
            {brand.categories.join(" · ")}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-primary group-hover:gap-1.5 transition-all">
            <span>View Grades</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const SuppliersSection: React.FC = () => {
  // Split 9 brands: Row 1 has 5, Row 2 has 4 nestled between them
  const row1 = MAJOR_BRANDS.slice(0, 5);
  const row2 = MAJOR_BRANDS.slice(5, 9);

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* 1. Dubai Trading Desk Callout Box */}
        <div
          data-aos="card-3d-flip"
          className="group relative flex flex-col items-center gap-4 sm:gap-5 border border-gray-200 bg-gray-50/90 p-5 sm:p-6 md:p-8 text-center md:flex-row md:justify-between md:text-left rounded-2xl shadow-xs transition-all duration-300 overflow-hidden"
        >
          <div className="no-justify">
            <h3 className="text-lg sm:text-2xl font-normal text-gray-900 leading-snug">
              Need a specific grade, floor sweeping, regrind, or container volume?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
              Tell our Dubai trading desk what your manufacturing facility requires. Direct quotes in 4 business hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-fit justify-center shrink-0 items-center gap-2 bg-primary px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-primary-darker rounded-xl shadow-xs active:scale-95 text-center"
          >
            <span>Contact Us</span>
            <Icon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* 2. Major Petrochemical Producers & Clickable Brands Hexagonal Honeycomb */}
        <div data-aos="fade-up" className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200/80 w-full">
          {/* Section Header with Decorative Chemical 3-Hexagon Cluster Icon */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-darker text-[11px] font-bold uppercase tracking-wider mb-3">
              {/* Exact 3-hexagon chemical cluster icon mirroring user's sketch */}
              <svg className="w-4 h-4 shrink-0 text-primary" viewBox="0 0 120 120" fill="none">
                <polygon points="25,10 55,10 70,36 55,62 25,62 10,36" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
                <path d="M 16,35 L 28,15 L 45,15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points="25,62 55,62 70,88 55,114 25,114 10,88" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
                <path d="M 64,88 L 52,108 L 35,108" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points="70,36 100,36 115,62 100,88 70,88 55,62" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
                <path d="M 109,62 L 97,42 L 80,42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <span>Major Manufacturer Allocations</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight leading-tight">
              Global Producer Partners &amp; Candidate Brands
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
              Direct refinery allocations in certified polymer honeycomb units. Click on any producer to browse verified candidate grades, technical data sheets (TDS), and container volume availability.
            </p>
          </div>

          {/* 2A. Interlocking Polymer Honeycomb Layout on Desktop (lg+) */}
          <div className="hidden lg:block w-full max-w-5xl mx-auto mb-12">
            {/* Row 1: 5 Hexagons */}
            <div className="flex justify-center items-center gap-4 xl:gap-5">
              {row1.map((brand, idx) => (
                <div key={brand.id} className="w-[195px] xl:w-[215px] aspect-[280/260] shrink-0">
                  <HexagonBrandCard brand={brand} index={idx} />
                </div>
              ))}
            </div>

            {/* Row 2: 4 Hexagons nestled right into the interlocking gaps */}
            <div className="flex justify-center items-center gap-4 xl:gap-5 -mt-6 xl:-mt-8">
              {row2.map((brand, idx) => (
                <div key={brand.id} className="w-[195px] xl:w-[215px] aspect-[280/260] shrink-0">
                  <HexagonBrandCard brand={brand} index={idx + 5} />
                </div>
              ))}
            </div>
          </div>

          {/* 2B. Responsive Hexagon Grid on Mobile & Tablet (< lg) */}
          <div className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10 max-w-2xl mx-auto">
            {MAJOR_BRANDS.map((brand, idx) => (
              <div key={brand.id} className="w-full aspect-[280/260] max-w-[220px] mx-auto">
                <HexagonBrandCard brand={brand} index={idx} />
              </div>
            ))}
          </div>

          {/* Continuous Infinite Smooth Auto-Scrolling Marquee Slider */}
          <div className="relative w-full overflow-hidden py-2 before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-8 sm:before:w-24 before:bg-gradient-to-r before:from-white before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-8 sm:after:w-24 after:bg-gradient-to-l after:from-white after:to-transparent">
            <div className="animate-marquee-left flex items-center gap-4 sm:gap-6">
              {[...suppliers, ...suppliers].map((supplier, idx) => (
                <div
                  key={`${supplier.id}-${idx}`}
                  className="flex h-16 w-32 sm:h-22 sm:w-40 shrink-0 items-center justify-center rounded-xl border border-gray-200/70 bg-white p-3 sm:p-4 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={supplier.src}
                      alt={supplier.alt}
                      fill
                      sizes="(max-width: 640px) 120px, 160px"
                      className="object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
