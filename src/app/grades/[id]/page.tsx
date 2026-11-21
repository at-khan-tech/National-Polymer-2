import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { getGradeById, getAllGrades } from "@/lib/content-store";
import { MAJOR_BRANDS } from "@/data/gradesCatalog";
import { TdsDownloadButton } from "@/components/TdsDownloadButton";

export const dynamic = "force-dynamic";

interface GradePageProps {
  params: Promise<{ id: string }>;
}

export default async function GradeDetailPage({ params }: GradePageProps) {
  const { id } = await params;
  const grade = await getGradeById(id);

  if (!grade) {
    notFound();
  }

  // Find brand information
  const brandInfo = MAJOR_BRANDS.find(
    (b) =>
      b.name.toLowerCase() === grade.brand.toLowerCase() ||
      b.id.toLowerCase() === grade.brand.toLowerCase()
  );

  // Find related grades in the same category
  const allGrades = await getAllGrades();
  const relatedGrades = allGrades
    .filter((g) => g.id !== grade.id && g.category === grade.category)
    .slice(0, 6);

  // Map category to parent product slug
  const parentProductSlug =
    (grade as any).productSlug ||
    (grade.category === "PP"
      ? "pp"
      : ["HDPE", "LDPE", "LLDPE"].includes(grade.category)
      ? "pe"
      : grade.category === "Engineering"
      ? "engineering-plastics"
      : grade.category.toLowerCase());

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc] pb-20">

        {/* ─── HERO BANNER ─── */}
        <section className="relative bg-gray-100 overflow-hidden pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 border-b border-gray-200">
          {/* Subtle Consistent Chemical Background Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/b4.png"
              alt="Grade Specifications Background"
              fill
              priority
              className="object-cover object-right md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/70 bg-gradient-to-r from-white/95 via-white/85 to-white/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-5 flex-wrap">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/products/${parentProductSlug}`} className="hover:text-primary transition-colors">
                {grade.category} Resins
              </Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-bold">{grade.brand} {grade.grade}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              {/* Left Column: Grade Name & Highlights */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-bold text-primary uppercase tracking-wider">
                    {grade.category} Polymer
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-700">
                    {grade.subCategory}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {grade.status} Specification
                  </span>
                </div>

                <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-navy leading-[1.1]">
                  {grade.brand} <span className="text-primary font-black">{grade.grade}</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl">
                  {grade.application}. Certified raw material resin distributed in direct containerized sea shipments from {grade.origin}.
                </p>

                {/* Quick Spec Pills */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-3 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">MFI / MFR</span>
                    <span className="font-mono text-base font-bold text-navy block mt-0.5">{grade.mfi}</span>
                  </div>
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-3 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Density</span>
                    <span className="font-mono text-base font-bold text-navy block mt-0.5">{grade.density}</span>
                  </div>
                  <div className="bg-white/90 border border-gray-200 rounded-xl p-3 shadow-2xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Origin</span>
                    <span className="text-sm font-bold text-navy block mt-0.5 truncate">{grade.origin}</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={`/enquiry?product=${parentProductSlug}&grade=${encodeURIComponent(grade.grade)}&brand=${encodeURIComponent(grade.brand)}&origin=${encodeURIComponent(grade.origin)}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-darker px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
                  >
                    <span>Request Quotation</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7m7-7H3" />
                    </svg>
                  </Link>

                  {/* Working TDS Download Button */}
                  <TdsDownloadButton grade={grade} />
                </div>
              </div>

              {/* Right Column: Producer Info Box */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
                  {brandInfo?.logoUrl ? (
                    <div className="relative h-12 w-20 bg-slate-50 rounded-lg p-1.5 flex items-center justify-center border border-gray-100 shrink-0">
                      <Image
                        src={brandInfo.logoUrl}
                        alt={`${grade.brand} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                      {grade.brand.slice(0, 3)}
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                      Refinery / Producer
                    </span>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {brandInfo?.fullName || grade.brand}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Origin: {grade.origin}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-gray-600">
                  <div className="flex items-center justify-between gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-gray-500 shrink-0">Allocation Status:</span>
                    <span className="font-semibold text-gray-800 text-right break-words min-w-0">{grade.availability}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-gray-500 shrink-0">Shipment Mode:</span>
                    <span className="font-semibold text-gray-800 text-right break-words min-w-0">FCL Container / Break-bulk</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 py-1 border-b border-gray-100">
                    <span className="font-medium text-gray-500 shrink-0">Standard Packaging:</span>
                    <span className="font-semibold text-gray-800 text-right break-words min-w-0">25kg Valve Bags / 1000kg FIBC</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 py-1">
                    <span className="font-medium text-gray-500 shrink-0">Quality Certificate:</span>
                    <span className="font-semibold text-emerald-700 text-right break-words min-w-0">COA &amp; TDS Provided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DETAILED TECHNICAL SPECIFICATIONS ─── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-10 sm:mt-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* Left Main Content */}
            <div className="space-y-8">
              {/* Technical Specifications Table */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Physical &amp; Rheological Properties
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between gap-1.5 min-w-0 transition-colors hover:border-primary/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">
                      Melt Flow Rate (MFI/MFR)
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-navy leading-snug break-words block">
                      {grade.mfi}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between gap-1.5 min-w-0 transition-colors hover:border-primary/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">
                      Polymer Density
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-navy leading-snug break-words block">
                      {grade.density}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between gap-1.5 min-w-0 transition-colors hover:border-primary/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">
                      Polymer Classification
                    </span>
                    <span className="text-sm sm:text-base font-bold text-navy leading-snug break-words block">
                      {grade.category} ({grade.subCategory})
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between gap-1.5 min-w-0 transition-colors hover:border-primary/40">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block leading-tight">
                      Country of Production
                    </span>
                    <span className="text-sm sm:text-base font-bold text-navy leading-snug break-words block">
                      {grade.origin}
                    </span>
                  </div>
                </div>

                {/* Application Information Box */}
                <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Recommended Processing &amp; Target Applications
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {grade.application}
                  </p>
                  {grade.notes && (
                    <p className="mt-3 text-xs text-slate-600 border-t border-slate-200 pt-3">
                      <strong>Processing Note:</strong> {grade.notes}
                    </p>
                  )}
                </div>
              </section>

              {/* Related Grades in Category */}
              {relatedGrades.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Other {grade.category} Candidate Grades
                      </h2>
                    </div>
                    <Link
                      href={`/products/${parentProductSlug}`}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      View all {grade.category} &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {relatedGrades.map((rg) => (
                      <Link
                        key={rg.id}
                        href={`/grades/${encodeURIComponent(rg.id)}`}
                        className="p-3.5 rounded-xl border border-gray-200 hover:border-primary/40 hover:bg-primary-soft/20 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-navy group-hover:text-primary transition-colors">
                              {rg.brand}
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                              {rg.grade}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-1">{rg.subCategory}</p>
                        </div>
                        <div className="mt-2 text-[10px] font-mono text-gray-400">
                          MFI: {rg.mfi}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar: RFQ & Consultation Card */}
            <div className="space-y-5">
              <div className="rounded-2xl bg-navy text-white p-6 shadow-xl relative overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 24px)",
                  }}
                />
                <div className="relative">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-2">
                    Commercial Trading Desk
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Need CIF Pricing for {grade.grade}?
                  </h3>
                  <p className="mt-2 text-xs text-white/70 leading-relaxed">
                    National Polymers distributes containerized allocations of {grade.brand} {grade.grade} directly to manufacturers worldwide.
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-white/80">
                    <div className="flex items-center gap-2">
                      <Icon name="check" className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Guaranteed refiner lot certification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="check" className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Factory COA &amp; TDS included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="check" className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Flexible CIF / CFR shipment terms</span>
                    </div>
                  </div>

                  <Link
                    href={`/enquiry?product=${parentProductSlug}&grade=${encodeURIComponent(grade.grade)}&brand=${encodeURIComponent(grade.brand)}&origin=${encodeURIComponent(grade.origin)}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-darker py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm active:scale-95"
                  >
                    <span>Request Quotation</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 hover:bg-white/10 py-3 text-xs font-semibold text-white transition-colors"
                  >
                    <Icon name="whatsapp" className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Trading Desk</span>
                  </a>
                </div>
              </div>

              {/* Technical Support Box */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Processing Support
                </span>
                <p className="mt-1 text-xs text-gray-700">
                  Looking for drop-in equivalent grades or customized Melt Flow specs?
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>Consult our polymer engineer</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
