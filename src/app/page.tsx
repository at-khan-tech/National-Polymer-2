import React from "react";
import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { HeroStatsBar } from "@/components/HeroStatsBar";
import { AboutShowcase } from "@/components/AboutShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorldwideCapacity } from "@/components/WorldwideCapacity";
import { InDemandMaterials } from "@/components/InDemandMaterials";
import { GradeSystem } from "@/components/GradeSystem";
import { MaterialFinder } from "@/components/MaterialFinder";
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

        {/* 4. Grade System (Prime, Near-Prime, Off-Grade, Recycled) */}
        {/* <GradeSystem /> */}

        {/* Worldwide Capacity & Strategy Stats */}
        <WorldwideCapacity />

        {/* Interactive Material Finder Guide */}
        <MaterialFinder />

        {/* 5. Client Testimonials */}
        <Testimonials />


      </main>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
}
