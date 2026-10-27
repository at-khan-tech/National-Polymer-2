"use client";

import React, { useState } from "react";
import { useTheme, ThemeMode, CustomPalette } from "@/context/ThemeContext";

const PRESET_SWATCHES = [
  { name: "Emerald Polymer", primary: "#059669", navy: "#06281e" },
  { name: "Royal Purple", primary: "#6366f1", navy: "#111827" },
  { name: "Sunset Amber", primary: "#d97706", navy: "#1c1917" },
  { name: "Cyber Teal", primary: "#0d9488", navy: "#042f2e" },
  { name: "Deep Titanium", primary: "#475569", navy: "#0f172a" },
];

export const ThemeSwitcher: React.FC = () => {
  const {
    theme,
    customPalette,
    setTheme,
    updateCustomColor,
    autoGeneratePaletteFromPrimary,
    resetCustomPalette,
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"presets" | "custom">("presets");
  const [copied, setCopied] = useState(false);

  const handleCopyCodes = () => {
    let text = "";
    if (theme === "gold") {
      text = `National Polymers - Corporate Theme:
Primary: #E95220
Primary Darker: #B11A00
Corporate Dark: #2F46D8`;
    } else if (theme === "polymer") {
      text = `National Polymers - Logo Brand Theme (Crimson & Cyan):
Primary (Red): #E5252A
Primary Darker: #B91C1C
Accent (Cyan): #00B4D8
Corporate Midnight: #0B132B`;
    } else if (theme === "blue") {
      text = `National Polymers - Ocean Sapphire Blue Theme:
Primary (Sapphire Blue): #1D4ED8
Primary Darker: #1E3A8A
Accent (Teal Cyan): #06B6D4
Corporate Navy: #0A192F`;
    } else {
      text = `National Polymers - Custom Palette:
Primary: ${customPalette.primary}
Primary Darker: ${customPalette.primaryDarker}
Primary Lighter: ${customPalette.primaryLighter}
Navy: ${customPalette.navy}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <aside aria-label="Theme selector" className="fixed bottom-6 left-6 z-50">
      {/* Expanded Theme Panel */}
      {isOpen && (
        <div
          role="region"
          aria-label="Theme customization studio"
          className="mb-3 w-[340px] sm:w-[380px] max-h-[85vh] overflow-y-auto rounded-2xl bg-white/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md border border-gray-200 transition-all duration-300 animate-news-fade"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Brand Theme &amp; Color Studio
              </p>
              <h4 className="text-sm font-semibold text-gray-900 mt-0.5">
                Live Color Customizer
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700 p-1 text-sm rounded-md"
              aria-label="Close theme studio"
            >
              ✕
            </button>
          </div>

          {/* Tab Selector */}
          <div className="mt-3 grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`py-1.5 rounded-md transition-all ${
                activeTab === "presets"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Preset Themes (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("custom")}
              className={`py-1.5 rounded-md transition-all ${
                activeTab === "custom"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🎨 Custom Color Picker
            </button>
          </div>

          {/* TAB 1: PRESET THEMES */}
          {activeTab === "presets" && (
            <div className="mt-3.5 space-y-2.5">
              {/* Option 1: Corporate Theme */}
              <button
                type="button"
                onClick={() => setTheme("gold")}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === "gold"
                    ? "border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1">
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#E95220" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#2F46D8" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#FDE8E1" }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">
                      1. Corporate Theme (Default)
                    </span>
                  </div>
                  {theme === "gold" && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1 pl-6">
                  Primary #E95220 · Hover #B11A00 · Corporate Dark #2F46D8
                </p>
              </button>

              {/* Option 2: Logo Brand (Red & Cyan) */}
              <button
                type="button"
                onClick={() => setTheme("polymer")}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === "polymer"
                    ? "border-red-600 bg-red-50/70 ring-2 ring-red-500/20 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1">
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#E5252A" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#00B4D8" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#0B132B" }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">
                      2. Logo Brand (Red &amp; Cyan)
                    </span>
                  </div>
                  {theme === "polymer" && (
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1 pl-6">
                  Official logo colors: Crimson Red + Ocean Cyan
                </p>
              </button>

              {/* Option 3: Ocean Sapphire Blue */}
              <button
                type="button"
                onClick={() => setTheme("blue")}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  theme === "blue"
                    ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1">
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#1D4ED8" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#06B6D4" }}
                      />
                      <span
                        className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: "#0A192F" }}
                      />
                    </div>
                    <span className="font-semibold text-xs text-gray-900">
                      3. Ocean Sapphire Blue (New)
                    </span>
                  </div>
                  {theme === "blue" && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1 pl-6">
                  Replaces red with Sapphire Blue (#1D4ED8) + Aqua Accent
                </p>
              </button>
            </div>
          )}

          {/* TAB 2: LIVE CUSTOM COLOR PICKER STUDIO */}
          {activeTab === "custom" && (
            <div className="mt-3.5 space-y-3">
              <div className="rounded-lg bg-gray-50 p-2.5 text-[11px] text-gray-600">
                💡 <span className="font-semibold">Tip:</span> Pick any color below and the whole website updates in real time!
              </div>

              {/* Primary Color Picker */}
              <div className="space-y-1">
                <label className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>Primary Color (Buttons, Badges, Highlights):</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase">
                    {customPalette.primary}
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.primary}
                    onChange={(e) => autoGeneratePaletteFromPrimary(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded border border-gray-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={customPalette.primary}
                    onChange={(e) => {
                      if (e.target.value.startsWith("#") && e.target.value.length <= 7) {
                        autoGeneratePaletteFromPrimary(e.target.value);
                      }
                    }}
                    placeholder="#1D4ED8"
                    className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-xs font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Darker Shade Picker */}
              <div className="space-y-1">
                <label className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>Darker Shade (Hover &amp; Headings):</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase">
                    {customPalette.primaryDarker}
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.primaryDarker}
                    onChange={(e) => updateCustomColor("primaryDarker", e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-gray-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={customPalette.primaryDarker}
                    onChange={(e) => updateCustomColor("primaryDarker", e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-1 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              {/* Corporate Navy / Dark Background Picker */}
              <div className="space-y-1">
                <label className="flex items-center justify-between text-xs font-semibold text-gray-700">
                  <span>Corporate Dark (Navbar / Cards / Footer):</span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase">
                    {customPalette.navy}
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customPalette.navy}
                    onChange={(e) => updateCustomColor("navy", e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-gray-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={customPalette.navy}
                    onChange={(e) => updateCustomColor("navy", e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-1 text-xs font-mono uppercase"
                  />
                </div>
              </div>

              {/* Quick Swatch Presets */}
              <div className="pt-2">
                <p className="text-[11px] font-semibold text-gray-600 mb-1.5">
                  Or pick a curated color preset:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => autoGeneratePaletteFromPrimary(swatch.primary)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-[11px] hover:border-gray-400 transition-colors shadow-2xs cursor-pointer"
                    >
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: swatch.primary }}
                      />
                      <span>{swatch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Footer Buttons */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleCopyCodes}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black transition-colors cursor-pointer"
            >
              <span>{copied ? "✓ Copied to Clipboard!" : "📋 Copy HEX Codes"}</span>
            </button>

            <button
              type="button"
              onClick={resetCustomPalette}
              className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 rounded-full bg-gray-900/90 hover:bg-gray-950 text-white px-4 py-2.5 shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Toggle theme and color studio popup"
      >
        {/* Active Theme Color Dot Indicator */}
        <span className="flex -space-x-1">
          {theme === "gold" && (
            <>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#E95220] ring-2 ring-gray-900" />
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#2F46D8] ring-2 ring-gray-900" />
            </>
          )}
          {theme === "polymer" && (
            <>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#E5252A] ring-2 ring-gray-900" />
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#00B4D8] ring-2 ring-gray-900" />
            </>
          )}
          {theme === "blue" && (
            <>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#1D4ED8] ring-2 ring-gray-900" />
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#06B6D4] ring-2 ring-gray-900" />
            </>
          )}
          {theme === "custom" && (
            <>
              <span
                className="inline-block w-3.5 h-3.5 rounded-full ring-2 ring-gray-900"
                style={{ backgroundColor: customPalette.primary }}
              />
              <span
                className="inline-block w-3.5 h-3.5 rounded-full ring-2 ring-gray-900"
                style={{ backgroundColor: customPalette.navy }}
              />
            </>
          )}
        </span>

        <span className="text-xs font-semibold tracking-wide">
          {theme === "gold" && "Theme: Corporate"}
          {theme === "polymer" && "Theme: Logo Brand"}
          {theme === "blue" && "Theme: Ocean Blue"}
          {theme === "custom" && "Theme: Custom Studio"}
        </span>

        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90">
          Palette Studio
        </span>
      </button>
    </aside>
  );
};
