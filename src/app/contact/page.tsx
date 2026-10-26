"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-20">
        <section className="bg-navy text-white py-14 md:py-20 mb-12">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex items-center gap-2 text-xs text-primary-lighter uppercase tracking-wider mb-2">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white font-semibold">Contact Us</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight">
              Get in Touch with National Polymers
            </h1>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
              Connect directly with our Dubai commercial trading desk for container allocations, technical data sheets, and port delivery schedules.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left: Contact Form */}
            <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-light text-gray-900 mb-2">Send an Official Inquiry</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Fill out the details below and a commercial account manager will reply promptly.
              </p>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                    <Icon name="check" className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Message Received!</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    Thank you, {formData.name}. Our commercial team in Dubai will respond within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ahmed Al Mansoori"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                        placeholder="Polymer Converting Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="purchasing@company.com"
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

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Message / Requirements *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please state polymer grade (HDPE, LDPE, PP, PVC, etc.), required monthly volume, and destination port."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary hover:bg-primary-darker text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-101 cursor-pointer"
                  >
                    Send Message to Trading Desk
                  </button>
                </form>
              )}
            </div>

            {/* Right: Direct Contact & Location Map */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">
                  Head Office Dubai
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <p className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">📍</span>
                    <span>Office No 102-10, Shaikha Mhara Building, Al Qusais 2, Dubai, U.A.E.</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-primary font-bold">📞</span>
                    <span>Tel: +971 4 2217745 / +971 4 2992464</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-primary font-bold">💬</span>
                    <span>WhatsApp: +971 50 5595745 / +971 56 8512508</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <span className="text-primary font-bold">✉️</span>
                    <span>info@nationalpolymersfz.com</span>
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <a
                    href="https://wa.me/971568512508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg bg-[#25D366] text-white py-2.5 text-center text-xs font-bold shadow-sm hover:bg-[#20bd5a]"
                  >
                    WhatsApp Chat
                  </a>
                  <a
                    href="tel:+97142217745"
                    className="flex-1 rounded-lg bg-gray-900 text-white py-2.5 text-center text-xs font-bold hover:bg-black"
                  >
                    Call Office
                  </a>
                </div>
              </div>

              {/* Interactive Location Map Embed */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Location Map: Al Qusais 2, Dubai
                  </h4>
                </div>
                <div className="relative h-64 w-full">
                  <iframe
                    title="National Polymers Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14431.127814798606!2d55.378946!3d25.278912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c531a7c36a7%3A0x8797f1bc650a3070!2sAl%20Qusais%202%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
