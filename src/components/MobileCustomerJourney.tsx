"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  Building2,
  Layers,
  ArrowRight,
  FileText,
  ExternalLink,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import {
  CANDIDATE_GRADES,
  MAJOR_BRANDS,
  type PolymerGrade,
  type BrandInfo,
} from "@/data/gradesCatalog";
import { TdsDownloadButton } from "@/components/TdsDownloadButton";

interface CategoryMeta {
  code: string;
  name: string;
  description: string;
  badgeColor: string;
}

const CATEGORIES_META: CategoryMeta[] = [
  {
    code: "PP",
    name: "Polypropylene",
    description: "Homopolymer, Impact Copolymer, Raffia, BOPP",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    code: "HDPE",
    name: "High-Density Polyethylene",
    description: "Blow Moulding, PE100 Pipe, Injection Moulding",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    code: "LDPE",
    name: "Low-Density Polyethylene",
    description: "General Purpose Film, Heavy Duty Sacks, Shrink",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    code: "LLDPE",
    name: "Linear Low-Density PE",
    description: "Blown Film C4/C6, Stretch Film, Rotomoulding",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    code: "PVC",
    name: "Polyvinyl Chloride",
    description: "Suspension Resin K67, Pipe Compounds, Rigid",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    code: "EVA",
    name: "Ethylene Vinyl Acetate",
    description: "Solar Encapsulation, Shoe Sole Foaming, Hot Melt",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    code: "Recycled",
    name: "Circular & Recycled Pellets",
    description: "Certified PCR & PIR rHDPE, rPP, rLDPE Pellets",
    badgeColor: "bg-green-50 text-green-700 border-green-200",
  },
  {
    code: "Engineering",
    name: "Engineering Polymers",
    description: "Polycarbonate (PC), ABS, POM, Polyamide (Nylon)",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

interface MobileCustomerJourneyProps {
  initialCategory?: string;
  initialBrand?: string;
  gradesList?: PolymerGrade[];
  onTdsClick?: (grade: PolymerGrade) => void;
  className?: string;
}

export function MobileCustomerJourney({
  initialCategory = "",
  initialBrand = "",
  gradesList = CANDIDATE_GRADES,
  onTdsClick,
  className = "",
}: MobileCustomerJourneyProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory && initialCategory !== "all" ? initialCategory.toUpperCase() : ""
  );
  const [selectedBrand, setSelectedBrand] = useState<string>(
    initialBrand && initialBrand !== "all" ? initialBrand : ""
  );
  const [mobileSearch, setMobileSearch] = useState<string>("");
  const [activeTds, setActiveTds] = useState<PolymerGrade | null>(null);

  // Sync with incoming props if they change
  useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      setSelectedCategory(initialCategory.toUpperCase());
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialBrand && initialBrand !== "all") {
      setSelectedBrand(initialBrand);
    }
  }, [initialBrand]);

  // Determine current active step:
  // 1 = Select Category
  // 2 = Select Brand
  // 3 = Select Grade
  const currentStep = useMemo(() => {
    if (mobileSearch.trim()) return 3; // direct search overrides
    if (selectedBrand) return 3;
    if (selectedCategory) return 2;
    return 1;
  }, [selectedCategory, selectedBrand, mobileSearch]);

  // Count available grades per category
  const categoryGradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    gradesList.forEach((g) => {
      const cat = (g.category || "").toUpperCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [gradesList]);

  // Filter brands available for the selected category
  const availableBrandsForCategory = useMemo(() => {
    if (!selectedCategory) {
      return MAJOR_BRANDS;
    }

    // Brands that have grades in this category
    const brandNamesWithGrades = new Set<string>();
    gradesList.forEach((g) => {
      if (g.category?.toUpperCase() === selectedCategory) {
        brandNamesWithGrades.add(g.brand.toLowerCase());
      }
    });

    const matching = MAJOR_BRANDS.filter(
      (b) =>
        b.categories.some((c) => c.toUpperCase() === selectedCategory) ||
        brandNamesWithGrades.has(b.name.toLowerCase())
    );

    return matching.length > 0 ? matching : MAJOR_BRANDS;
  }, [selectedCategory, gradesList]);

  // Filter grades matching selected brand and category (or search)
  const finalGrades = useMemo(() => {
    return gradesList.filter((g) => {
      if (mobileSearch.trim()) {
        const q = mobileSearch.toLowerCase().trim();
        return (
          g.grade.toLowerCase().includes(q) ||
          g.brand.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.subCategory.toLowerCase().includes(q) ||
          g.application.toLowerCase().includes(q)
        );
      }

      if (selectedCategory && g.category.toUpperCase() !== selectedCategory) {
        return false;
      }

      if (selectedBrand) {
        const b = selectedBrand.toLowerCase();
        if (
          !g.brand.toLowerCase().includes(b) &&
          !b.includes(g.brand.toLowerCase())
        ) {
          return false;
        }
      }

      return true;
    });
  }, [gradesList, selectedCategory, selectedBrand, mobileSearch]);

  const handleCategorySelect = (code: string) => {
    setSelectedCategory(code);
    setSelectedBrand("");
    setMobileSearch("");
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setMobileSearch("");
  };

  const handleResetToCategory = () => {
    setSelectedCategory("");
    setSelectedBrand("");
    setMobileSearch("");
  };

  const handleResetToBrand = () => {
    setSelectedBrand("");
    setMobileSearch("");
  };

  return (
    <div className={`w-full ${className}`}>
      {/* ─── STEP PROGRESS BAR ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-3 sm:p-4 mb-4 shadow-2xs">
        <div className="flex items-center justify-between text-center relative">
          {/* Connecting line */}
          <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-gray-200 -z-0" />

          {/* Step 1: Category */}
          <button
            type="button"
            onClick={handleResetToCategory}
            className="flex flex-col items-center relative z-10 group focus:outline-none"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep > 1
                  ? "bg-emerald-600 text-white shadow-xs"
                  : currentStep === 1
                  ? "bg-primary text-white ring-4 ring-primary/20 shadow-xs"
                  : "bg-gray-100 text-gray-400 border border-gray-300"
              }`}
            >
              {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
            </div>
            <span
              className={`text-[10px] mt-1 font-bold ${
                currentStep === 1 ? "text-primary" : "text-gray-600"
              }`}
            >
              Category
            </span>
          </button>

          {/* Step 2: Brand */}
          <button
            type="button"
            onClick={handleResetToBrand}
            disabled={!selectedCategory}
            className="flex flex-col items-center relative z-10 group focus:outline-none disabled:opacity-50"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep > 2
                  ? "bg-emerald-600 text-white shadow-xs"
                  : currentStep === 2
                  ? "bg-primary text-white ring-4 ring-primary/20 shadow-xs"
                  : "bg-gray-100 text-gray-400 border border-gray-300"
              }`}
            >
              {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : "2"}
            </div>
            <span
              className={`text-[10px] mt-1 font-bold ${
                currentStep === 2 ? "text-primary" : "text-gray-600"
              }`}
            >
              Brand
            </span>
          </button>

          {/* Step 3: Grade */}
          <div className="flex flex-col items-center relative z-10">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3
                  ? "bg-primary text-white ring-4 ring-primary/20 shadow-xs"
                  : "bg-gray-100 text-gray-400 border border-gray-300"
              }`}
            >
              3
            </div>
            <span
              className={`text-[10px] mt-1 font-bold ${
                currentStep === 3 ? "text-primary" : "text-gray-400"
              }`}
            >
              Grades
            </span>
          </div>

          {/* Step 4: RFQ */}
          <div className="flex flex-col items-center relative z-10">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-400 border border-gray-300">
              4
            </div>
            <span className="text-[10px] mt-1 font-bold text-gray-400">Quote</span>
          </div>
        </div>

        {/* Quick Free-Text Search Bar */}
        <div className="mt-3.5 pt-3 border-t border-gray-100">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              placeholder="Or search grade directly (e.g. H312, 500P)..."
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary"
            />
            {mobileSearch && (
              <button
                type="button"
                onClick={() => setMobileSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── STEP 1: SELECT CATEGORY VIEW ─── */}
      {currentStep === 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                Step 1 of 4
              </span>
              <h3 className="text-base font-extrabold text-navy">
                Select Polymer Category
              </h3>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              8 Families
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {CATEGORIES_META.map((cat) => {
              const count = categoryGradeCounts[cat.code] || 0;
              return (
                <button
                  key={cat.code}
                  type="button"
                  onClick={() => handleCategorySelect(cat.code)}
                  className="w-full text-left bg-white rounded-xl border border-gray-200 p-3.5 shadow-2xs hover:border-primary hover:shadow-sm transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xs border ${cat.badgeColor} shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {cat.code}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {count > 0 ? `${count} Grades` : "Available"}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-300 group-hover:text-primary transition-colors shrink-0 ml-2">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── STEP 2: SELECT BRAND VIEW ─── */}
      {currentStep === 2 && (
        <div className="space-y-3">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center justify-between bg-primary-soft/40 border border-primary/20 rounded-xl p-2.5 px-3">
            <button
              type="button"
              onClick={handleResetToCategory}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Change Category</span>
            </button>
            <span className="text-xs font-extrabold text-navy uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-md border border-primary/20">
              {selectedCategory}
            </span>
          </div>

          <div className="px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
              Step 2 of 4
            </span>
            <h3 className="text-base font-extrabold text-navy">
              Select Manufacturer for {selectedCategory}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Choose an authorized refiner to view their verified candidate grades.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {availableBrandsForCategory.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => handleBrandSelect(brand.name)}
                className="w-full text-left bg-white rounded-xl border border-gray-200 p-3.5 shadow-2xs hover:border-primary hover:shadow-sm transition-all flex items-center justify-between group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-16 h-10 bg-slate-50 border border-slate-100 rounded-lg p-1 flex items-center justify-center shrink-0">
                    <Image
                      src={brand.logoUrl}
                      alt={`${brand.name} official logo`}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-gray-900 group-hover:text-primary transition-colors truncate">
                        {brand.name}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                        {brand.origin.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-gray-500 line-clamp-1 mt-0.5">
                      {brand.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-300 group-hover:text-primary transition-colors shrink-0 ml-2">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>

          {/* Quick Option to see all grades without brand filter */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setSelectedBrand("all")}
              className="text-xs font-bold text-gray-600 hover:text-primary underline"
            >
              View all {selectedCategory} grades across all manufacturers &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: AVAILABLE GRADES & TDS VIEW ─── */}
      {currentStep === 3 && (
        <div className="space-y-3">
          {/* Breadcrumb Navigation Bar */}
          <div className="flex items-center justify-between bg-gray-100 rounded-xl p-2.5 px-3 border border-gray-200 flex-wrap gap-2">
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={handleResetToCategory}
                className="text-primary font-bold hover:underline"
              >
                Categories
              </button>
              {selectedCategory && (
                <>
                  <span className="text-gray-400">/</span>
                  <button
                    type="button"
                    onClick={handleResetToBrand}
                    className="text-primary font-bold hover:underline"
                  >
                    {selectedCategory}
                  </button>
                </>
              )}
              {selectedBrand && selectedBrand !== "all" && (
                <>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-900 font-extrabold">{selectedBrand}</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetToCategory}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-primary"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Start Over</span>
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                Step 3 of 4
              </span>
              <h3 className="text-base font-extrabold text-navy">
                {selectedBrand && selectedBrand !== "all"
                  ? `${selectedBrand} Candidate Grades`
                  : selectedCategory
                  ? `${selectedCategory} Polymer Grades`
                  : "Search Results"}
              </h3>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              {finalGrades.length} Grades Found
            </span>
          </div>

          {/* Grades Card Grid */}
          {finalGrades.length === 0 ? (
            <div className="text-center py-10 px-4 bg-white rounded-xl border border-gray-200">
              <p className="text-xs font-bold text-gray-700">No grades match your selection.</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Try clearing the search query or selecting a different brand.
              </p>
              <button
                type="button"
                onClick={handleResetToCategory}
                className="mt-3 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold"
              >
                Reset to Categories
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {finalGrades.map((g) => {
                const enquiryUrl = `/enquiry?product=${g.category.toLowerCase()}&grade=${encodeURIComponent(
                  g.grade
                )}&brand=${encodeURIComponent(g.brand)}&origin=${encodeURIComponent(
                  g.origin
                )}&sub=${encodeURIComponent(g.subCategory)}`;

                return (
                  <div
                    key={g.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs hover:border-primary/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Brand & Grade */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="font-extrabold text-sm text-navy block">
                            {g.brand}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            Origin: {g.origin}
                          </span>
                        </div>
                        <span className="font-mono font-bold text-navy px-2.5 py-1 rounded-lg bg-slate-100 text-xs tracking-wider">
                          {g.grade}
                        </span>
                      </div>

                      {/* Category & Subtype */}
                      <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase">
                          {g.category}
                        </span>
                        <span className="text-[11px] text-gray-600 font-medium">
                          {g.subCategory}
                        </span>
                      </div>

                      {/* Technical Specs Box */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2.5 mb-2.5 text-[11px]">
                        <div>
                          <span className="text-gray-400 block text-[9px] uppercase font-bold">
                            MFI / MFR:
                          </span>
                          <span className="font-mono font-bold text-gray-800">
                            {g.mfi}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[9px] uppercase font-bold">
                            Density:
                          </span>
                          <span className="font-mono font-bold text-gray-800">
                            {g.density}
                          </span>
                        </div>
                      </div>

                      {/* Application */}
                      <p className="text-[11px] text-gray-600 line-clamp-2 mb-3">
                        <strong className="text-gray-700">App:</strong> {g.application}
                      </p>
                    </div>

                    {/* Actions: Details, TDS, and Get Quote */}
                    <div className="flex items-center gap-2 pt-2.5 border-t border-gray-100">
                      <Link
                        href={`/grades/${g.id}`}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-gray-700 hover:bg-gray-50 transition text-center"
                      >
                        Specs
                      </Link>

                      {/* TDS Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (onTdsClick) {
                            onTdsClick(g);
                          } else {
                            setActiveTds(g);
                          }
                        }}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-[11px] font-semibold text-navy hover:bg-gray-50 transition text-center flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>TDS</span>
                      </button>

                      {/* Direct Get Quote Button */}
                      <Link
                        href={enquiryUrl}
                        className="flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary-darker text-white text-[11px] font-bold text-center transition shadow-2xs flex items-center justify-center gap-1"
                      >
                        <span>Get Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Standalone TDS Modal fallback if not handled by parent */}
      {activeTds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-200 relative text-left">
            <button
              type="button"
              onClick={() => setActiveTds(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1"
            >
              ✕
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
              Technical Data Sheet
            </span>
            <h4 className="text-base font-extrabold text-navy">
              {activeTds.brand} {activeTds.grade}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{activeTds.subCategory}</p>

            <div className="mt-3 space-y-1.5 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p><strong>MFI:</strong> {activeTds.mfi}</p>
              <p><strong>Density:</strong> {activeTds.density}</p>
              <p><strong>Origin:</strong> {activeTds.origin}</p>
              <p><strong>Application:</strong> {activeTds.application}</p>
            </div>

            <div className="mt-4 flex gap-2">
              {activeTds.tdsUrl ? (
                <a
                  href={activeTds.tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-navy text-white text-xs font-bold text-center"
                >
                  Download PDF
                </a>
              ) : null}
              <Link
                href={`/enquiry?product=${activeTds.category.toLowerCase()}&grade=${encodeURIComponent(
                  activeTds.grade
                )}&brand=${encodeURIComponent(activeTds.brand)}`}
                className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold text-center"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
