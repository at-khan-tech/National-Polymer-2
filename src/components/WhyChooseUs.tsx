import React from "react";
import { Icon } from "./Icons";

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="flex flex-col w-full items-center gap-8 py-14 md:py-20">
      <div className="flex flex-col container mx-auto px-5 sm:px-6 lg:px-8 gap-8">
        {/* Main Section Header */}
        <div className="text-center">
          <span
            data-aos="fade-up"
            className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-darker block mb-2"
          >
            Our Core Strengths
          </span>
          <h2
            data-aos="fade-up"
            className="text-3xl md:text-5xl font-light text-gray-900 leading-tight"
          >
            Why Choose National Polymers FZ LLC?
          </h2>
        </div>

        {/* 2x2 Grid of Feature Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Card 1 */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="flex flex-col w-full h-full bg-gray-50 p-6 md:p-8 gap-3 hoverCard rounded shadow-sm border border-gray-100/50 cursor-pointer"
          >
            <Icon
              name="globe"
              className="w-12 h-12 text-primary-darker font-bold transition-colors"
            />
            <h3 className="text-xl font-semibold text-gray-900 transition-colors">
              Global Sourcing &amp; Worldwide Selling
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed transition-colors">
              We buy directly from USA, Canada, Australia and Far East countries, supplying
              polymers reliably across Indian Sub-Continent, African, European &amp; Latin
              American markets.
            </p>
          </div>

          {/* Card 2 */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col w-full h-full bg-gray-50 p-6 md:p-8 gap-3 hoverCard rounded shadow-sm border border-gray-100/50 cursor-pointer"
          >
            <Icon
              name="workflow"
              className="w-12 h-12 text-primary-darker font-bold transition-colors"
            />
            <h3 className="text-xl font-semibold text-gray-900 transition-colors">
              One Window Polymer Solution
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed transition-colors">
              Providing complete raw material options: Prime, Near Prime, Off-Grade, Floor
              Sweeping, reprocessed materials, recycled granules, regrinds and plant wastes.
            </p>
          </div>

          {/* Card 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col w-full h-full bg-gray-50 p-6 md:p-8 gap-3 hoverCard rounded shadow-sm border border-gray-100/50 cursor-pointer"
          >
            <Icon
              name="rays"
              className="w-12 h-12 text-primary-darker font-bold transition-colors"
            />
            <h3 className="text-xl font-semibold text-gray-900 transition-colors">
              Trust, Authenticity &amp; Ethical Values
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed transition-colors">
              National Polymers FZ LLC has become a trusted brand name standing for uncompromising
              quality, ethical transparency, and dependable delivery schedules.
            </p>
          </div>

          {/* Card 4 */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col w-full h-full bg-gray-50 p-6 md:p-8 gap-3 hoverCard rounded shadow-sm border border-gray-100/50 cursor-pointer"
          >
            <Icon
              name="handshake"
              className="w-12 h-12 text-primary-darker font-bold transition-colors"
            />
            <h3 className="text-xl font-semibold text-gray-900 transition-colors">
              Professional Results Driven Team
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed transition-colors">
              Qualified traders, consultants, managers, and quality control technicians capable of
              effective planning and execution in accordance with your exact specifications.
            </p>
          </div>
        </div>

        {/* Serving Full Spectrum Section */}
        <div id="standards" className="mt-12 border-t border-gray-200 pt-14">
          <h2
            data-aos="fade-up"
            className="px-5 text-center text-3xl md:text-4xl font-light text-gray-900 leading-tight"
          >
            Serving the Full Spectrum of the Plastics Industry
          </h2>

          <div className="flex flex-row mt-10 max-h-max flex-wrap items-center justify-center gap-6">
            {/* Spectrum Card 1 */}
            <div
              data-aos="zoom-in"
              data-aos-delay="0"
              className="h-96 w-full sm:w-80 bg-gray-50 hoverCard p-8 rounded shadow-sm border border-gray-100/50 flex flex-col items-center justify-center text-center gap-3 cursor-pointer"
            >
              <Icon
                name="factory"
                className="w-16 h-16 mb-2 text-primary-darker transition-colors"
              />
              <h3 className="text-xl font-semibold text-gray-900 transition-colors">
                Producers &amp; Petrochemical Plants
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed transition-colors">
                Direct off-take agreements and global allocation handling for prime and near-prime
                resins from major worldwide refineries.
              </p>
            </div>

            {/* Spectrum Card 2 */}
            <div
              data-aos="zoom-in"
              data-aos-delay="100"
              className="h-96 w-full sm:w-80 bg-gray-50 hoverCard p-8 rounded shadow-sm border border-gray-100/50 flex flex-col items-center justify-center text-center gap-3 cursor-pointer"
            >
              <Icon
                name="truck"
                className="w-16 h-16 mb-2 text-primary-darker transition-colors"
              />
              <h3 className="text-xl font-semibold text-gray-900 transition-colors">
                Regional Distributors &amp; Stockists
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed transition-colors">
                Competitive containerized and break-bulk logistics ensuring steady, uninterrupted supply
                to regional distributors in UAE and globally.
              </p>
            </div>

            {/* Spectrum Card 3 */}
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              className="h-96 w-full sm:w-80 bg-gray-50 hoverCard p-8 rounded shadow-sm border border-gray-100/50 flex flex-col items-center justify-center text-center gap-3 cursor-pointer"
            >
              <Icon
                name="recycle"
                className="w-16 h-16 mb-2 text-primary-darker transition-colors"
              />
              <h3 className="text-xl font-semibold text-gray-900 transition-colors">
                Converters &amp; Recycled Materials
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed transition-colors">
                High-grade recycled granules, regrinds, lumps, and off-grade resins customized for film,
                injection molding, blow molding, and pipe extrusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
