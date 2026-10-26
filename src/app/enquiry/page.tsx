"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import { PRODUCTS_DATA } from "@/data/productsData";

export default function EnquiryPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProduct, setSelectedProduct] = useState<string>("pp");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedPacking, setSelectedPacking] = useState<string>("25 kg Bags");
  const [volumeMT, setVolumeMT] = useState<string>("50 MT");

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    destinationPort: "",
    country: "United Arab Emirates",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const currentProductData = PRODUCTS_DATA.find((p) => p.slug === selectedProduct) || PRODUCTS_DATA[0];

  const handleProductSelect = (slug: string) => {
    setSelectedProduct(slug);
    setSelectedGrade("");
    setStep(2);
  };

  const handleGradeSelect = (gradeName: string) => {
    setSelectedGrade(gradeName);
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
          {/* Breadcrumb & Title */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <span className="text-primary font-semibold">Resin RFQ &amp; Enquiry Form</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
              Request a Polymer Price Quote
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Complete the 3-step inquiry process to receive direct factory pricing, freight estimates, and Certificate of Analysis (COA) from our Dubai trading desk.
            </p>
          </div>

          {/* Stepper Bar */}
          <div className="mb-10 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div
                onClick={() => setStep(1)}
                className={`flex items-center gap-3 cursor-pointer ${
                  step === 1 ? "text-primary font-bold" : "text-gray-500"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                    step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </span>
                <span className="hidden sm:inline text-xs sm:text-sm">Select Product</span>
              </div>
              <div className="h-0.5 flex-1 bg-gray-200 mx-3 sm:mx-6" />

              {/* Step 2 */}
              <div
                onClick={() => selectedProduct && setStep(2)}
                className={`flex items-center gap-3 cursor-pointer ${
                  step === 2 ? "text-primary font-bold" : "text-gray-500"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                    step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </span>
                <span className="hidden sm:inline text-xs sm:text-sm">Select Grade</span>
              </div>
              <div className="h-0.5 flex-1 bg-gray-200 mx-3 sm:mx-6" />

              {/* Step 3 */}
              <div
                className={`flex items-center gap-3 ${
                  step === 3 ? "text-primary font-bold" : "text-gray-500"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                    step === 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </span>
                <span className="hidden sm:inline text-xs sm:text-sm">Submit Form</span>
              </div>
            </div>
          </div>

          {/* STEP 1: SELECT PRODUCT */}
          {step === 1 && (
            <section aria-labelledby="step1-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 animate-news-fade">
              <h2 id="step1-heading" className="text-xl sm:text-2xl font-normal text-gray-900 mb-1">
                Step 1: Choose Polymer Resin Category
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-8">
                Select the base polymer material you require for your production line:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTS_DATA.map((product) => (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => handleProductSelect(product.slug)}
                    className={`p-5 rounded-xl border text-left transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                      selectedProduct === product.slug
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-primary/50 bg-white"
                    }`}
                  >
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {product.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                      <span>View Grades</span>
                      <Icon name="arrow-forward" className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* STEP 2: SELECT GRADE */}
          {step === 2 && (
            <section aria-labelledby="step2-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 animate-news-fade">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Selected Product: {currentProductData.name}
                  </span>
                  <h2 id="step2-heading" className="text-xl sm:text-2xl font-normal text-gray-900 mt-0.5">
                    Step 2: Choose Specific Resin Grade &amp; Specification
                  </h2>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-gray-500 hover:text-primary flex items-center gap-1"
                >
                  &larr; Change Product
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Select your processing grade or choose &quot;Other / Custom Specification&quot; below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentProductData.subTypes.map((sub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleGradeSelect(sub.name)}
                    className={`p-5 rounded-xl border text-left transition-all hover:border-primary hover:shadow-md cursor-pointer ${
                      selectedGrade === sub.name
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <h3 className="text-base font-semibold text-gray-900">
                      {sub.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 font-mono">
                      <span>MFI: <strong className="text-gray-900">{sub.mfi}</strong></span>
                      <span>Density: <strong className="text-gray-900">{sub.density}</strong></span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      <strong>Best for:</strong> {sub.useCase}
                    </p>
                    <div className="mt-3 flex items-center justify-end text-xs font-semibold text-primary">
                      <span>Select this grade &rarr;</span>
                    </div>
                  </button>
                ))}

                {/* Option for custom grade */}
                <button
                  type="button"
                  onClick={() => handleGradeSelect("Custom / Near-Prime / Specific TDS")}
                  className="p-5 rounded-xl border border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-white text-left transition-all cursor-pointer flex flex-col justify-center"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    Custom / Alternative Grade
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Looking for off-grade, near-prime, or a custom TDS match? Specify in next step.
                  </p>
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: CONTACT FORM & SUBMISSION */}
          {step === 3 && (
            <section aria-labelledby="step3-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 animate-news-fade">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <Icon name="check" className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Enquiry Submitted Successfully!
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                    Thank you. Our Dubai commercial trading desk will prepare your CIF quote for <strong>{currentProductData.name} ({selectedGrade || "Standard Grade"})</strong> within 4 business hours.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                      href="/"
                      className="rounded-lg bg-gray-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-black"
                    >
                      Return to Homepage
                    </Link>
                    <a
                      href="https://wa.me/971568512508?text=Hello%2C%20I%20just%20submitted%20an%20enquiry%20for%20resins"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[#25D366] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#20bd5a]"
                    >
                      Chat on WhatsApp Now
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h2 id="step3-heading" className="text-xl sm:text-2xl font-normal text-gray-900">
                        Step 3: Commercial &amp; Shipping Details
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Product: <strong>{currentProductData.name}</strong> | Grade: <strong>{selectedGrade || "General Grade"}</strong>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-semibold text-gray-500 hover:text-primary"
                    >
                      &larr; Back to Grades
                    </button>
                  </div>

                  {/* Volume & Packaging */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Estimated Order Volume (MT):
                      </label>
                      <select
                        value={volumeMT}
                        onChange={(e) => setVolumeMT(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      >
                        <option value="Trial (1 Container / ~26 MT)">Trial (1 Container / ~26 MT)</option>
                        <option value="50 MT – 100 MT">50 MT – 100 MT</option>
                        <option value="100 MT – 250 MT">100 MT – 250 MT</option>
                        <option value="Annual Contract (500+ MT)">Annual Contract (500+ MT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Packaging Preference:
                      </label>
                      <select
                        value={selectedPacking}
                        onChange={(e) => setSelectedPacking(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      >
                        <option value="25 kg Bags on Pallets">25 kg Bags on Pallets</option>
                        <option value="1000 kg Jumbo Bags">1000 kg Jumbo Bags (FIBC)</option>
                        <option value="Bulk Container Liners">Bulk Container Liners</option>
                      </select>
                    </div>
                  </div>

                  {/* Personal & Company Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Apex Plastics Manufacturing"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Destination Port (for CIF calculation) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jebel Ali, Nhava Sheva, Durban, Houston"
                        value={formData.destinationPort}
                        onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Destination Country
                      </label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Target Price / Technical Notes (Optional):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify target CIF price, payment terms (LC/TT), or attach required TDS specs."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                    >
                      &larr; Previous Step
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-darker text-white px-8 py-3.5 font-semibold text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <span>Submit RFQ &amp; Get Price Quote</span>
                      <Icon name="arrow-forward" className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
