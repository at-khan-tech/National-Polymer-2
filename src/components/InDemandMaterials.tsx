"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

interface ProductCard {
  badge: string;
  name: string;
  desc: string;
  tags: string;
  image: string;
  href: string;
  enquiryHref: string;
  delay: number;
}

const products: ProductCard[] = [
  {
    badge: "Prime & Off-Grade",
    name: "LDPE & Film Bales",
    desc: "Low-density polyethylene film grades, virgin pellets and high-clarity LDPE film bales sourced globally.",
    tags: "Film · Flexible Packaging · Extrusion",
    image: "/images/Product/p1.png",
    href: "/products?category=LDPE#grades-explorer",
    enquiryHref: "/enquiry?product=pe&grade=LDPE%20Film%20Grade",
    delay: 0,
  },
  {
    badge: "Prime & Near Prime",
    name: "HDPE (HDPE 100 & Blue)",
    desc: "High-density grades combining tensile strength, chemical resistance and blow moulding/pipe reliability.",
    tags: "Blow Moulding · Pipes · Drums · Bales",
    image: "/images/Product/p2.png",
    href: "/products?category=HDPE#grades-explorer",
    enquiryHref: "/enquiry?product=pe&grade=HDPE%20Blow%20Moulding",
    delay: 80,
  },
  {
    badge: "High Demand",
    name: "LLDPE Prime & C4",
    desc: "Linear low-density polyethylene grades engineered for maximum puncture resistance and stretch films.",
    tags: "Stretch Film · Liners · Packaging",
    image: "/images/Product/p3.png",
    href: "/products?category=LLDPE#grades-explorer",
    enquiryHref: "/enquiry?product=pe&grade=LLDPE%20Film%20C4",
    delay: 160,
  },
  {
    badge: "Homopolymer & Copolymer",
    name: "Polypropylene (PP, PPCP & PPRC)",
    desc: "Versatile PP, PPCP White, and PP Rafia granules for woven bags, automotive components and consumer products.",
    tags: "Injection Moulding · Rafia · Thermoforming",
    image: "/images/Product/p4.png",
    href: "/products?category=PP#grades-explorer",
    enquiryHref: "/enquiry?product=pp&grade=PP%20Homopolymer",
    delay: 240,
  },
  {
    badge: "Prime & Regrinds",
    name: "PVC (Resins & Regrinds)",
    desc: "Suspension PVC resin and clean PVC regrinds for drainage pipes, electrical profiles, fittings and cables.",
    tags: "Pipes · Profiles · Regrinds · Construction",
    image: "/images/Product/p5.png",
    href: "/products/pvc",
    enquiryHref: "/enquiry?product=pvc&grade=Suspension%20PVC%20K67",
    delay: 320,
  },
  {
    badge: "Circular Solutions",
    name: "Recycled Granules & Regrind",
    desc: "Cost-effective, washed and filtered recycled granules, floor sweeping, plastic scraps, lumps, and plant wastes.",
    tags: "Reprocessed · Lumps · Regrinds · Scrap",
    image: "/images/Product/p6.png",
    href: "/products/recycled",
    enquiryHref: "/enquiry?product=recycled&grade=Post-Consumer%20Recycled%20Granules",
    delay: 400,
  },
];

export const InDemandMaterials: React.FC = () => {
  return (
    <section
      id="products"
      className="w-full bg-white py-12 sm:py-16 md:py-20 text-gray-900 overflow-hidden"
      aria-labelledby="top-selling-products-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-4 sm:gap-6 text-center max-w-3xl mx-auto"
        >
          <div>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-primary-darker">
              National Polymers Core Portfolio
            </p>
            <h2
              id="top-selling-products-title"
              className="mt-2.5 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight"
            >
              Prime, Off-Grade &amp; Recycled Polymers
            </h2>
            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-base leading-relaxed text-gray-600">
              Supplying certified prime resins, near-prime off-spec lots, and high-quality recycled
              granules backed by responsive UAE logistics and worldwide shipping.
            </p>
          </div>
          <Link
            href="/products#grades-explorer"
            className="inline-flex w-full sm:w-fit justify-center items-center gap-2 border border-primary-darker px-5 py-3 text-xs sm:text-sm font-semibold text-primary-darker transition-colors hover:bg-primary-darker hover:text-white rounded-md"
          >
            Browse All Polymer Grades &amp; TDS
            <Icon name="arrow-right" className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>

        {/* 6-Card Grid */}
        <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-1200">
          {products.map((item, idx) => {
            const aosType =
              idx % 3 === 0
                ? "card-3d-left"
                : idx % 3 === 1
                  ? "card-3d-depth"
                  : "card-3d-right";
            return (
              <article
                key={item.name}
                data-aos={aosType}
                data-aos-delay={(idx % 3) * 100}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-300 hover-card-3d hover:border-primary/40"
              >
                {/* Clickable Image Section */}
                <Link
                  href={item.href}
                  className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100 block cursor-pointer"
                  title={`View ${item.name} related products and candidate grades`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="bg-white/95 backdrop-blur-xs border border-primary/25 px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary rounded-md shadow-xs">
                      {item.badge}
                    </span>
                  </div>
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6 text-left">
                  {/* Clickable Title */}
                  <Link
                    href={item.href}
                    className="focus-primary group/title block"
                    title={`View ${item.name} related products`}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-navy group-hover/title:text-primary transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-gray-600 flex-1">
                    {item.desc}
                  </p>

                  <p className="mt-3 w-full border-t border-gray-100 pt-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary-darker no-justify">
                    {item.tags}
                  </p>

                  {/* Dual Action Buttons: View Related Grades + Quick Quote */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5">
                    <Link
                      href={item.href}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary-darker text-white px-3.5 py-2 text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      <span>Explore Grades</span>
                      <Icon name="arrow-right" className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={item.enquiryHref}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 hover:border-primary text-gray-700 hover:text-primary px-3 py-2 text-xs font-semibold transition-colors active:scale-95"
                    >
                      <span>RFQ Quote</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
