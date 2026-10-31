"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "gold" | "polymer" | "blue" | "custom";

export interface CustomPalette {
  primary: string;
  primaryDarker: string;
  primaryLighter: string;
  primarySoft: string;
  accent: string;
  navy: string;
}

export const defaultCustomPalette: CustomPalette = {
  primary: "#e95220",
  primaryDarker: "#b11a00",
  primaryLighter: "#fde8e1",
  primarySoft: "#fff5f1",
  accent: "#0f3b82",
  navy: "#0f3b82",
};

interface ThemeContextType {
  theme: ThemeMode;
  customPalette: CustomPalette;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  updateCustomColor: (key: keyof CustomPalette, value: string) => void;
  setFullPalette: (palette: Partial<CustomPalette>) => void;
  autoGeneratePaletteFromPrimary: (primaryHex: string) => void;
  resetCustomPalette: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "gold",
  customPalette: defaultCustomPalette,
  setTheme: () => {},
  toggleTheme: () => {},
  updateCustomColor: () => {},
  setFullPalette: () => {},
  autoGeneratePaletteFromPrimary: () => {},
  resetCustomPalette: () => {},
});

// Utility to calculate darker shade
function shadeColor(hex: string, percent: number): string {
  try {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
    return "#" + [R, G, B].map((v) => v.toString(16).padStart(2, "0")).join("");
  } catch {
    return hex;
  }
}

// Utility to blend with white for light background tints
function tintWithWhite(hex: string, factor: number): string {
  try {
    const num = parseInt(hex.replace("#", ""), 16);
    const r = num >> 16;
    const g = (num >> 8) & 0x00ff;
    const b = num & 0x0000ff;
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    return "#" + [newR, newG, newB].map((v) => v.toString(16).padStart(2, "0")).join("");
  } catch {
    return hex;
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("gold");
  const [customPalette, setCustomPalette] = useState<CustomPalette>(defaultCustomPalette);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme") as ThemeMode | null;
      const savedTheme = (urlTheme || localStorage.getItem("np_theme")) as ThemeMode | null;
      if (savedTheme && ["gold", "polymer", "blue", "custom"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }

      const savedPalette = localStorage.getItem("np_custom_palette");
      if (savedPalette) {
        setCustomPalette(JSON.parse(savedPalette));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    // Remove all preset classes first
    root.classList.remove("theme-gold", "theme-polymer", "theme-blue", "theme-custom");

    const cssVars = [
      "--color-primary",
      "--color-primary-darker",
      "--color-primary-lighter",
      "--color-primary-soft",
      "--color-accent",
      "--color-navy",
      "--color-navy-dark",
      "--color-hover-card",
      "--color-scrollbar-thumb",
      "--color-scrollbar-hover",
    ];

    if (theme === "custom") {
      root.classList.add("theme-custom");
      // Apply custom inline CSS variables
      root.style.setProperty("--color-primary", customPalette.primary);
      root.style.setProperty("--color-primary-darker", customPalette.primaryDarker);
      root.style.setProperty("--color-primary-lighter", customPalette.primaryLighter);
      root.style.setProperty("--color-primary-soft", customPalette.primarySoft);
      root.style.setProperty("--color-accent", customPalette.accent);
      root.style.setProperty("--color-navy", customPalette.navy);
      root.style.setProperty("--color-navy-dark", shadeColor(customPalette.navy, -22));
      root.style.setProperty("--color-hover-card", customPalette.primary);
      root.style.setProperty("--color-scrollbar-thumb", customPalette.primary);
      root.style.setProperty("--color-scrollbar-hover", customPalette.primaryDarker);

      try {
        localStorage.setItem("np_theme", "custom");
        localStorage.setItem("np_custom_palette", JSON.stringify(customPalette));
      } catch {}
    } else {
      // Clear any custom inline style overrides so preset CSS classes work cleanly
      cssVars.forEach((v) => root.style.removeProperty(v));

      if (theme === "polymer") {
        root.classList.add("theme-polymer");
      } else if (theme === "blue") {
        root.classList.add("theme-blue");
      } else {
        root.classList.add("theme-gold");
      }

      try {
        localStorage.setItem("np_theme", theme);
      } catch {}
    }
  }, [theme, customPalette, mounted]);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "gold") return "polymer";
      if (prev === "polymer") return "blue";
      return "gold";
    });
  };

  const updateCustomColor = (key: keyof CustomPalette, value: string) => {
    setCustomPalette((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem("np_custom_palette", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setThemeState("custom");
  };

  const setFullPalette = (palette: Partial<CustomPalette>) => {
    setCustomPalette((prev) => {
      const updated = { ...prev, ...palette };
      try {
        localStorage.setItem("np_custom_palette", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setThemeState("custom");
  };

  const autoGeneratePaletteFromPrimary = (primaryHex: string) => {
    const darker = shadeColor(primaryHex, -22);
    const lighter = tintWithWhite(primaryHex, 0.78);
    const soft = tintWithWhite(primaryHex, 0.93);
    const accent = shadeColor(primaryHex, 15);

    const updated: CustomPalette = {
      ...customPalette,
      primary: primaryHex,
      primaryDarker: darker,
      primaryLighter: lighter,
      primarySoft: soft,
      accent: accent,
    };

    setCustomPalette(updated);
    setThemeState("custom");
    try {
      localStorage.setItem("np_custom_palette", JSON.stringify(updated));
    } catch {}
  };

  const resetCustomPalette = () => {
    setCustomPalette(defaultCustomPalette);
    setThemeState("gold");
    try {
      localStorage.removeItem("np_custom_palette");
      localStorage.setItem("np_theme", "gold");
    } catch {}
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        customPalette,
        setTheme,
        toggleTheme,
        updateCustomColor,
        setFullPalette,
        autoGeneratePaletteFromPrimary,
        resetCustomPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
