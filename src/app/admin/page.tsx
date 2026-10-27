"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const initialProduct = {
  name: "",
  category: "Commodity Thermoplastics",
  tagline: "",
  description: "",
  imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
};

const initialBlog = {
  title: "",
  category: "Market Intelligence",
  author: "National Polymers Trading Desk",
  excerpt: "",
  content: "",
  tags: "",
  imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
};

export default function AdminPanelPage() {
  const [productForm, setProductForm] = useState(initialProduct);
  const [blogForm, setBlogForm] = useState(initialBlog);
  const [productStatus, setProductStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [blogStatus, setBlogStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const handleProductSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to add product.");
      }

      setProductStatus({ type: "success", message: result.message || "Product saved successfully." });
      setProductForm(initialProduct);
    } catch (error) {
      setProductStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to add product.",
      });
    }
  };

  const handleBlogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...blogForm,
          tags: blogForm.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          content: blogForm.content
            .split("\n")
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to add blog.");
      }

      setBlogStatus({ type: "success", message: result.message || "Blog saved successfully." });
      setBlogForm(initialBlog);
    } catch (error) {
      setBlogStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to add blog.",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-lighter mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Admin Control Panel</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white">Manage Products &amp; Blog Posts</h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Add content to the site through the API-backed admin panel without editing static source files.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Product Manager
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">Add Product</h2>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Product Name</label>
                  <input
                    value={productForm.name}
                    onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Polypropylene (PP)"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Category</label>
                  <input
                    value={productForm.category}
                    onChange={(event) => setProductForm((current) => ({ ...current, category: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Commodity Thermoplastics"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Tagline</label>
                  <input
                    value={productForm.tagline}
                    onChange={(event) => setProductForm((current) => ({ ...current, tagline: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="High-performance resin for packaging and industrial applications"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
                    className="min-h-[120px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Describe the product and typical end-use application"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Image URL</label>
                  <input
                    value={productForm.imageUrl}
                    onChange={(event) => setProductForm((current) => ({ ...current, imageUrl: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="https://example.com/product-image.jpg"
                  />
                </div>

                {productStatus.message ? (
                  <div
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      productStatus.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : productStatus.type === "error"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {productStatus.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-primary-darker"
                >
                  Save Product
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                  Blog Manager
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">Add Blog Post</h2>
              </div>

              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Title</label>
                  <input
                    value={blogForm.title}
                    onChange={(event) => setBlogForm((current) => ({ ...current, title: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Global Polymer Trading Outlook"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Category</label>
                  <input
                    value={blogForm.category}
                    onChange={(event) => setBlogForm((current) => ({ ...current, category: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Market Intelligence"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Author</label>
                  <input
                    value={blogForm.author}
                    onChange={(event) => setBlogForm((current) => ({ ...current, author: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="National Polymers Trading Desk"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Excerpt</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(event) => setBlogForm((current) => ({ ...current, excerpt: event.target.value }))}
                    className="min-h-[90px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Short summary for the blog card"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Content (one paragraph per line)</label>
                  <textarea
                    value={blogForm.content}
                    onChange={(event) => setBlogForm((current) => ({ ...current, content: event.target.value }))}
                    className="min-h-[150px] w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Write paragraphs separated by line breaks"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Tags (comma separated)</label>
                  <input
                    value={blogForm.tags}
                    onChange={(event) => setBlogForm((current) => ({ ...current, tags: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="Polyolefins, Exports, Market Outlook"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-gray-600">Image URL</label>
                  <input
                    value={blogForm.imageUrl}
                    onChange={(event) => setBlogForm((current) => ({ ...current, imageUrl: event.target.value }))}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:bg-white"
                    placeholder="https://example.com/blog-image.jpg"
                  />
                </div>

                {blogStatus.message ? (
                  <div
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      blogStatus.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : blogStatus.type === "error"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {blogStatus.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-primary-darker"
                >
                  Publish Blog
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
