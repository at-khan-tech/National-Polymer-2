"use client";

import React, { useState } from "react";
import Link from "next/link";
import { regions } from "@/data/content";

interface MobileRouteItem {
  id: string;
  name: string;
  region: string;
  type: "sourcing" | "market";
  ports: string[];
  description: string;
  advantage: string;
  materials: string;
}

const MOBILE_ROUTES: MobileRouteItem[] = [
  // Sourcing Origins (Origins -> Dubai)
  {
    id: "src-usa",
    name: "USA Gulf Coast & Refineries",
    region: "North America",
    type: "sourcing",
    ports: ["Houston", "Beaumont", "Corpus Christi"],
    description: "Direct off-take from world-scale ethylene crackers and refiners in Texas & Louisiana.",
    advantage: "Tier-1 refinery allocations & rail-to-vessel loading",
    materials: "HDPE, LDPE, LLDPE, Metallocene",
  },
  {
    id: "src-canada",
    name: "Alberta Polyolefin Corridors",
    region: "Canada",
    type: "sourcing",
    ports: ["Vancouver", "Prince Rupert"],
    description: "High-purity prime polyethylene resins sourced directly from Western Canadian producers.",
    advantage: "Direct producer contracts & bulk container packaging",
    materials: "Prime Film & Blow Moulding Resins",
  },
  {
    id: "src-europe",
    name: "Western Europe Refineries",
    region: "Europe",
    type: "sourcing",
    ports: ["Antwerp", "Rotterdam", "Hamburg"],
    description: "European petrochemical refiners providing specialty prime grades and certified circular polymers.",
    advantage: "EU REACH compliance & low-carbon footprints",
    materials: "Specialty Polyolefins, Circular Resins",
  },
  {
    id: "src-fareast",
    name: "East Asian Producer Network",
    region: "Far East",
    type: "sourcing",
    ports: ["Ulsan", "Kaohsiung", "Ningbo", "Yokohama"],
    description: "Leading petrochemical producers across South Korea, Taiwan, and Japan.",
    advantage: "High MFI injection molding & Raffia grades",
    materials: "PP Homopolymer, Copolymer, Suspension PVC",
  },
  {
    id: "src-australia",
    name: "Oceania & Australian Desks",
    region: "Australia",
    type: "sourcing",
    ports: ["Melbourne", "Sydney", "Brisbane"],
    description: "Direct supplier access for prime resins, industrial regrinds, and compounded materials.",
    advantage: "Trans-Pacific shipping lanes with certified COA",
    materials: "Prime, Near-Prime & Circular Polymers",
  },

  // Destination Markets (Dubai -> Customer Discharge Ports)
  {
    id: "mkt-india",
    name: "Indian Subcontinent Corridors",
    region: "South Asia",
    type: "market",
    ports: ["Nhava Sheva", "Mundra", "Karachi", "Chittagong", "Colombo"],
    description: "Our highest volume export corridor supplying hundreds of converting plants.",
    advantage: "Extended 14-21 day free container detention for smooth ICD rail transit",
    materials: "High-Volume PP, HDPE Film & Blow, LLDPE",
  },
  {
    id: "mkt-africa",
    name: "African Continent Ports",
    region: "Africa",
    type: "market",
    ports: ["Durban", "Mombasa", "Lagos (Apapa)", "Alexandria", "Tema"],
    description: "Trusted supplier for industrial packaging and pipe manufacturers across Africa.",
    advantage: "Competitive CIF ocean charters & flexible LC payment terms",
    materials: "Film Extrusion Resins, Raffia, Pipe Grades",
  },
  {
    id: "mkt-gcc",
    name: "Middle East & GCC Distribution",
    region: "Middle East",
    type: "market",
    ports: ["Jebel Ali", "Dammam", "Jubail", "Sohar", "Hamad Port"],
    description: "Regional distribution hub offering rapid trucking and bonded warehouse inventory in JAFZA.",
    advantage: "Next-day road transport & local currency billing options",
    materials: "Full Polymer Catalog & Buffer Inventories",
  },
  {
    id: "mkt-latam",
    name: "Latin American Ports",
    region: "Latin America",
    type: "market",
    ports: ["Santos", "Paranagua", "Buenaventura", "Callao", "Manzanillo"],
    description: "Multi-modal container deliveries serving packaging and agricultural processors.",
    advantage: "Trans-Pacific and Atlantic sailings with pre-shipment inspections",
    materials: "Prime & Off-Grade Resins, Compounding Materials",
  },
  {
    id: "mkt-med",
    name: "Southern Europe & Mediterranean",
    region: "Europe / Med",
    type: "market",
    ports: ["Mersin", "Istanbul", "Antwerp", "Genoa", "Valencia"],
    description: "High-spec prime polyolefins and compliant recycled rPE/rPP for European converters.",
    advantage: "Full FDA & EU plastic taxation compliance documentation",
    materials: "Certified Prime Resins & Circular Granules",
  },
];

