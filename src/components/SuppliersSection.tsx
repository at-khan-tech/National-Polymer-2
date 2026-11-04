"use client";

import React, { useState } from "react";
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

const getOriginPill = (origin: string) => {
  if (origin.includes("Saudi")) return "sa Saudi Arabia";
  if (origin.includes("Korea")) return "kr South Korea";
  if (origin.includes("USA") || origin.includes("United States")) return "us USA";
  if (origin.includes("Vietnam")) return "vn Vietnam";
  if (origin.includes("Egypt")) return "eg Egypt";
  return origin;
};

interface TripletUnitProps {
  brands: [BrandInfo, BrandInfo, BrandInfo];
}

const TripletUnit: React.FC<TripletUnitProps> = ({ brands }) => {
  const [hoveredHex, setHoveredHex] = useState<number | null>(null);

  // Exact coordinates matching the user's reference diagram
  // Hex 1: Top-Left (Center 110, 94)
  // Hex 2: Bottom-Left (Center 110, 246)
  // Hex 3: Right (Center 242, 170)
  const hexPoints = [
    "66,18 154,18 198,94 154,170 66,170 22,94",
    "66,170 154,170 198,246 154,322 66,322 22,246",
    "198,94 286,94 330,170 286,246 198,246 154,170",
  ];

  const overlayStyles: React.CSSProperties[] = [
    { left: "6.3%", top: "5.3%", width: "50.3%", height: "44.7%" },
    { left: "6.3%", top: "50.0%", width: "50.3%", height: "44.7%" },
    { left: "44.0%", top: "27.6%", width: "50.3%", height: "44.7%" },
  ];

  return (
    <div className="relative w-full aspect-[350/340] max-w-[340px] xl:max-w-[360px] mx-auto select-none shrink-0">
      {/* SVG Canvas for 3 Hexagons with Bold Borders, Chemical Accents & Orange Contact Nodes */}
      <svg
        viewBox="0 0 350 340"
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
        preserveAspectRatio="none"
      >
        {/* Hexagon 1: Top-Left */}
        <polygon
          points={hexPoints[0]}
          className={`transition-colors duration-200 ${
            hoveredHex === 0
              ? "fill-orange-50/70 stroke-primary"
              : "fill-white stroke-slate-900"
          }`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Hexagon 1 Inner Double Bond Accent */}
        <path
          d="M 32,94 L 68,26 L 120,26"
          fill="none"
          className={`transition-colors duration-200 ${
            hoveredHex === 0 ? "stroke-primary" : "stroke-slate-900"
          }`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Hexagon 2: Bottom-Left */}
        <polygon
          points={hexPoints[1]}
          className={`transition-colors duration-200 ${
            hoveredHex === 1
              ? "fill-orange-50/70 stroke-primary"
              : "fill-white stroke-slate-900"
          }`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Hexagon 2 Inner Double Bond Accent */}
        <path
          d="M 32,246 L 68,314 L 120,314"
          fill="none"
          className={`transition-colors duration-200 ${
            hoveredHex === 1 ? "stroke-primary" : "stroke-slate-900"
          }`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Hexagon 3: Right */}
        <polygon
          points={hexPoints[2]}
          className={`transition-colors duration-200 ${
            hoveredHex === 2
              ? "fill-orange-50/70 stroke-primary"
              : "fill-white stroke-slate-900"
          }`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Hexagon 3 Inner Double Bond Accents */}
        <path
          d="M 235,99 L 282,99 L 320,165"
          fill="none"
          className={`transition-colors duration-200 ${
            hoveredHex === 2 ? "stroke-primary" : "stroke-slate-900"
          }`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 235,241 L 282,241 L 320,175"
          fill="none"
          className={`transition-colors duration-200 ${
            hoveredHex === 2 ? "stroke-primary" : "stroke-slate-900"
          }`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Orange Circular Bond Nodes (matching reference sketch) */}
        <circle cx="66" cy="170" r="4.5" fill="#ea580c" />
        <circle cx="154" cy="170" r="4.5" fill="#ea580c" />
        <circle cx="198" cy="94" r="4.5" fill="#ea580c" />
        <circle cx="198" cy="246" r="4.5" fill="#ea580c" />
        <circle cx="330" cy="170" r="4.5" fill="#ea580c" />
      </svg>

      {/* HTML Overlays for each Brand inside the 3 Hexagons */}
      {brands.map((brand, idx) => (
        <Link
          key={brand.id}
          href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
          onMouseEnter={() => setHoveredHex(idx)}
          onMouseLeave={() => setHoveredHex(null)}
          className="group absolute flex flex-col items-center justify-between p-2.5 sm:p-3 text-center focus:outline-none transition-transform duration-200 active:scale-95"
          style={overlayStyles[idx]}
          aria-label={`View ${brand.name} candidate grades`}
        >
          {/* Origin Pill (e.g. 🟢 sa Saudi Arabia) */}
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100/90 group-hover:bg-primary/10 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[9px] font-bold text-slate-700 group-hover:text-primary transition-colors tracking-tight">
              {getOriginPill(brand.origin)}
            </span>
          </div>

          {/* Refinery Logo */}
          <div className="relative w-full h-8 sm:h-9 my-1 flex items-center justify-center px-2">
            <Image
              src={brand.logoUrl}
              alt={`${brand.name} logo`}
              fill
              sizes="(max-width: 640px) 120px, 160px"
              className="object-contain filter group-hover:scale-108 transition-transform duration-300"
            />
          </div>

          {/* Brand Name, Categories & View Action */}
          <div className="w-full flex flex-col items-center">
            <h4 className="font-extrabold text-xs sm:text-[13px] text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
              {brand.name}
            </h4>
            <p className="text-[8px] sm:text-[9px] text-slate-500 font-medium line-clamp-1 mt-0.5">
              {brand.categories.join(" · ")}
            </p>
            <div className="mt-1 flex items-center gap-0.5 text-[9px] font-bold text-primary group-hover:gap-1 transition-all">
              <span>View Grades</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const SuppliersSection: React.FC = () => {
  // 9 Brands split into 3 Triplet Units matching user's reference diagram
  const group1Brands: [BrandInfo, BrandInfo, BrandInfo] = [
    MAJOR_BRANDS[1], // SABIC (Hex 1)
    MAJOR_BRANDS[0], // APC (Hex 2)
    MAJOR_BRANDS[5], // SIPCHEM (Hex 3)
  ];

  const group2Brands: [BrandInfo, BrandInfo, BrandInfo] = [
    MAJOR_BRANDS[6], // TASNEE (Hex 1)
    MAJOR_BRANDS[2], // SK Geo Centric (Hex 2)
    MAJOR_BRANDS[4], // Formosa Plastics (Hex 3)
  ];

  const group3Brands: [BrandInfo, BrandInfo, BrandInfo] = [
    MAJOR_BRANDS[7], // NATPET (Hex 1)
    MAJOR_BRANDS[8], // Nghi Son (NSRP) (Hex 2)
    MAJOR_BRANDS[3], // SIDPEC (Hex 3)
  ];

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

        {/* 2. Global Producer Partners & Candidate Brands Diagram */}
        <div data-aos="fade-up" className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200/80 w-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-primary-darker block mb-1">
              Major Manufacturer Allocations
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight leading-tight">
              Global Producer Partners &amp; Candidate Brands
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
              Click on any manufacturer to browse verified candidate grades, technical data sheets (TDS), and container availability.
            </p>
          </div>

          {/* Connected Molecular Hexagon Diagram (Exact layout from user's mockup) */}
          <div className="w-full mb-12 sm:mb-16">
            {/* Desktop View: 3 Units connected along a continuous horizontal bond line */}
            <div className="hidden lg:flex items-center justify-center gap-0 w-full max-w-6xl mx-auto">
              {/* Group 1: SABIC, APC, SIPCHEM */}
              <TripletUnit brands={group1Brands} />

              {/* Connecting Bond Line 1 */}
              <div className="flex items-center justify-center w-8 xl:w-12 shrink-0">
                <div className="w-full h-[3px] bg-slate-900"></div>
              </div>

              {/* Group 2: TASNEE, SK Geo Centric, Formosa Plastics */}
              <TripletUnit brands={group2Brands} />

              {/* Connecting Bond Line 2 */}
              <div className="flex items-center justify-center w-8 xl:w-12 shrink-0">
                <div className="w-full h-[3px] bg-slate-900"></div>
              </div>

              {/* Group 3: NATPET, Nghi Son (NSRP), SIDPEC */}
              <TripletUnit brands={group3Brands} />
            </div>

            {/* Mobile & Tablet View: Stacked Units with vertical connector lines */}
            <div className="flex lg:hidden flex-col items-center w-full max-w-md mx-auto">
              {/* Group 1 */}
              <TripletUnit brands={group1Brands} />

              {/* Vertical Connector Line 1 */}
              <div className="flex flex-col items-center justify-center my-1">
                <div className="w-[3px] h-8 bg-slate-900 relative">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
                </div>
              </div>

              {/* Group 2 */}
              <TripletUnit brands={group2Brands} />

              {/* Vertical Connector Line 2 */}
              <div className="flex flex-col items-center justify-center my-1">
                <div className="w-[3px] h-8 bg-slate-900 relative">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
                </div>
              </div>

              {/* Group 3 */}
              <TripletUnit brands={group3Brands} />
            </div>
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
