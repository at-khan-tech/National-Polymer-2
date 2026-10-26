import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";

const APPLICATIONS_LIST = [
  {
    id: "film-packaging",
    name: "Film & Flexible Packaging",
    tagline: "BOPP, Cast Stretch, Blown Bags, Shrink Liners, Food Pouches",
    polymers: "HDPE Film, LLDPE Butene/Hexene, LDPE, PP Random, mLLDPE",
    description: "High tensile strength, puncture resistance, and crystal clarity tailored for high-speed multi-layer blown and cast extrusion lines.",
  },
  {
    id: "raffia-woven",
    name: "Raffia & Woven Fabrics",
    tagline: "Cement Sacks, FIBC Jumbo Bags, Tarpaulins, Geotextiles, Ropes",
    polymers: "PP Homopolymer Raffia (MFI 2.5 - 3.8), HDPE Tape Grade",
    description: "Low water carry-over, superior tenacity, high stretch orientation, and UV stabilization for heavy-duty industrial handling.",
  },
  {
    id: "injection-molding",
    name: "Injection Molding",
    tagline: "Caps & Closures, Crates, Thin-Wall Containers, Housewares",
    polymers: "PP Impact Copolymer, PP Homopolymer (MFI 10-70), HDPE Injection",
    description: "Fast cycle times, low warpage, high stiffness-to-impact balance, and excellent mould release properties.",
  },
  {
    id: "blow-molding",
    name: "Blow Molding",
    tagline: "Chemical Jerrycans, L-Ring Drums, Lubricant & Detergent Bottles",
    polymers: "HDPE Blow Moulding (MFI 0.2 - 0.4), PP Blow, rHDPE",
    description: "Exceptional environmental stress crack resistance (ESCR), drop impact toughness, and chemical barrier properties.",
  },
  {
    id: "pipes-profiles",
    name: "Pipes & Profiles",
    tagline: "PE100 Potable Water Pipes, Gas Conduits, PVC Sewage & Window Profiles",
    polymers: "HDPE PE100 Black, PVC Suspension K67, PP-R Hot Water",
    description: "Certified MRS 10.0 MPa ratings, high hydrostatic pressure endurance, and decades of buried service life.",
  },
  {
    id: "automotive-consumer",
    name: "Automotive & Consumer Goods",
    tagline: "Bumpers, Interior Trims, Battery Casings, Power Tool Housings",
    polymers: "PP High Impact, ABS Natural/Black, PC, PA6/PA66 GF, POM",
    description: "High impact resistance at sub-zero temperatures, dimensional accuracy, thermal resistance, and scratch resistance.",
  },
  {
    id: "agriculture-industrial",
    name: "Agriculture & Industrial Infrastructure",
    tagline: "Drip Irrigation Laterals, Mulch Films, Greenhouse Covers, Silo Bags",
    polymers: "LLDPE Film, HDPE Pipe, Carbon Black Masterbatch, UV HALS",
    description: "Multi-season outdoor UV protection, thermal heat retention, and resistance to agrochemicals and fertilizers.",
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Applications</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Manufacturing &amp; Processing Applications
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Tailored polymer grades optimized for specific conversion machinery, cooling cycles, and finished part performance requirements.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="space-y-6">
            {APPLICATIONS_LIST.map((app, idx) => (
              <div
                key={app.id}
                id={app.id}
                className="rounded-2xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      0{idx + 1} · Application Sector
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">{app.name}</h2>
                    <p className="text-xs font-semibold text-gray-500">{app.tagline}</p>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                      {app.description}
                    </p>
                    <div className="pt-2 text-xs text-gray-600">
                      <strong>Recommended Polymers:</strong>{" "}
                      <span className="text-primary font-mono">{app.polymers}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex md:flex-col gap-2">
                    <Link
                      href="/enquiry"
                      className="rounded bg-primary hover:bg-primary-darker text-white text-xs font-semibold px-5 py-2.5 text-center transition-colors shadow-sm"
                    >
                      Request Quote
                    </Link>
                    <Link
                      href="/products"
                      className="rounded border border-gray-300 hover:border-primary text-gray-700 hover:text-primary text-xs font-semibold px-5 py-2.5 text-center transition-colors"
                    >
                      Browse Resins
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
