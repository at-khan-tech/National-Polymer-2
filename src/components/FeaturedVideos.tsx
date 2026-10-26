import React from "react";
import { Icon } from "./Icons";

export const FeaturedVideos: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden border-y border-primary/25 bg-white py-12 text-primary-darker md:py-16"
      aria-labelledby="featured-videos-title"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-primary"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-32 w-32 border-b border-l border-primary/15"
        aria-hidden="true"
      />

      <div className="container mx-auto grid gap-8 px-5 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8">
        {/* Left Information */}
        <div data-aos="fade-up">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-primary" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-darker">
              Company Overview &amp; Global Footprint
            </p>
          </div>
          <h2
            id="featured-videos-title"
            className="mt-4 text-3xl font-light leading-tight text-primary-darker md:text-4xl"
          >
            National Polymers in Motion
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
            Explore our worldwide distribution network, prime allocations and direct sourcing
            capabilities from petrochemical producers across North America, Australia and Far East.
          </p>
          <a
            href="#contact"
            className="mt-5 inline-flex items-center gap-2 border-b border-primary/40 pb-1 text-sm font-bold text-primary-darker transition-colors hover:border-primary hover:text-primary"
          >
            Connect With Our Trading Team
            <Icon name="open-in-new" className="w-4 h-4" />
          </a>
        </div>

        {/* Right Video Action Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Video Card 1 */}
          <button
            type="button"
            className="group relative flex min-h-32 items-center gap-4 overflow-hidden border border-primary/35 bg-gradient-to-br from-white to-primary-soft p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            {/* Animated Bottom Underline */}
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

            {/* Circular Play Button */}
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              <Icon name="play" className="w-8 h-8 text-white ml-0.5" />
            </span>

            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Trading &amp; Sourcing Overview
              </span>
              <span className="mt-2 line-clamp-2 block text-base font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors">
                Prime, Off-Grade &amp; Recycled Polymers Trading
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 group-hover:text-primary">
                Explore capabilities
                <Icon
                  name="arrow-forward"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                />
              </span>
            </span>
          </button>

          {/* Video Card 2 */}
          <button
            type="button"
            className="group relative flex min-h-32 items-center gap-4 overflow-hidden border border-primary/35 bg-gradient-to-br from-white to-primary-soft p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              <Icon name="play" className="w-8 h-8 text-white ml-0.5" />
            </span>

            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Global Supply Chain
              </span>
              <span className="mt-2 line-clamp-2 block text-base font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors">
                Logistics, Port Deliveries &amp; Container Handling
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 group-hover:text-primary">
                View supply routes
                <Icon
                  name="arrow-forward"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                />
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
