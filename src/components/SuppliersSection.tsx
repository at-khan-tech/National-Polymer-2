"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { MAJOR_BRANDS } from "@/data/gradesCatalog";

interface SupplierLogo {
  id: number;
  src: string;
  alt: string;
}

const suppliers: SupplierLogo[] = [
  { id: 1, src: "/images/suppliers/1.png", alt: "Supplier Partner 1" },
  { id: 2, src: "/images/suppliers/2.png", alt: "Supplier Partner 2" },
  { id: 3, src: "/images/suppliers/3.jpeg", alt: "Supplier Partner 3" },
  { id: 4, src: "/images/suppliers/4.png", alt: "Supplier Partner 4" },
  { id: 5, src: "/images/suppliers/5.png", alt: "Supplier Partner 5" },
  { id: 6, src: "/images/suppliers/6.png", alt: "Supplier Partner 6" },
  { id: 7, src: "/images/suppliers/7.png", alt: "Supplier Partner 7" },
  { id: 8, src: "/images/suppliers/8.png", alt: "Supplier Partner 8" },
  { id: 9, src: "/images/suppliers/9.png", alt: "Supplier Partner 9" },
  { id: 10, src: "/images/suppliers/10.png", alt: "Supplier Partner 10" },
  { id: 11, src: "/images/suppliers/11.png", alt: "Supplier Partner 11" },
  { id: 12, src: "/images/suppliers/12.png", alt: "Supplier Partner 12" },
  { id: 13, src: "/images/suppliers/13.png", alt: "Supplier Partner 13" },
  { id: 14, src: "/images/suppliers/14.svg", alt: "Supplier Partner 14" },
  { id: 15, src: "/images/suppliers/15.webp", alt: "Supplier Partner 15" },
];

export const SuppliersSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-16 md:py-20 border-t border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* 1. Dubai Trading Desk Callout Box */}
        <div
          data-aos="card-3d-flip"
          className="group relative flex flex-col items-center gap-5 border border-gray-200 bg-gray-50/90 p-6 md:p-8 text-center md:flex-row md:justify-between md:text-left rounded-xl shadow-xs transition-all duration-400 hover-card-3d overflow-hidden"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-normal text-gray-900">
              Need a specific grade, floor sweeping, regrind, or container volume?
            </h3>
            <p className="mt-1.5 text-sm text-gray-600 text-justify">
              Tell our Dubai trading desk what your manufacturing facility requires. Direct quotes in 4 business hours.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="inline-flex w-fit shrink-0 items-center gap-2 bg-primary px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-primary-darker rounded-lg shadow-xs hover:scale-105 active:scale-95"
          >
            Enquiry Now
            <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
        </div>

        {/* 2. Major Petrochemical Producers & Clickable Brands Grid */}
        <div data-aos="fade-up" className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-gray-200/80 w-full">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-darker block mb-1.5">
              Major Manufacturer Allocations
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Global Producer Partners &amp; Candidate Brands
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Click on any manufacturer to browse verified candidate grades, technical data sheets (TDS), and container availability.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10">
            {MAJOR_BRANDS.map((brand) => (
              <Link
                key={brand.id}
                href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
                className="group p-4 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-primary-soft/30 text-left transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-base text-navy group-hover:text-primary transition-colors">
                      {brand.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {brand.origin.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {brand.categories.join(" · ")}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>View Grades</span>
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Continuous Infinite Smooth Auto-Scrolling Marquee Slider */}
          <div className="relative w-full overflow-hidden py-3 before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-28 before:bg-gradient-to-r before:from-white before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-28 after:bg-gradient-to-l after:from-white after:to-transparent">
            <div className="animate-marquee-left flex items-center gap-6 sm:gap-8">
              {[...suppliers, ...suppliers].map((supplier, idx) => (
                <div
                  key={`${supplier.id}-${idx}`}
                  className="flex h-20 w-36 sm:h-24 sm:w-44 shrink-0 items-center justify-center rounded-xl border border-gray-200/70 bg-white p-4 shadow-2xs transition-all duration-400 hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 hover:scale-105 [transform-style:preserve-3d] hover:[transform:perspective(600px)_rotateX(6deg)]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={supplier.src}
                      alt={supplier.alt}
                      fill
                      sizes="(max-width: 640px) 140px, 180px"
                      className="object-contain filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
