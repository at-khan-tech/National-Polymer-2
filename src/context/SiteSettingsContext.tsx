"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { SiteSettings } from "@/lib/content-store";

interface SiteSettingsContextType {
  settings: SiteSettings;
  isLoading: boolean;
  reloadSettings: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  blogsEnabled: false,
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  reloadSettings: async () => {},
});

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.settings && typeof data.settings.blogsEnabled === "boolean") {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch site settings:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading, reloadSettings: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
