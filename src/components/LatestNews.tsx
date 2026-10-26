"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  desc: string;
  image: string;
  href: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    date: "Jan 7, 2026",
    title: "National Polymers Expands Sourcing from North America and Far East",
    desc: "National Polymers LLC FZ strengthens global procurement contracts for Prime, Near Prime and Off-Grade Resins from USA, Canada, and Far East petrochemical complexes.",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fevents%2Fcolombiaplast-2026-team.jpg&w=1536&q=70",
    href: "#contact",
  },
  {
    id: 2,
    date: "Dec 18, 2025",
    title: "Reliable Polymer Distribution to Indian Sub-Continent & African Markets",
    desc: "Continuous containerized shipments of HDPE, LDPE, LLDPE, and PP delivered to converters across India, Pakistan, Kenya, Nigeria, and Latin American ports.",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fevents%2Fpropak-west-africa-2026-team.jpeg&w=1536&q=70",
    href: "#contact",
  },
  {
    id: 3,
    date: "Nov 24, 2025",
    title: "Expanded Recycling Division: Washed Granules & Regrinds",
    desc: "Offering one-window circular solutions with filtered recycled granules, floor sweeping, plastic scraps, and industrial lumps for cost-conscious converters.",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fevents%2F3p-pakistan-success-2026-cover.jpeg&w=1536&q=70",
    href: "#contact",
  },
  {
    id: 4,
    date: "Oct 12, 2025",
    title: "Quality, Authenticity & Ethical Values in Polymer Trading",
    desc: "How National Polymers FZ LLC maintains strict quality verification, batch consistency, and transparent commercial contracts.",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fevents%2F3p-pakistan-live-2026-cover-hd.webp&w=1536&q=70",
    href: "#contact",
  },
  {
    id: 5,
    date: "Sep 20, 2025",
    title: "Comprehensive PVC, PPCP & PET Supply for Infrastructure & Packaging",
    desc: "Providing specialized suspension PVC, copolymer polypropylene, and PET preforms engineered to withstand demanding industrial standards.",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fblogs%2F3p-pakistan-2026.jpeg&w=1536&q=70",
    href: "#contact",
  },
];

export const LatestNews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStory = newsData[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : newsData.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < newsData.length - 1 ? prev + 1 : 0));
  };

  const formattedCounter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    newsData.length
  ).padStart(2, "0")}`;

  const progressPercentage = ((activeIndex + 1) / newsData.length) * 100;

  return (
    <section
      className="w-full overflow-hidden bg-transparent py-14 text-gray-900 md:py-20"
      aria-labelledby="latest-news-title"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-darker">
              Market Intelligence &amp; Announcements
            </p>
            <h2
              id="latest-news-title"
              className="mt-3 text-3xl md:text-5xl font-light text-gray-900"
            >
              National Polymers Updates
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-gray-500 font-semibold">
              {formattedCounter}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous story"
              className="grid h-11 w-11 place-items-center border border-gray-300 text-gray-800 transition-colors hover:border-primary hover:bg-primary hover:text-white cursor-pointer"
            >
              <Icon name="arrow-back" className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next story"
              className="grid h-11 w-11 place-items-center border border-gray-300 text-gray-800 transition-colors hover:border-primary hover:bg-primary hover:text-white cursor-pointer"
            >
              <Icon name="arrow-forward" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dual Layout: Big Featured Story + Sidebar */}
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          className="grid overflow-hidden bg-white text-gray-900 shadow-2xl lg:grid-cols-[1.35fr_0.65fr] rounded"
        >
          {/* Left Big Card with Smooth Fade Animation */}
          <article
            key={activeStory.id}
            className="group relative min-h-[500px] sm:min-h-[540px] lg:min-h-[620px] overflow-hidden bg-black animate-news-fade"
          >
            <Image
              src={activeStory.image}
              alt={activeStory.title}
              fill
              className="object-cover opacity-75 transition-transform duration-700 ease-in-out group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 max-w-3xl p-7 text-white md:p-12 z-10">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-lighter">
                <span>Featured update</span>
                <span className="h-px w-7 bg-primary" />
                <span>{activeStory.date}</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-light leading-tight text-white">
                {activeStory.title}
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-6 sm:leading-7 text-white/80 md:text-base line-clamp-3">
                {activeStory.desc}
              </p>

              <Link
                href="#contact"
                className="mt-6 inline-flex items-center gap-3 bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-darker"
              >
                Connect With Trading Desk
                <Icon name="arrow-forward" className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Right Scrollable News Feed */}
          <div className="flex flex-col bg-accent-light">
            <p className="border-b border-gray-200 px-6 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-darker">
              More from National Polymers
            </p>

            <div className="flex-1 overflow-y-auto max-h-[546px] divide-y divide-gray-200">
              {newsData.map((item, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`group grid w-full grid-cols-[72px_1fr] gap-4 px-5 py-4 text-left transition-colors cursor-pointer ${
                      isCurrent
                        ? "bg-white border-l-4 border-l-primary"
                        : "hover:bg-white/70"
                    }`}
                  >
                    <div className="relative h-16 w-[72px] shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-darker">
                        {item.date}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm font-semibold leading-5 text-gray-900 group-hover:text-primary-darker transition-colors">
                        {item.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Bar */}
            <div className="h-1.5 bg-gray-200 w-full">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
