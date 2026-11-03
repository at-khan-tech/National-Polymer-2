import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { getAllProducts } from "@/lib/content-store";
import { CANDIDATE_GRADES } from "@/data/gradesCatalog";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductInnerPage({ params }: PageProps) {
  const { slug } = await params;
  const product = (await getAllProducts()).find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find candidate grades that match this polymer family
  const categoryKeywords = slug === "pp" ? ["PP"] : slug === "pe" ? ["HDPE", "LDPE", "LLDPE"] : [slug.toUpperCase()];
  const matchingGrades = CANDIDATE_GRADES.filter((g) =>
    categoryKeywords.some((k) => g.category.toUpperCase().includes(k))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
        {/* Hero Banner for Product */}
        <section className="bg-gradient-to-b from-navy to-[#0c234b] text-white py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:underline">Products</Link>
              <span>/</span>
              <span className="text-white font-semibold">{product.name}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
                  {product.name}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed text-justify">
                  {product.tagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/enquiry?product=${product.slug}`}
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-darker hover:scale-105"
                  >
                    Request Quotation for {product.name.split(" ")[0]}
                  </Link>
                  <Link
                    href="#grades"
                    className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    View Available Grades
                  </Link>
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content & Specifications */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            {/* Left Main Content */}
            <div className="space-y-12">
              {/* Product Description */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Material Overview &amp; Polymer Characteristics
                </h2>
                <p className="text-base text-gray-700 leading-relaxed mb-6 text-justify">
                  {product.description}
                </p>
                <div className="space-y-3">
                  {product.overview.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary mt-0.5">
                        <Icon name="check" className="w-3.5 h-3.5" />
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed text-justify">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── Available Processing Grades Table ─── */}
              <div id="grades">
                <div className="flex items-center justify-between mb-4 border-b pb-2">
                  <h2 className="text-2xl font-light text-gray-900">
                    Standard Processing Grades &amp; Melt Flow Range
                  </h2>
                  <span className="text-xs text-gray-500">
                    Click &apos;Get Quote&apos; to prefill enquiry
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Grade Classification</th>
                        <th className="py-3 px-4">MFI (g/10 min)</th>
                        <th className="py-3 px-4">Density (g/cm³)</th>
                        <th className="py-3 px-4">Target Application</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {product.subTypes.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-gray-900">{sub.name}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-600">{sub.mfi}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-600">{sub.density}</td>
                          <td className="py-3.5 px-4 text-gray-600">{sub.useCase}</td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              href={`/enquiry?product=${product.slug}&grade=${encodeURIComponent(
                                sub.name
                              )}`}
                              className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-darker transition shadow-2xs"
                            >
                              <span>Get Quote</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ─── Manufacturer-Specific Verified Candidate Grades ─── */}
              {matchingGrades.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4 border-b pb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                        Verified Allocations
                      </span>
                      <h2 className="text-xl sm:text-2xl font-light text-gray-900">
                        Major Manufacturer Candidate Grades ({matchingGrades.length})
                      </h2>
                    </div>
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Available on request
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4">Manufacturer</th>
                          <th className="py-3 px-4">Grade Code</th>
                          <th className="py-3 px-4">Subtype</th>
                          <th className="py-3 px-4">MFI Spec</th>
                          <th className="py-3 px-4">Application</th>
                          <th className="py-3 px-4 text-right">Instant RFQ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {matchingGrades.slice(0, 10).map((g) => (
                          <tr key={g.id} className="hover:bg-primary-soft/30 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-bold text-gray-900 block">{g.brand}</span>
                              <span className="text-[10px] text-gray-400">{g.origin}</span>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-navy">
                              <span className="bg-slate-100 px-2 py-0.5 rounded">{g.grade}</span>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{g.subCategory}</td>
                            <td className="py-3 px-4 font-mono text-gray-600 text-xs">{g.mfi}</td>
                            <td className="py-3 px-4 text-gray-600">{g.application}</td>
                            <td className="py-3 px-4 text-right">
                              <Link
                                href={`/enquiry?product=${product.slug}&grade=${encodeURIComponent(
                                  g.grade
                                )}&brand=${encodeURIComponent(g.brand)}&origin=${encodeURIComponent(
                                  g.origin
                                )}`}
                                className="inline-flex items-center gap-1 rounded bg-navy hover:bg-navy-dark px-3 py-1.5 text-xs font-semibold text-white transition shadow-2xs"
                              >
                                <span>Enquire</span>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {matchingGrades.length > 10 && (
                    <div className="mt-3 text-right">
                      <Link
                        href={`/products?category=${categoryKeywords[0]}#grades-explorer`}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        View all {matchingGrades.length} {categoryKeywords[0]} candidate grades &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Typical Technical Properties */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Technical Specifications (Standard Laboratory Test Values)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((sp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs text-gray-500 uppercase tracking-wider block font-medium">
                        {sp.property}
                      </span>
                      <span className="text-base font-bold text-gray-900 mt-1 block">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Applications, Packaging, CTA */}
            <div className="space-y-6">
              {/* Primary Applications Card */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
                  Key Processing Applications
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {product.applications.map((app, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standard Packaging Card */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800 mb-4">
                  Export Packaging &amp; Logistics
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {product.packaging.map((pack, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pack}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  FOB &amp; CIF deliveries directly to 40+ container ports worldwide.
                </div>
              </div>

              {/* Immediate Quote Box */}
              <div className="p-6 rounded-2xl bg-primary text-white text-center shadow-xl">
                <h3 className="text-lg font-semibold">Ready for a Price Indication?</h3>
                <p className="mt-2 text-xs text-white/80">
                  Get current container CIF rates, shipping schedule, and full COA data sheets for {product.name}.
                </p>
                <Link
                  href={`/enquiry?product=${product.slug}`}
                  className="mt-5 block w-full rounded-md bg-white py-3 text-xs font-bold uppercase tracking-wider text-primary hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Request Technical Data &amp; Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
