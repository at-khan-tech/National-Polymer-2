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

const getOriginDisplay = (origin: string) => {
  if (origin.includes("Saudi")) return "🇸🇦 Saudi Arabia";
  if (origin.includes("Korea")) return "🇰🇷 South Korea";
  if (origin.includes("USA") || origin.includes("United States")) return "🇺🇸 USA";
  if (origin.includes("Vietnam")) return "🇻🇳 Vietnam";
  if (origin.includes("Egypt")) return "🇪🇬 Egypt";
  return origin;
};

interface ClusterProps {
  title: string;
  phaseCode: string;
  formula: string;
  brands: [BrandInfo, BrandInfo, BrandInfo];
  clusterIndex: number;
}

const ChemicalCluster: React.FC<ClusterProps> = ({ title, phaseCode, formula, brands }) => {
  const [hoveredHex, setHoveredHex] = useState<number | null>(null);

  // SVG Coordinates for 3 interlocking hexagons (exact benzene triplet sharing edges)
  // Hex 1: Top-Left (Center 86, 76)
  // Hex 2: Bottom-Left (Center 86, 208) - shares bottom edge of Hex 1
  // Hex 3: Right (Center 200, 142) - nestled between Hex 1 & Hex 2 sharing sloped edges
  const hexPoints = [
    "48,10 124,10 162,76 124,142 48,142 10,76",
    "48,142 124,142 162,208 124,274 48,274 10,208",
    "162,76 238,76 276,142 238,208 162,208 124,142",
  ];

  // Overlay positions for HTML interactive link cards inside each hexagon
  const overlayStyles: React.CSSProperties[] = [
    { left: "3.4%", top: "3.5%", width: "52.4%", height: "46.5%" },
    { left: "3.4%", top: "50%", width: "52.4%", height: "46.5%" },
    { left: "42.7%", top: "26.8%", width: "52.4%", height: "46.5%" },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] mx-auto select-none">
      {/* Phase Label & Chemical Formula Header */}
      <div className="w-full text-center mb-2 px-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold tracking-wider mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span>{phaseCode}</span>
        </div>
        <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 line-clamp-1">{title}</h4>
        <p className="text-[10px] font-mono font-medium text-slate-500 mt-0.5">{formula}</p>
      </div>

      {/* 3-Hexagon Bonding Canvas (Exact Chemical Cluster from user's sketch) */}
      <div className="relative w-full aspect-[290/284]">
        {/* SVG Base with Bold Dark Borders & Double Bond Lines */}
        <svg
          viewBox="0 0 290 284"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
          preserveAspectRatio="none"
        >
          {/* Hexagon 1: Top-Left */}
          <polygon
            points={hexPoints[0]}
            className={`transition-all duration-300 ${
              hoveredHex === 0
                ? "fill-orange-50/90 stroke-primary"
                : "fill-white stroke-slate-900"
            }`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hexagon 1 Inner Double Bond (top-left & top edges from sketch) */}
          <path
            d="M 24,72 L 54,22 L 114,22"
            fill="none"
            className={`transition-all duration-300 ${
              hoveredHex === 0 ? "stroke-primary" : "stroke-slate-900"
            }`}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Hexagon 2: Bottom-Left (shares horizontal edge with Hex 1) */}
          <polygon
            points={hexPoints[1]}
            className={`transition-all duration-300 ${
              hoveredHex === 1
                ? "fill-orange-50/90 stroke-primary"
                : "fill-white stroke-slate-900"
            }`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hexagon 2 Inner Double Bond (bottom-left & bottom edges) */}
          <path
            d="M 24,212 L 54,262 L 114,262"
            fill="none"
            className={`transition-all duration-300 ${
              hoveredHex === 1 ? "stroke-primary" : "stroke-slate-900"
            }`}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Hexagon 3: Right (nestled into the notch sharing sloped edges) */}
          <polygon
            points={hexPoints[2]}
            className={`transition-all duration-300 ${
              hoveredHex === 2
                ? "fill-orange-50/90 stroke-primary"
                : "fill-white stroke-slate-900"
            }`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hexagon 3 Inner Double Bond (top-right & right edges from sketch) */}
          <path
            d="M 174,86 L 230,86 L 264,140"
            fill="none"
            className={`transition-all duration-300 ${
              hoveredHex === 2 ? "stroke-primary" : "stroke-slate-900"
            }`}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Covalent Atom Nodes (Interlocking vertices with Carbon ● markers) */}
          <circle cx="162" cy="76" r="3.5" fill="#ea580c" />
          <circle cx="124" cy="142" r="4.5" fill="#ea580c" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="162" cy="208" r="3.5" fill="#ea580c" />
        </svg>

        {/* 3 Interactive Brand Links positioned right inside their respective hexagons */}
        {brands.map((brand, idx) => (
          <Link
            key={brand.id}
            href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
            onMouseEnter={() => setHoveredHex(idx)}
            onMouseLeave={() => setHoveredHex(null)}
            className="group absolute flex flex-col items-center justify-between p-2 sm:p-2.5 text-center focus:outline-none transition-transform duration-200 active:scale-95"
            style={overlayStyles[idx]}
            aria-label={`View ${brand.name} candidate grades`}
          >
            {/* Origin Pill */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-primary/10 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 group-hover:text-primary transition-colors tracking-tight line-clamp-1">
                {getOriginDisplay(brand.origin)}
              </span>
            </div>

            {/* Refinery Logo */}
            <div className="relative w-full h-8 sm:h-9 my-0.5 flex items-center justify-center px-2">
              <Image
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                fill
                sizes="(max-width: 640px) 120px, 150px"
                className="object-contain filter group-hover:scale-108 transition-transform duration-300"
              />
            </div>

            {/* Brand Name & Action */}
            <div className="w-full flex flex-col items-center">
              <h5 className="font-black text-[11px] sm:text-xs text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                {brand.name}
              </h5>
              <p className="text-[8px] sm:text-[9px] text-slate-500 font-medium line-clamp-1">
                {brand.categories.join(" · ")}
              </p>
              <div className="mt-0.5 flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold text-primary group-hover:gap-1 transition-all">
                <span>View Grades</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SuppliersSection: React.FC = () => {
  // 9 Brands split into 3 Chemical Clusters matching user's 3-Hexagon Sketch
  const cluster1Brands: [BrandInfo, BrandInfo, BrandInfo] = [
    MAJOR_BRANDS[1], // SABIC (Hex 1)
    MAJOR_BRANDS[0], // APC (Hex 2)
    MAJOR_BRANDS[5], // SIPCHEM (Hex 3)
  ];

  const cluster2Brands: [BrandInfo, BrandInfo, BrandInfo] = [
    MAJOR_BRANDS[6], // TASNEE (Hex 1)
    MAJOR_BRANDS[2], // SK Geo Centric (Hex 2)
    MAJOR_BRANDS[4], // Formosa Plastics USA (Hex 3)
  ];

  const cluster3Brands: [BrandInfo, BrandInfo, BrandInfo] = [
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

        {/* 2. Chemical Reaction Equation & Molecular Bonding Diagram */}
        <div data-aos="fade-up" className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200/80 w-full">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Polymerization Reaction &amp; Bonding Equation Diagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight leading-tight">
              Global Producer Partners &amp; Candidate Brands
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              Interconnected molecular polymer network illustrating chemical olefin synthesis, catalytic copolymerization, and terminal refinery resin allocations.
            </p>
          </div>

          {/* Chemical Reaction Equation Banner */}
          <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 p-3 sm:p-4 rounded-xl border-2 border-slate-800 bg-slate-900 text-white font-mono shadow-md">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-center">
              <span className="px-2 py-0.5 rounded bg-primary text-white font-bold uppercase text-[9px] sm:text-[10px]">
                Reaction Formula
              </span>
              <span className="text-amber-300 font-bold">n [C₂H₄] + m [C₃H₆]</span>
              <span className="text-primary font-bold">──[ Ziegler-Natta / Metallocene ]──▶</span>
              <span className="text-sky-300 font-bold">—[—CH₂—CH₂—]ₙ—[—CH₂—CH(CH₃)—]ₘ—</span>
              <span className="text-emerald-400 font-bold">──▶ 9 Verified Producer Allocations</span>
            </div>
          </div>

          {/* Chemical Laboratory Blueprint Canvas */}
          <div
            className="relative w-full rounded-3xl border-2 border-slate-300 bg-slate-50/70 p-4 sm:p-6 lg:p-8 mb-12 shadow-inner"
            style={{
              backgroundImage: "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
              backgroundSize: "22px 22px",
            }}
          >
            {/* Technical Blueprint Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-slate-400 font-mono text-[10px] select-none">+ 00.00</div>
            <div className="absolute top-2 right-2 text-slate-400 font-mono text-[10px] select-none">+ 01.00</div>
            <div className="absolute bottom-2 left-2 text-slate-400 font-mono text-[10px] select-none">MOL_BOND_NET</div>
            <div className="absolute bottom-2 right-2 text-slate-400 font-mono text-[10px] select-none">sp² RESONANCE</div>

            {/* Desktop View: Horizontal Chemical Reaction Equation with Bridges */}
            <div className="hidden lg:flex items-center justify-between gap-2 xl:gap-4 w-full">
              {/* Cluster 1: Monomers & Base Polyolefins */}
              <div className="flex-1">
                <ChemicalCluster
                  title="Base Olefin Monomers"
                  phaseCode="STAGE I: FEEDSTOCK"
                  formula="n [C₂H₄] + m [C₃H₆] Monomer Core"
                  brands={cluster1Brands}
                  clusterIndex={0}
                />
              </div>

              {/* Reaction Bridge 1: Catalytic Polymerization Operator */}
              <div className="flex flex-col items-center justify-center shrink-0 w-28 xl:w-32 text-center px-1 font-mono">
                <span className="text-[10px] xl:text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-0.5">
                  + Catalyst
                </span>
                <span className="text-[9px] text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-300 mb-1">
                  TiCl₄ / AlEt₃
                </span>
                {/* Bold Reaction Arrow */}
                <div className="relative w-full flex items-center justify-center my-1">
                  <div className="w-full h-1 bg-slate-900"></div>
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-slate-900 shrink-0"></div>
                </div>
                <span className="text-[9px] font-bold text-primary mt-1">
                  Δ 180°C - 240°C
                </span>
                <span className="text-[8px] text-slate-500">
                  Gas-Phase 35 bar
                </span>
              </div>

              {/* Cluster 2: Catalytic Copolymerization */}
              <div className="flex-1">
                <ChemicalCluster
                  title="Catalytic Copolymerization"
                  phaseCode="STAGE II: POLYMERIZATION"
                  formula="—[—CH₂—CH₂—]ₙ— [PE/PP/EVA]"
                  brands={cluster2Brands}
                  clusterIndex={1}
                />
              </div>

              {/* Reaction Bridge 2: Compounding & Extrusion Operator */}
              <div className="flex flex-col items-center justify-center shrink-0 w-28 xl:w-32 text-center px-1 font-mono">
                <span className="text-[10px] xl:text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-0.5">
                  Pelletization
                </span>
                <span className="text-[9px] text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-slate-300 mb-1">
                  Clarifiers &amp; AO
                </span>
                {/* Bold Reaction Arrow */}
                <div className="relative w-full flex items-center justify-center my-1">
                  <div className="w-full h-1 bg-slate-900"></div>
                  <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-slate-900 shrink-0"></div>
                </div>
                <span className="text-[9px] font-bold text-primary mt-1">
                  [— M —]ₙ Yield
                </span>
                <span className="text-[8px] text-slate-500">
                  Grade Extrusion
                </span>
              </div>

              {/* Cluster 3: Terminal Specialized Resins */}
              <div className="flex-1">
                <ChemicalCluster
                  title="Terminal Specialty Formulations"
                  phaseCode="STAGE III: REFINED RESINS"
                  formula="Homopolymer &amp; Copolymers"
                  brands={cluster3Brands}
                  clusterIndex={2}
                />
              </div>
            </div>

            {/* Mobile & Tablet View: Vertical Reaction Flow Pathway */}
            <div className="flex lg:hidden flex-col items-center gap-6 w-full">
              {/* Cluster 1 */}
              <ChemicalCluster
                title="Base Olefin Monomers"
                phaseCode="STAGE I: FEEDSTOCK"
                formula="n [C₂H₄] + m [C₃H₆] Monomer Core"
                brands={cluster1Brands}
                clusterIndex={0}
              />

              {/* Vertical Reaction Arrow 1 */}
              <div className="flex flex-col items-center justify-center text-center font-mono py-1">
                <span className="text-[10px] font-bold text-slate-900 uppercase">
                  + Ziegler-Natta Catalyst (Δ 200°C)
                </span>
                <div className="w-1 h-7 bg-slate-900 my-1"></div>
                <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[9px] border-t-slate-900"></div>
              </div>

              {/* Cluster 2 */}
              <ChemicalCluster
                title="Catalytic Copolymerization"
                phaseCode="STAGE II: POLYMERIZATION"
                formula="—[—CH₂—CH₂—]ₙ— [PE/PP/EVA]"
                brands={cluster2Brands}
                clusterIndex={1}
              />

              {/* Vertical Reaction Arrow 2 */}
              <div className="flex flex-col items-center justify-center text-center font-mono py-1">
                <span className="text-[10px] font-bold text-slate-900 uppercase">
                  Compounding, Extrusion &amp; Clarification
                </span>
                <div className="w-1 h-7 bg-slate-900 my-1"></div>
                <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[9px] border-t-slate-900"></div>
              </div>

              {/* Cluster 3 */}
              <ChemicalCluster
                title="Terminal Specialty Formulations"
                phaseCode="STAGE III: REFINED RESINS"
                formula="Homopolymer &amp; Copolymers"
                brands={cluster3Brands}
                clusterIndex={2}
              />
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
