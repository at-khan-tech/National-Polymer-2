import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { getAllProducts } from "@/lib/content-store";

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
                <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                  {product.tagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={`/enquiry?product=${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-darker"
                  >
                    <span>Request Price Quote</span>
                    <Icon name="arrow-forward" className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/971568512508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
                  >
                    <span>Chat on WhatsApp</span>
                    <Icon name="open-in-new" className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Product Visual */}
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-primary font-bold">
                      Certified Lot Quality
                    </span>
                    <p className="text-sm text-white font-medium">
                      Direct factory loading in 20ft &amp; 40ft sea containers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Description & Overview */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">
            {/* Left Content */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Material Overview &amp; Polymer Characteristics
                </h2>
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="space-y-3">
                  {product.overview.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary mt-0.5">
                        <Icon name="check" className="w-3.5 h-3.5" />
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Grades & Rheology Table */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Popular Commercial Grades &amp; Melt Flow Range
                </h2>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-gray-50 text-gray-700 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Grade Classification</th>
                        <th className="py-3 px-4">MFI (g/10 min)</th>
                        <th className="py-3 px-4">Density (g/cm³)</th>
                        <th className="py-3 px-4">Target Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {product.subTypes.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-semibold text-gray-900">{sub.name}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-600">{sub.mfi}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-600">{sub.density}</td>
                          <td className="py-3.5 px-4 text-gray-600">{sub.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

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
