"use client";

import React, { useState } from "react";
import { regions } from "@/data/content";

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
            <stop offset="0%" stopColor="#e95220" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#e95220" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e95220" stopOpacity="0" />
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
            stroke="#0F3B82"
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
            stroke="#E95220"
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
                fill="#0F3B82"
                stroke="#ffffff"
                strokeWidth="1.6"
                filter="url(#node-shadow)"
              />
              {!compact && (
                <text
                  x={x + 9}
                  y={y + 4}
                  className="fill-[#0F3B82] text-[11px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
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
                fill="#E95220"
                stroke="#ffffff"
                strokeWidth="1.6"
                filter="url(#node-shadow)"
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="#E95220"
                className="animate-pulse-ring"
              />
              {!compact && (
                <text
                  x={x + 9}
                  y={y + 14}
                  className="fill-[#E95220] text-[11px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
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
            stroke="#E95220"
            className="animate-pulse-ring"
          />

          {/* Core circle */}
          <circle
            cx={hx}
            cy={hy}
            r="6.5"
            fill="#E95220"
            stroke="#0F3B82"
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
        <div className="pointer-events-none absolute bottom-4 left-6 rounded-lg border border-blue-200/90 bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-sm transition-all duration-200">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                activeTooltip.type === "hub"
                  ? "bg-[#E95220] ring-2 ring-[#0F3B82]"
                  : activeTooltip.type === "sourcing"
                  ? "bg-[#0F3B82]"
                  : "bg-[#E95220]"
              }`}
            />
            <span className="text-xs font-bold text-gray-900">
              {activeTooltip.name}
            </span>
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700">
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
        <span className="h-3 w-3 rounded-full bg-[#0F3B82] ring-2 ring-white shadow-xs" />
        <span className="font-semibold text-gray-800">Sourcing Corridors</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#E95220] ring-2 ring-white shadow-xs" />
        <span className="font-semibold text-gray-800">Customer Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-gray-950 bg-[#E95220] ring-2 ring-orange-200 shadow-xs" />
        <span className="font-bold text-gray-950">Trading Desk (Dubai HQ)</span>
      </span>
    </div>
  );
}

export const GlobalTradingMapSection: React.FC = () => {
  return (
    <div
      id="global-network"
      data-aos="fade-up"
      className="mt-16 w-full rounded-2xl border border-blue-100/80 bg-gradient-to-b from-sky-50/40 via-white to-blue-50/30 p-6 sm:p-8 lg:p-10 shadow-sm"
    >
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
        <div className="shrink-0 bg-white/95 border border-blue-100 rounded-xl p-3 sm:p-4 shadow-xs">
          <MapLegend />
        </div>
      </div>

      {/* World Map Container */}
      <div className="mt-6 w-full">
        <WorldMap />
      </div>

      {/* Quick Route Summary Highlights */}
      <div className="mt-6 pt-6 border-t border-gray-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-xl bg-white/90 border border-blue-100 p-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0F3B82]" />
            <p className="font-bold text-[#0F3B82]">Sourcing Corridors</p>
          </div>
          <p className="mt-1.5 text-slate-600 leading-relaxed">
            USA Gulf Coast, Alberta (Canada), Western Europe, and East Asian
            refineries.
          </p>
        </div>
        <div className="rounded-xl bg-white/90 border border-orange-100 p-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E95220]" />
            <p className="font-bold text-[#E95220]">Destination Markets</p>
          </div>
          <p className="mt-1.5 text-slate-600 leading-relaxed">
            Indian Subcontinent, East &amp; West Africa, Middle East GCC, and
            Latin America.
          </p>
        </div>
        <div className="rounded-xl bg-white/90 border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-gray-950 bg-[#E95220]" />
            <p className="font-bold text-gray-900">Trading Hub Advantage</p>
          </div>
          <p className="mt-1.5 text-slate-600 leading-relaxed">
            Jebel Ali maritime nexus enabling flexible CIF delivery &amp; trade
            arbitrage.
          </p>
        </div>
      </div>
    </div>
  );
};
