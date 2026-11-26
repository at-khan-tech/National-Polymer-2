"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CANDIDATE_GRADES,
  ALL_MANUFACTURER_BRANDS,
  type PolymerGrade,
} from "@/data/gradesCatalog";
import { TdsDownloadButton } from "@/components/TdsDownloadButton";
import { MobileCustomerJourney } from "@/components/MobileCustomerJourney";
import { ExternalLink, FileText } from "lucide-react";

interface GradeCatalogExplorerProps {
  initialBrand?: string;
  initialCategory?: string;
  initialGrades?: PolymerGrade[];
  compact?: boolean;
}

export const GradeCatalogExplorer: React.FC<GradeCatalogExplorerProps> = ({
  initialBrand,
  initialCategory,
  initialGrades,
  compact = false,
}) => {
  const searchParams = useSearchParams();
  const urlBrand = searchParams?.get("brand") || initialBrand || "";
  const urlCategory = searchParams?.get("category") || initialCategory || "";
  const urlSearch = searchParams?.get("search") || searchParams?.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedApp, setSelectedApp] = useState("all");
  const [selectedMfiRange, setSelectedMfiRange] = useState("all");
  const [selectedDensityRange, setSelectedDensityRange] = useState("all");
  const [activeTdsGrade, setActiveTdsGrade] = useState<PolymerGrade | null>(null);
  const [gradesList, setGradesList] = useState<PolymerGrade[]>(
    initialGrades && initialGrades.length > 0 ? initialGrades : CANDIDATE_GRADES
  );

  // Sync state if URL search parameters change
  useEffect(() => {
    if (urlBrand) setSelectedBrand(urlBrand);
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSearch) setSearchQuery(urlSearch);
  }, [urlBrand, urlCategory, urlSearch]);

  // Keep grades dynamic from database / API
  useEffect(() => {
    fetch("/api/grades", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.grades) && data.grades.length > 0) {
          setGradesList(data.grades);
        }
      })
      .catch(() => {});
  }, []);

  // Dynamically extract all brands from live grades (seeded with MAJOR_BRANDS)
  const dynamicBrands = useMemo(() => {
    const brandMap = new Map<string, { id: string; name: string; origin: string }>();
    ALL_MANUFACTURER_BRANDS.forEach((mb) => {
      brandMap.set(mb.name.toLowerCase(), {
        id: mb.id,
        name: mb.name,
        origin: mb.origin,
      });
    });
    gradesList.forEach((g) => {
      if (g.brand && !brandMap.has(g.brand.toLowerCase())) {
        brandMap.set(g.brand.toLowerCase(), {
          id: g.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          name: g.brand,
          origin: g.origin || "Global",
        });
      }
    });
    return Array.from(brandMap.values());
  }, [gradesList]);

  // Dynamically extract all categories from live grades
  const dynamicCategories = useMemo(() => {
    const defaultCats = ["PP", "HDPE", "LDPE", "LLDPE", "PVC", "EVA", "Recycled", "Engineering"];
    const set = new Set(defaultCats);
    gradesList.forEach((g) => {
      if (g.category) set.add(g.category.trim());
    });
    return ["all", ...Array.from(set)];
  }, [gradesList]);

  // Extract unique applications dynamically
  const allApplications = useMemo(() => {
    const set = new Set<string>();
    gradesList.forEach((g) => {
      if (g.application) {
        const parts = g.application.split(/[\/,]/).map((p) => p.trim());
        parts.forEach((p) => {
          if (p) set.add(p);
        });
      }
    });
    return Array.from(set).sort();
  }, [gradesList]);

  // Helper to parse numeric values from MFI/Density strings (e.g. "0.05", "1.8", "57-70")
  const parseNumeric = (str: string | undefined): number | null => {
    if (!str) return null;
    const match = str.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (!match) return null;
    const val = parseFloat(match[1]);
    return isNaN(val) ? null : val;
  };

  // Filtered grades list from dynamic grades
  const filteredGrades = useMemo(() => {
    return gradesList.filter((g) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const match =
          g.grade.toLowerCase().includes(query) ||
          g.brand.toLowerCase().includes(query) ||
          g.category.toLowerCase().includes(query) ||
          g.subCategory.toLowerCase().includes(query) ||
          g.application.toLowerCase().includes(query) ||
          g.origin.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Brand filter (smart multi-alias & keyword matching)
      if (selectedBrand && selectedBrand !== "all") {
        const target = selectedBrand.toLowerCase().trim();
        const gBrand = g.brand.toLowerCase().trim();
        const targetKeywords = target.split(/[\/\-,]/).map((k) => k.trim()).filter(Boolean);
        const gKeywords = gBrand.split(/[\/\-,]/).map((k) => k.trim()).filter(Boolean);

        const directMatch = gBrand.includes(target) || target.includes(gBrand);
        const keywordMatch =
          targetKeywords.some((tk) => gBrand.includes(tk)) ||
          gKeywords.some((gk) => target.includes(gk));

        if (!directMatch && !keywordMatch) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (g.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Application filter
      if (selectedApp && selectedApp !== "all") {
        if (!g.application.toLowerCase().includes(selectedApp.toLowerCase())) {
          return false;
        }
      }

      // MFI / MFR Range filter
      if (selectedMfiRange && selectedMfiRange !== "all") {
        const mfi = parseNumeric(g.mfi);
        if (mfi !== null) {
          if (selectedMfiRange === "under-1" && !(mfi < 1.0)) return false;
          if (selectedMfiRange === "1-5" && !(mfi >= 1.0 && mfi <= 5.0)) return false;
          if (selectedMfiRange === "5-20" && !(mfi > 5.0 && mfi <= 20.0)) return false;
          if (selectedMfiRange === "over-20" && !(mfi > 20.0)) return false;
        }
      }

      // Density Range filter
      if (selectedDensityRange && selectedDensityRange !== "all") {
        const density = parseNumeric(g.density);
        if (density !== null) {
          if (selectedDensityRange === "under-0.925" && !(density < 0.925)) return false;
          if (selectedDensityRange === "0.925-0.940" && !(density >= 0.925 && density <= 0.940)) return false;
          if (selectedDensityRange === "over-0.940" && !(density > 0.940)) return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedBrand, selectedCategory, selectedApp, selectedMfiRange, selectedDensityRange, gradesList]);

  return (
    <div className="w-full">
      {/* ─── Top Filter & Search Controls (Desktop Only) ─── */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-7 mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Search bar */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by grade (e.g. H312, 500P, 118NJA), manufacturer (SABIC, APC)..."
              className="w-full pl-10 sm:pl-11 pr-14 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Pills Row: Brands */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Filter by Manufacturer / Brand:
              </span>
              {selectedBrand && selectedBrand !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedBrand("all")}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Reset brand
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrand("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${!selectedBrand || selectedBrand === "all"
                  ? "bg-navy text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                All Brands
              </button>
              {dynamicBrands.map((b) => {
                const isActive =
                  selectedBrand.toLowerCase() === b.name.toLowerCase() ||
                  selectedBrand.toLowerCase() === b.id.toLowerCase();
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBrand(b.name)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${isActive
                      ? "bg-primary text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      }`}
                  >
                    <span>{b.name}</span>
                    <span className="text-[10px] opacity-75 font-normal">({b.origin.split(" ")[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Pills Row: Polymer Category, Application, MFI Range & Density Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            {/* Category */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Polymer Category:
              </span>
              <select
                value={selectedCategory || "all"}
                onChange={(e) => setSelectedCategory(e.target.value === "all" ? "" : e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-medium"
              >
                <option value="all">All Categories (PP, HDPE, LDPE...)</option>
                {dynamicCategories.filter((c) => c !== "all").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Application */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Processing Application:
              </span>
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              >
                <option value="all">All Applications (Blow, Injection, Film...)</option>
                {allApplications.map((app) => (
                  <option key={app} value={app}>
                    {app}
                  </option>
                ))}
              </select>
            </div>

            {/* MFI / MFR Range */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                MFI / MFR Range (g/10 min):
              </span>
              <select
                value={selectedMfiRange}
                onChange={(e) => setSelectedMfiRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-medium"
              >
                <option value="all">All MFI Rates</option>
                <option value="under-1">&lt; 1.0 (Blow / Extrusion / Pipe)</option>
                <option value="1-5">1.0 – 5.0 (Film / Raffia / Tape)</option>
                <option value="5-20">5.0 – 20.0 (Standard Injection)</option>
                <option value="over-20">&gt; 20.0 (High Flow / Thin-wall)</option>
              </select>
            </div>

            {/* Density Range */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Density Range (g/cm³):
              </span>
              <select
                value={selectedDensityRange}
                onChange={(e) => setSelectedDensityRange(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition font-medium"
              >
                <option value="all">All Density Ranges</option>
                <option value="under-0.925">&lt; 0.925 (VLDPE / LLDPE / Film)</option>
                <option value="0.925-0.940">0.925 – 0.940 (MDPE / PP)</option>
                <option value="over-0.940">&gt; 0.940 (HDPE Resins)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Result Status Count */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-semibold text-gray-600">
          Showing <span className="text-primary font-bold">{filteredGrades.length}</span> polymer candidate grades
        </span>
        {(searchQuery || (selectedBrand && selectedBrand !== "all") || (selectedCategory && selectedCategory !== "all") || (selectedApp && selectedApp !== "all") || (selectedMfiRange && selectedMfiRange !== "all") || (selectedDensityRange && selectedDensityRange !== "all")) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedBrand("all");
              setSelectedCategory("all");
              setSelectedApp("all");
              setSelectedMfiRange("all");
              setSelectedDensityRange("all");
            }}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* ─── MOBILE GUIDED CUSTOMER JOURNEY (Category -> Brand -> Grade -> RFQ) ─── */}
      <div className="md:hidden">
        <MobileCustomerJourney
          initialCategory={selectedCategory}
          initialBrand={selectedBrand}
          gradesList={gradesList}
          onTdsClick={(g) => setActiveTdsGrade(g)}
        />
      </div>

      {/* ─── DESKTOP CATALOG VIEW (>= md) ─── */}
      <div className="hidden md:block">
        {filteredGrades.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">No matching polymer grades found</h3>
            <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing brand/application filters. You can also request a custom grade quote.
            </p>
            <Link
              href="/enquiry"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-darker transition shadow-xs"
            >
              Request Custom Grade Quote
            </Link>
          </div>
        ) : (
          /* DESKTOP TABLE VIEW */
          <div className="w-full overflow-x-auto xl:overflow-x-visible rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse table-auto xl:table-fixed">
              <colgroup className="hidden xl:table-column-group">
                <col className="w-[15%]" />
                <col className="w-[13%]" />
                <col className="w-[14%]" />
                <col className="w-[11%]" />
                <col className="w-[10%]" />
                <col className="w-[20%]" />
                <col className="w-[17%]" />
              </colgroup>
              <thead>
                <tr className="bg-gray-50/90 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  <th className="py-3.5 px-3 sm:px-4 xl:px-5">Manufacturer &amp; Origin</th>
                  <th className="py-3.5 px-3 sm:px-4">Grade Code</th>
                  <th className="py-3.5 px-3 sm:px-4">Category &amp; Subtype</th>
                  <th className="py-3.5 px-3 sm:px-4">MFI / MFR Spec</th>
                  <th className="py-3.5 px-3 sm:px-4">Density</th>
                  <th className="py-3.5 px-3 sm:px-4">Typical Application</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">TDS &amp; Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {filteredGrades.map((g) => {
                  const enquiryUrl = `/enquiry?product=${g.category.toLowerCase()}&grade=${encodeURIComponent(
                    g.grade
                  )}&brand=${encodeURIComponent(g.brand)}&origin=${encodeURIComponent(
                    g.origin
                  )}&sub=${encodeURIComponent(g.subCategory)}`;

                  return (
                    <tr
                      key={g.id}
                      className="hover:bg-primary-soft/30 transition-colors group"
                    >
                      {/* Manufacturer & Origin */}
                      <td className="py-3 px-3 sm:px-4 xl:px-5">
                        <Link href={`/grades/${g.id}`} className="flex flex-col group/brand">
                          <span className="font-bold text-gray-900 group-hover/brand:text-primary transition-colors leading-tight">
                            {g.brand}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {g.origin}
                          </span>
                        </Link>
                      </td>

                      {/* Grade Code */}
                      <td className="py-3 px-3 sm:px-4">
                        <Link
                          href={`/grades/${g.id}`}
                          className="font-mono font-bold text-navy hover:text-primary hover:bg-primary-soft px-2 py-0.5 rounded bg-slate-100 text-xs tracking-wide transition-colors inline-block"
                        >
                          {g.grade}
                        </Link>
                      </td>

                      {/* Category & Subtype */}
                      <td className="py-3 px-3 sm:px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 leading-tight">
                            {g.category}
                          </span>
                          <span className="text-[10.5px] text-gray-500 line-clamp-1">
                            {g.subCategory}
                          </span>
                        </div>
                      </td>

                      {/* MFI / MFR */}
                      <td className="py-3 px-3 sm:px-4">
                        <span className="font-mono text-gray-700 text-xs whitespace-nowrap">
                          {g.mfi}
                        </span>
                      </td>

                      {/* Density */}
                      <td className="py-3 px-3 sm:px-4">
                        <span className="font-mono text-gray-600 text-xs whitespace-nowrap">
                          {g.density}
                        </span>
                      </td>

                      {/* Application */}
                      <td className="py-3 px-3 sm:px-4">
                        <span
                          className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-[11px] font-medium text-gray-700 max-w-full truncate"
                          title={g.application}
                        >
                          {g.application}
                        </span>
                      </td>

                      {/* Action & TDS */}
                      <td className="py-3 px-3 sm:px-4">
                        <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                          {/* Direct Grade Detail Link */}
                          <Link
                            href={`/grades/${g.id}`}
                            title={`View dynamic specs for ${g.grade}`}
                            className="px-2 py-1 rounded border border-gray-200 hover:border-primary text-[11px] font-medium text-gray-700 hover:text-primary hover:bg-primary-soft transition flex items-center gap-1 shrink-0"
                          >
                            <span>Specs</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>

                          {/* TDS Quick View Button */}
                          <button
                            type="button"
                            onClick={() => setActiveTdsGrade(g)}
                            title="View Technical Data Sheet specifications"
                            className="px-2 py-1 rounded border border-gray-200 hover:border-navy text-[11px] font-medium text-navy hover:bg-navy/5 transition flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <FileText className="w-3.5 h-3.5 text-navy" />
                            <span>TDS</span>
                          </button>

                          {/* Request Quote Button */}
                          <Link
                            href={enquiryUrl}
                            className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-darker text-white text-[11px] font-bold shadow-2xs hover:shadow-sm transition cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            <span>Quote</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── TDS Specification Modal ─── */}
      {activeTdsGrade && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-news-fade"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-gray-200 relative text-left">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Technical Data Sheet (TDS)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                  {activeTdsGrade.brand} {activeTdsGrade.grade}
                </h3>
                <p className="text-xs text-gray-500">
                  {activeTdsGrade.subCategory} · Origin: {activeTdsGrade.origin}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTdsGrade(null)}
                aria-label="Close TDS Modal"
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Specs Grid */}
            <div className="my-4 sm:my-5 space-y-3">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Melt Flow Rate (MFI/MFR)
                  </span>
                  <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm mt-0.5 block">
                    {activeTdsGrade.mfi}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Polymer Density
                  </span>
                  <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm mt-0.5 block">
                    {activeTdsGrade.density}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Processing &amp; Application Use Case
                </span>
                <span className="font-semibold text-gray-800 text-xs mt-1 block">
                  {activeTdsGrade.application}
                </span>
                {activeTdsGrade.notes && (
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    {activeTdsGrade.notes}
                  </p>
                )}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-800">
                <strong>Commercial Supply Note:</strong> Certified prime lot, containerized export directly from manufacturer facility. Available on request subject to destination port discharge capacity.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 pt-3.5 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTdsGrade(null)}
                  className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-lg"
                >
                  Close
                </button>
                <Link
                  href={`/grades/${activeTdsGrade.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-navy hover:text-primary transition"
                >
                  <span>Full Grade Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <TdsDownloadButton grade={activeTdsGrade} variant="outline" />
                <Link
                  href={`/enquiry?product=${activeTdsGrade.category.toLowerCase()}&grade=${encodeURIComponent(
                    activeTdsGrade.grade
                  )}&brand=${encodeURIComponent(activeTdsGrade.brand)}&origin=${encodeURIComponent(
                    activeTdsGrade.origin
                  )}&sub=${encodeURIComponent(activeTdsGrade.subCategory)}`}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-darker text-white text-xs font-bold shadow-sm transition text-center"
                >
                  Enquire Quote &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
