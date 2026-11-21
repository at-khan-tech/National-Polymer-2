"use client";

import React, { useState } from "react";
import Link from "next/link";
import { regions } from "@/data/content";

const W = 1000,
  H = 500;
const proj = (lon: number, lat: number) =>
  [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;

// Continent outlines (lon, lat)
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

// Anti-collision label coordinates for 100% readability
function getLabelOffset(name: string): { dx: number; dy: number; anchor: "start" | "middle" | "end" } {
  const lower = name.toLowerCase();
  if (lower.includes("turkey")) return { dx: -10, dy: -8, anchor: "end" };
  if (lower.includes("gcc") || lower.includes("middle east")) return { dx: -12, dy: 14, anchor: "end" };
  if (lower.includes("west africa")) return { dx: -10, dy: 14, anchor: "end" };
  if (lower.includes("east africa")) return { dx: 10, dy: 14, anchor: "start" };
  if (lower.includes("india")) return { dx: 10, dy: 12, anchor: "start" };
  if (lower.includes("china")) return { dx: 10, dy: 4, anchor: "start" };
  if (lower.includes("new zealand")) return { dx: 10, dy: 12, anchor: "start" };
  if (lower.includes("australia")) return { dx: 10, dy: 2, anchor: "start" };
  if (lower.includes("europe")) return { dx: -10, dy: -8, anchor: "end" };
  if (lower.includes("latin") || lower.includes("latam")) return { dx: 10, dy: 14, anchor: "start" };
  if (lower.includes("usa")) return { dx: -10, dy: -8, anchor: "end" };
  if (lower.includes("canada")) return { dx: -10, dy: -8, anchor: "end" };
  return { dx: 8, dy: 10, anchor: "start" };
}

export function WorldMap({ compact = false }: { compact?: boolean }) {
  const hub = regions.hub;
  const [hx, hy] = proj(hub.lon, hub.lat);
  const [activeTooltip, setActiveTooltip] = useState<{
    name: string;
    description?: string;
    type: "sourcing" | "market" | "hub";
    status?: "active" | "target";
    countries?: string[];
    ports?: string[];
  } | null>(null);

  return (
    <div className="relative w-full overflow-hidden select-none rounded-2xl bg-white border border-slate-200/90 p-2 sm:p-4 shadow-sm">
      <svg
        viewBox={`0 35 ${W} ${H - 70}`}
        className="h-auto w-full transition-all duration-300"
        role="img"
        aria-label="World map of sourcing regions, existing customer markets and target expansion hubs"
      >
        <defs>
          {/* Base gradient for continent shapes */}
          <linearGradient id="continent-clean-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.85" />
          </linearGradient>

          {/* Clean tech dot pattern */}
          <pattern id="light-tech-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.25" fill="#3B82F6" fillOpacity="0.25" />
          </pattern>

          {/* Hub radial glow */}
          <radialGradient id="hub-light-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>

          {/* Node drop shadow */}
          <filter id="light-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#0f172a" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Ocean Navigation Grid (Clean Lat/Lon Lines) */}
        <g className="pointer-events-none opacity-30">
          <line x1="20" y1="125" x2="980" y2="125" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="20" y1="185" x2="980" y2="185" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="20" y1="250" x2="980" y2="250" stroke="#64748B" strokeWidth="1.1" strokeDasharray="6 6" />
          <line x1="20" y1="315" x2="980" y2="315" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="20" y1="375" x2="980" y2="375" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 5" />

          <line x1="200" y1="50" x2="200" y2="430" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="400" y1="50" x2="400" y2="430" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 5" />
          <line x1="600" y1="50" x2="600" y2="430" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="800" y1="50" x2="800" y2="430" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 5" />
        </g>

        {/* Continents: Clean Soft Landmass + Tech Dots */}
        {continents.map((c, i) => (
          <g key={i}>
            <path
              d={path(c)}
              fill="url(#continent-clean-grad)"
              stroke="#CBD5E1"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d={path(c)} fill="url(#light-tech-dots)" className="pointer-events-none" />
          </g>
        ))}

        {/* ─── INBOUND SOURCING ARCS (Dotted Slate) ─── */}
        {regions.sourcing.map((s) => (
          <path
            key={`sourcing-${s.name}`}
            d={arc(s, hub)}
            fill="none"
            stroke="#475569"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="opacity-50 hover:opacity-100 transition-opacity"
          />
        ))}

        {/* ─── OUTBOUND MARKET ARCS (Active = Royal Blue, Target = Emerald) ─── */}
        {regions.markets.map((m) => {
          const isTarget = m.status === "target";
          const strokeColor = isTarget ? "#10B981" : "#2563EB";
          return (
            <path
              key={`market-${m.name}`}
              d={arc(hub, m)}
              fill="none"
              stroke={strokeColor}
              strokeWidth={isTarget ? "1.6" : "1.8"}
              strokeDasharray={isTarget ? "3 4" : "5 5"}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          );
        })}

        {/* ─── SOURCING NODES (Slate Circles) ─── */}
        {regions.sourcing.map((s) => {
          const [x, y] = proj(s.lon, s.lat);
          const offset = getLabelOffset(s.name);
          return (
            <g
              key={s.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() =>
                setActiveTooltip({
                  name: s.name,
                  description: s.description,
                  type: "sourcing",
                  ports: s.ports,
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() =>
                setActiveTooltip({
                  name: s.name,
                  description: s.description,
                  type: "sourcing",
                  ports: s.ports,
                })
              }
            >
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#475569"
                stroke="#ffffff"
                strokeWidth="1.8"
                filter="url(#light-shadow)"
              />
              {!compact && (
                <text
                  x={x + offset.dx}
                  y={y + offset.dy}
                  textAnchor={offset.anchor}
                  className="fill-slate-600 text-[10px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
                >
                  {s.name}
                </text>
              )}
            </g>
          );
        })}

        {/* ─── CUSTOMER MARKET NODES (Active = Royal Blue, Target = Emerald Green) ─── */}
        {regions.markets.map((m) => {
          const [x, y] = proj(m.lon, m.lat);
          const isTarget = m.status === "target";
          const nodeColor = isTarget ? "#10B981" : "#2563EB";
          const offset = getLabelOffset(m.name);

          return (
            <g
              key={m.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() =>
                setActiveTooltip({
                  name: m.name,
                  description: m.description,
                  type: "market",
                  status: m.status,
                  countries: m.countries,
                  ports: m.ports,
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() =>
                setActiveTooltip({
                  name: m.name,
                  description: m.description,
                  type: "market",
                  status: m.status,
                  countries: m.countries,
                  ports: m.ports,
                })
              }
            >
              {/* Pulse Ring */}
              <circle
                cx={x}
                cy={y}
                r={isTarget ? "8" : "7"}
                fill="none"
                stroke={nodeColor}
                strokeWidth="1.2"
                strokeDasharray={isTarget ? "2 2" : undefined}
                className="animate-ping opacity-45"
              />

              {/* Core Node Circle */}
              <circle
                cx={x}
                cy={y}
                r={isTarget ? "5" : "5.5"}
                fill={nodeColor}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#light-shadow)"
              />

              {!compact && (
                <text
                  x={x + offset.dx}
                  y={y + offset.dy}
                  textAnchor={offset.anchor}
                  className={`${
                    isTarget ? "fill-emerald-700" : "fill-blue-700"
                  } text-[10.5px] font-bold tracking-tight pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(255,255,255,1)]`}
                >
                  {m.name}
                </text>
              )}
            </g>
          );
        })}

        {/* ─── DUBAI COMMERCIAL HQ (Central Golden Beacon) ─── */}
        <g
          className="cursor-pointer"
          onMouseEnter={() =>
            setActiveTooltip({
              name: hub.name,
              description: hub.description,
              type: "hub",
              status: "active",
              ports: hub.ports,
            })
          }
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() =>
            setActiveTooltip({
              name: hub.name,
              description: hub.description,
              type: "hub",
              status: "active",
              ports: hub.ports,
            })
          }
        >
          {/* Outer glow */}
          <circle cx={hx} cy={hy} r="24" fill="url(#hub-light-glow)" />

          {/* Pulsing ring */}
          <circle cx={hx} cy={hy} r="8.5" fill="none" stroke="#f97316" strokeWidth="1.5" className="animate-ping" />

          {/* Core circle */}
          <circle
            cx={hx}
            cy={hy}
            r="6.5"
            fill="#f97316"
            stroke="#ffffff"
            strokeWidth="2.5"
            filter="url(#light-shadow)"
          />

          <text
            x={hx + 12}
            y={hy - 8}
            className="fill-slate-900 text-[11px] font-extrabold tracking-normal pointer-events-none select-none drop-shadow-[0_1px_3px_rgba(255,255,255,1)]"
          >
            Dubai Commercial HQ (JAFZA)
          </text>
        </g>
      </svg>

      {/* Floating Interactive Tooltip Card on Hover/Tap */}
      {activeTooltip && (
        <div className="absolute bottom-4 left-4 sm:left-6 max-w-sm rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md transition-all duration-200 z-20">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  activeTooltip.type === "hub"
                    ? "bg-orange-500 ring-2 ring-orange-200"
                    : activeTooltip.status === "target"
                    ? "bg-emerald-500 ring-2 ring-emerald-200"
                    : activeTooltip.type === "sourcing"
                    ? "bg-slate-600"
                    : "bg-blue-600 ring-2 ring-blue-200"
                }`}
              />
              <span className="text-xs font-bold text-slate-900">{activeTooltip.name}</span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                activeTooltip.type === "hub"
                  ? "bg-orange-100 text-orange-900"
                  : activeTooltip.status === "target"
                  ? "bg-emerald-100 text-emerald-800"
                  : activeTooltip.type === "sourcing"
                  ? "bg-slate-100 text-slate-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {activeTooltip.type === "hub"
                ? "Trading Hub"
                : activeTooltip.status === "target"
                ? "▲ Target Expansion"
                : activeTooltip.type === "sourcing"
                ? "Refinery Sourcing"
                : "● Active Market"}
            </span>
          </div>

          {activeTooltip.countries && activeTooltip.countries.length > 0 && (
            <div className="mt-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Key Countries Covered:
              </span>
              <p className="text-[11px] font-semibold text-slate-800">
                {activeTooltip.countries.join(", ")}
              </p>
            </div>
          )}

          {activeTooltip.description && (
            <p className="mt-1.5 text-[11px] text-slate-600 leading-snug">
              {activeTooltip.description}
            </p>
          )}

          {activeTooltip.ports && activeTooltip.ports.length > 0 && (
            <div className="mt-2 pt-1.5 border-t border-slate-100">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Major Terminals / Ports:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeTooltip.ports.map((port, pIdx) => (
                  <span
                    key={pIdx}
                    className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[9px] font-mono text-slate-700 font-medium"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[9px] text-slate-400 font-medium">Click / tap node for details</span>
            <Link
              href={`/enquiry?route=${encodeURIComponent(activeTooltip.name)}`}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
            >
              <span>Request Quote</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs">
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-blue-600 ring-2 ring-blue-100 shadow-xs" />
        <span className="font-bold text-slate-900">Existing Active Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-100 shadow-xs" />
        <span className="font-bold text-slate-900">Potential Target Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-slate-600 ring-2 ring-slate-100 shadow-xs" />
        <span className="font-semibold text-slate-700">Refinery Sourcing</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-200 shadow-xs" />
        <span className="font-bold text-slate-900">Dubai Commercial HQ</span>
      </span>
    </div>
  );
}

export const GlobalTradingMapSection: React.FC = () => {
  return (
    <section
      id="global-network"
      data-aos="fade-up"
      className="mt-16 w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* ─── HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              Global Supply &amp; Distribution Network
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            International Trade Corridors &amp; Expansion Markets
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Coordinating containerized polymer trade from world-class refiners directly to plastic converting plants
            across <strong className="text-slate-900 font-bold">40+ international countries</strong> via our Dubai headquarters.
          </p>
        </div>

        {/* Legend Box */}
        <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs">
          <MapLegend />
        </div>
      </div>

      {/* ─── LIGHT-THEMED CLEAN SVG WORLD MAP ─── */}
      <div className="mt-6 w-full">
        <WorldMap />
      </div>

      {/* ─── CLEAN COLORFUL LOCATION ROWS (NO CLUTTERED CARDS) ─── */}
      <div className="mt-8 space-y-4 pt-6 border-t border-slate-200">
        {/* Row 1: Existing Active Business Markets */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Existing Active Business Markets
              </h3>
            </div>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              8 Regional Corridors
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Turkey */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇹🇷</span>
              <span>Turkey</span>
              <span className="text-[10.5px] font-normal text-slate-500">(Mersin, Istanbul, Izmir)</span>
            </span>

            {/* China & Far East */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇨🇳</span>
              <span>China &amp; Far East</span>
              <span className="text-[10.5px] font-normal text-slate-500">(China, Vietnam, Malaysia, Indonesia, Taiwan)</span>
            </span>

            {/* Australia */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇦🇺</span>
              <span>Australia</span>
              <span className="text-[10.5px] font-normal text-slate-500">(Melbourne, Sydney, Brisbane, Fremantle)</span>
            </span>

            {/* New Zealand */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇳🇿</span>
              <span>New Zealand</span>
              <span className="text-[10.5px] font-normal text-slate-500">(Auckland, Tauranga, Lyttelton)</span>
            </span>

            {/* East Africa */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🌍</span>
              <span>East Africa</span>
              <span className="text-[10.5px] font-normal text-slate-500">(Ethiopia, Djibouti, Kenya, Tanzania, Uganda)</span>
            </span>

            {/* Indian Subcontinent */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇮🇳</span>
              <span>Indian Subcontinent</span>
              <span className="text-[10.5px] font-normal text-slate-500">(India, Pakistan, Bangladesh, Sri Lanka)</span>
            </span>

            {/* Middle East & GCC */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇦🇪</span>
              <span>Middle East &amp; GCC</span>
              <span className="text-[10.5px] font-normal text-slate-500">(UAE, Saudi Arabia, Oman, Qatar, Kuwait, Bahrain)</span>
            </span>

            {/* Southern Europe */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-blue-200 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs">
              <span>🇪🇺</span>
              <span>Southern Europe</span>
              <span className="text-[10.5px] font-normal text-slate-500">(Italy, Spain, Greece, Portugal)</span>
            </span>
          </div>
        </div>

        {/* Row 2: Potential Target Expansion Markets */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Potential Target Expansion Markets
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              2 Growth Corridors
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* West Africa */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-emerald-300 px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-2xs">
              <span>🇬🇭</span>
              <span>West Africa Expansion Hubs</span>
              <span className="text-[10.5px] font-normal text-emerald-700">(Ghana, Nigeria, Côte d&apos;Ivoire, Senegal)</span>
            </span>

            {/* Latin America */}
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-emerald-300 px-3.5 py-1.5 text-xs font-bold text-emerald-950 shadow-2xs">
              <span>🇧🇷</span>
              <span>Latin American Ports</span>
              <span className="text-[10.5px] font-normal text-emerald-700">(Brazil, Colombia, Mexico, Peru, Chile)</span>
            </span>
          </div>
        </div>

        {/* Row 3: Direct Refinery Sourcing Origins */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Direct Petrochemical Refinery Sourcing (Origins to Dubai Hub)
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
              5 Global Producer Regions
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span>🇺🇸</span>
              <span>USA Gulf Coast Refiners (Houston, Beaumont, Corpus Christi)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span>🇨🇦</span>
              <span>Alberta Polyolefin Corridors (Canada)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span>🇪🇺</span>
              <span>Western Europe Refineries (Antwerp, Rotterdam, Hamburg)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span>🌏</span>
              <span>Far East Producers (South Korea, Taiwan, Japan)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">
              <span>🇦🇺</span>
              <span>Australia Sourcing Desks (Melbourne, Sydney, Brisbane)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
