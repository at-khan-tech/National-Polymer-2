import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { CountUp } from "./CountUp";

export const WorldwideCapacity: React.FC = () => {
  return (
    <section id="team" className="flex flex-col w-full items-center py-10">
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="bg-gray-50 w-full py-12 md:py-16"
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8 lg:gap-12 w-full">
            {/* Column 1: Capacity & Operational Stats */}
            <div className="flex flex-col h-full gap-8 md:gap-10 items-center md:items-start justify-center w-full">
              {/* Stat 1 */}
              <div
                data-aos="fade-up"
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <h3 className="text-gray-500 text-base md:text-lg leading-snug">
                  Over
                  <br />
                  <span className="font-light font-mono text-3xl sm:text-4xl text-primary font-bold">
                    <CountUp end={21} duration={1500} suffix="+" />
                  </span>
                  <br />
                  Years Industrial Experience
                </h3>
                <div className="w-full h-[1px] rounded-full bg-gray-300" />
              </div>

              {/* Stat 2 */}
              <div
                data-aos="fade-up"
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <h3 className="text-gray-500 text-base md:text-lg leading-snug">
                  Global Trade Across
                  <br />
                  <span className="font-light font-mono text-3xl sm:text-4xl text-primary font-bold">
                    <CountUp end={40} duration={1800} suffix="+" />
                  </span>
                  <br />
                  Sourcing &amp; Selling Countries
                </h3>
                <div className="w-full h-[1px] rounded-full bg-gray-300" />
              </div>

              {/* Stat 3 */}
              <div
                data-aos="fade-up"
                data-aos-delay="150"
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <h3 className="text-gray-500 text-base md:text-lg leading-snug">
                  Annual Distribution Exceeding
                  <br />
                  <span className="font-light font-mono text-3xl sm:text-4xl text-primary font-bold">
                    <CountUp end={10000} duration={2200} suffix=" MT+" />
                  </span>
                  <br />
                  Polymers &amp; Resins
                </h3>
                <div className="w-full h-[1px] rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Column 2: Boardroom & Facility Image */}
            <div className="h-full w-full flex justify-center items-center">
              <div className="relative w-full max-w-sm aspect-[10/14] sm:aspect-[10/16] overflow-hidden rounded shadow-md group">
                <Image
                  src="https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Foffices%2Fboardroom.jpg&w=1536&q=70"
                  alt="National Polymers Management & Trading Team"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
            </div>

            {/* Column 3: Results Driven Team Story & CTA */}
            <div className="flex flex-col h-full justify-center gap-5 w-full max-w-md">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-darker">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                We&apos;re a Results Driven Team
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Our team of professionals comprises qualified and experienced traders,
                consultants, managers, quality control managers, marketers, and technicians,
                who are quite capable of effective planning and execution in accordance with the
                desired standard and given specifications.
              </p>
              <p className="text-sm sm:text-base font-medium text-gray-800">
                National Polymers FZ LLC provides a reliable one window solution to all plastic product
                manufacturers worldwide.
              </p>

              <Link
                href="#contact"
                className="group inline-flex items-center gap-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors mt-2"
              >
                <span>Contact Our Specialists</span>
                <div className="relative w-12 h-12 rounded-full grid place-items-center">
                  <svg
                    viewBox="0 0 144 144"
                    className="w-full h-full -rotate-90 absolute inset-0"
                  >
                    <circle
                      cx="72"
                      cy="72"
                      r="49"
                      strokeWidth="3.5"
                      stroke="#000000"
                      fill="none"
                      strokeDasharray="0 308"
                      strokeDashoffset="39"
                      className="transition-all duration-300 group-hover:[stroke-dasharray:231_77] group-hover:stroke-primary"
                    />
                  </svg>
                  <div className="w-full h-full flex justify-center items-center p-2 transition-transform duration-300 group-hover:translate-x-1">
                    <Icon
                      name="arrow-right"
                      className="w-5 h-5 text-gray-900 group-hover:text-primary transition-colors"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
