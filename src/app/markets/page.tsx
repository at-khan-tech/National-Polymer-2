import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { GlobalTradingMapSection } from "@/components/WorldMap";

export default function MarketsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-20">
        <section className="relative bg-gray-100 text-gray-900 pt-20 md:pt-28 pb-14 md:pb-20 mb-12 overflow-hidden">
          {/* Subtle Consistent Chemical Background Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/bg5.png"
              alt="Global Markets Background"
              fill
              priority
              className="object-cover object-right md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/70 bg-gradient-to-r from-white/95 via-white/85 to-white/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-gray-600 uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">Global Markets</span>
            </div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-extrabold text-navy tracking-tight">
              International Polymer <span className="text-primary font-black">Trading Corridors</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-gray-700 leading-relaxed">
              Serving manufacturing converters in over 40 countries across Turkey, China, Australia, New Zealand, East &amp; West Africa, and Latin America.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          {/* Complete Interactive Global Map and Regional Corridors */}
          <GlobalTradingMapSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
