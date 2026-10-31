"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { CardBorderBeam } from "./CardBorderBeam";

interface ProductCard {
  badge: string;
  name: string;
  desc: string;
  tags: string;
  image: string;
  href: string;
  delay: number;
}

const products: ProductCard[] = [
  {
    badge: "Prime & Off-Grade",
    name: "LDPE & Film Bales",
    desc: "Low-density polyethylene film grades, virgin pellets and high-clarity LDPE film bales sourced globally.",
    tags: "Film · Flexible Packaging · Extrusion",
    image: "/images/Product/p1.png",
    href: "#contact",
    delay: 0,
  },
  {
    badge: "Prime & Near Prime",
    name: "HDPE (HDPE 100 & Blue)",
    desc: "High-density grades combining tensile strength, chemical resistance and blow moulding/pipe reliability.",
    tags: "Blow Moulding · Pipes · Drums · Bales",
    image: "/images/Product/p2.png",
    href: "#contact",
    delay: 80,
  },
  {
    badge: "High Demand",
    name: "LLDPE Prime & C4",
    desc: "Linear low-density polyethylene grades engineered for maximum puncture resistance and stretch films.",
    tags: "Stretch Film · Liners · Packaging",
    image: "/images/Product/p3.png",
    href: "#contact",
    delay: 160,
  },
  {
    badge: "Homopolymer & Copolymer",
    name: "Polypropylene (PP, PPCP & PPRC)",
    desc: "Versatile PP, PPCP White, and PP Rafia granules for woven bags, automotive components and consumer products.",
    tags: "Injection Moulding · Rafia · Thermoforming",
    image: "/images/Product/p4.png",
    href: "#contact",
    delay: 240,
  },
  {
    badge: "Prime & Regrinds",
    name: "PVC (Resins & Regrinds)",
    desc: "Suspension PVC resin and clean PVC regrinds for drainage pipes, electrical profiles, fittings and cables.",
    tags: "Pipes · Profiles · Regrinds · Construction",
    image: "/images/Product/p5.png",
    href: "#contact",
    delay: 320,
  },
  {
    badge: "Circular Solutions",
    name: "Recycled Granules & Regrind",
    desc: "Cost-effective, washed and filtered recycled granules, floor sweeping, plastic scraps, lumps, and plant wastes.",
    tags: "Reprocessed · Lumps · Regrinds · Scrap",
    image: "/images/Product/p6.png",
    href: "#contact",
    delay: 400,
  },
];

export const InDemandMaterials: React.FC = () => {
  return (
    <section
      id="products"
      className="w-full bg-white py-16 text-gray-900 md:py-20"
      aria-labelledby="top-selling-products-title"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-darker">
              National Polymers Core Portfolio
            </p>
            <h2
              id="top-selling-products-title"
              className="mt-3 text-3xl md:text-5xl font-light text-gray-900 leading-tight"
            >
              Prime, Off-Grade &amp; Recycled Polymers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Supplying certified prime resins, near-prime off-spec lots, and high-quality recycled
              granules backed by responsive UAE logistics and worldwide shipping.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex w-fit items-center gap-2 border border-primary-darker px-5 py-3 text-sm font-semibold text-primary-darker transition-colors hover:bg-primary-darker hover:text-white"
          >
            Request Quotation / Specifications
            <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
        </div>

        {/* 6-Card Grid with 3D Depth Entrance (X, Y, Z slide animations) */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-1200">
          {products.map((item, idx) => {
            const aosType =
              idx % 3 === 0
                ? "card-3d-left"
                : idx % 3 === 1
                ? "card-3d-depth"
                : "card-3d-right";
            return (
              <article
                key={idx}
                data-aos={aosType}
                data-aos-delay={(idx % 3) * 120}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-400 hover-card-3d"
              >
                {/* 3-Second Fast Running Border Beam on Hover */}
                <CardBorderBeam durationSeconds={3} />

                {/* Clean Image Section (No blue overlay, subtle scale on hover) */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center p-7 text-center">
                  <p className="mb-3 w-fit bg-orange-50 border border-orange-200/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E95220] rounded-sm">
                    {item.badge}
                  </p>
                  <h3 className="text-2xl font-normal text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 flex-1">
                    {item.desc}
                  </p>
                  <p className="mt-4 w-full border-t border-gray-200 pt-4 text-xs font-medium uppercase tracking-[0.12em] text-primary-darker">
                    {item.tags}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-darker transition-all hover:text-primary group-hover:translate-x-1"
                  >
                    Enquire This Grade
                    <Icon
                      name="arrow-right"
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
