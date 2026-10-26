import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { BLOGS_DATA } from "@/data/blogsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOGS_DATA.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOGS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
        <article className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-primary">Blogs</Link>
            <span>/</span>
            <span className="text-primary font-semibold">{post.category}</span>
          </div>

          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-gray-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pb-8 border-b border-gray-200 mb-8">
            <span className="font-semibold text-gray-800">{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tags:</span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t, idx) => (
                  <span key={idx} className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/enquiry"
              className="rounded-md bg-primary hover:bg-primary-darker text-white px-5 py-2.5 text-xs font-semibold shadow-sm"
            >
              Contact Trading Desk
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
