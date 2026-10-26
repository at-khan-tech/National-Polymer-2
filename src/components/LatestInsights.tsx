import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

interface ArticleItem {
  title: string;
  desc: string;
  date: string;
  image: string;
  href: string;
  delay: number;
}

const articles: ArticleItem[] = [
  {
    title: "Sourcing Prime vs Off-Grade Resins: Practical Buyer's Guide",
    desc: "Understanding cost efficiencies, melt flow index testing, and application suitability when selecting prime vs near-prime or off-spec polymers.",
    date: "Jan 15, 2026",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fblogs%2Fwhere-to-buy-ldpe-resin-dubai-sharjah.webp&w=1024&q=70",
    href: "#contact",
    delay: 0,
  },
  {
    title: "Circular Polymers: Maximizing Value with Washed Regrinds & Granules",
    desc: "How plastic manufacturers can significantly reduce raw material costs by integrating consistent recycled granules and HDPE/PVC regrinds into production.",
    date: "Dec 28, 2025",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fblogs%2Fpolymer-raw-materials-to-finished-products.webp&w=1024&q=70",
    href: "#contact",
    delay: 90,
  },
  {
    title: "Global Supply Chain Planning: North America & Far East Trade Lanes",
    desc: "An overview of transit times, container logistics, and strategic inventory buffers for converters in Indian Sub-Continent, Africa, and Latin America.",
    date: "Nov 19, 2025",
    image: "https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fblogs%2Fmulti-trade-uae-polymer-warehouse-1.webp&w=1024&q=70",
    href: "#contact",
    delay: 180,
  },
];

export const LatestInsights: React.FC = () => {
  return (
    <section
      className="w-full bg-gray-50 py-16 md:py-20"
      aria-labelledby="homepage-blog-title"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-darker">
              Polymer Knowledge Desk
            </p>
            <h2
              id="homepage-blog-title"
              className="mt-3 text-3xl md:text-5xl font-light text-gray-900 leading-tight"
            >
              Latest Insights from National Polymers
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Practical guidance on material selection, polymer trading, off-grade resins,
              recycled granules, and international supply-chain planning.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex w-fit shrink-0 items-center gap-2 border border-primary-darker px-5 py-3 text-sm font-semibold text-primary-darker transition-colors hover:bg-primary-darker hover:text-white"
          >
            Contact Trading Desk
            <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {articles.map((item, idx) => (
            <article
              key={idx}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="group flex h-full flex-col overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded"
            >
              <Link href={item.href} className="block overflow-hidden relative h-52 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <time className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-darker">
                  {item.date}
                </time>
                <h3 className="mt-3 text-xl font-normal leading-tight text-gray-900">
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary-darker"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600 line-clamp-3">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-darker transition-colors hover:text-primary"
                >
                  Read Article
                  <Icon
                    name="arrow-right"
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
