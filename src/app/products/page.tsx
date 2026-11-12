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
      <main className="min-h-screen bg-[#f6f7f9] pb-20">

        {/* ─── HERO BANNER ─── */}
        <section className="relative bg-gray-100 overflow-hidden pt-20 md:pt-28 pb-14 sm:pb-20 md:pb-24">
          {/* Subtle Consistent Chemical Background Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/b4.png"
              alt="Products Catalog Background"
              fill
              priority
              className="object-cover object-right md:object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/70 bg-gradient-to-r from-white/95 via-white/85 to-white/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-5">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-bold">Products &amp; Grades Catalog</span>
            </nav>

            <div className="max-w-3xl">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                Polymer Raw Materials
              </p>
              <h1 className="font-montserrat text-3xl sm:text-5xl md:text-6xl font-extrabold text-navy tracking-tight leading-[1.1]">
                Plastic Raw Materials
                <span className="block text-primary mt-1 font-black">
                  &amp; Grades Catalog
                </span>
              </h1>
              <p className="mt-5 text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl">
                Direct containerized distribution of certified Prime, Near-Prime, Off-Grade &amp; Recycled polymer resins — sourced from global petrochemical refiners across Saudi Arabia, South Korea, Egypt, USA &amp; Asia.
              </p>
            </div>

            {/* Stat badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { label: "Polymer Families", value: `${products.length}+` },
                { label: "Manufacturer Brands", value: `${MAJOR_BRANDS.length}+` },
                { label: "Export Destinations", value: "40+" },
                { label: "Grade SKUs", value: "500+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 bg-white/85 border border-gray-200 rounded-xl px-4 py-2.5 shadow-2xs"
                >
                  <span className="text-base sm:text-lg font-bold text-primary">{s.value}</span>
                  <span className="text-[11px] text-gray-700 font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* ─── MANUFACTURER BRANDS ─── */}
          <section className="mt-10 sm:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                  Global Refiners &amp; Producer Allocations
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Major Manufacturer Grades
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                Click a brand to filter candidate grades below
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {MAJOR_BRANDS.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/products?brand=${encodeURIComponent(brand.name)}#grades-explorer`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 hover:border-primary/60 hover:shadow-lg transition-all duration-200"
                >
                  <div>
                    <div className="relative w-full h-8 mb-2 flex items-center justify-start">
                      <Image
                        src={brand.logoUrl}
                        alt={`${brand.name} logo`}
                        width={80}
                        height={32}
                        className="object-contain max-h-8 w-auto filter group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-extrabold text-sm sm:text-[15px] text-navy group-hover:text-primary transition-colors leading-tight">
                        {brand.name}
                      </span>
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider bg-gray-100 group-hover:bg-primary/10 group-hover:text-primary text-gray-500 px-1.5 py-0.5 rounded-md transition-colors">
                        {brand.origin.split(" ")[0]}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-1 leading-relaxed">
                      {brand.categories.join(" · ")}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary group-hover:gap-2 transition-all">
                    <span>Explore Grades</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── GRADE CATALOG EXPLORER ─── */}
          <section id="grades-explorer" className="mt-14 sm:mt-18 scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                Technical Resin Finder
              </p>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                Manufacturer-Wise Candidate Grades Catalog
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-2xl">
                Filter by brand, grade code, application, or MFI / Density parameters. Click &ldquo;Get Quote&rdquo; to pre-fill the enquiry form.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="p-10 text-center bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-gray-500">Loading candidate grades catalog…</p>
                </div>
              }
            >
              <GradeCatalogExplorer />
            </Suspense>
          </section>

          {/* ─── CORE POLYMER FAMILIES ─── */}
          <section className="mt-14 sm:mt-18 pt-10 border-t border-gray-200">
            <div className="mb-8 sm:mb-10">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                Polymer Family Classifications
              </p>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                Core Material Families &amp; Processing Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="group flex flex-col rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block w-full overflow-hidden bg-gray-100"
                    style={{ aspectRatio: "16/9" }}
                    title={`View ${product.name} specifications`}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Category badge */}
                    <span className="absolute top-3.5 left-3.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                      {product.category}
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <div className="flex-1">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-xs font-semibold text-primary/80">
                        {product.tagline}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Grade pills */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-2">
                          Standard Processing Grades
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.subTypes.slice(0, 4).map((sub, i) => (
                            <span
                              key={i}
                              className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-700"
                            >
                              {sub.name}
                            </span>
                          ))}
                          {product.subTypes.length > 4 && (
                            <span className="rounded-lg border border-dashed border-gray-300 bg-transparent px-2.5 py-1 text-[11px] font-medium text-gray-400">
                              +{product.subTypes.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-primary transition-colors"
                      >
                        <span>Technical Specs &amp; COA</span>
                        <Icon name="arrow-forward" className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/enquiry?product=${product.slug}`}
                        className="rounded-xl bg-navy hover:bg-primary px-4 py-2.5 text-xs font-bold text-white transition-colors shadow-sm"
                      >
                        RFQ / Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ─── BOTTOM CTA BANNER ─── */}
          <section className="mt-16 sm:mt-20 rounded-3xl bg-navy overflow-hidden relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 30px)",
              }}
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-9 sm:py-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                  Custom Material Requirements?
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Can&apos;t find the grade you&apos;re looking for?
                </h3>
                <p className="mt-1.5 text-sm text-white/60 max-w-lg">
                  We source custom polymer allocations on request. Reach out with your target MFI, density, and application for a tailored quotation.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="shrink-0 rounded-xl bg-primary hover:bg-primary-darker px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-95"
              >
                Request Custom Grade
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
