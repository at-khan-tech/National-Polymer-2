"use client";

import React, { useState } from "react";
import Link from "next/link";
import { regions } from "@/data/content";

export interface MobileRouteItem {
  id: string;
  name: string;
  region: string;
  type: "sourcing" | "market";
  status?: "active" | "target";
  flag?: string;
  countries?: string[];
  ports: string[];
  description: string;
  advantage: string;
  materials: string;
}

export const GLOBAL_ROUTES: MobileRouteItem[] = [
  // ──────────────── SOURCING ORIGINS (Refiners -> Dubai) ────────────────
  {
    id: "src-usa",
    name: "USA Gulf Coast & Refineries",
    region: "North America",
    type: "sourcing",
    status: "active",
    flag: "🇺🇸",
    countries: ["United States (Texas, Louisiana)"],
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
    status: "active",
    flag: "🇨🇦",
    countries: ["Canada (Alberta)"],
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
    status: "active",
    flag: "🇪🇺",
    countries: ["Belgium", "Netherlands", "Germany"],
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
    status: "active",
    flag: "🌏",
    countries: ["South Korea", "Taiwan", "Japan"],
    ports: ["Ulsan", "Kaohsiung", "Ningbo", "Yokohama"],
    description: "Leading petrochemical producers providing prime polyolefins and engineering compounds.",
    advantage: "High MFI injection moulding & Raffia grades",
    materials: "PP Homopolymer, Copolymer, Suspension PVC",
  },
  {
    id: "src-australia",
    name: "Australia Sourcing Desks",
    region: "Australia",
    type: "sourcing",
    status: "active",
    flag: "🇦🇺",
    countries: ["Australia"],
    ports: ["Melbourne", "Sydney", "Brisbane"],
    description: "Supplier access for prime rotomoulding resins, industrial regrinds, and compounded materials.",
    advantage: "Trans-Pacific shipping lanes with certified COA",
    materials: "Prime, Near-Prime & Circular Polymers",
  },

  // ──────────────── EXISTING ACTIVE BUSINESS MARKETS ────────────────
  {
    id: "mkt-turkey",
    name: "Turkey & Anatolian Hubs",
    region: "Turkey / Eurasia",
    type: "market",
    status: "active",
    flag: "🇹🇷",
    countries: ["Turkey"],
    ports: ["Mersin", "Istanbul (Ambarli)", "Izmir (Aliaga)", "Gebze"],
    description: "Fast-transit Mediterranean container sailings serving major Turkish woven bag, film, and compounders.",
    advantage: "Customs transit facilitation & direct CIF Mersin / Istanbul service",
    materials: "PP Raffia, HDPE Film, Pipe Grade PE100",
  },
  {
    id: "mkt-china-fareast",
    name: "China & Far East Markets",
    region: "Far East",
    type: "market",
    status: "active",
    flag: "🇨🇳",
    countries: ["China", "Vietnam", "Malaysia", "Indonesia", "Taiwan"],
    ports: ["Shanghai", "Ningbo", "Qingdao", "Haiphong", "Port Klang"],
    description: "Supplying high-demand industrial packaging, film converters, and compounders across Far East markets.",
    advantage: "Regular container liner loops & bulk chemical shipments",
    materials: "Polyolefins, Engineering Resins & Metallocene",
  },
  {
    id: "mkt-east-africa",
    name: "East Africa Corridors",
    region: "East Africa",
    type: "market",
    status: "active",
    flag: "🌍",
    countries: ["Ethiopia", "Djibouti", "Kenya", "Tanzania", "Uganda"],
    ports: ["Mombasa", "Dar es Salaam", "Djibouti Port", "Inland ICDs"],
    description: "Serving key infrastructure, packaging, and agricultural converters across East Africa.",
    advantage: "Direct multi-modal transit through Djibouti & Mombasa corridors into landlocked destinations",
    materials: "HDPE Blow & Pipe, PP Woven, LDPE Film",
  },
  {
    id: "mkt-australia",
    name: "Australia Industrial Corridors",
    region: "Oceania",
    type: "market",
    status: "active",
    flag: "🇦🇺",
    countries: ["Australia"],
    ports: ["Melbourne", "Sydney", "Brisbane", "Fremantle"],
    description: "Expanding container supply routes supporting industrial moulders, packaging, and rotomoulding plants.",
    advantage: "Certified quality documentation, ISO standards, and reliable schedules",
    materials: "Prime Rotomoulding, Injection, Pipe PE100, Circular Resins",
  },
  {
    id: "mkt-new-zealand",
    name: "New Zealand Corridors",
    region: "Oceania",
    type: "market",
    status: "active",
    flag: "🇳🇿",
    countries: ["New Zealand"],
    ports: ["Auckland", "Tauranga", "Lyttelton"],
    description: "Containerized deliveries serving Kiwi agricultural film, flexible packaging, and rigid container manufacturers.",
    advantage: "Direct ocean liner schedules with phytosanitary & analysis documentation",
    materials: "HDPE Film, LLDPE Stretch Film, PP Extrusion",
  },
  {
    id: "mkt-india",
    name: "Indian Subcontinent Corridors",
    region: "South Asia",
    type: "market",
    status: "active",
    flag: "🇮🇳",
    countries: ["India", "Pakistan", "Bangladesh", "Sri Lanka"],
    ports: ["Nhava Sheva (JNPT)", "Mundra", "Karachi", "Chittagong", "Colombo"],
    description: "Our highest volume export corridor supplying hundreds of converting plants across the subcontinent.",
    advantage: "Extended 14-21 day free container detention for smooth ICD rail transit",
    materials: "High-Volume PP, HDPE Film & Blow, LLDPE",
  },
  {
    id: "mkt-gcc",
    name: "Middle East & GCC Distribution",
    region: "Middle East",
    type: "market",
    status: "active",
    flag: "🇦🇪",
    countries: ["UAE", "Saudi Arabia", "Oman", "Qatar", "Kuwait", "Bahrain"],
    ports: ["Jebel Ali", "Dammam", "Jubail", "Sohar", "Hamad Port"],
    description: "Regional distribution hub offering rapid trucking and bonded warehouse inventory in JAFZA.",
    advantage: "Next-day road transport & local currency billing options",
    materials: "Full Polymer Catalog & Buffer Inventories",
  },
  {
    id: "mkt-europe-med",
    name: "Southern Europe & Mediterranean",
    region: "Europe",
    type: "market",
    status: "active",
    flag: "🇮🇹",
    countries: ["Italy", "Spain", "Greece", "Portugal"],
    ports: ["Genoa", "Valencia", "Barcelona", "Piraeus"],
    description: "High-spec prime polyolefins and compliant circular polymers for European converters.",
    advantage: "Full EU REACH & compliance certification provided with every container",
    materials: "Certified Prime Resins & Circular Granules",
  },

  // ──────────────── POTENTIAL TARGET EXPANSION MARKETS ────────────────
  {
    id: "mkt-west-africa",
    name: "West Africa Expansion Hubs",
    region: "West Africa",
    type: "market",
    status: "target",
    flag: "🇬🇭",
    countries: ["Ghana", "Nigeria", "Côte d'Ivoire", "Senegal"],
    ports: ["Tema (Ghana)", "Lagos (Apapa / Tin Can)", "Abidjan", "Dakar"],
    description: "High-potential target growth markets for flexible packaging, raffia bags, and rigid containers.",
    advantage: "Competitive freight rates from Middle East hubs with verified inspection certificates",
    materials: "PP Yarn & Raffia, HDPE Blow Moulding, LLDPE",
  },
  {
    id: "mkt-latam",
    name: "Latin American Frontiers",
    region: "Latin America",
    type: "market",
    status: "target",
    flag: "🇧🇷",
    countries: ["Brazil", "Colombia", "Peru", "Chile", "Mexico"],
    ports: ["Santos", "Paranagua", "Buenaventura", "Callao", "Manzanillo"],
    description: "Strategic expansion routes serving packaging, agriculture, and pipe manufacturers.",
    advantage: "Multi-carrier ocean charter options & flexible payment mechanisms",
    materials: "Prime & Near-Prime Polyolefins, PVC",
  },
];

