"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "./Icons";
import { MAIN_NAVIGATION } from "@/data/siteNavigation";
import { CANDIDATE_GRADES, MAJOR_BRANDS } from "@/data/gradesCatalog";

const SEARCH_CATEGORIES = [
  { name: "Polypropylene (PP)", code: "PP", slug: "pp", keywords: ["pp", "polypropylene", "homopolymer", "copolymer", "raffia", "bopp"] },
  { name: "High-Density Polyethylene (HDPE)", code: "HDPE", slug: "pe", keywords: ["hdpe", "high density", "blow molding", "pipe"] },
  { name: "Low-Density Polyethylene (LDPE)", code: "LDPE", slug: "pe", keywords: ["ldpe", "low density", "film grade"] },
  { name: "Linear Low-Density Polyethylene (LLDPE)", code: "LLDPE", slug: "pe", keywords: ["lldpe", "linear low", "rotomolding"] },
  { name: "Polyethylene (PE)", code: "PE", slug: "pe", keywords: ["pe", "polyethylene"] },
  { name: "Polyvinyl Chloride (PVC)", code: "PVC", slug: "pvc", keywords: ["pvc", "polyvinyl", "k67", "k57", "pipe grade", "rigid"] },
  { name: "Polyethylene Terephthalate (PET)", code: "PET", slug: "pet", keywords: ["pet", "bottle grade", "polyester"] },
  { name: "Polystyrene (PS / GPPS / HIPS)", code: "PS", slug: "ps", keywords: ["ps", "gpps", "hips", "polystyrene"] },
  { name: "Engineering Plastics (ABS / PC / POM / PA)", code: "Engineering", slug: "engineering-plastics", keywords: ["engineering", "abs", "pc", "polycarbonate", "pom", "nylon", "pa6"] },
  { name: "Masterbatch & Additives", code: "Masterbatch", slug: "masterbatch-additives", keywords: ["masterbatch", "color", "white", "black", "additives"] },
  { name: "Recycled & Reprocessed Polymers", code: "Recycled", slug: "recycled", keywords: ["recycled", "reprocessed", "pcr", "pir", "regrind"] },
];

