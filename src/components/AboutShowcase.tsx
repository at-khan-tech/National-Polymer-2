"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const strengths = [
  { label: "Direct Producer Access", icon: "🔗" },
  { label: "Containerized Logistics", icon: "🚢" },
  { label: "Prime & Off-Grade Supply", icon: "🏭" },
  { label: "21+ Years Experience", icon: "⭐" },
  { label: "Global Trade Network", icon: "🌐" },
  { label: "Quality Guaranteed", icon: "✓" },
];

const supplyTags = [
  { label: "Global Sourcing", color: "#E95220" },
  { label: "Polymer Grades", color: "#FF6B00" },
  { label: "Industrial Markets", color: "#0F3B82" },
];

export const AboutShowcase: React.FC = () => {
  return (
    <section id="about" aria-label="About National Polymers"
      className="w-full bg-white py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-[1360px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 xl:gap-24 items-center">

          {/* ═════ LEFT: Image ═════ */}
          <div data-aos="3d-tilt-left" data-aos-duration="900" className="relative order-2 lg:order-1">
            {/* Decorations */}
            <div className="absolute -bottom-5 -left-5 w-3/4 h-3/4 rounded-3xl bg-[#EEF2FF] -z-10" aria-hidden="true" />
            <div className="absolute -top-4 -right-4 w-1/2 h-1/2 rounded-2xl border-2 border-[#E95220]/15 -z-10" aria-hidden="true" />

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl img-glint aspect-[4/3]">
              <Image
                src="/images/experience.png"
                alt="National Polymers international corporate headquarters"
                fill sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.04]"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20
                bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
            </div>

            {/* "21 Years" floating badge — gentle float animation */}
            <div className="absolute -bottom-6 right-4 sm:right-8 z-10 float-up">
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 flex flex-col items-center
                hover:shadow-2xl transition-shadow duration-300 cursor-default">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#E95220] to-[#FF6B00]" />
                <span className="font-montserrat text-5xl font-black text-[#0F3B82] leading-none">21</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E95220] mt-0.5">Years</span>
                <span className="text-[10px] text-gray-400 tracking-wide">Experience</span>
              </div>
            </div>

            {/* "Dubai HQ" badge */}
            <div className="absolute -top-4 left-4 sm:left-6 z-10 bg-[#0F3B82] text-white rounded-2xl shadow-lg px-4 py-3
              hover:scale-105 transition-transform duration-300 cursor-default">
              <p className="text-[9px] uppercase tracking-widest text-white/50 mb-0.5">Headquartered</p>
              <p className="text-sm font-bold">Dubai, UAE</p>
              <p className="text-[10px] text-white/50 mt-0.5">Global Trade Hub</p>
            </div>

            {/* Dot grid */}
            <svg className="absolute -bottom-2 right-2 opacity-25 pointer-events-none" width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
              {[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => (
                <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="2.5" fill="#E95220" />
              )))}
            </svg>
          </div>

          {/* ═════ RIGHT: Text ═════ */}
          <div data-aos="3d-tilt-right" data-aos-delay="150" data-aos-duration="900"
            className="order-1 lg:order-2 flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-[#E95220] to-[#FF6B00]" />
              <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#E95220]">
                About National Polymers
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-montserrat text-[30px] sm:text-[38px] lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-[#0F3B82]">
              Connecting{" "}
              <span className="relative inline-block">
                <span className="text-[#E95220]">Global Polymer</span>
                {/* Animated wave underline */}
                <svg className="absolute -bottom-2 left-0 w-full overflow-visible" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
                  <path className="wave-draw" d="M0 5 Q25 1 50 5 Q75 9 100 5 Q125 1 150 5 Q175 9 200 5"
                    stroke="#E95220" strokeWidth="2.5" fill="none" opacity="0.45" />
                </svg>
              </span>{" "}
              Supply
            </h2>
            <p className="mt-3 text-[17px] font-medium text-[#0F3B82]/55 tracking-tight">
              Materials. Markets. Opportunities.
            </p>

            {/* Body */}
            <div className="mt-6 space-y-4 text-[14.5px] sm:text-[15px] text-gray-500 leading-[1.85]">
              <p>
                National Polymers LLC FZ is an international distribution and trading company specializing
                in polymer raw materials. We supply prime, near-prime, and off-grade resins, alongside
                high-grade recycled polymers, granules, regrinds, and circular materials tailored for film
                extrusion, blow molding, injection molding, and pipe compounding.
              </p>
              <p>
                Headquartered at Dubai&apos;s global commercial crossroads, we source directly from major
                petrochemical producers across the USA, Canada, Australia, and Far East hubs, providing
                dependable, containerized supply chains to manufacturing converters across the Indian
                Subcontinent, Africa, Europe, and Latin America.
              </p>
            </div>

            {/* Strengths grid — spring scale on hover */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {strengths.map((s, i) => (
                <div key={s.label} data-aos="pop-in" data-aos-delay={i * 55}
                  className="group flex items-center gap-2 bg-[#F7F9FC] hover:bg-orange-50/70 border border-transparent hover:border-[#E95220]/30
                    rounded-xl px-3.5 py-2.5 transition-all duration-300 cursor-default
                    hover:shadow-md hover:-translate-y-0.5">
                  <span className="text-sm select-none transition-transform duration-300 group-hover:scale-125">{s.icon}</span>
                  <span className="text-[11.5px] font-semibold text-[#0F3B82] group-hover:text-[#E95220] transition-colors duration-300 leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Supply chain tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {supplyTags.map(t => (
                <span key={t.label}
                  className="pill-hover inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1.5
                    text-[11px] font-bold uppercase tracking-wider bg-white shadow-sm hover:shadow-md"
                  style={{ color: t.color }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
                  {t.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link href="/about"
                className="group btn-scale inline-flex items-center gap-3 rounded-2xl bg-[#0F3B82] px-7 py-4
                  text-[14px] font-bold text-white shadow-md shadow-[#0F3B82]/15 hover:bg-[#0c2e66] hover:shadow-lg">
                <span>Discover Our Company</span>
                <span className="w-7 h-7 rounded-full bg-white/15 grid place-items-center
                  group-hover:bg-white/25 transition-colors transition-transform group-hover:translate-x-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
