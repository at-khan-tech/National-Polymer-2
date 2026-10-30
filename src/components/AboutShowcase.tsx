"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export const AboutShowcase: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About National Polymers"
      className="w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-[1320px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center perspective-1200">
          {/* ================= LEFT COLUMN: COMPANY STORY ================= */}
          <div
            data-aos="3d-tilt-left"
            data-aos-duration="850"
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left"
          >
            {/* Eyebrow Label with Subtle Brand Accent */}
            <div className="inline-flex flex-col items-start mb-4">
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[2px] text-[#E10600]">
                About National Polymers
              </span>
              {/* Subtle Red-to-Orange Logo-Inspired Accent Line */}
              <div
                className="mt-1.5 h-[2.5px] w-10 rounded-full bg-gradient-to-r from-[#E10600] to-[#FF6B00]"
                aria-hidden="true"
              />
            </div>

            {/* Main Headline */}
            <h2 className="font-montserrat text-[32px] sm:text-[40px] lg:text-[46px] xl:text-[50px] font-extrabold leading-[1.12] tracking-[-1px] text-[#0F3B82]">
              Connecting{" "}
              <span className="text-[#E10600]">Global Polymer</span> Supply
            </h2>

            {/* Supporting Headline */}
            <p className="mt-3 text-[18px] sm:text-[20px] font-medium text-[#0F3B82] tracking-tight">
              Materials. Markets. Opportunities.
            </p>

            {/* Concise Approved Company Description in Two Paragraphs */}
            <div className="mt-5 space-y-4 max-w-[540px] text-[15px] sm:text-[16px] text-[#5B6470] leading-[1.8] font-normal">
              <p>
                National Polymers LLC FZ is an international distribution and
                trading company specializing in polymer raw materials. We supply
                prime, near-prime, and off-grade resins, alongside high-grade
                recycled polymers, granules, regrinds, and circular materials
                tailored for film extrusion, blow molding, injection molding,
                and pipe compounding.
              </p>
              <p>
                Headquartered at Dubai&apos;s global commercial crossroads, we
                source directly from major petrochemical producers across the
                USA, Canada, Australia, and Far East hubs, providing dependable,
                containerized supply chains to manufacturing converters across
                the Indian Subcontinent, Africa, Europe, and Latin America.
              </p>
            </div>

            {/* Prominent About Us CTA Button */}
            <div className="mt-8 pt-1">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#0F3B82] px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#0c2e66] hover:shadow-md active:scale-[0.98]"
              >
                <span>Discover Our Company</span>
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INDUSTRIAL VISUAL & SUPPLY CHAIN STRIP ================= */}
          <div
            data-aos="3d-tilt-right"
            data-aos-delay="150"
            data-aos-duration="850"
            className="lg:col-span-7 xl:col-span-7 flex flex-col w-full"
          >
            {/* Visual Container */}
            <div className="w-full overflow-hidden rounded-[12px] border border-gray-200/80 bg-[#F7F9FC] shadow-sm">
              {/* Premium Landscape Image (5:4 Aspect Ratio, Bright & Natural) */}
              <div className="relative w-full aspect-[5/4] overflow-hidden bg-gray-100">
                <Image
                  src="/images/experience.png"
                  alt="National Polymers international corporate headquarters and trading operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                  priority={false}
                />
              </div>

              {/* Polymer Supply Chain Strip Directly Beneath the Image */}
              <div className="w-full bg-[#F7F9FC] border-t border-gray-200/90 py-3.5 px-4 sm:px-6">
                <div className="grid grid-cols-3 divide-x divide-gray-300/80 text-center">
                  <div className="px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E10600] shrink-0 hidden sm:inline-block" />
                    <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.5px] uppercase text-[#0F3B82]">
                      Global Sourcing
                    </span>
                  </div>
                  <div className="px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] shrink-0 hidden sm:inline-block" />
                    <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.5px] uppercase text-[#0F3B82]">
                      Polymer Grades
                    </span>
                  </div>
                  <div className="px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0F3B82] shrink-0 hidden sm:inline-block" />
                    <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.5px] uppercase text-[#0F3B82]">
                      Industrial Markets
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
