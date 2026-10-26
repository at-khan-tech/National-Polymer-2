import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { BLOGS_DATA } from "@/data/blogsData";

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Blogs &amp; Industry Insights</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Polymer Market Analysis &amp; Technical Insights
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Stay ahead with regular updates on global petrochemical pricing, shipping freight, polymer processing tips, and circular plastic developments.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS_DATA.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Full Article</span>
                    <Icon name="arrow-forward" className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
