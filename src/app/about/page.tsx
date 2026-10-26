import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">About Us</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-light text-white tracking-tight leading-tight">
              21 Years of Excellence in <br className="hidden sm:inline" />
              <span className="text-primary font-normal">Global Polymer Distribution</span>
            </h1>
            <p className="mt-5 max-w-3xl text-sm md:text-lg text-white/80 leading-relaxed">
              National Polymers LLC FZ is an international polymer trading firm based in Dubai, UAE, connecting premier petrochemical refiners from North America, Europe, Australia, and Asia with manufacturing converters across the globe.
            </p>
          </div>
        </section>

        {/* 1. About Company In Detail */}
        <section id="about-detail" className="py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                  Corporate Profile
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                  About National Polymers LLC FZ
                </h2>
                <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  <p>
                    Established with a vision for transparency, supply continuity, and technical competence, National Polymers has evolved into a trusted supply chain partner for hundreds of plastic processors worldwide.
                  </p>
                  <p>
                    We deal comprehensively across Prime, Near Prime, and Off-Grade Resins, as well as washed Recycled Granules, Regrinds, and Scraps. Our trading desks source directly from production facilities in the USA, Canada, Australia, and the Far East, exporting container loads to the Indian Subcontinent, Africa, Europe, and Latin America.
                  </p>
                  <p>
                    Our core principles are rooted in quality assurance, financial integrity, rigorous laboratory pre-shipment inspections, and prompt delivery schedules.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <Image
                  src="https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img1.jpg&w=1024&q=80"
                  alt="National Polymers Global Headquarters"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Vision, Mission & Values */}
        <section id="vision-mission" className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Vision, Mission &amp; Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary mb-5">
                  <Icon name="verified" className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  To be the world’s most trusted and agile polymer trading network, setting the benchmark for ethical trading, price transparency, and circular plastic stewardship.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary mb-5">
                  <Icon name="public" className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  To empower plastic converters with uninterrupted resin supply, alternative cost-saving formulations, and reliable container shipping while driving circular plastic integration.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary mb-5">
                  <Icon name="science" className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-gray-900">Core Values</h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Integrity in contract fulfillment, transparency in grade classifications, uncompromised quality testing, and relentless dedication to long-term partner relationships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Why Choose Us */}
        <section id="why-choose-us" className="py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Competitive Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12">
              Why Global Converters Partner With Us
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "21 Years Proven Track Record", desc: "Two decades of reliable container executions and financial stability in Dubai." },
                { title: "Direct Refinery Sourcing", desc: "Off-take quotas from Tier-1 petrochemical producers across 4 continents." },
                { title: "Stringent Quality Assurance", desc: "Full Certificate of Analysis (COA) verification before container vessel loading." },
                { title: "Extended Free Demurrage", desc: "Up to 21-day container free time negotiated at major destination discharge ports." },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-primary transition-all">
                  <span className="text-primary font-bold text-lg">0{idx + 1}</span>
                  <h3 className="mt-3 text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Global Supply Network */}
        <section id="global-network" className="py-16 md:py-24 bg-navy text-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                  Worldwide Presence
                </span>
                <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                  Seamless Global Supply Network
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  Headquartered in Dubai—the international trade crossroads—we orchestrate seamless multi-modal logistics connecting major export loading terminals with over 40 destination container ports.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-6 text-center border-t border-white/20 pt-6">
                  <div>
                    <span className="text-3xl sm:text-4xl font-light text-primary">21+</span>
                    <span className="block text-[11px] uppercase tracking-wider text-white/60 mt-1">Years</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-light text-primary">40+</span>
                    <span className="block text-[11px] uppercase tracking-wider text-white/60 mt-1">Countries</span>
                  </div>
                  <div>
                    <span className="text-3xl sm:text-4xl font-light text-primary">10,000+</span>
                    <span className="block text-[11px] uppercase tracking-wider text-white/60 mt-1">MT / Month</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white mb-4">Export Destinations by Region:</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span><strong>Indian Subcontinent:</strong> Nhava Sheva, Mundra, Karachi, Chittagong, Colombo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span><strong>Africa:</strong> Durban, Mombasa, Lagos, Alexandria, Tema, Dar es Salaam</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span><strong>Middle East:</strong> Jebel Ali, Dammam, Sohar, Hamad Port, Shuwaikh</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span><strong>Europe &amp; Latin America:</strong> Mersin, Antwerp, Santos, Callao, Manzanillo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Suppliers / Partners */}
        <section id="suppliers-partners" className="py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Sourcing Integrity
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Our Suppliers &amp; Petrochemical Partners
            </h2>
            <p className="max-w-3xl text-sm sm:text-base text-gray-600 mb-10 leading-relaxed">
              We work closely with world-class petrochemical refiners, crack plant operators, and certified recyclers in the USA, Canada, Belgium, Saudi Arabia, UAE, and Taiwan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
              {[
                "SABIC", "Borouge", "ExxonMobil", "Formosa", "LG Chem", "Hanwha",
                "Dow", "LyondellBasell", "TotalEnergies", "INEOS", "Chevron Phillips", "Braskem"
              ].map((brand, i) => (
                <div key={i} className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center font-bold text-gray-700 text-xs sm:text-sm hover:border-primary hover:bg-white transition-all">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Quality & Compliance */}
        <section id="quality-compliance" className="py-16 md:py-24 bg-gray-50 border-b border-gray-200">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              Standardization
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
              Quality Assurance &amp; International Compliance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900">Lab COA Testing</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Every batch is cross-tested for Melt Index (ASTM D1238), Density (ASTM D1505), and moisture content before bill of lading issuance.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900">Regulatory Adherence</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Compliant with FDA 21 CFR 177.1520 (food contact), EU REACH, and RoHS environmental directives.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900">Pre-Shipment Inspections</h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  Container condition audits, seal checks, and pallet strapping verification conducted at port departure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Sustainability */}
        <section id="sustainability" className="py-16 md:py-24 border-b border-gray-100">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
                  Circular Commitment
                </span>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                  Driving the Circular Polymer Economy
                </h2>
                <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                  Plastic waste is a resource. National Polymers processes and distributes over 30,000 metric tons of PCR and PIR recycled materials annually, preventing landfill disposal and reducing petrochemical carbon intensity for our converter clients.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/products/recycled"
                    className="rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                  >
                    Explore Recycled Grades
                  </Link>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <Image
                  src="https://www.multitradegroup.com/_vercel/image?url=%2Fimages%2Fwhy_choose_us_img3.jpg&w=1024&q=80"
                  alt="Recycled Polymers and Sustainability"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Team */}
        <section id="team" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2 text-center">
              People &amp; Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 text-center mb-12">
              Our Commercial &amp; Trading Leadership
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { name: "Executive Trading Director", role: "Global Polymer Sourcing", bio: "22+ years in polyolefin derivatives and international trade finance." },
                { name: "Technical Applications Manager", role: "Polymer Engineering & COA", bio: "Expert in extrusion rheology, blown film, and resin substitution." },
                { name: "Head of Ocean Logistics", role: "Port Shipping & Demurrage", bio: "18+ years coordinating container vessel charters across global sea routes." },
              ].map((member, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-primary/10 text-primary grid place-items-center mb-4 text-2xl font-bold">
                    NP
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <span className="text-xs font-semibold text-primary block mt-1">{member.role}</span>
                  <p className="mt-3 text-xs text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
