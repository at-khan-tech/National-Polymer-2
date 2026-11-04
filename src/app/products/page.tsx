import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { getAllProducts } from "@/lib/content-store";
import { GradeCatalogExplorer } from "@/components/GradeCatalogExplorer";
import { MAJOR_BRANDS } from "@/data/gradesCatalog";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 md:pt-28 pb-16 sm:pb-20">
        {/* Banner Section */}
        <section className="bg-navy text-white py-12 sm:py-16 md:py-20 mb-8 sm:mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Products &amp; Grades Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Plastic Raw Materials &amp; Polymer Grades
            </h1>
            <p className="mt-3 sm:mt-4 max-w-3xl text-xs sm:text-base text-white/80 leading-relaxed">
              Direct containerized distribution of certified Prime, Near-Prime, Off-Grade, and Recycled polymer resins. Sourced directly from global petrochemical refiners across Saudi Arabia, South Korea, Egypt, the USA, and Asia.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* ─── MAJOR MANUFACTURER BRANDS BAR (Clickable) ─── */}
          <section className="mb-8 sm:mb-12 bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Global Refiners &amp; Producer Allocations
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
                  Major Manufacturer Grades
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                Click any brand below to view candidate grades &amp; request factory pricing:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {MAJOR_BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
                  className="p-3 sm:p-3.5 rounded-xl border border-gray-200 hover:border-primary bg-gray-50 hover:bg-white text-left transition-all hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm sm:text-base text-navy group-hover:text-primary transition-colors">
                        {brand.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {brand.origin.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 line-clamp-1">
                      {brand.categories.join(", ")}
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-semibold mt-2 block group-hover:translate-x-0.5 transition-transform">
                    Explore Grades &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── LIVE GRADE SEARCH & FILTER EXPLORER ─── */}
          <section id="grades-explorer" className="mb-12 sm:mb-16 scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary block">
                Technical Resin Finder
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mt-0.5">
                Manufacturer-Wise Candidate Grades Catalog
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Filter by brand (SABIC, APC, SK, SIDPEC, Formosa), grade code, application, or MFI / Density test parameters:
              </p>
            </div>

            <Suspense
              fallback={
                <div className="p-8 sm:p-10 text-center bg-white rounded-2xl border border-gray-200">
                  <p className="text-xs sm:text-sm text-gray-500">Loading candidate grades catalog...</p>
                </div>
              }
            >
              <GradeCatalogExplorer />
            </Suspense>
          </section>

          {/* ─── CORE POLYMER FAMILIES ─── */}
          <section className="pt-6 border-t border-gray-200">
            <div className="mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary block">
                Polymer Family Classifications
              </span>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mt-0.5">
                Core Material Families &amp; Processing Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/50"
                >
                  <div>
                    {/* Clickable Image header */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative h-48 sm:h-56 w-full overflow-hidden bg-gray-100 block cursor-pointer"
                      title={`View ${product.name} specifications`}
                    >
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs">
                          {product.category}
                        </span>
                      </div>
                    </Link>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6">
                      <Link
                        href={`/products/${product.slug}`}
                        className="focus-primary block group/name"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover/name:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        {product.tagline}
                      </p>
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Popular grades pills */}
                      <div className="mt-4 pt-3.5 border-t border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1.5">
                          Standard Processing Grades:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.subTypes.slice(0, 4).map((sub, i) => (
                            <span
                              key={i}
                              className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="p-5 sm:p-6 pt-0 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 sm:gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-darker transition-colors"
                    >
                      <span>View Technical Specs &amp; COA</span>
                      <Icon name="arrow-forward" className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/enquiry?product=${product.slug}`}
                      className="rounded-lg bg-gray-900 hover:bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-colors text-center shadow-2xs"
                    >
                      RFQ Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
