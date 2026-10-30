"use client";

import React, { useState } from "react";
import { regions } from "@/data/content";

const W = 1000,
  H = 500;
const proj = (lon: number, lat: number) =>
  [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;

// Simplified continent outlines (lon, lat) rendered with a dot pattern.
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
          <pattern
            id="world-dots"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="3.5"
              cy="3.5"
              r="1.4"
              className="fill-slate-300/80"
            />
          </pattern>

          {/* Gradients for Hub glow */}
          <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e95220" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e95220" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Continent Outlines with Soft Dot Pattern */}
        {continents.map((c, i) => (
          <path
            key={i}
            d={path(c)}
            fill="url(#world-dots)"
            className="transition-opacity duration-300 hover:opacity-90"
          />
        ))}

        {/* Sourcing Arcs -> Dubai Hub */}
        {regions.sourcing.map((s) => (
          <path
            key={`sourcing-${s.name}`}
            d={arc(s, hub)}
            fill="none"
            className="stroke-steel/80 animate-dash"
            strokeWidth="1.3"
            strokeDasharray="4 6"
          />
        ))}

        {/* Dubai Hub -> Market Arcs */}
        {regions.markets.map((m) => (
          <path
            key={`market-${m.name}`}
            d={arc(hub, m)}
            fill="none"
            className="stroke-copper/90 animate-dash"
            strokeWidth="1.5"
            strokeDasharray="4 6"
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
                className="fill-ink-foreground stroke-white"
                strokeWidth="1.5"
              />
              {!compact && (
                <text
                  x={x + 8}
                  y={y + 4}
                  className="fill-slate-800 text-[11px] font-medium tracking-tight pointer-events-none select-none drop-shadow-xs"
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
                className="fill-copper stroke-white"
                strokeWidth="1.5"
              />
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="none"
                className="stroke-copper animate-pulse-ring"
              />
              {!compact && (
                <text
                  x={x + 8}
                  y={y + 14}
                  className="fill-copper text-[11px] font-semibold tracking-tight pointer-events-none select-none drop-shadow-xs"
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
          <circle cx={hx} cy={hy} r="22" fill="url(#hub-glow)" />

          {/* Pulsing ring */}
          <circle
            cx={hx}
            cy={hy}
            r="8"
            fill="none"
            className="stroke-copper animate-pulse-ring"
          />

          {/* Core circle */}
          <circle
            cx={hx}
            cy={hy}
            r="6.5"
            className="fill-copper stroke-ink-foreground"
            strokeWidth="2.5"
          />

          <text
            x={hx + 11}
            y={hy - 8}
            className="fill-ink-foreground text-[12px] font-bold tracking-normal pointer-events-none drop-shadow-xs"
          >
            Dubai HQ
          </text>
        </g>
      </svg>

      {/* Floating Info Tooltip */}
      {activeTooltip && (
        <div className="pointer-events-none absolute bottom-4 left-6 rounded-lg border border-gray-200/90 bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-sm transition-all duration-200">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                activeTooltip.type === "hub"
                  ? "bg-copper ring-2 ring-ink-foreground"
                  : activeTooltip.type === "sourcing"
                  ? "bg-ink-foreground"
                  : "bg-copper"
              }`}
            />
            <span className="text-xs font-bold text-gray-900">
              {activeTooltip.name}
            </span>
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              {activeTooltip.type === "hub"
                ? "Trading Hub"
                : activeTooltip.type === "sourcing"
                ? "Sourcing"
                : "Market"}
            </span>
          </div>
          {activeTooltip.description && (
            <p className="mt-1 text-xs text-gray-600 max-w-xs">
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
    <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-ink-muted">
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-foreground" />
        <span className="font-medium text-gray-700">Sourcing regions</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-copper" />
        <span className="font-medium text-gray-700">Customer markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border-2 border-ink-foreground bg-copper" />
        <span className="font-semibold text-gray-900">Trading hub (Dubai)</span>
      </span>
    </div>
  );
}

export const GlobalTradingMapSection: React.FC = () => {
  return (
    <div
      id="global-network"
      data-aos="fade-up"
      className="mt-16 w-full rounded-2xl border border-gray-200/80 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 p-6 sm:p-8 lg:p-10 shadow-xs"
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
        <div className="shrink-0 bg-white/90 border border-gray-200/70 rounded-xl p-3 sm:p-4 shadow-xs">
          <MapLegend />
        </div>
      </div>

      {/* World Map Container */}
      <div className="mt-6 w-full">
        <WorldMap />
      </div>

      {/* Quick Route Summary Highlights */}
      <div className="mt-6 pt-6 border-t border-gray-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="rounded-lg bg-white/70 border border-gray-200/60 p-3.5">
          <p className="font-semibold text-slate-900">Sourcing Corridors</p>
          <p className="mt-1 text-slate-600">
            USA Gulf Coast, Alberta (Canada), Western Europe, and East Asian
            refineries.
          </p>
        </div>
        <div className="rounded-lg bg-white/70 border border-gray-200/60 p-3.5">
          <p className="font-semibold text-copper">Destination Markets</p>
          <p className="mt-1 text-slate-600">
            Indian Subcontinent, East &amp; West Africa, Middle East GCC, and
            Latin America.
          </p>
        </div>
        <div className="rounded-lg bg-white/70 border border-gray-200/60 p-3.5">
          <p className="font-semibold text-gray-900">Trading Hub Advantage</p>
          <p className="mt-1 text-slate-600">
            Jebel Ali maritime nexus enabling flexible CIF delivery &amp; trade
            arbitrage.
          </p>
        </div>
      </div>
    </div>
  );
};
