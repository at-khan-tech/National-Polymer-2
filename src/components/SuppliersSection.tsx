"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

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
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* 1. Dubai Trading Desk Callout Box */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-5 border border-gray-200 bg-gray-50/90 p-6 md:p-8 text-center md:flex-row md:justify-between md:text-left rounded-xl shadow-xs"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-normal text-gray-900">
              Need a specific grade, floor sweeping, regrind, or container volume?
            </h3>
            <p className="mt-1.5 text-sm text-gray-600">
              Tell our Dubai trading desk what your manufacturing facility requires.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex w-fit shrink-0 items-center gap-2 bg-primary-darker px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary rounded-lg shadow-xs"
          >
            Enquiry Now
            <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
        </div>

        {/* 2. Our Suppliers Carousel Section */}
        <div data-aos="fade-up" className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-gray-200/80 w-full">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-darker block mb-1.5">
              Global Petrochemical Producers
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Our Suppliers
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              Direct allocations &amp; partnerships with world-class polymer refiners and compounding leaders.
            </p>
          </div>

          {/* Continuous Infinite Smooth Auto-Scrolling Marquee Slider */}
          <div className="relative w-full overflow-hidden py-3 before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-28 before:bg-gradient-to-r before:from-white before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-28 after:bg-gradient-to-l after:from-white after:to-transparent">
            <div className="animate-marquee-left flex items-center gap-6 sm:gap-8">
              {[...suppliers, ...suppliers].map((supplier, idx) => (
                <div
                  key={`${supplier.id}-${idx}`}
                  className="flex h-20 w-36 sm:h-24 sm:w-44 shrink-0 items-center justify-center rounded-xl border border-gray-200/70 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:scale-105"
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