const W = 1000,
  H = 500;
const proj = (lon: number, lat: number) =>
  [((lon + 180) / 360) * W, ((90 - lat) / 180) * H] as const;

// Simplified continent outlines (lon, lat)
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

// Coordinate label offsets to completely eliminate visual collisions
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

export function WorldMap({
  compact = false,
  selectedId = null,
  onSelect = () => {},
}: {
  compact?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
}) {
  const hub = regions.hub;
  const [hx, hy] = proj(hub.lon, hub.lat);
  const [hoveredNode, setHoveredNode] = useState<{
    id?: string;
    name: string;
    description?: string;
    type: "sourcing" | "market" | "hub";
    status?: "active" | "target";
    countries?: string[];
    ports?: string[];
  } | null>(null);

  const activeNode =
    hoveredNode ||
    (selectedId
      ? (() => {
          const item = GLOBAL_ROUTES.find((r) => r.id === selectedId);
          if (!item) return null;
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type,
            status: item.status,
            countries: item.countries,
            ports: item.ports,
          };
        })()
      : null);

  return (
    <div className="relative w-full overflow-hidden select-none rounded-2xl bg-gradient-to-b from-slate-900 via-[#0b132b] to-slate-950 p-2 sm:p-4 border border-slate-800 shadow-2xl">
      <svg
        viewBox={`0 30 ${W} ${H - 60}`}
        className="h-auto w-full transition-all duration-300"
        role="img"
        aria-label="World map of polymer trade corridors, existing markets and target expansion hubs"
      >
        <defs>
          {/* Continent Landmass Gradient */}
          <linearGradient id="continent-dark-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
          </linearGradient>

          {/* Grid pattern in ocean */}
          <pattern id="ocean-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
          </pattern>

          {/* Subtle Dots on Landmass */}
          <pattern id="land-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.1" fill="#38bdf8" fillOpacity="0.25" />
          </pattern>

          {/* Hub Aura */}
          <radialGradient id="hub-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>

          <filter id="glow-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Ocean Grid Background */}
        <rect x="0" y="0" width={W} height={H} fill="url(#ocean-grid)" />

        {/* Latitude & Longitude Navigation Coordinates */}
        <g className="pointer-events-none opacity-20">
          <line x1="20" y1="125" x2="980" y2="125" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 5" />
          <line x1="20" y1="250" x2="980" y2="250" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="20" y1="375" x2="980" y2="375" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 5" />
          <line x1="250" y1="40" x2="250" y2="460" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 5" />
          <line x1="500" y1="40" x2="500" y2="460" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="750" y1="40" x2="750" y2="460" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="3 5" />
        </g>

        {/* Continents Shapes */}
        {continents.map((c, i) => (
          <g key={i}>
            <path
              d={path(c)}
              fill="url(#continent-dark-grad)"
              stroke="#334155"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d={path(c)} fill="url(#land-dots)" className="pointer-events-none" />
          </g>
        ))}

        {/* ─── INBOUND SOURCING ARCS (Dotted Slate) ─── */}
        {regions.sourcing.map((s) => (
          <path
            key={`sourcing-${s.name}`}
            d={arc(s, hub)}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.4"
            strokeDasharray="4 4"
            className="opacity-40 hover:opacity-100 transition-opacity"
          />
        ))}

        {/* ─── OUTBOUND MARKET ARCS ─── */}
        {regions.markets.map((m) => {
          const isTarget = m.status === "target";
          const isHovered = activeNode?.name === m.name;
          const strokeColor = isTarget ? "#10b981" : "#3b82f6";
          const strokeWidth = isHovered ? "2.6" : isTarget ? "1.6" : "1.8";

          return (
            <path
              key={`market-${m.name}`}
              d={arc(hub, m)}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={isTarget ? "3 4" : "6 4"}
              className={`transition-all duration-300 ${
                isHovered
                  ? "opacity-100 filter drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
                  : "opacity-65 hover:opacity-100"
              }`}
            />
          );
        })}

        {/* ─── SOURCING NODES ─── */}
        {regions.sourcing.map((s) => {
          const [x, y] = proj(s.lon, s.lat);
          const offset = getLabelOffset(s.name);
          return (
            <g
              key={s.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() =>
                setHoveredNode({
                  name: s.name,
                  description: s.description,
                  type: "sourcing",
                  ports: s.ports,
                })
              }
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelect(s.name)}
            >
              <circle cx={x} cy={y} r="4" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />
              {!compact && (
                <text
                  x={x + offset.dx}
                  y={y + offset.dy}
                  textAnchor={offset.anchor}
                  className="fill-slate-400 text-[9.5px] font-semibold tracking-tight pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  {s.name}
                </text>
              )}
            </g>
          );
        })}

        {/* ─── CUSTOMER MARKET NODES (Active = Royal Blue, Target = Emerald) ─── */}
        {regions.markets.map((m) => {
          const [x, y] = proj(m.lon, m.lat);
          const isTarget = m.status === "target";
          const isSelected = activeNode?.name === m.name;
          const nodeColor = isTarget ? "#10b981" : "#3b82f6";
          const offset = getLabelOffset(m.name);

          return (
            <g
              key={m.name}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() =>
                setHoveredNode({
                  name: m.name,
                  description: m.description,
                  type: "market",
                  status: m.status,
                  countries: m.countries,
                  ports: m.ports,
                })
              }
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelect(m.name)}
            >
              {/* Pulsing ring for high visibility */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? "11" : isTarget ? "8" : "7"}
                fill="none"
                stroke={nodeColor}
                strokeWidth={isSelected ? "2" : "1"}
                strokeDasharray={isTarget ? "2 2" : undefined}
                className="animate-ping opacity-50"
              />

              {/* Core Node */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? "6" : isTarget ? "5" : "5"}
                fill={nodeColor}
                stroke="#ffffff"
                strokeWidth="1.6"
                filter="url(#glow-shadow)"
              />

              {!compact && (
                <g className="pointer-events-none select-none">
                  <text
                    x={x + offset.dx}
                    y={y + offset.dy}
                    textAnchor={offset.anchor}
                    className={`${
                      isTarget ? "fill-emerald-400 font-bold" : "fill-blue-300 font-bold"
                    } text-[10px] tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]`}
                  >
                    {m.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ─── DUBAI HQ TRADING HUB (Central Golden Epicenter) ─── */}
        <g
          className="cursor-pointer"
          onMouseEnter={() =>
            setHoveredNode({
              name: hub.name,
              description: hub.description,
              type: "hub",
              status: "active",
              ports: hub.ports,
            })
          }
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Radiant Aura */}
          <circle cx={hx} cy={hy} r="26" fill="url(#hub-aura)" />

          {/* Pulse ring */}
          <circle cx={hx} cy={hy} r="9" fill="none" stroke="#f97316" strokeWidth="1.5" className="animate-ping" />

          {/* Beacon Core */}
          <circle cx={hx} cy={hy} r="7" fill="#f97316" stroke="#ffffff" strokeWidth="2" filter="url(#glow-shadow)" />

          <text
            x={hx + 12}
            y={hy - 10}
            className="fill-amber-300 text-[11px] font-black tracking-normal pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
          >
            Dubai Commercial HQ (JAFZA)
          </text>
        </g>
      </svg>

      {/* Floating Interactive Tooltip Card on Hover/Tap */}
      {activeNode && (
        <div className="absolute bottom-4 left-4 sm:left-6 max-w-sm rounded-xl border border-slate-700 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md text-white transition-all duration-200 z-20">
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  activeNode.type === "hub"
                    ? "bg-orange-500 ring-2 ring-orange-300"
                    : activeNode.status === "target"
                    ? "bg-emerald-500 ring-2 ring-emerald-300"
                    : activeNode.type === "sourcing"
                    ? "bg-slate-400"
                    : "bg-blue-500 ring-2 ring-blue-300"
                }`}
              />
              <span className="text-xs font-bold text-white">{activeNode.name}</span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                activeNode.type === "hub"
                  ? "bg-orange-950 text-orange-300 border border-orange-700/50"
                  : activeNode.status === "target"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-700/50"
                  : activeNode.type === "sourcing"
                  ? "bg-slate-800 text-slate-300 border border-slate-700"
                  : "bg-blue-950 text-blue-300 border border-blue-700/50"
              }`}
            >
              {activeNode.type === "hub"
                ? "Trading Hub"
                : activeNode.status === "target"
                ? "▲ Target Expansion"
                : activeNode.type === "sourcing"
                ? "Refinery Sourcing"
                : "● Active Market"}
            </span>
          </div>

          {activeNode.countries && activeNode.countries.length > 0 && (
            <div className="mt-2.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Countries Covered:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeNode.countries.map((c, i) => (
                  <span
                    key={i}
                    className="rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeNode.description && (
            <p className="mt-2 text-[11px] text-slate-300 leading-relaxed">
              {activeNode.description}
            </p>
          )}

          {activeNode.ports && activeNode.ports.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-slate-800">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Major Container Ports / Terminals:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeNode.ports.map((port, pIdx) => (
                  <span
                    key={pIdx}
                    className="rounded bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 text-[9px] font-mono text-slate-300"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[9px] text-slate-400 font-medium">Click card below for rates</span>
            <Link
              href={`/enquiry?route=${encodeURIComponent(activeNode.name)}`}
              className="text-[10.5px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition"
            >
              <span>Get Freight Quote</span>
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
        <span className="h-3 w-3 rounded-full bg-blue-600 ring-2 ring-blue-200 shadow-xs" />
        <span className="font-bold text-slate-900">Existing Active Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200 shadow-xs" />
        <span className="font-bold text-slate-900">Potential Target Markets</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-slate-500 ring-2 ring-slate-200 shadow-xs" />
        <span className="font-semibold text-slate-700">Refinery Sourcing</span>
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full bg-orange-500 border-2 border-white ring-2 ring-orange-300 shadow-xs" />
        <span className="font-extrabold text-orange-950">Dubai Commercial HQ</span>
      </span>
    </div>
  );
}

export const GlobalTradingMapSection: React.FC = () => {
  const [filterTab, setFilterTab] = useState<"all" | "active" | "target" | "sourcing">("all");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const activeMarkets = GLOBAL_ROUTES.filter((r) => r.type === "market" && r.status === "active");
  const targetMarkets = GLOBAL_ROUTES.filter((r) => r.type === "market" && r.status === "target");
  const sourcingRoutes = GLOBAL_ROUTES.filter((r) => r.type === "sourcing");

  const displayedRoutes = GLOBAL_ROUTES.filter((r) => {
    if (filterTab === "all") return true;
    if (filterTab === "active") return r.type === "market" && r.status === "active";
    if (filterTab === "target") return r.type === "market" && r.status === "target";
    if (filterTab === "sourcing") return r.type === "sourcing";
    return true;
  });

  return (
    <section
      id="global-network"
      data-aos="fade-up"
      className="mt-16 w-full rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10 shadow-lg"
    >
      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              International Trade Corridors
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Global Presence &amp; Target Expansion Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Coordinating containerized polymer trade from world-class refiners directly to plastic converting plants
            across <strong className="text-slate-900 font-bold">40+ international countries</strong>. Sourced and routed
            through our Dubai Commercial Headquarters at Jebel Ali Free Zone.
          </p>
        </div>

        {/* Legend Box */}
        <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs">
          <MapLegend />
        </div>
      </div>

      {/* ─── INTERACTIVE SVG WORLD MAP ─── */}
      <div className="mt-8">
        <WorldMap selectedId={selectedRouteId} onSelect={(name) => {
          const match = GLOBAL_ROUTES.find((r) => r.name === name);
          setSelectedRouteId(match ? match.id : null);
        }} />
      </div>

      {/* ─── FILTER TABS ─── */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterTab === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Corridors ({GLOBAL_ROUTES.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab("active")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterTab === "active"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Existing Active Markets ({activeMarkets.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab("target")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterTab === "target"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Potential Target Markets ({targetMarkets.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterTab("sourcing")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterTab === "sourcing"
                ? "bg-slate-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Refinery Sourcing ({sourcingRoutes.length})
          </button>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          👉 Click any region card below to inspect covered countries &amp; discharge ports
        </p>
      </div>

      {/* ─── REGIONAL CARDS GRID (CLEARLY DIFFERENTIATING EXISTING VS POTENTIAL) ─── */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {displayedRoutes.map((route) => {
          const isTarget = route.status === "target";
          const isSourcing = route.type === "sourcing";
          const isSelected = selectedRouteId === route.id;

          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(isSelected ? null : route.id)}
              className={`group flex flex-col justify-between rounded-2xl p-5 border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-blue-600 bg-blue-50/40 shadow-md ring-2 ring-blue-400"
                  : isTarget
                  ? "border-emerald-200 bg-emerald-50/20 hover:border-emerald-400 hover:shadow-md"
                  : isSourcing
                  ? "border-slate-200 bg-slate-50/50 hover:border-slate-400 hover:shadow-md"
                  : "border-blue-100 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xl">{route.flag || "🌐"}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isTarget
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : isSourcing
                        ? "bg-slate-200 text-slate-800 border border-slate-300"
                        : "bg-blue-100 text-blue-800 border border-blue-300"
                    }`}
                  >
                    {isTarget
                      ? "▲ Potential Target Market"
                      : isSourcing
                      ? "Refinery Sourcing Origin"
                      : "● Existing Active Market"}
                  </span>
                </div>

                {/* Region Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {route.name}
                </h3>

                {/* Countries Covered as Colorful Pills */}
                {route.countries && route.countries.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Key Countries Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {route.countries.map((c, i) => (
                        <span
                          key={i}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            isTarget
                              ? "bg-emerald-100/80 text-emerald-900 border border-emerald-200"
                              : "bg-blue-50 text-blue-950 border border-blue-200"
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {route.description}
                </p>

                {/* Ports */}
                <div className="mt-3.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Major Ports &amp; ICD Terminals:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {route.ports.map((port, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-mono text-slate-700 font-medium shadow-2xs"
                      >
                        {port}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Materials & Advantage */}
                <div className="mt-3 pt-2 text-xs text-slate-500">
                  <div className="font-semibold text-slate-700">📦 {route.materials}</div>
                  <div className="text-[11px] text-slate-500 mt-1">💡 {route.advantage}</div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-400">Incoterms: CIF / CFR / FOB</span>
                <Link
                  href={`/enquiry?route=${encodeURIComponent(route.name)}`}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition shadow-xs ${
                    isTarget
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Request Quote</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
