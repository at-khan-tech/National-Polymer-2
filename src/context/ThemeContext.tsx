"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "gold" | "polymer";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "gold",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("gold");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage or URL query (?theme=polymer)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get("theme") as ThemeMode | null;
      const savedTheme = (urlTheme || localStorage.getItem("np_theme")) as ThemeMode | null;
      if (savedTheme === "polymer" || savedTheme === "gold") {
        setThemeState(savedTheme);
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "polymer") {
      root.classList.add("theme-polymer");
      root.classList.remove("theme-gold");
      try {
        localStorage.setItem("np_theme", "polymer");
      } catch {}
    } else {
      root.classList.remove("theme-polymer");
      root.classList.add("theme-gold");
      try {
        localStorage.setItem("np_theme", "gold");
      } catch {}
    }
  }, [theme, mounted]);

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "gold" ? "polymer" : "gold"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
