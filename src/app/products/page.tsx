import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { getAllProducts } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        {/* Banner Section */}
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Products Catalog</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Plastic Raw Materials &amp; Polymer Resins
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Prime, Near-Prime, Off-Grade, and Recycled resins sourced from premier petrochemical refiners across North America, Australia, and the Far East.
            </p>
          </div>
        </section>

        {/* 10 Products Grid */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50"
              >
                <div>
                  {/* Image header */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-gray-500">
                      {product.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Popular grades pills */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
                        Available Grades:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.subTypes.slice(0, 3).map((sub, i) => (
                          <span
                            key={i}
                            className="rounded bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-700"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Technical Specs &amp; COA</span>
                    <Icon name="arrow-forward" className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/enquiry?product=${product.slug}`}
                    className="rounded bg-gray-900 hover:bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    RFQ Quote
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
