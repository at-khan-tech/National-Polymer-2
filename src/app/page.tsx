import React from "react";
import { Header } from "@/components/Header";
import { HeroStage } from "@/components/HeroStage";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { AboutShowcase } from "@/components/AboutShowcase";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WorldwideCapacity } from "@/components/WorldwideCapacity";
import { MaterialFinder } from "@/components/MaterialFinder";
import { LatestNews } from "@/components/LatestNews";
import { FeaturedVideos } from "@/components/FeaturedVideos";
import { InDemandMaterials } from "@/components/InDemandMaterials";
import { ExpertAdviceCTA } from "@/components/ExpertAdviceCTA";
import { LatestInsights } from "@/components/LatestInsights";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-start">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col justify-start items-center">
        {/* Hero Section with Watermark & Team Headshots Ticker */}
        <HeroStage />

        {/* Upcoming & Recent Events (Overlapping hero) */}
        <UpcomingEvents />

        {/* 30 Years Badge & Full-Service Overview */}
        <AboutShowcase />

        {/* Why Choose Multi Trade Group? & Industry Spectrum */}
        <WhyChooseUs />

        {/* Capacity, Boardroom & Strategy Stats */}
        <WorldwideCapacity />

        {/* Interactive Material Finder Tool */}
        <MaterialFinder />

        {/* Latest News & Exhibition Stories Carousel */}
        <LatestNews />

        {/* Featured Corporate Videos */}
        <FeaturedVideos />

        {/* Most In-Demand Materials Product Grid */}
        <InDemandMaterials />

        {/* Expert Advice Full-Width Banner */}
        <ExpertAdviceCTA />

        {/* Latest Insights Blog Articles */}
        <LatestInsights />
      </main>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
}
