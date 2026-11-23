import React from "react";
import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { HeroStatsBar } from "@/components/HeroStatsBar";
import { AboutShowcase } from "@/components/AboutShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorldwideCapacity } from "@/components/WorldwideCapacity";
import { InDemandMaterials } from "@/components/InDemandMaterials";
import { MobileCustomerJourney } from "@/components/MobileCustomerJourney";
import { GradeSystem } from "@/components/GradeSystem";
import { MaterialFinder } from "@/components/MaterialFinder";
import { SuppliersSection } from "@/components/SuppliersSection";
import { TradeShowsGallery } from "@/components/TradeShowsGallery";
import { Testimonials } from "@/components/Testimonials";
import { LatestInsights } from "@/components/LatestInsights";
import { LatestNews } from "@/components/LatestNews";
import { SocialFeed } from "@/components/SocialFeed";

import { ExpertAdviceCTA } from "@/components/ExpertAdviceCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-start">
      {/* 1. Fixed Header with Full Dropdown Sequence */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col justify-start items-center">
        {/* 1. Banner (Slider / Image) */}
        <HeroStage />

        {/* Company Quick Stats Strip */}
        <HeroStatsBar />

        {/* 2. About Company & 21 Years Badge */}
        <AboutShowcase />

        {/* Why Choose Us & Industry Spectrum */}
        <WhyChooseUs />

        {/* 3. Featured 3 or 4 Products Grid */}
        <InDemandMaterials />

        {/* Dedicated Mobile Step-by-Step Customer Journey (Category -> Brand -> Grade -> RFQ) */}
        <section id="mobile-grade-finder" className="w-full md:hidden py-10 px-4 bg-[#F8FAFC] border-y border-slate-200 scroll-mt-20">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-1">
                Step-by-Step Polymer Finder
              </span>
              <h2 className="text-xl font-extrabold text-navy">
                Explore Resins by Category &amp; Brand
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Select your polymer family, choose an authorized global refiner, and pick a grade to request container rates.
              </p>
            </div>
            <MobileCustomerJourney />
          </div>
        </section>

        {/* 4. Grade System (Prime, Near-Prime, Off-Grade, Recycled) */}
        {/* <GradeSystem /> */}

        {/* Worldwide Capacity & Strategy Stats */}

        {/* Interactive Material Finder Guide */}
        <MaterialFinder />

        {/* 5. Dubai Trading Desk Callout & Our Suppliers Carousel */}
        <SuppliersSection />

        {/* 6. Trade Shows & Exhibitions Showcase */}
        <TradeShowsGallery />

        {/* Client Testimonials / Highlights */}
      </main>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
}
