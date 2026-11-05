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

  const categoryKeywords =
    slug === "pp"
      ? ["PP"]
      : slug === "pe"
      ? ["HDPE", "LDPE", "LLDPE"]
      : [slug.toUpperCase()];

  const matchingGrades = CANDIDATE_GRADES.filter((g) =>
    categoryKeywords.some((k) => g.category.toUpperCase().includes(k))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f6f7f9] pb-20">

        {/* ─── HERO BANNER ─── */}
        <section className="relative bg-gray-100 overflow-hidden pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20">
          {/* Background Image with Light Gray/White 50% Translucent Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/backgrounds/b4.png"
              alt="Product Details Background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-white/50 bg-gradient-to-r from-white/70 via-white/55 to-gray-100/50 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-600 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-bold">{product.name}</span>
            </nav>

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left: Text */}
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1.5 text-[11px] font-bold text-primary uppercase tracking-wider mb-4">
                  {product.category}
                </span>
                <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-navy leading-[1.1]">
                  {product.name}
                </h1>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-lg">
                  {product.tagline}
                </p>

                {/* Quick stats row */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="bg-white/85 border border-gray-200 rounded-xl px-4 py-2.5 text-center shadow-2xs">
                    <span className="text-base font-bold text-primary block">{product.subTypes.length}</span>
                    <span className="text-[10px] text-gray-600 font-medium">Processing Grades</span>
                  </div>
                  <div className="bg-white/85 border border-gray-200 rounded-xl px-4 py-2.5 text-center shadow-2xs">
                    <span className="text-base font-bold text-primary block">{matchingGrades.length}</span>
                    <span className="text-[10px] text-gray-600 font-medium">Manufacturer SKUs</span>
                  </div>
                  <div className="bg-white/85 border border-gray-200 rounded-xl px-4 py-2.5 text-center shadow-2xs">
                    <span className="text-base font-bold text-primary block">{product.applications.length}+</span>
                    <span className="text-[10px] text-gray-600 font-medium">Applications</span>
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/enquiry?product=${product.slug}`}
                    className="rounded-xl bg-primary hover:bg-primary-darker px-6 py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 text-center"
                  >
                    Request Quotation
                  </Link>
                  <Link
                    href="#grades"
                    className="rounded-xl border-2 border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-center"
                  >
                    View Available Grades
                  </Link>
                </div>
              </div>

              {/* Right: Product Image */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
                style={{ aspectRatio: "4/3" }}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── MAIN CONTENT ─── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-10 sm:mt-14">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">

            {/* ═══ LEFT MAIN CONTENT ═══ */}
            <div className="space-y-8 sm:space-y-10 min-w-0">

              {/* Material Overview */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Material Overview &amp; Polymer Characteristics
                  </h2>
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-5 space-y-3">
                  {product.overview.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10">
                        <Icon name="check" className="w-3 h-3 text-primary" />
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Standard Processing Grades Table */}
              <section id="grades" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden scroll-mt-24">
                <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Standard Processing Grades
                    </h2>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-medium">
                    {product.subTypes.length} grades available
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[580px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        <th className="py-3.5 px-5">Grade Classification</th>
                        <th className="py-3.5 px-4">MFI (g/10 min)</th>
                        <th className="py-3.5 px-4">Density (g/cm³)</th>
                        <th className="py-3.5 px-4">Target Application</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {product.subTypes.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-50/80 transition-colors group">
                          <td className="py-4 px-5 font-bold text-gray-900">{sub.name}</td>
                          <td className="py-4 px-4 font-mono text-xs text-gray-600">{sub.mfi}</td>
                          <td className="py-4 px-4 font-mono text-xs text-gray-600">{sub.density}</td>
                          <td className="py-4 px-4 text-xs text-gray-600">{sub.useCase}</td>
                          <td className="py-4 px-4 text-right">
                            <Link
                              href={`/enquiry?product=${product.slug}&grade=${encodeURIComponent(sub.name)}`}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-white hover:bg-primary-darker transition shadow-sm"
                            >
                              <span>Get Quote</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7m7-7H3" />
                              </svg>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Manufacturer Candidate Grades */}
              {matchingGrades.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                        Verified Allocations
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                          Manufacturer Candidate Grades
                        </h2>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full self-start sm:self-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {matchingGrades.length} Available on request
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                          <th className="py-3.5 px-5">Manufacturer</th>
                          <th className="py-3.5 px-4">Grade Code</th>
                          <th className="py-3.5 px-4">Subtype</th>
                          <th className="py-3.5 px-4">MFI Spec</th>
                          <th className="py-3.5 px-4">Application</th>
                          <th className="py-3.5 px-4 text-right">RFQ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {matchingGrades.slice(0, 10).map((g) => (
                          <tr key={g.id} className="hover:bg-primary/[0.03] transition-colors group">
                            <td className="py-3.5 px-5">
                              <span className="font-bold text-gray-900 group-hover:text-primary transition-colors block text-sm">
                                {g.brand}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium">{g.origin}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-mono font-bold text-navy text-xs bg-slate-100 px-2.5 py-1 rounded-lg">
                                {g.grade}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-xs text-gray-600">{g.subCategory}</td>
                            <td className="py-3.5 px-4 font-mono text-xs text-gray-600">{g.mfi}</td>
                            <td className="py-3.5 px-4">
                              <span className="text-xs text-gray-600 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                                {g.application}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <Link
                                href={`/enquiry?product=${product.slug}&grade=${encodeURIComponent(g.grade)}&brand=${encodeURIComponent(g.brand)}&origin=${encodeURIComponent(g.origin)}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-navy hover:bg-primary px-3.5 py-1.5 text-xs font-bold text-white transition shadow-sm"
                              >
                                Enquire
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7m7-7H3" />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {matchingGrades.length > 10 && (
                    <div className="px-6 py-4 border-t border-gray-100 text-right">
                      <Link
                        href={`/products?category=${categoryKeywords[0]}#grades-explorer`}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View all {matchingGrades.length} {categoryKeywords[0]} grades in catalog →
                      </Link>
                    </div>
                  )}
                </section>
              )}

              {/* Technical Specifications */}
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-1 h-5 rounded-full bg-primary block shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Technical Specifications
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {product.specs.map((sp, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs text-gray-500 font-medium leading-relaxed">
                        {sp.property}
                      </span>
                      <span className="text-sm font-bold text-gray-900 text-right shrink-0">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* ═══ RIGHT SIDEBAR ═══ */}
            <div className="space-y-5">

              {/* Sticky wrapper */}
              <div className="lg:sticky lg:top-28 space-y-5">

                {/* CTA Quote Box */}
                <div className="rounded-2xl bg-navy overflow-hidden shadow-xl relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 24px)",
                    }}
                  />
                  <div className="relative p-6 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-2">
                      Price Indication
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Ready for a Quote?
                    </h3>
                    <p className="mt-2 text-xs text-white/65 leading-relaxed">
                      Get current CIF rates, shipping schedules, and full COA data sheets for {product.name}.
                    </p>
                    <Link
                      href={`/enquiry?product=${product.slug}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-darker py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm active:scale-95"
                    >
                      Request Technical Data &amp; Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Processing Applications */}
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4">
                    Key Processing Applications
                  </h3>
                  <ul className="space-y-2.5">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Export Packaging */}
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-700 mb-4">
                    Export Packaging &amp; Logistics
                  </h3>
                  <ul className="space-y-2.5">
                    {product.packaging.map((pack, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Icon name="check" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {pack}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
                    FOB &amp; CIF deliveries directly to 40+ container ports worldwide.
                  </p>
                </div>

                {/* Back to catalog */}
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50 px-5 py-3 text-xs font-bold text-gray-600 hover:text-primary transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Full Catalog
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
