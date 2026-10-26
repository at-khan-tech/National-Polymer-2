import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { SOLUTIONS_DATA } from "@/data/solutionsData";

export default function SolutionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Solutions</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Value-Added Polymer Trading Solutions
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              From contract prime security to technical grade substitution and JIT port shipping, we solve complex manufacturing and supply chain challenges for converters in 40+ countries.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS_DATA.map((sol) => (
              <div
                key={sol.slug}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100">
                    <Image
                      src={sol.imageUrl}
                      alt={sol.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {sol.title}
                    </h2>
                    <p className="mt-1 text-xs font-semibold text-primary">
                      {sol.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {sol.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Solution Details</span>
                    <Icon name="arrow-forward" className="w-3.5 h-3.5" />
                  </Link>
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