const W = 1000,
  H = 500;
const proj = (lon: number, lat: number) =>
  [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;

// Simplified continent outlines (lon, lat) rendered with base landmass and high-tech dot pattern.
const continents: [number, number][][] = [
  // North America
  [
    [-168, 66],
    [-140, 70],
    [-95, 72],
    [-65, 62],
    [-55, 50],
    [-70, 43],
    [-80, 32],
    [-81, 25],
    [-97, 26],
    [-97, 18],
    [-87, 15],
    [-78, 8],
    [-85, 10],
    [-105, 20],
    [-117, 32],
    [-125, 42],
    [-125, 50],
    [-140, 60],
    [-165, 60],
  ],
  // Greenland
  [
    [-52, 60],
    [-25, 70],
    [-20, 80],
    [-55, 83],
    [-58, 76],
    [-50, 68],
  ],
  // South America
  [
    [-78, 8],
    [-60, 10],
    [-50, 0],
    [-35, -7],
    [-40, -22],
    [-58, -38],
    [-68, -55],
    [-75, -45],
    [-72, -20],
    [-81, -5],
  ],
  // Eurasia
  [
    [-10, 36],
    [-9, 43],
    [-2, 49],
    [5, 54],
    [10, 58],
    [20, 70],
    [30, 70],
    [45, 68],
    [60, 70],
    [90, 75],
    [140, 72],
    [180, 68],
    [170, 60],
    [140, 50],
    [130, 42],
    [122, 30],
    [120, 22],
    [108, 18],
    [104, 1],
    [98, 8],
    [92, 22],
    [80, 10],
    [73, 20],
    [66, 25],
    [56, 26],
    [52, 13],
    [43, 13],
    [35, 30],
    [28, 37],
    [22, 38],
    [12, 40],
    [3, 43],
  ],
  // Great Britain & Ireland
  [
    [-10, 52],
    [-5, 58],
    [2, 53],
    [-1, 50],
    [-6, 50],
  ],
  // Japan
  [
    [130, 33],
    [136, 35],
    [141, 44],
    [145, 44],
    [140, 36],
    [132, 32],
  ],
  // Africa
  [
    [-17, 15],
    [-17, 22],
    [-6, 35],
    [10, 37],
    [32, 31],
    [35, 28],
    [43, 12],
    [51, 11],
    [40, -15],
    [33, -27],
    [20, -35],
    [12, -17],
    [9, 4],
    [-8, 4],
  ],
  // Madagascar
  [
    [44, -13],
    [50, -14],
    [48, -25],
    [44, -25],
  ],
  // Australia
  [
    [114, -22],
    [122, -18],
    [132, -11],
    [142, -11],
    [153, -26],
    [150, -37],
    [140, -38],
    [130, -32],
    [115, -34],
  ],
  // New Zealand
  [
    [166, -46],
    [174, -41],
    [178, -38],
    [175, -35],
    [172, -43],
  ],
];

const path = (pts: [number, number][]) =>
  pts
    .map(([lo, la], i) => `${i ? "L" : "M"}${proj(lo, la).join(",")}`)
    .join(" ") + "Z";

function arc(
  a: { lon: number; lat: number },
  b: { lon: number; lat: number }
) {
  const [x1, y1] = proj(a.lon, a.lat),
    [x2, y2] = proj(b.lon, b.lat);
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.25 - 20;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export function WorldMap({ compact = false }: { compact?: boolean }) {
  const hub = regions.hub;
  const [hx, hy] = proj(hub.lon, hub.lat);
  const [activeTooltip, setActiveTooltip] = useState<{
    name: string;
    description?: string;
    type: "sourcing" | "market" | "hub";
  } | null>(null);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <svg
        viewBox={`0 40 ${W} ${H - 100}`}
        className="h-auto w-full transition-all duration-300"
        role="img"
        aria-label="World map of sourcing regions and customer markets"
      >
        <defs>
          {/* Base gradient for continent shapes */}
          <linearGradient id="continent-base-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.65" />
          </linearGradient>

          {/* High-tech modern dot grid pattern in rich brand blue */}
          <pattern
            id="world-dots"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="4"
              cy="4"
              r="1.35"
              fill="#2563EB"
              fillOpacity="0.4"
            />
          </pattern>

          {/* Gradients for Hub glow */}
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>

          {/* Subtle drop shadow for node markers */}
          <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Subtle World Ocean Navigation Grid (Latitude & Longitude) */}
        <g className="pointer-events-none opacity-40">
          {/* Latitude lines */}
          <line x1="20" y1="125" x2="980" y2="125" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="20" y1="185" x2="980" y2="185" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="20" y1="250" x2="980" y2="250" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="6 6" />
          <line x1="20" y1="315" x2="980" y2="315" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="20" y1="375" x2="980" y2="375" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />

          {/* Longitude lines */}
          <line x1="167" y1="50" x2="167" y2="430" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="333" y1="50" x2="333" y2="430" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="500" y1="50" x2="500" y2="430" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="667" y1="50" x2="667" y2="430" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="833" y1="50" x2="833" y2="430" stroke="#BFDBFE" strokeWidth="0.8" strokeDasharray="3 5" />
        </g>

        {/* Continents: Solid Base Landmass + Tech Dot Matrix Layer */}
        {continents.map((c, i) => (
          <g key={i}>
            {/* Base landmass with refined border */}
            <path
              d={path(c)}
              fill="url(#continent-base-gradient)"
              stroke="#BFDBFE"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* High-tech blue dot pattern overlay */}
            <path
              d={path(c)}
              fill="url(#world-dots)"
              className="pointer-events-none"
            />
          </g>
        ))}

        {/* Sourcing Arcs -> Dubai Hub (Inbound Corridors in Deep Brand Blue) */}
        {regions.sourcing.map((s) => (
          <path
            key={`sourcing-${s.name}`}
            d={arc(s, hub)}
            fill="none"
            stroke="var(--color-navy)"
            strokeWidth="1.6"
            strokeDasharray="5 5"
            className="animate-dash opacity-75 hover:opacity-100 transition-opacity"
          />
        ))}

        {/* Dubai Hub -> Market Arcs (Outbound Distribution in Vibrant Brand Orange) */}
        {regions.markets.map((m) => (
          <path
            key={`market-${m.name}`}
            d={arc(hub, m)}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeDasharray="5 5"
            className="animate-dash opacity-85 hover:opacity-100 transition-opacity"
          />
        ))}

        {/* Sourcing Nodes */}
        {regions.sourcing.map((s) => {
          const [x, y] = proj(s.lon, s.lat);
          return (
            <g
              key={s.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onMouseEnter={() =>
                setActiveTooltip({
                  name: s.name,
                  description: s.description,
                  type: "sourcing",
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="var(--color-navy)"
                stroke="#ffffff"
                strokeWidth="1.6"
                filter="url(#node-shadow)"
              />
              {!compact && (
                <text
                  x={x + 9}
                  y={y + 4}
                  className="fill-[var(--color-navy)] text-[11px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                >
                  {s.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Customer Market Nodes with Animated Pulse Rings */}
        {regions.markets.map((m) => {
          const [x, y] = proj(m.lon, m.lat);
          return (
            <g
              key={m.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onMouseEnter={() =>
                setActiveTooltip({
                  name: m.name,
                  description: m.description,
                  type: "market",
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="var(--color-primary)"
                stroke="#ffffff"
                strokeWidth="1.6"
                filter="url(#node-shadow)"
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="var(--color-primary)"
                className="animate-pulse-ring"
              />
              {!compact && (
                <text
                  x={x + 9}
                  y={y + 14}
                  className="fill-[var(--color-primary)] text-[11px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
                >
                  {m.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Dubai HQ Trading Hub */}
        <g
          className="cursor-pointer"
          onMouseEnter={() =>
            setActiveTooltip({
              name: hub.name,
              description: hub.description,
              type: "hub",
            })
          }
          onMouseLeave={() => setActiveTooltip(null)}
        >
          {/* Outer glow aura */}
          <circle cx={hx} cy={hy} r="24" fill="url(#hub-glow)" />

          {/* Pulsing ring */}
          <circle
            cx={hx}
            cy={hy}
            r="8"
            fill="none"
            stroke="var(--color-primary)"
            className="animate-pulse-ring"
          />

          {/* Core circle */}
          <circle
            cx={hx}
            cy={hy}
            r="6.5"
            fill="var(--color-primary)"
            stroke="var(--color-navy)"
            strokeWidth="2.5"
            filter="url(#node-shadow)"
          />

          <text
            x={hx + 12}
            y={hy - 8}
            className="fill-gray-950 text-[12px] font-extrabold tracking-normal pointer-events-none drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]"
          >
            Dubai HQ
          </text>
        </g>
      </svg>

      {/* Floating Info Tooltip */}
      {activeTooltip && (
        <div className="pointer-events-none absolute bottom-4 left-6 rounded-lg border border-orange-200/90 bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-sm transition-all duration-200">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                activeTooltip.type === "hub"
                  ? "bg-primary ring-2 ring-navy"
                  : activeTooltip.type === "sourcing"
                  ? "bg-navy"
                  : "bg-primary"
              }`}
            />
            <span className="text-xs font-bold text-gray-900">
              {activeTooltip.name}
            </span>
            <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
              {activeTooltip.type === "hub"
                ? "Trading Hub"
                : activeTooltip.type === "sourcing"
                ? "Sourcing"
                : "Market"}
            </span>
          </div>
          {activeTooltip.description && (
            <p className="mt-1 text-xs text-gray-600 max-w-xs leading-snug">
              {activeTooltip.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-navy ring-2 ring-white shadow-xs" />
        <span className="font-semibold text-gray-800">Sourcing Corridors</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-primary ring-2 ring-white shadow-xs" />
        <span className="font-semibold text-gray-800">Customer Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-gray-950 bg-primary ring-2 ring-orange-200 shadow-xs" />
        <span className="font-bold text-gray-950">Trading Desk (Dubai HQ)</span>
      </span>
    </div>
  );
}

export const GlobalTradingMapSection: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<"all" | "sourcing" | "market">("all");
  const [showMobileMap, setShowMobileMap] = useState(false);

  const filteredMobileRoutes =
    mobileTab === "all"
      ? MOBILE_ROUTES
      : MOBILE_ROUTES.filter((r) => r.type === mobileTab);

  return (
    <div
      id="global-network"
      data-aos="fade-up"
      className="mt-16 w-full rounded-2xl border border-orange-100/80 bg-gradient-to-b from-orange-50/20 via-white to-slate-50/30 p-4 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ─── DESKTOP VIEW (hidden md:block) - EXACTLY AS BEFORE ─── */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200/70">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-darker block">
              Global Supply &amp; Distribution
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-gray-900 tracking-tight">
              Strategic International Trade Routes
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
              Coordinating reliable polymer distribution from North America,
              Europe, and East Asia directly to converters in over 40 countries
              through our Dubai commercial trading desk.
            </p>
          </div>

          {/* Legend */}
          <div className="shrink-0 bg-white/95 border border-orange-100 rounded-xl p-3 sm:p-4 shadow-xs">
            <MapLegend />
          </div>
        </div>

        {/* World Map Container */}
        <div className="mt-6 w-full">
          <WorldMap />
        </div>

        {/* Quick Route Summary Highlights */}
        <div className="mt-6 pt-6 border-t border-gray-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-white/90 border border-gray-200 p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-navy" />
              <p className="font-bold text-navy">Sourcing Corridors</p>
            </div>
            <p className="mt-1.5 text-slate-600 leading-relaxed">
              USA Gulf Coast, Alberta (Canada), Western Europe, and East Asian
              refineries.
            </p>
          </div>
          <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <p className="font-bold text-primary">Destination Markets</p>
            </div>
            <p className="mt-1.5 text-slate-600 leading-relaxed">
              Indian Subcontinent, East &amp; West Africa, Middle East GCC, and
              Latin America.
            </p>
          </div>
          <div className="rounded-xl bg-white/90 border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-gray-950 bg-primary" />
              <p className="font-bold text-gray-900">Trading Hub Advantage</p>
            </div>
            <p className="mt-1.5 text-slate-600 leading-relaxed">
              Jebel Ali maritime nexus enabling flexible CIF delivery &amp; trade
              arbitrage.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* ─── MOBILE VIEW (block md:hidden) - SPECIALLY CRAFTED & CLEAR ─── */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden">
        {/* Mobile Section Header */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Global Supply &amp; Logistics
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-navy font-montserrat tracking-tight leading-snug">
            International Trade Routes
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Direct containerized distribution connecting Tier-1 petrochemical refineries to converters in 40+ countries.
          </p>
        </div>

        {/* Central Dubai Trading Hub Card (Mobile Nexus) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-[#16234b] to-navy p-4 text-white shadow-md border border-navy/30 mb-4">
          {/* Subtle Watermark Map Dot Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary/20 blur-2xl"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 border border-primary/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-lighter">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Global Epicenter
              </span>
              <span className="text-[10px] text-white/60 font-mono">25.20° N, 55.27° E</span>
            </div>

            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <span>Dubai Commercial HQ</span>
              <span className="text-primary font-normal text-xs">(Jebel Ali)</span>
            </h4>
            <p className="mt-1 text-[11px] text-white/80 leading-snug">
              Crossroads for Middle East trade arbitrage, bonded buffer stock, and multi-modal container charters.
            </p>

            {/* Micro Stats Row */}
            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 rounded-lg py-1.5 px-1 border border-white/5">
                <span className="block text-xs font-bold text-primary">40+</span>
                <span className="text-[9px] text-white/70 uppercase tracking-wide">Countries</span>
              </div>
              <div className="bg-white/5 rounded-lg py-1.5 px-1 border border-white/5">
                <span className="block text-xs font-bold text-primary">10k+ MT</span>
                <span className="text-[9px] text-white/70 uppercase tracking-wide">Monthly</span>
              </div>
              <div className="bg-white/5 rounded-lg py-1.5 px-1 border border-white/5">
                <span className="block text-xs font-bold text-primary">14-21 Days</span>
                <span className="text-[9px] text-white/70 uppercase tracking-wide">Free Demurrage</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Supply-to-Destination Flow Diagram on Mobile */}
        <div className="bg-white rounded-xl border border-gray-200/90 p-3 shadow-2xs mb-4">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            <span>End-to-End Container Flow</span>
            <span className="text-primary font-semibold">Direct CIF</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 items-center text-center">
            {/* Step 1: Origins */}
            <div className="bg-slate-50 border border-navy/20 rounded-lg p-2 flex flex-col items-center">
              <span className="h-2 w-2 rounded-full bg-navy mb-1" />
              <span className="text-[10px] font-bold text-navy leading-tight">5 Sourcing Regions</span>
              <span className="text-[9px] text-gray-500 mt-0.5">USA, EU, Asia</span>
            </div>

            {/* Step 2: Dubai Hub */}
            <div className="bg-orange-50/80 border border-primary/30 rounded-lg p-2 flex flex-col items-center relative">
              <span className="h-2 w-2 rounded-full bg-primary mb-1" />
              <span className="text-[10px] font-bold text-primary leading-tight">Dubai Trading Desk</span>
              <span className="text-[9px] text-primary/80 mt-0.5">Quality &amp; COA</span>
            </div>

            {/* Step 3: Destination */}
            <div className="bg-slate-50 border border-gray-200 rounded-lg p-2 flex flex-col items-center">
              <span className="h-2 w-2 rounded-full bg-primary mb-1" />
              <span className="text-[10px] font-bold text-gray-900 leading-tight">40+ Ports</span>
              <span className="text-[9px] text-gray-500 mt-0.5">India, Africa, GCC</span>
            </div>
          </div>
        </div>

        {/* Interactive Segment Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-gray-100/90 p-1 rounded-xl mb-3 border border-gray-200">
          <button
            type="button"
            onClick={() => setMobileTab("all")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center ${
              mobileTab === "all"
                ? "bg-white text-navy shadow-xs border border-gray-200/80"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Corridors (10)
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("sourcing")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
              mobileTab === "sourcing"
                ? "bg-navy text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Sourcing (5)
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("market")}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 ${
              mobileTab === "market"
                ? "bg-primary text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Markets (5)
          </button>
        </div>

        {/* Mobile Route Cards List */}
        <div className="space-y-2.5">
          {filteredMobileRoutes.map((route, idx) => {
            const isSourcing = route.type === "sourcing";
            return (
              <div
                key={route.id}
                className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-2xs hover:border-primary/50 transition-all text-left"
              >
                {/* Top Badge & Type */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${
                        isSourcing ? "bg-navy" : "bg-primary"
                      }`}
                    />
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                      {isSourcing ? `Origin 0${idx + 1}` : `Market 0${idx + 1}`}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      isSourcing
                        ? "bg-slate-100 text-navy border border-navy/20"
                        : "bg-orange-50 text-primary border border-primary/20"
                    }`}
                  >
                    {isSourcing ? "Sourcing Corridor" : "Export Market"}
                  </span>
                </div>

                {/* Corridor Name */}
                <h4 className="text-sm font-bold text-gray-900 leading-snug">
                  {route.name}
                </h4>

                {/* Description */}
                <p className="mt-1 text-[11px] text-gray-600 leading-relaxed">
                  {route.description}
                </p>

                {/* Ports Pills */}
                <div className="mt-2.5 pt-2 border-t border-gray-100">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    {isSourcing ? "Loading Terminals / Ports:" : "Discharge Container Ports:"}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {route.ports.map((p, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-gray-50 border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-700 font-mono"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advantage & CTA Link */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-500 font-medium line-clamp-1">
                    💡 {route.advantage}
                  </span>
                  <Link
                    href={`/enquiry?route=${encodeURIComponent(route.name)}`}
                    className="shrink-0 text-[10px] font-bold text-primary hover:text-primary-darker flex items-center gap-0.5"
                  >
                    <span>Get Rate</span>
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Expandable Geographic World Map View on Mobile */}
        <div className="mt-4 pt-3 border-t border-gray-200 text-center">
          <button
            type="button"
            onClick={() => setShowMobileMap((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-navy hover:bg-gray-50 shadow-2xs transition-colors"
          >
            <span>{showMobileMap ? "Hide Geographic SVG Map" : "🗺️ View Interactive World Map"}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                showMobileMap ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showMobileMap && (
            <div className="mt-3 rounded-xl border border-orange-200 bg-white p-2 shadow-sm animate-news-fade">
              <p className="text-[10px] text-gray-400 mb-2 font-medium">
                👉 Tip: Swipe horizontally to inspect continental routes &amp; nodes
              </p>
              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="min-w-[580px]">
                  <WorldMap compact={false} />
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100 flex justify-center">
                <MapLegend />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
