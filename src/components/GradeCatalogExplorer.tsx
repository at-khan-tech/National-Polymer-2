"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CANDIDATE_GRADES,
  MAJOR_BRANDS,
  type PolymerGrade,
} from "@/data/gradesCatalog";

interface GradeCatalogExplorerProps {
  initialBrand?: string;
  initialCategory?: string;
  compact?: boolean;
}

export const GradeCatalogExplorer: React.FC<GradeCatalogExplorerProps> = ({
  initialBrand,
  initialCategory,
  compact = false,
}) => {
  const searchParams = useSearchParams();
  const urlBrand = searchParams?.get("brand") || initialBrand || "";
  const urlCategory = searchParams?.get("category") || initialCategory || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedApp, setSelectedApp] = useState("all");
  const [activeTdsGrade, setActiveTdsGrade] = useState<PolymerGrade | null>(null);

  // Sync state if URL search parameters change
  useEffect(() => {
    if (urlBrand) setSelectedBrand(urlBrand);
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [urlBrand, urlCategory]);

  // Extract unique applications
  const allApplications = useMemo(() => {
    const set = new Set<string>();
    CANDIDATE_GRADES.forEach((g) => {
      const parts = g.application.split("/").map((p) => p.trim());
      parts.forEach((p) => set.add(p));
    });
    return Array.from(set).sort();
  }, []);

  // Filtered grades list
  const filteredGrades = useMemo(() => {
    return CANDIDATE_GRADES.filter((g) => {
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

      // Brand filter
      if (selectedBrand && selectedBrand !== "all") {
        const targetBrand = selectedBrand.toLowerCase();
        if (
          !g.brand.toLowerCase().includes(targetBrand) &&
          !targetBrand.includes(g.brand.toLowerCase())
        ) {
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

      return true;
    });
  }, [searchQuery, selectedBrand, selectedCategory, selectedApp]);

  return (
    <div className="w-full">
      {/* ─── Top Filter & Search Controls ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 mb-8">
        <div className="flex flex-col gap-5">
          {/* Search bar */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by grade (e.g. H312, 500P, 118NJA), manufacturer (SABIC, APC), or application..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
            {searchQuery && (
              <button
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
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                Filter by Manufacturer / Brand:
              </span>
              {selectedBrand && selectedBrand !== "all" && (
                <button
                  onClick={() => setSelectedBrand("all")}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  Reset brand
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrand("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !selectedBrand || selectedBrand === "all"
                    ? "bg-navy text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Manufacturers
              </button>
              {MAJOR_BRANDS.map((b) => {
                const isActive = selectedBrand.toLowerCase() === b.name.toLowerCase() || selectedBrand.toLowerCase() === b.id.toLowerCase();
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBrand(b.name)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
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

          {/* Filter Pills Row: Polymer Category & Application */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            {/* Category */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Polymer Category:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {["all", "PP", "HDPE", "LDPE", "LLDPE"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? "bg-primary-soft text-primary border border-primary/30"
                        : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat === "all" ? "All Polymers" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Application Filter */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Target Application:
              </span>
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:border-primary"
              >
                <option value="all">All Applications (Blow, Film, Injection, Raffia, Pipe)</option>
                {allApplications.map((app) => (
                  <option key={app} value={app}>
                    {app}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Active Filter Stats ─── */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-xs sm:text-sm text-gray-600">
          Showing <strong className="text-gray-900">{filteredGrades.length}</strong> verified polymer grades
          {selectedBrand && selectedBrand !== "all" && (
            <span> for manufacturer <strong className="text-primary">{selectedBrand}</strong></span>
          )}
          {selectedCategory && selectedCategory !== "all" && (
            <span> in <strong className="text-navy">{selectedCategory}</strong></span>
          )}
        </p>

        {(searchQuery || (selectedBrand && selectedBrand !== "all") || (selectedCategory && selectedCategory !== "all") || (selectedApp && selectedApp !== "all")) && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedBrand("all");
              setSelectedCategory("all");
              setSelectedApp("all");
            }}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* ─── Grades Table Display ─── */}
      {filteredGrades.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                <th className="py-3.5 px-4 sm:px-5">Manufacturer &amp; Origin</th>
                <th className="py-3.5 px-4">Grade Code</th>
                <th className="py-3.5 px-4">Category &amp; Subtype</th>
                <th className="py-3.5 px-4">MFI / MFR Spec</th>
                <th className="py-3.5 px-4">Density</th>
                <th className="py-3.5 px-4">Typical Application</th>
                <th className="py-3.5 px-4 text-center">TDS &amp; Action</th>
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
                    <td className="py-3.5 px-4 sm:px-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {g.brand}
                        </span>
                        <span className="text-[10.5px] text-gray-400 font-medium">
                          {g.origin}
                        </span>
                      </div>
                    </td>

                    {/* Grade Code */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-navy px-2 py-1 rounded bg-slate-100 text-xs tracking-wide">
                        {g.grade}
                      </span>
                    </td>

                    {/* Category & Subtype */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {g.category}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {g.subCategory}
                        </span>
                      </div>
                    </td>

                    {/* MFI / MFR */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-gray-700 text-xs">
                        {g.mfi}
                      </span>
                    </td>

                    {/* Density */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-gray-600 text-xs">
                        {g.density}
                      </span>
                    </td>

                    {/* Application */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-[11px] font-medium text-gray-700">
                        {g.application}
                      </span>
                    </td>

                    {/* Action & TDS */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* TDS Quick View Button */}
                        <button
                          type="button"
                          onClick={() => setActiveTdsGrade(g)}
                          title="View Technical Data Sheet specifications"
                          className="px-2.5 py-1 rounded border border-gray-200 hover:border-navy text-[11px] font-medium text-navy hover:bg-navy/5 transition flex items-center gap-1 cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>TDS</span>
                        </button>

                        {/* Request Quote Button */}
                        <Link
                          href={enquiryUrl}
                          className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-darker text-white text-[11px] font-bold shadow-2xs hover:shadow-sm transition cursor-pointer flex items-center gap-1 shrink-0"
                        >
                          <span>Get Quote</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
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

      {/* ─── TDS Specification Modal ─── */}
      {activeTdsGrade && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-news-fade"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Technical Data Sheet (TDS)
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
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
            <div className="my-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
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
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTdsGrade(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
              <Link
                href={`/enquiry?product=${activeTdsGrade.category.toLowerCase()}&grade=${encodeURIComponent(
                  activeTdsGrade.grade
                )}&brand=${encodeURIComponent(activeTdsGrade.brand)}&origin=${encodeURIComponent(
                  activeTdsGrade.origin
                )}&sub=${encodeURIComponent(activeTdsGrade.subCategory)}`}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-darker text-white text-xs font-bold shadow-sm transition"
              >
                Enquire for {activeTdsGrade.grade} Quote &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

