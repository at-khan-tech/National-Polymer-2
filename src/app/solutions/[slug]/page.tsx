import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { SOLUTIONS_DATA } from "@/data/solutionsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SOLUTIONS_DATA.map((sol) => ({
    slug: sol.slug,
  }));
}

export default async function SolutionInnerPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
        {/* Solution Hero */}
        <section className="bg-navy text-white py-16 md:py-24">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-3">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/solutions" className="hover:underline">Solutions</Link>
              <span>/</span>
              <span className="text-white font-semibold">{solution.title}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              {solution.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl">
              {solution.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/enquiry"
                className="rounded-sm bg-primary hover:bg-primary-darker px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
              >
                Consult With Our Technical Desk
              </Link>
              <a
                href="https://wa.me/971568512508"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-white/30 hover:border-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
              >
                Instant WhatsApp Enquiry
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">
            <div className="space-y-10">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-3 border-b pb-2">
                  Solution Architecture
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {solution.summary}
                </p>
              </div>

              {/* Problem Solved */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                  Core Challenge Resolved:
                </span>
                <p className="text-sm font-medium text-amber-950 leading-relaxed">
                  {solution.problemSolved}
                </p>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Implementation Workflow &amp; Execution
                </h2>
                <div className="space-y-4">
                  {solution.howItWorks.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-white font-bold text-xs">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-4 border-b pb-2">
                  Measurable Business Advantages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.keyBenefits.map((ben, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-white shadow-xs">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-1">
                        <Icon name="check" className="w-4 h-4" />
                        <span>Key Metric</span>
                      </div>
                      <p className="text-sm text-gray-800 font-semibold">{ben}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Details */}
            <div className="space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <Image
                  src={solution.imageUrl}
                  alt={solution.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Applicable Polymer Resins:
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {solution.supportedPolymers.map((pol, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-primary/10 text-primary px-3 py-1 text-xs font-semibold"
                    >
                      {pol}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation Box */}
              <div className="p-6 rounded-2xl bg-navy text-white text-center shadow-xl">
                <h3 className="text-lg font-semibold">Speak with an Engineer</h3>
                <p className="mt-2 text-xs text-white/80">
                  Discuss grade equivalence, testing protocols, or volume logistics with our Dubai desk.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 block w-full rounded-md bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-darker transition-colors shadow-sm"
                >
                  Contact Technical Team
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
