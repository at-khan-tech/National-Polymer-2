"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Theme selector" className="fixed bottom-6 left-6 z-50">
      {/* Expanded Palette Menu */}
      {isOpen && (
        <div
          role="region"
          aria-label="Theme selection panel"
          className="mb-3 w-80 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur-md border border-gray-200 transition-all duration-300 animate-news-fade"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Brand Theme Selector
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                Preview Color Schemes
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-700 p-1 text-sm rounded-md"
              aria-label="Close theme selector"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {/* Option 1: Classic Gold (Current MultiTrade Replica) */}
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
                  {/* Swatches */}
                  <div className="flex -space-x-1">
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#AE872E" }}
                      title="Gold (#AE872E)"
                    />
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#071A3D" }}
                      title="Navy (#071A3D)"
                    />
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#F8EBD2" }}
                      title="Sand Tint (#F8EBD2)"
                    />
                  </div>
                  <span className="font-semibold text-sm text-gray-900">
                    Theme 1: Classic Gold
                  </span>
                </div>
                {theme === "gold" && (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1 pl-6">
                Current luxury replica theme (Gold #AE872E + Deep Navy #071A3D)
              </p>
            </button>

            {/* Option 2: Logo Brand Theme (Crimson Red & Ocean Cyan) */}
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
                  {/* Swatches */}
                  <div className="flex -space-x-1">
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#E5252A" }}
                      title="Logo Crimson Red (#E5252A)"
                    />
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#00B4D8" }}
                      title="Logo Ocean Cyan (#00B4D8)"
                    />
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: "#0B132B" }}
                      title="Midnight Slate (#0B132B)"
                    />
                  </div>
                  <span className="font-semibold text-sm text-gray-900">
                    Theme 2: Logo Brand
                  </span>
                </div>
                {theme === "polymer" && (
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1 pl-6">
                Extracted from official National Polymers logo (Crimson Red + Ocean Cyan)
              </p>
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Click to switch live instantly</span>
            <span className="font-medium text-gray-700">Ready for seniors review</span>
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 rounded-full bg-gray-900/90 hover:bg-gray-950 text-white px-4 py-2.5 shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
        aria-label="Toggle theme selector popup"
      >
        {/* Active Theme Color Dot Indicators */}
        <span className="flex -space-x-1">
          {theme === "gold" ? (
            <>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#AE872E] ring-2 ring-gray-900" />
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#071A3D] ring-2 ring-gray-900" />
            </>
          ) : (
            <>
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#E5252A] ring-2 ring-gray-900" />
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#00B4D8] ring-2 ring-gray-900" />
            </>
          )}
        </span>

        <span className="text-xs font-semibold tracking-wide">
          {theme === "gold" ? "Theme: Classic Gold" : "Theme: Logo Brand"}
        </span>

        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90">
          Switch
        </span>
      </button>
    </aside>
  );
};
