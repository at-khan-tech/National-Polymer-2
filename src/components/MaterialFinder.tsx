"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

interface MaterialOption {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const step1Options: MaterialOption[] = [
  {
    id: "packaging",
    title: "Flexible packaging",
    desc: "Films, liners, pouches and bags",
    icon: "deployed-code",
  },
  {
    id: "bottles",
    title: "Bottles & containers",
    desc: "Rigid packaging and closures",
    icon: "water-bottle",
  },
  {
    id: "pipes",
    title: "Pipes & construction",
    desc: "Pipes, fittings, profiles and sheets",
    icon: "construction",
  },
  {
    id: "moulded",
    title: "Moulded products",
    desc: "Consumer and industrial components",
    icon: "category",
  },
  {
    id: "automotive",
    title: "Automotive & industrial",
    desc: "Durable, technical components",
    icon: "precision-manufacturing",
  },
  {
    id: "eco",
    title: "Lower-impact products",
    desc: "Bio-based or recycled solutions",
    icon: "eco",
  },
];

const step2Options: Record<string, string[]> = {
  packaging: ["Blown Film Extrusion", "Cast Film Extrusion", "Lamination & Coating"],
  bottles: ["Blow Moulding", "Injection Stretch Blow", "Injection Moulding (Caps)"],
  pipes: ["Pipe Extrusion", "Profile Extrusion", "Sheet Extrusion"],
  moulded: ["Injection Moulding", "Rotomoulding", "Thermoforming"],
  automotive: ["Engineering Compounding", "Injection Moulding", "Extrusion"],
  eco: ["PLA Bioplastics", "Post-Consumer Recycled (PCR)", "Bio-based Compounds"],
};

export const MaterialFinder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState<string>("packaging");
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleStep1Select = (id: string) => {
    setSelectedApp(id);
    setCurrentStep(2);
  };

  const handleStep2Select = (method: string) => {
    setSelectedMethod(method);
    setCurrentStep(3);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedMethod("");
  };

  return (
    <section
      id="material-finder"
      className="relative w-full py-12 sm:py-18 md:py-24 text-white overflow-hidden bg-navy transition-colors duration-300"
      aria-labelledby="material-finder-title"
    >
      {/* Background Image with Rich Readability Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/bg2.png"
          alt="Material Finder Industrial Background"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark & Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/90 to-primary/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left Guide Information */}
          <div className="max-w-xl text-left no-justify">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-primary-lighter">
              Interactive product guide
            </p>
            <h2
              id="material-finder-title"
              className="mt-2.5 sm:mt-4 text-2xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight"
            >
              Find the right material
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base leading-relaxed text-white/85">
              Answer three quick questions to get a useful starting point for your
              application. Our technical team can then help confirm the grade and
              specifications.
            </p>

            {/* Stepper Progress Indicator */}
            <div className="mt-6 sm:mt-8 flex items-center gap-2.5 sm:gap-3" aria-label="Finder progress">
              <span
                className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border text-xs sm:text-sm font-semibold transition-colors ${
                  currentStep >= 1
                    ? "border-white bg-white text-primary"
                    : "border-white/30 text-white/50"
                }`}
              >
                1
              </span>
              <span className="bg-white/25 h-px w-8 sm:w-10" />

              <span
                className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border text-xs sm:text-sm font-semibold transition-colors ${
                  currentStep >= 2
                    ? "border-white bg-white text-primary"
                    : "border-white/30 text-white/50"
                }`}
              >
                2
              </span>
              <span className="bg-white/25 h-px w-8 sm:w-10" />

              <span
                className={`grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full border text-xs sm:text-sm font-semibold transition-colors ${
                  currentStep >= 3
                    ? "border-white bg-white text-primary"
                    : "border-white/30 text-white/50"
                }`}
              >
                3
              </span>
            </div>

            <p className="mt-4 sm:mt-6 text-[11px] sm:text-xs leading-normal text-white/70">
              Recommendations are indicative starting points. Suitability depends on grade, processing conditions, and end use.
            </p>
          </div>

          {/* Right Interactive Card */}
          <div className="bg-white p-5 sm:p-7 md:p-9 text-gray-900 shadow-xl rounded-2xl no-justify text-left">
            {currentStep === 1 && (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-primary-darker">
                      Step 1 of 3
                    </p>
                    <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-normal text-gray-900">
                      What are you making?
                    </h3>
                  </div>
                </div>

                <div className="mt-5 sm:mt-7 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
                  {step1Options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleStep1Select(opt.id)}
                      className="group flex min-h-[72px] sm:min-h-20 items-start gap-3 sm:gap-4 border border-gray-200 rounded-xl p-3 sm:p-3.5 text-left transition-all hover:border-primary hover:shadow-sm cursor-pointer active:scale-98"
                    >
                      <span className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary-darker transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon name={opt.icon} className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-xs sm:text-sm text-gray-900">
                          {opt.title}
                        </span>
                        <span className="mt-0.5 block text-[11px] sm:text-xs leading-snug text-gray-500">
                          {opt.desc}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-primary-darker">
                      Step 2 of 3
                    </p>
                    <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-normal text-gray-900">
                      Processing / Manufacturing Method
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-primary-darker hover:underline font-semibold"
                  >
                    &larr; Back
                  </button>
                </div>

                <div className="mt-5 sm:mt-7 grid gap-2.5 sm:gap-3 sm:grid-cols-1">
                  {(step2Options[selectedApp] || []).map((method, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStep2Select(method)}
                      className="group flex items-center justify-between border border-gray-200 rounded-xl p-3.5 sm:p-4 text-left transition-all hover:border-primary hover:shadow-sm cursor-pointer active:scale-98"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-gray-900">{method}</span>
                      <Icon
                        name="arrow-forward"
                        className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-primary-darker">
                      Step 3 of 3 · Recommended Solution
                    </p>
                    <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-normal text-gray-900">
                      Ideal Grade Recommendations
                    </h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-primary-darker hover:underline font-semibold"
                  >
                    Start over
                  </button>
                </div>

                <div className="mt-5 p-4 sm:p-5 bg-gray-50 border border-primary/25 rounded-xl">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider text-primary font-bold">
                    Primary Match:
                  </p>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mt-1">
                    {selectedApp === "packaging"
                      ? "LDPE / LLDPE C4 & C6 Film Grades"
                      : selectedApp === "bottles"
                      ? "HDPE Blow Moulding & PP Copolymer"
                      : selectedApp === "pipes"
                      ? "HDPE Pipe Grade (PE100 / PE80) & Suspension PVC"
                      : selectedApp === "automotive"
                      ? "PP Copolymer, PE Compounds & Engineering Resins"
                      : "PLA Bioplastics & High-Flow Polypropylene"}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    Method selected: <strong className="text-gray-800">{selectedMethod}</strong>.
                    Available for immediate global shipping from regional warehouses in UAE,
                    Middle East, and international hubs.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <Link
                    href={`/enquiry?product=${encodeURIComponent(selectedApp)}`}
                    className="bg-primary text-white px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold hover:bg-primary-darker transition-colors inline-flex items-center justify-center gap-2 active:scale-95 text-center shadow-xs"
                  >
                    <span>Request Grade Quotation</span>
                    <Icon name="arrow-forward" className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products#grades-explorer"
                    className="border border-gray-300 text-gray-800 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold hover:border-primary transition-colors inline-flex items-center justify-center active:scale-95 text-center"
                  >
                    <span>Explore Technical Sheets</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
