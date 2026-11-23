import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingDown,
  Recycle,
  FlaskConical,
  Globe2,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SOLUTIONS_DATA } from "@/data/solutionsData";

function getSolutionIcon(slug: string) {
  switch (slug) {
    case "prime-supply":
      return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    case "alternative-materials":
      return <TrendingDown className="w-6 h-6 text-indigo-600" />;
    case "recycled-materials":
      return <Recycle className="w-6 h-6 text-emerald-600" />;
    case "grade-matching":
      return <FlaskConical className="w-6 h-6 text-amber-600" />;
    case "global-sourcing":
      return <Globe2 className="w-6 h-6 text-sky-600" />;
    case "supply-chain-solutions":
      return <Truck className="w-6 h-6 text-orange-600" />;
    default:
      return <Sparkles className="w-6 h-6 text-primary" />;
  }
}

function getIconBg(slug: string) {
  switch (slug) {
    case "prime-supply":
      return "bg-blue-50 border-blue-200/80 text-blue-600";
    case "alternative-materials":
      return "bg-indigo-50 border-indigo-200/80 text-indigo-600";
    case "recycled-materials":
      return "bg-emerald-50 border-emerald-200/80 text-emerald-600";
    case "grade-matching":
      return "bg-amber-50 border-amber-200/80 text-amber-600";
    case "global-sourcing":
      return "bg-sky-50 border-sky-200/80 text-sky-600";
    case "supply-chain-solutions":
      return "bg-orange-50 border-orange-200/80 text-orange-600";
    default:
      return "bg-primary/10 border-primary/20 text-primary";
  }
}

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-20">
        {/* ─── HERO BANNER ─── */}
        <section className="relative bg-gray-100 text-gray-900 pt-20 md:pt-28 pb-14 md:pb-20 mb-12 overflow-hidden">
          {/* Subtle Consistent Chemical Background Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/bg3.png"
              alt="Solutions Background"
              fill
              priority
              className="object-cover object-right md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/70 bg-gradient-to-r from-white/95 via-white/85 to-white/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 w-full container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 max-w-[1400px]">
            <div className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">Solutions</span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
              Enterprise Trading Programs
            </p>
            <h1 className="font-montserrat text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
              Value-Added <span className="text-primary font-black">Polymer Trading Solutions</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-700 leading-relaxed">
              From contract prime security to technical grade substitution and JIT port shipping, we solve complex manufacturing and supply chain challenges for converters in 40+ countries.
            </p>

            {/* Quick Metrics */}
            <div className="mt-7 flex flex-wrap gap-3">
              {[
                { label: "Strategic Programs", value: `${SOLUTIONS_DATA.length}` },
                { label: "Cost Optimization", value: "Up to 25%" },
                { label: "Global Presence", value: "40+ Countries" },
                { label: "JAFZA Hub Buffer", value: "Bonded Inventory" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-xl px-4 py-2 shadow-2xs"
                >
                  <span className="text-sm sm:text-base font-bold text-primary">{m.value}</span>
                  <span className="text-[11px] text-gray-700 font-medium">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SOLUTIONS GRID (CLEAN MODERN IMAGE-FREE TECHNICAL CARDS) ─── */}
        <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SOLUTIONS_DATA.map((sol, index) => {
              const programNumber = String(index + 1).padStart(2, "0");
              const iconBgClass = getIconBg(sol.slug);

              return (
                <article
                  key={sol.slug}
                  className="group relative flex flex-col justify-between rounded-2xl bg-white border border-gray-200 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 shadow-xs overflow-hidden"
                >
                  {/* Subtle Top Gradient Hover Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-orange-400 to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex-1 flex flex-col">
                    {/* Header: Icon Badge + Program Number */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${iconBgClass} shadow-2xs transition-transform duration-300 group-hover:scale-105`}>
                        {getSolutionIcon(sol.slug)}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        PROGRAM {programNumber}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/solutions/${sol.slug}`} className="block">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                        {sol.title}
                      </h2>
                    </Link>

                    {/* Tagline Callout */}
                    <div className="mt-2.5 border-l-2 border-primary/70 pl-3 py-1 bg-orange-50/50 rounded-r-lg">
                      <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                        {sol.tagline}
                      </p>
                    </div>

                    {/* Summary Description */}
                    <p className="mt-3.5 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {sol.summary}
                    </p>

                    {/* Target Challenge Solved Box */}
                    <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3.5 group-hover:border-primary/20 group-hover:bg-orange-50/30 transition-colors">
                      <div className="flex items-center gap-1.5 mb-1 text-slate-500">
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">
                          Target Challenge Solved
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {sol.problemSolved}
                      </p>
                    </div>

                    {/* Key Strategic Highlights (2 benefits with checkmarks) */}
                    <div className="mt-4 space-y-2">
                      {sol.keyBenefits.slice(0, 2).map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 leading-snug font-medium text-slate-800">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Supported Polymers Pills */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Supported Material Families
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {sol.supportedPolymers.slice(0, 4).map((poly, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 rounded-md bg-gray-100 text-[11px] font-semibold text-gray-700 border border-gray-200/80"
                          >
                            {poly}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/solutions/${sol.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-primary transition-colors group/btn"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/enquiry?product=general-inquiry&grade=${encodeURIComponent(sol.title)}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-navy hover:bg-primary px-3.5 py-2 text-xs font-bold text-white transition-colors shadow-2xs active:scale-95"
                    >
                      <span>Get Quote</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
