"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="contact" className="w-full bg-primary text-white transition-colors duration-300">
      <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* Newsletter Section */}
        <section
          aria-labelledby="newsletter-heading"
          className="mb-12 grid gap-6 border-b border-white/25 pb-12 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Stay connected
            </p>
            <h2
              id="newsletter-heading"
              className="mt-3 text-2xl font-semibold text-white sm:text-3xl"
            >
              Have A Question In Mind?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/90">
              If you have any questions regarding Polymer materials, prime resin pricing, or customized
              grade enquiries, subscribe or drop us a line directly.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="newsletter-name" className="mb-2 block text-sm">
                  Name (optional)
                </label>
                <input
                  id="newsletter-name"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Your Name"
                  className="w-full rounded border border-white/40 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="newsletter-email" className="mb-2 block text-sm">
                  Email address *
                </label>
                <input
                  id="newsletter-email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="name@company.com"
                  className="w-full rounded border border-white/40 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm leading-6">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-white"
              />
              <span>
                I agree to receive National Polymers FZ LLC updates &amp; market reports. Read our{" "}
                <Link href="#contact" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="rounded bg-white px-6 py-3 text-sm font-semibold text-primary-darker transition-colors hover:bg-gray-100 cursor-pointer shadow-md"
            >
              {subscribed ? "Subscribed Successfully!" : "Enquiry & Subscribe"}
            </button>
          </form>
        </section>

        {/* Main Footer Links & Company Info */}
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.35fr_2fr]">
          {/* Company Info Left */}
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-block bg-white p-2 rounded shadow-sm"
              aria-label="National Polymers FZ LLC home"
            >
              <div className="relative h-12 w-44">
                <Image
                  src="/images/logo.png"
                  alt="National Polymers FZ LLC"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mt-5 text-sm leading-7 text-white/85">
              <strong>NATIONAL POLYMERS LLC FZ</strong> is a premier global distribution &amp;
              trading company involved in prime, near prime, off-grade resins, recycled granules,
              regrinds and waste materials.
            </p>

            {/* Official Contact Info from National Polymers */}
            <div className="mt-6 space-y-2 text-sm text-white/90">
              <p className="font-semibold text-white">RAG Global Business Hub LLC</p>
              <p>Office No 102-10, Shaikha Mhara Building, Al Qusais 2, Dubai, U.A.E.</p>
              <div className="pt-2 flex flex-col gap-1">
                <p>
                  <strong>Tel:</strong>{" "}
                  <a href="tel:+97142217745" className="hover:underline">
                    +971 4 2217745
                  </a>{" "}
                  /{" "}
                  <a href="tel:+97142992464" className="hover:underline">
                    +971 4 2992464
                  </a>
                </p>
                <p>
                  <strong>Mobile / WhatsApp:</strong>{" "}
                  <a href="tel:+971505595745" className="hover:underline">
                    +971 50 5595745
                  </a>{" "}
                  /{" "}
                  <a href="https://wa.me/971568512508" className="hover:underline">
                    +971 56 8512508
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@nationalpolymersfz.com"
                    className="hover:underline"
                  >
                    info@nationalpolymersfz.com
                  </a>
                </p>
              </div>
            </div>

            {/* Social & Contact Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers on LinkedIn"
                className="grid h-11 w-11 place-items-center border border-white/40 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="linkedin" className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers on Facebook"
                className="grid h-11 w-11 place-items-center border border-white/40 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="facebook" className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/971568512508"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers WhatsApp"
                className="grid h-11 w-11 place-items-center border border-white/40 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="mail" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 4 Navigation Columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
          >
            {/* Column 1: Quick Links */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Quick Links
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="#home" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-white/70 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="text-white/70 hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="text-white/70 hover:text-white transition-colors">
                    Standards
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="text-white/70 hover:text-white transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resins & Polymers */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Products
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    HDPE &amp; LDPE Resins
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    LLDPE Film Grades
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    PP &amp; PPCP Resins
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    PVC Suspension &amp; Paste
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    PET Resins &amp; Preforms
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    Prime EVA &amp; Off-Grade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Secondary & Recycled */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Recycling &amp; Scrap
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    Recycled Granules
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    HDPE &amp; PVC Regrinds
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    Plastic Scraps &amp; Lumps
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    LDPE Film Bales
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    BOPP Rolls &amp; Waste
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="text-white/70 hover:text-white transition-colors">
                    Floor Sweeping Resins
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Global Sourcing */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Global Trade
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  <span className="text-white/70 block">Sourcing: USA &amp; Canada</span>
                </li>
                <li>
                  <span className="text-white/70 block">Sourcing: Australia</span>
                </li>
                <li>
                  <span className="text-white/70 block">Sourcing: Far East Hubs</span>
                </li>
                <li>
                  <span className="text-white/70 block">Export: Indian Sub-Continent</span>
                </li>
                <li>
                  <span className="text-white/70 block">Export: Africa &amp; Europe</span>
                </li>
                <li>
                  <span className="text-white/70 block">Export: Latin America</span>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col gap-5 pt-8 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 National Polymers FZ LLC. All rights reserved.</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  Terms of Trade
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Dubai Head Office
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 grid h-12 w-12 place-items-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all hover:bg-primary hover:text-white cursor-pointer"
          aria-label="Back to top"
        >
          <Icon name="arrow-up" className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};