function SearchResultsDropdown({
  results,
  query,
  onSelect,
  onSubmit,
}: {
  results: {
    categories: typeof SEARCH_CATEGORIES;
    brands: typeof MAJOR_BRANDS;
    grades: typeof CANDIDATE_GRADES;
  };
  query: string;
  onSelect: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const hasResults =
    results.categories.length > 0 ||
    results.brands.length > 0 ||
    results.grades.length > 0;

  if (!hasResults) {
    return (
      <div className="p-5 text-center text-xs text-gray-500">
        <p className="font-semibold text-gray-700">No direct matches for &ldquo;{query}&rdquo;</p>
        <p className="mt-1 text-[11px] text-gray-400">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200">Enter</kbd> to search all 50+ catalog allocations or request a custom quote.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {/* 1. Categories */}
      {results.categories.length > 0 && (
        <div className="py-2">
          <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            Polymer Categories
          </p>
          {results.categories.map((cat) => (
            <Link
              key={cat.code}
              href={`/products/${cat.slug}`}
              onClick={onSelect}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                  {cat.code}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{cat.name}</p>
                  <p className="text-[10px] text-gray-400">Browse {cat.code} specs &amp; applications</p>
                </div>
              </div>
              <span className="text-[11px] font-medium text-primary">View &rarr;</span>
            </Link>
          ))}
        </div>
      )}

      {/* 2. Brands */}
      {results.brands.length > 0 && (
        <div className="py-2">
          <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
            Manufacturers &amp; Brands
          </p>
          {results.brands.map((b) => (
            <Link
              key={b.id}
              href={`/products?brand=${encodeURIComponent(b.name)}#grades-explorer`}
              onClick={onSelect}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-bold text-[11px] flex items-center justify-center shrink-0">
                  {b.name.slice(0, 3)}
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    {b.name} <span className="font-normal text-gray-400">· {b.origin}</span>
                  </p>
                  <p className="text-[10px] text-gray-400">{b.fullName}</p>
                </div>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">Grades &rarr;</span>
            </Link>
          ))}
        </div>
      )}

      {/* 3. Grades */}
      {results.grades.length > 0 && (
        <div className="py-2">
          <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Technical Grades &amp; TDS
          </p>
          {results.grades.map((g) => (
            <Link
              key={g.id}
              href={`/grades/${g.id}`}
              onClick={onSelect}
              className="flex items-center justify-between px-4 py-2 hover:bg-primary-soft/40 transition group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono font-bold text-navy group-hover:text-primary text-xs bg-slate-100 px-2 py-0.5 rounded shrink-0">
                  {g.grade}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">
                    {g.brand} {g.grade} <span className="text-[11px] font-normal text-gray-500">({g.category} · {g.subCategory})</span>
                  </p>
                  <p className="text-[10px] text-gray-500 truncate">
                    MFI: {g.mfi} · Density: {g.density} · {g.application}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0 ml-2">
                TDS &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] text-gray-500">
          Showing matching products, brands &amp; grades
        </span>
        <button
          type="button"
          onClick={onSubmit}
          className="text-xs font-bold text-primary hover:underline cursor-pointer"
        >
          View in Explorer &rarr;
        </button>
      </div>
    </div>
  );
}

export const Header: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  // Full-width search bar state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Focus input when search bar opens & handle Escape key
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const toggleMobileDropdown = (name: string) => {
    setActiveMobileDropdown(activeMobileDropdown === name ? null : name);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}#grades-explorer`);
    setIsSearchOpen(false);
    setMobileMenuOpen(false);
  };

  // Predictive search matches across brands, categories and grade numbers
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { categories: [], brands: [], grades: [] };

    const matchedCategories = SEARCH_CATEGORIES.filter((cat) => {
      return (
        cat.code.toLowerCase().includes(q) ||
        cat.name.toLowerCase().includes(q) ||
        cat.keywords.some((kw) => kw.includes(q) || q.includes(kw))
      );
    }).slice(0, 3);

    const matchedBrands = MAJOR_BRANDS.filter((b) => {
      return (
        b.name.toLowerCase().includes(q) ||
        b.fullName.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.categories.some((c) => c.toLowerCase().includes(q))
      );
    }).slice(0, 4);

    const matchedGrades = CANDIDATE_GRADES.filter((g) => {
      return (
        g.grade.toLowerCase().includes(q) ||
        g.brand.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.subCategory.toLowerCase().includes(q) ||
        g.application.toLowerCase().includes(q)
      );
    }).slice(0, 8);

    return {
      categories: matchedCategories,
      brands: matchedBrands,
      grades: matchedGrades,
    };
  }, [searchQuery]);

  // Filter navigation items for desktop (exclude Contact Us since it is now the right CTA button)
  const desktopNavItems = MAIN_NAVIGATION.filter(
    (item) => !item.isCTA && item.name.toLowerCase() !== "contact us"
  );

  return (
    <>
      <header className="fixed w-full z-40 top-0">
        <nav
          className={`relative flex items-center w-full h-16 md:h-20 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md text-gray-900"
              : "bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.06)] text-gray-900"
          }`}
        >
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* MOBILE FULL-HEADER SEARCH BAR (Only when search is open on mobile) */}
          {/* ══════════════════════════════════════════════════════════════ */}
          {isSearchOpen && (
            <div className="flex xl:hidden items-center w-full h-full px-3 sm:px-4 animate-news-fade relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 w-full bg-gray-50 border border-primary/50 ring-2 ring-primary/20 rounded-xl px-3 py-2 shadow-sm"
              >
                <Icon name="search" className="w-5 h-5 text-primary shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand, category, grade (SABIC, HDPE, H312)..."
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600 p-1 shrink-0 cursor-pointer"
                    title="Clear text"
                  >
                    <Icon name="close" className="w-4 h-4" />
                  </button>
                )}
                {/* Submit Icon Button (No text, icon only) */}
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-darker text-white p-2 rounded-lg shrink-0 cursor-pointer shadow-xs active:scale-95 transition-colors flex items-center justify-center"
                  aria-label="Submit search"
                  title="Search"
                >
                  <Icon name="search" className="w-4 h-4 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-gray-100 shrink-0 cursor-pointer transition-colors"
                  aria-label="Close search"
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              </form>

              {searchQuery.trim().length >= 1 && (
                <div className="fixed top-16 left-3 right-3 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left normal-case max-h-[75vh] overflow-y-auto animate-news-fade">
                  <SearchResultsDropdown
                    results={searchResults}
                    query={searchQuery}
                    onSelect={() => {
                      setIsSearchOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    onSubmit={handleSearchSubmit}
                  />
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* MAIN HEADER ROW (Hidden on mobile when mobile search is open)  */}
          {/* ══════════════════════════════════════════════════════════════ */}
          <div
            className={`${
              isSearchOpen ? "hidden xl:flex" : "flex"
            } flex-row justify-between items-center w-full px-3.5 sm:px-6 lg:px-8 h-full text-xs`}
          >
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              {/* Brand Logo - National Polymers FZ LLC */}
              <Link
                href="/"
                className="focus-primary inline-flex items-center"
                title="National Polymers FZ LLC"
              >
                <div className="relative h-10 w-36 sm:h-12 sm:w-44 md:h-16 md:w-56 flex items-center justify-start">
                  <Image
                    src="/images/logo_header.png"
                    alt="National Polymers FZ LLC Logo"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MIDDLE (DESKTOP ONLY): EXPANDED SEARCH BAR OR DESKTOP NAV MENU */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {isSearchOpen ? (
              /* Expanded Full Search Bar on Desktop replacing desktop menu */
              <div className="hidden xl:block flex-1 max-w-3xl mx-6 animate-news-fade relative">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-100/90 rounded-xl px-3.5 py-2 sm:py-2.5 border border-primary/40 bg-white ring-2 ring-primary/15 shadow-sm transition-all"
                >
                  <Icon name="search" className="w-5 h-5 text-primary shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, category, or grade (e.g. SABIC, HDPE, H312, 500P)..."
                    className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Clear text"
                    >
                      <Icon name="close" className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-darker text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer shadow-xs"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0 cursor-pointer"
                    title="Close search (Esc)"
                    aria-label="Close search"
                  >
                    <Icon name="close" className="w-5 h-5" />
                  </button>
                </form>

                {searchQuery.trim().length >= 1 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left normal-case max-h-[75vh] overflow-y-auto animate-news-fade">
                    <SearchResultsDropdown
                      results={searchResults}
                      query={searchQuery}
                      onSelect={() => {
                        setIsSearchOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      onSubmit={handleSearchSubmit}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Normal Desktop Navigation Menu */
              <ul className="hidden xl:flex items-center h-full uppercase text-[13px] font-semibold tracking-wider">
                {desktopNavItems.map((item, idx) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  // If menu item is in right half, align mega-menu right so it doesn't overflow
                  const isRightHalf = idx >= 3;

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

                      {/* 2-Column Mega Dropdown Menu */}
                      {hasSub && (
                        <div
                          className={`hidden group-hover:block absolute top-full pt-2 z-50 animate-news-fade ${
                            isRightHalf ? "right-0" : "left-0"
                          }`}
                        >
                          <div className="bg-white text-gray-900 shadow-2xl rounded-2xl border-t-4 border-primary p-4 min-w-[540px] max-w-[620px] grid grid-cols-2 gap-2 text-left normal-case">
                            {item.subItems!.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="group/sub flex items-start gap-2.5 p-2.5 hover:bg-primary-soft/40 rounded-xl transition-all border border-transparent hover:border-primary/20"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-xs text-gray-900 group-hover/sub:text-primary transition-colors">
                                      {sub.name}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                  {sub.desc && (
                                    <p className="text-[11px] text-gray-500 font-normal leading-snug mt-0.5 line-clamp-1">
                                      {sub.desc}
                                    </p>
                                  )}
                                </div>
                                <Icon
                                  name="arrow-forward"
                                  className="w-3.5 h-3.5 text-gray-300 group-hover/sub:text-primary transition-transform group-hover/sub:translate-x-0.5 mt-1 shrink-0"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}

                {/* Search Bar Trigger Button in place of Contact Us */}
                <li className="h-full flex items-center pl-2">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-primary-soft border border-gray-200 hover:border-primary/40 text-gray-700 hover:text-primary transition-all text-xs font-semibold cursor-pointer shadow-2xs"
                    title="Search polymer grades and manufacturers"
                    aria-label="Open search bar"
                  >
                    <Icon name="search" className="w-3.5 h-3.5 text-primary" />
                    <span>Search</span>
                  </button>
                </li>
              </ul>
            )}

            {/* Right: Mobile Search Icon, Mobile Menu Button & Desktop Contact Us */}
            <div className="flex items-center gap-2 shrink-0">
              {/* 1. Mobile Search Icon Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:text-primary hover:border-primary transition-colors cursor-pointer bg-gray-50 shadow-2xs active:scale-95"
                aria-label="Open search bar"
                title="Search grades"
              >
                <Icon name="search" className="w-5 h-5 text-primary" />
              </button>

              {/* 2. Mobile Menu (Hamburger) Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden justify-center items-center aspect-square w-10 h-10 text-white transition-colors hover:bg-primary-darker bg-primary flex cursor-pointer rounded-lg shrink-0 shadow-xs active:scale-95"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                <Icon
                  name={mobileMenuOpen ? "close" : "menu"}
                  className="w-5 h-5 text-white"
                />
              </button>

              {/* 3. Desktop Only Contact Us Button (Hidden on Mobile) */}
              <Link
                href="/contact"
                className="hidden xl:inline-flex items-center gap-1.5 sm:gap-2 bg-primary hover:bg-primary-darker text-white font-semibold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 text-center"
              >
                <span>Contact Us</span>
                <Icon name="arrow-forward" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-Out Drawer Navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        <nav
          className={`fixed left-0 top-0 w-[85vw] max-w-[360px] h-screen bg-white text-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Mobile navigation"
        >
          <div className="min-h-full pt-5 px-5 pb-8 flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div className="relative h-10 w-36">
                  <Image
                    src="/images/logo_header.png"
                    alt="National Polymers FZ LLC"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-900 rounded-md active:bg-gray-100"
                  aria-label="Close menu"
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search Input in Drawer */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search grades (e.g. PP, HDPE)..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <Icon name="search" className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
              </form>

              {/* Navigation Items with Accordions */}
              <ul className="mt-4 space-y-1">
                {MAIN_NAVIGATION.map((item) => {
                  const hasSub = item.subItems && item.subItems.length > 0;
                  const isExpanded = activeMobileDropdown === item.name;

                  if (item.isCTA) {
                    return (
                      <li key={item.name} className="pt-3">
                        <Link
                          href="/contact"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full bg-primary text-white text-center py-3 rounded-lg font-semibold text-sm shadow-sm active:scale-95 transition-transform"
                        >
                          <span>Contact Us</span>
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
                          className="font-semibold text-sm text-gray-900 hover:text-primary transition-colors flex-1"
                        >
                          {item.name}
                        </Link>
                        {hasSub && (
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(item.name)}
                            className="p-2 text-gray-400 hover:text-primary active:bg-gray-100 rounded-md"
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
                        <ul className="pb-2 pt-1 space-y-1.5 bg-gray-50 rounded-lg p-3 my-1">
                          {item.subItems!.map((sub) => (
                            <li key={sub.name}>
                              <Link
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-xs text-gray-700 hover:text-primary py-1.5"
                              >
                                <span className="font-semibold text-gray-900">{sub.name}</span>
                                {sub.desc && (
                                  <span className="block text-[10px] text-gray-500 mt-0.5">
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
            <div className="mt-8 pt-5 border-t border-gray-200 text-xs text-gray-600 space-y-2 no-justify">
              <p className="font-bold text-gray-900">
                National Polymers LLC FZ
              </p>
              <p className="leading-snug">Office 102-10, Shaikha Mhara Bldg, Al Qusais 2, Dubai, UAE</p>
              <p className="text-primary font-semibold">
                <a href="tel:+97142217745" className="hover:underline">Tel: +971 4 2217745</a>
              </p>
              <p className="text-primary font-semibold">
                <a href="https://wa.me/971568512508" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp: +971 56 8512508</a>
              </p>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
