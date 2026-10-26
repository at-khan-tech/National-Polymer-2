import React from "react";
import Link from "next/link";
import { Icon } from "./Icons";

export const GradeSystem: React.FC = () => {
  const grades = [
    {
      name: "Prime Virgin Resins",
      badge: "Top Spec",
      desc: "Producer brand prime resins with full manufacturer warrantee, zero MFI variance, and FDA/REACH compliance.",
      features: ["100% Original Manufacturer Bagging", "Zero lot-to-lot MFI variation", "Critical medical, food & high-speed film"],
      savings: "Standard Benchmark",
    },
    {
      name: "Near Prime / Transition",
      badge: "Best Value",
      desc: "Produced during plant transition runs with minor property variance (e.g. ±10% MFI). Delivers near-prime performance.",
      features: ["Up to 15% - 25% cost reduction", "Original refinery packing", "Housewares, pails, pipes & general film"],
      savings: "Save 15% – 25%",
      highlight: true,
    },
    {
      name: "Off Grade / Wide Spec",
      badge: "Max Economy",
      desc: "Cost-effective lots, reactor sweepings, and wide-spec batches for heavy industrial and non-critical applications.",
      features: ["Substantial margin optimization", "High volume batch availability", "Compounding, drainage, composite lumber"],
      savings: "Save 30% – 45%",
    },
    {
      name: "Recycled PCR / PIR",
      badge: "Circular Eco",
      desc: "Washed and pelletized post-consumer and post-industrial polymers tested for filtration purity and melt consistency.",
      features: ["Certified recycled content documentation", "Exemption from global plastic taxes", "Logistics pallets, crates, garbage liners"],
      savings: "ESG Compliant",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-y border-gray-100">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
            Procurement Intelligence
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
            Our 4-Tier Resin Grade System
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600">
            We categorize our polymer inventory transparently so you can choose the exact balance of performance, processing tolerance, and price point for your operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {grades.map((g, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                g.highlight
                  ? "bg-primary/5 border-2 border-primary shadow-lg"
                  : "bg-gray-50 border border-gray-200 hover:border-primary/50 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-white">
                    {g.badge}
                  </span>
                  <span className="text-xs font-bold text-primary font-mono">
                    {g.savings}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{g.name}</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">{g.desc}</p>

                <ul className="mt-4 space-y-2 pt-4 border-t border-gray-200/60 text-xs text-gray-700">
                  {g.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200/60">
                <Link
                  href="/enquiry"
                  className="block w-full py-2.5 text-center text-xs font-semibold rounded-md bg-navy hover:bg-primary text-white transition-colors"
                >
                  Request Grade Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
