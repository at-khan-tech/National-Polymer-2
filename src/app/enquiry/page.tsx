"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";
import type { ProductDetail } from "@/data/productsData";

const COMMON_PORTS = [
  "Jebel Ali Port (Dubai, UAE)",
  "Nhava Sheva / JNPT (Mumbai, India)",
  "Mundra Port (Gujarat, India)",
  "Chittagong Port (Bangladesh)",
  "Port Qasim / Karachi (Pakistan)",
  "Durban Port (South Africa)",
  "Mombasa Port (Kenya)",
  "Santos Port (Brazil)",
  "Port of Antwerp (Belgium)",
  "Alexandria Port (Egypt)",
  "Istanbul / Mersin Port (Turkey)",
  "Houston Port (USA)",
  "Callao Port (Peru)",
  "Lagos Port (Nigeria)",
];

const QUANTITY_PRESETS = [
  "25 MT (1 FCL Container)",
  "50 MT (2 FCL Containers)",
  "100 MT",
  "250 MT",
  "500+ MT (Annual Contract)",
];

function EnquiryFormContent() {
  const searchParams = useSearchParams();
  const urlProduct = searchParams?.get("product") || "";
  const urlGrade = searchParams?.get("grade") || "";
  const urlBrand = searchParams?.get("brand") || "";
  const urlOrigin = searchParams?.get("origin") || "";
  const urlSub = searchParams?.get("sub") || "";

  const [step, setStep] = useState<1 | 2 | 3>(urlGrade ? 3 : 1);
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>(urlProduct || "pp");
  const [selectedGrade, setSelectedGrade] = useState<string>(urlGrade || "");
  const [selectedBrand, setSelectedBrand] = useState<string>(urlBrand || "");
  const [selectedPacking, setSelectedPacking] = useState<string>("25 kg Bags on Pallets");
  const [volumeMT, setVolumeMT] = useState<string>("25 MT (1 FCL Container)");
  const [customMT, setCustomMT] = useState<string>("");

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        const result = (await response.json()) as {
          products?: ProductDetail[];
          message?: string;
        };
        if (!response.ok || !Array.isArray(result.products)) {
          throw new Error(result.message || "Unable to load products.");
        }
        const loadedProducts = result.products;
        if (active) {
          setProducts(loadedProducts);

          // If product slug provided via URL, pick that, otherwise pick first
          if (urlProduct) {
            const matched = loadedProducts.find(
              (p) =>
                p.slug.toLowerCase() === urlProduct.toLowerCase() ||
                urlProduct.toLowerCase().includes(p.slug.toLowerCase())
            );
            if (matched) {
              setSelectedProduct(matched.slug);
            }
          }
        }
      } catch (error) {
        if (active) {
          setProductsError(
            error instanceof Error ? error.message : "Unable to load products."
          );
        }
      } finally {
        if (active) {
          setProductsLoading(false);
        }
      }
    }

    void loadProducts();
    return () => {
      active = false;
    };
  }, [urlProduct]);

  // If grade provided in URL, pre-fill and jump directly to Step 3
  useEffect(() => {
    if (urlGrade) {
      setSelectedGrade(urlGrade);
      setStep(3);
    }
    if (urlBrand) {
      setSelectedBrand(urlBrand);
    }
  }, [urlGrade, urlBrand]);

  const currentProductData = products.find(
    (product) => product.slug.toLowerCase() === selectedProduct.toLowerCase()
  ) || products[0];

  const handleProductSelect = (slug: string) => {
    setSelectedProduct(slug);
    setSelectedGrade("");
    setSelectedBrand("");
    setStep(2);
  };

  const handleGradeSelect = (gradeName: string) => {
    setSelectedGrade(gradeName);
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const finalVolume = customMT.trim() ? `${customMT.trim()} MT` : volumeMT;

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productSlug: currentProductData?.slug || selectedProduct,
          grade: selectedGrade || "Standard Grade",
          brand: selectedBrand || undefined,
          volume: finalVolume,
          packaging: selectedPacking,
        }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your enquiry.");
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit your enquiry."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Resin RFQ &amp; Enquiry Form</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
            Request a Polymer Price Quote
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Submit your material requirements to receive direct factory container rates, shipping lead times, and Certificate of Analysis (COA) from our Dubai commercial trading desk.
          </p>
        </div>

        {/* ─── PRE-FILLED GRADE HIGHLIGHT BANNER ─── */}
        {selectedGrade && (
          <div className="mb-8 bg-gradient-to-r from-primary-soft via-white to-primary-soft p-5 sm:p-6 rounded-2xl border-2 border-primary/30 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-xs">
                <Icon name="verified" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                  Inquiry Target Grade
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span>{selectedBrand ? `${selectedBrand} ` : ""}{selectedGrade}</span>
                  {urlSub && <span className="text-xs font-normal text-gray-500">({urlSub})</span>}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Category: <strong>{currentProductData?.name || selectedProduct.toUpperCase()}</strong>
                  {urlOrigin && <span> · Origin: <strong>{urlOrigin}</strong></span>}
                  <span> · Status: <span className="text-emerald-700 font-semibold">Available on request</span></span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedGrade("");
                setSelectedBrand("");
                setStep(1);
              }}
              className="text-xs font-semibold text-primary hover:underline self-start sm:self-center"
            >
              Choose different grade &rarr;
            </button>
          </div>
        )}

        {productsLoading && (
          <p role="status" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
            Loading products catalog...
          </p>
        )}
        {productsError && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {productsError}
          </p>
        )}

        {/* Stepper Bar */}
        {!productsLoading && !productsError && (
          <div className="mb-10 bg-white p-4 sm:p-6 rounded-xl shadow-xs border border-gray-200">
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
                <span className="hidden sm:inline text-xs sm:text-sm">Submit RFQ</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: SELECT PRODUCT */}
        {step === 1 && !productsLoading && products.length > 0 && (
          <section aria-labelledby="step1-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-xs border border-gray-200 animate-news-fade">
            <h2 id="step1-heading" className="text-xl sm:text-2xl font-normal text-gray-900 mb-1">
              Step 1: Choose Polymer Resin Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-8">
              Select the base polymer material you require for your production line:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
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
        {step === 2 && currentProductData && (
          <section aria-labelledby="step2-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-xs border border-gray-200 animate-news-fade">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Selected Category: {currentProductData.name}
                </span>
                <h2 id="step2-heading" className="text-xl sm:text-2xl font-normal text-gray-900 mt-0.5">
                  Step 2: Choose Specific Resin Grade &amp; Specification
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-gray-500 hover:text-primary flex items-center gap-1 cursor-pointer"
              >
                &larr; Change Product
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Select your processing grade or choose &quot;Other / Custom Specification&quot; below:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentProductData.subTypes?.map((sub, idx) => (
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
                onClick={() => handleGradeSelect("Custom / Alternative Grade / Specific TDS")}
                className="p-5 rounded-xl border border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-white text-left transition-all cursor-pointer flex flex-col justify-center"
              >
                <h3 className="text-base font-semibold text-gray-900">
                  Custom / Alternative Grade
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Looking for near-prime, off-grade, or an exact manufacturer match? Specify in next step.
                </p>
              </button>
            </div>
          </section>
        )}

        {/* STEP 3: COMMERCIAL & SHIPPING DETAILS */}
        {step === 3 && (
          <section aria-labelledby="step3-heading" className="bg-white p-6 sm:p-10 rounded-2xl shadow-xs border border-gray-200 animate-news-fade">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Icon name="check" className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                  Thank you. Our Dubai commercial trading desk will prepare your CIF container quote for{" "}
                  <strong>
                    {selectedBrand ? `${selectedBrand} ` : ""}
                    {selectedGrade || "Standard Grade"}
                  </strong>{" "}
                  within 4 business hours.
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
                      Product: <strong>{currentProductData?.name || selectedProduct.toUpperCase()}</strong> | Grade:{" "}
                      <strong>
                        {selectedBrand ? `${selectedBrand} ` : ""}
                        {selectedGrade || "General Grade"}
                      </strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-gray-500 hover:text-primary cursor-pointer"
                  >
                    &larr; Back to Grades
                  </button>
                </div>

                {/* ─── ORDER VOLUME (MT) & PACKAGING PREFERENCE ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl bg-gray-50/80 border border-gray-200">
                  {/* Quantity (MT) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Required Quantity (Metric Tons / MT) *
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      {QUANTITY_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setVolumeMT(preset);
                            setCustomMT("");
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            volumeMT === preset && !customMT
                              ? "bg-primary text-white shadow-xs"
                              : "bg-white text-gray-700 border border-gray-300 hover:border-primary"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Or custom:</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 75"
                        value={customMT}
                        onChange={(e) => {
                          setCustomMT(e.target.value);
                          if (e.target.value) {
                            setVolumeMT(`${e.target.value} MT`);
                          }
                        }}
                        className="w-28 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:border-primary focus:outline-none"
                      />
                      <span className="text-xs text-gray-500 font-medium">Metric Tons (MT)</span>
                    </div>
                  </div>

                  {/* Packaging */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Export Packaging Preference:
                    </label>
                    <select
                      value={selectedPacking}
                      onChange={(e) => setSelectedPacking(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="25 kg Bags on Pallets (Standard)">25 kg Bags on Pallets (Standard)</option>
                      <option value="1000 kg Jumbo Bags (FIBC)">1000 kg Jumbo Bags (FIBC)</option>
                      <option value="25 kg Unpalletized Loose in Container">25 kg Loose in Container</option>
                      <option value="Bulk Sea Container Liners">Bulk Sea Container Liners</option>
                    </select>
                    <p className="text-[11px] text-gray-500 mt-2">
                      All shipments export with shrink-wrap, UV-resistant PE liners, and fumigated wooden/plastic pallets.
                    </p>
                  </div>
                </div>

                {/* ─── DESTINATION PORT & COUNTRY ─── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Destination Discharge Port (for CIF calculation) *
                    </label>
                    <input
                      type="text"
                      list="destination-ports-list"
                      required
                      placeholder="e.g. Jebel Ali, Nhava Sheva, Mundra, Chittagong"
                      value={formData.destinationPort}
                      onChange={(e) =>
                        setFormData({ ...formData, destinationPort: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                    <datalist id="destination-ports-list">
                      {COMMON_PORTS.map((p) => (
                        <option key={p} value={p} />
                      ))}
                    </datalist>
                    <span className="text-[10.5px] text-gray-400 mt-1 block">
                      Type your port name or select from international trade hubs
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Destination Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. India, United Arab Emirates, Egypt, Kenya"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* ─── CONTACT DETAILS ─── */}
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
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
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
                      placeholder="Apex Plastics Manufacturing Ltd"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp (with country code) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 1234567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Target Price / Technical Notes / Payment Terms (Optional):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify target CIF price, preferred payment terms (LC at sight, TT), or technical TDS constraints."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
                  >
                    &larr; Previous Step
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-darker disabled:cursor-not-allowed disabled:opacity-60 text-white px-8 py-3.5 font-semibold text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit RFQ & Get Price Quote"}</span>
                    <Icon name="arrow-forward" className="w-4 h-4" />
                  </button>
                </div>
                {submitError && (
                  <p role="alert" className="text-sm text-red-700">
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default function EnquiryPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="min-h-screen bg-gray-50 pt-32 pb-20 text-center">
            <p className="text-sm text-gray-500">Loading enquiry form...</p>
          </main>
        }
      >
        <EnquiryFormContent />
      </Suspense>
      <Footer />
    </>
  );
}
