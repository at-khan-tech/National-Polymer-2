import React from "react";
import { Icon } from "./Icons";

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote:
        "National Polymers has been our trusted resin supplier in Dubai for 7 consecutive years. Their Near-Prime HDPE blow grade saved us over 18% in packaging costs while maintaining identical bottle drop impact test results.",
      author: "Director of Procurement",
      company: "Leading Rigid Packaging Mfr, Sharjah UAE",
      rating: 5,
    },
    {
      quote:
        "Shipping polymer containers into Nhava Sheva used to result in constant port demurrage. National Polymers provides 21 days free time on all BLs, making rail movement to our inland plant in Gujarat completely stress-free.",
      author: "Managing Director",
      company: "Woven Sacks & FIBC Converter, Ahmedabad India",
      rating: 5,
    },
    {
      quote:
        "Their PCR recycled HDPE granules are the cleanest we have tested in Africa. Uniform melt flow, zero bubble tearing on blown film, and complete batch COA documentation with every single container shipment.",
      author: "Chief Operations Officer",
      company: "Flexible Packaging Group, Nairobi Kenya",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 border-b border-gray-200">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
            Client Endorsements
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
            Trusted by Plastic Manufacturers Globally
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Hear from converters who rely on National Polymers for their monthly container resin allocations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-900">{rev.author}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{rev.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
