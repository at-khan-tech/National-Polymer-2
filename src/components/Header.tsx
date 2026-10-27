"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { MAIN_NAVIGATION } from "@/data/siteNavigation";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  return (
    <>
      <header className="fixed w-full z-40 top-0">
        <nav
          className={`relative flex items-center w-full h-16 md:h-20 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg text-gray-900"
              : "bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(255,255,255,0.35)] text-gray-900"
          }`}
        >
          <div className="flex flex-row justify-between items-center w-full px-4 sm:px-6 lg:px-8 h-full text-xs">
            {/* Left: Brand Logo & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden justify-center items-center aspect-square w-11 h-11 text-white transition-colors hover:bg-primary-darker bg-primary flex cursor-pointer rounded-sm"
                aria-label="Toggle navigation"
              >
                <Icon
                  name={mobileMenuOpen ? "close" : "menu"}
                  className="w-5 h-5 text-white"
                />
              </button>

              {/* Brand Logo - National Polymers FZ LLC */}
              <Link
                href="/"
                className="focus-primary inline-flex items-center gap-3"
                title="National Polymers FZ LLC"
              >
                <div className="relative h-12 md:h-16 w-44 md:w-56 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="National Polymers FZ LLC Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links (Full Sequence matching PDF) */}
            <ul className="hidden xl:flex items-center h-full uppercase text-[11px] font-semibold tracking-wider">
              {MAIN_NAVIGATION.filter((item) => !item.isCTA).map((item) => {
                const hasSub = item.subItems && item.subItems.length > 0;
                return (
                  <li
                    key={item.name}
                    className="relative group h-full flex items-center px-2.5 2xl:px-3 text-gray-900 hover:text-primary transition-colors"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 h-full py-4 border-b-2 border-transparent group-hover:border-primary group-hover:text-primary transition-all"
                    >
                      <span>{item.name}</span>
                      {hasSub && (
                        <Icon
                          name="chevron-down"
                          className="w-3.5 h-3.5 text-gray-500 group-hover:text-primary transition-transform group-hover:rotate-180"
                        />
                      )}
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {hasSub && (
                      <div className="hidden group-hover:block absolute left-0 top-full pt-2 z-50 animate-news-fade">
                        <div className="bg-white text-gray-900 shadow-2xl rounded-lg border-t-4 border-primary p-4 min-w-[280px] max-w-[340px] divide-y divide-gray-100">
                          {item.subItems!.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="group/sub flex items-start gap-3 py-2.5 px-3 hover:bg-gray-50 rounded-md transition-colors"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs text-gray-900 group-hover/sub:text-primary transition-colors">
                                    {sub.name}
                                  </span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                {sub.desc && (
                                  <p className="text-[11px] text-gray-500 font-normal leading-normal mt-0.5 line-clamp-1">
                                    {sub.desc}
                                  </p>
                                )}
                              </div>
                              <Icon
                                name="arrow-forward"
                                className="w-3.5 h-3.5 text-gray-300 group-hover/sub:text-primary transition-transform group-hover/sub:translate-x-1 mt-1 shrink-0"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right: Quick Actions (Enquiry Button & WhatsApp) */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-darker text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all shadow-md hover:scale-105"
              >
                <span>Enquiry Form</span>
                <Icon name="arrow-forward" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-Out Drawer Navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-40 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <nav
          className={`fixed left-0 top-0 w-full sm:w-4/5 md:w-3/5 h-screen bg-white text-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full pt-6 px-6 pb-12 flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-5 border-b border-gray-200">
                <div className="relative h-12 w-44">
                  <Image
                    src="/images/logo.png"
                    alt="National Polymers FZ LLC"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 rounded-md"
                  aria-label="Close menu"
                >
                  <Icon name="close" className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items with Accordions */}
              <ul className="mt-6 space-y-1">
                {MAIN_NAVIGATION.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isExpanded = activeMobileDropdown === item.name;

                  if (item.isCTA) {
                    return (
                      <li key={item.name} className="pt-4">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full bg-primary text-white text-center py-3 rounded-md font-semibold text-sm shadow-md"
                        >
                          <span>{item.name}</span>
                          <Icon name="arrow-forward" className="w-4 h-4" />
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={item.name} className="border-b border-gray-100 pb-1">
                      <div className="flex items-center justify-between py-2.5">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-semibold text-sm text-gray-900 hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                        {hasSub && (
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="p-1 text-gray-400 hover:text-primary"
                            aria-label={`Toggle ${item.name} submenu`}
                          >
                            <Icon
                              name="chevron-down"
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Expanded Submenu Accordion */}
                      {hasSub && isExpanded && (
                        <ul className="pl-3 pb-3 pt-1 space-y-2 bg-gray-50 rounded-md p-3">
                          {item.subItems!.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-xs text-gray-600 hover:text-primary py-1"
                              >
                                <span className="font-medium text-gray-800">{sub.name}</span>
                                {sub.desc && (
                                  <span className="block text-[10px] text-gray-400 mt-0.5">
                                    {sub.desc}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Drawer Footer Information */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-2">
              <p className="font-semibold text-gray-800">
                National Polymers LLC FZ
              </p>
              <p>Office 102-10, Shaikha Mhara Bldg, Al Qusais 2, Dubai, UAE</p>
              <p className="text-primary font-semibold">Tel: +971 4 2217745</p>
              <p className="text-primary font-semibold">WhatsApp: +971 56 8512508</p>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
