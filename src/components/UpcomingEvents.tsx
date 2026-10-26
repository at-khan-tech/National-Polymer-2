import React from "react";
import Link from "next/link";
import { Icon } from "./Icons";

export const UpcomingEvents: React.FC = () => {
  return (
    <section
      className="container mx-auto relative z-30 -mt-16 md:-mt-20 px-5 sm:px-6 lg:px-8"
      aria-labelledby="upcoming-events-title"
    >
      <div className="sr-only">
        <h2 id="upcoming-events-title">Current and recent events</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Next Event Card */}
        <article
          data-aos="fade-up"
          data-aos-delay="0"
          className="group overflow-hidden border-t-4 border-primary bg-white shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="grid min-h-[190px] sm:grid-cols-[150px_minmax(0,1fr)]">
            {/* Left Date Sidebar */}
            <div className="relative isolate flex flex-row items-center justify-between overflow-hidden bg-navy px-6 py-5 text-white sm:flex-col sm:items-start sm:justify-center">
              <div
                className="absolute -right-12 -top-16 -z-10 h-36 w-36 rounded-full border-[24px] border-primary/20 pointer-events-none"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-lighter">
                Next event
              </p>
              <div className="text-right sm:mt-3 sm:text-left">
                <p className="font-montserrat text-3xl font-semibold leading-none text-primary">
                  24–26
                </p>
                <p className="mt-1 text-sm font-medium tracking-[0.22em] text-white">
                  MAR
                </p>
                <p className="mt-0.5 text-xs tracking-[0.18em] text-white/60">
                  2027
                </p>
              </div>
            </div>

            {/* Right Details */}
            <div className="relative flex flex-col justify-between gap-5 p-6">
              <div
                className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary-darker ring-1 ring-inset ring-primary/30"
                aria-label="This is the next event"
              >
                Next up
              </div>
              <div>
                <p className="pr-24 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-darker">
                  National Polymers FZ LLC
                </p>
                <h3 className="mt-2 text-2xl font-normal leading-tight text-gray-900">
                  ArabPlast 2027
                </h3>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-200 pt-4 text-sm sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    Venue
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 text-xs sm:text-sm">
                    Dubai World Trade Centre
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    City
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 text-xs sm:text-sm">
                    Dubai, UAE
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    Meeting Point
                  </dt>
                  <dd className="mt-1 font-semibold text-primary-darker text-xs sm:text-sm">
                    Trading Delegation
                  </dd>
                </div>
              </dl>
              <Link
                href="#contact"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-darker transition-colors hover:text-primary"
              >
                Schedule a meeting
                <Icon
                  name="arrow-right"
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>

        {/* Past Event Card */}
        <article
          data-aos="fade-up"
          data-aos-delay="100"
          className="group overflow-hidden border-t-4 border-primary bg-white shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="grid min-h-[190px] sm:grid-cols-[150px_minmax(0,1fr)]">
            {/* Left Date Sidebar */}
            <div className="relative isolate flex flex-row items-center justify-between overflow-hidden bg-navy px-6 py-5 text-white sm:flex-col sm:items-start sm:justify-center">
              <div
                className="absolute -right-12 -top-16 -z-10 h-36 w-36 rounded-full border-[24px] border-primary/20 pointer-events-none"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-lighter">
                Global presence
              </p>
              <div className="text-right sm:mt-3 sm:text-left">
                <p className="font-montserrat text-3xl font-semibold leading-none text-primary">
                  28–02
                </p>
                <p className="mt-1 text-sm font-medium tracking-[0.22em] text-white">
                  SEP–OCT
                </p>
                <p className="mt-0.5 text-xs tracking-[0.18em] text-white/60">
                  2026
                </p>
              </div>
            </div>

            {/* Right Details */}
            <div className="relative flex flex-col justify-between gap-5 p-6">
              <div>
                <p className="pr-24 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-darker">
                  National Polymers FZ LLC
                </p>
                <h3 className="mt-2 text-2xl font-normal leading-tight text-gray-900">
                  Global Polymers Trading Forum
                </h3>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-200 pt-4 text-sm sm:grid-cols-3">
                <div className="col-span-2 sm:col-span-1">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    Sourcing Region
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 text-xs sm:text-sm">
                    USA &amp; Far East Hubs
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    Destination
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 text-xs sm:text-sm">
                    Indian Sub-Continent &amp; Africa
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gray-500">
                    Trading Desk
                  </dt>
                  <dd className="mt-1 font-semibold text-primary-darker text-xs sm:text-sm">
                    Dubai Head Office
                  </dd>
                </div>
              </dl>
              <Link
                href="#contact"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-darker transition-colors hover:text-primary"
              >
                Enquire resin allocation
                <Icon
                  name="arrow-right"
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
