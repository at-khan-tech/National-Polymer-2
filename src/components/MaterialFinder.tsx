"use client";

import React, { useState } from "react";
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
      className="w-full bg-primary py-16 text-white md:py-24 transition-colors duration-300"
      aria-labelledby="material-finder-title"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Left Guide Information */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-lighter">
              Interactive product guide
            </p>
            <h2
              id="material-finder-title"
              className="mt-4 text-4xl font-light text-white md:text-5xl leading-tight"
            >
              Find the right material
            </h2>
            <p className="mt-5 text-base leading-7 text-white/80">
              Answer three quick questions to get a useful starting point for your
              application. Our technical team can then help confirm the grade and
              specifications.
            </p>

            {/* Stepper Progress Indicator */}
            <div className="mt-8 flex items-center gap-3" aria-label="Finder progress">
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                  currentStep >= 1
                    ? "border-white bg-white text-primary"
                    : "border-white/25 text-white/45"
                }`}
              >
                1
              </span>
              <span className="bg-white/20 h-px w-10" />

              <span
                className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                  currentStep >= 2
                    ? "border-white bg-white text-primary"
                    : "border-white/25 text-white/45"
                }`}
              >
                2
              </span>
              <span className="bg-white/20 h-px w-10" />

              <span
                className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                  currentStep >= 3
                    ? "border-white bg-white text-primary"
                    : "border-white/25 text-white/45"
                }`}
              >
                3
              </span>
            </div>

            <p className="mt-6 text-xs leading-5 text-white/60">
              Recommendations are indicative starting points, not final technical
              specifications. Suitability depends on grade, processing conditions,
              regulations and end use.
            </p>
          </div>

          {/* Right Interactive Card */}
          <div className="bg-white p-6 text-gray-900 shadow-2xl md:p-9 rounded">
            {currentStep === 1 && (
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-darker">
                      Step 1 of 3
                    </p>
                    <h3 className="mt-2 text-2xl font-normal text-gray-900">
                      What are you making?
                    </h3>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {step1Options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleStep1Select(opt.id)}
                      className="group flex min-h-24 items-start gap-4 border border-gray-200 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md cursor-pointer"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary-darker transition-colors group-hover:bg-primary group-hover:text-white">
                        <Icon name={opt.icon} className="w-6 h-6" />
                      </span>
                      <span>
                        <span className="block font-semibold text-gray-900">
                          {opt.title}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-gray-500">
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
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-darker">
                      Step 2 of 3
                    </p>
                    <h3 className="mt-2 text-2xl font-normal text-gray-900">
                      Processing / Manufacturing Method
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-primary-darker hover:underline"
                  >
                    &larr; Back
                  </button>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-1">
                  {(step2Options[selectedApp] || []).map((method, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStep2Select(method)}
                      className="group flex items-center justify-between border border-gray-200 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md cursor-pointer"
                    >
                      <span className="font-semibold text-gray-900">{method}</span>
                      <Icon
                        name="arrow-forward"
                        className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-darker">
                      Step 3 of 3 · Recommended Solution
                    </p>
                    <h3 className="mt-2 text-2xl font-normal text-gray-900">
                      Ideal Grade Recommendations
                    </h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-primary-darker hover:underline"
                  >
                    Start over
                  </button>
                </div>

                <div className="mt-6 p-5 bg-gray-50 border border-primary/30 rounded">
                  <p className="text-xs uppercase tracking-wider text-primary font-bold">
                    Primary Match:
                  </p>
                  <h4 className="text-xl font-bold text-gray-900 mt-1">
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
                  <p className="text-sm text-gray-600 mt-2">
                    Method selected: <strong className="text-gray-800">{selectedMethod}</strong>.
                    Available for immediate global shipping from regional warehouses in UAE,
                    Middle East, and international hubs.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 items-center">
                  <Link
                    href="/contact#contactForm"
                    className="bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-darker transition-colors inline-flex items-center gap-2"
                  >
                    Request Grade Quotation
                    <Icon name="arrow-forward" className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="border border-gray-300 text-gray-800 px-5 py-3 text-sm font-semibold hover:border-primary transition-colors"
                  >
                    Explore Technical Sheets
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
