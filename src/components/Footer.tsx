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


        {/* Main Footer Links & Company Info */}
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[1.35fr_2fr]">
          {/* Company Info Left */}
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-block"
              aria-label="National Polymers FZ LLC home"
            >
              <div className="relative h-14 w-52">
                <Image
                  src="/images/logo_footer.png"
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
            {/* Column 1: Company */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                About Us
              </h2>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/about#about-detail" className="text-white/70 hover:text-white transition-colors">
                    Company in Detail
                  </Link>
                </li>
                <li>
                  <Link href="/about#vision-mission" className="text-white/70 hover:text-white transition-colors">
                    Vision &amp; Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about#why-choose-us" className="text-white/70 hover:text-white transition-colors">
                    Why Choose Us
                  </Link>
                </li>
                <li>
                  <Link href="/about#global-network" className="text-white/70 hover:text-white transition-colors">
                    Global Supply Network
                  </Link>
                </li>
                <li>
                  <Link href="/about#suppliers-partners" className="text-white/70 hover:text-white transition-colors">
                    Suppliers &amp; Partners
                  </Link>
                </li>
                <li>
                  <Link href="/about#quality-compliance" className="text-white/70 hover:text-white transition-colors">
                    Quality &amp; Compliance
                  </Link>
                </li>
                <li>
                  <Link href="/about#sustainability" className="text-white/70 hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="text-white/70 hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Products */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Products
              </h2>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/products/pp" className="text-white/70 hover:text-white transition-colors">
                    PP (Polypropylene)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pe" className="text-white/70 hover:text-white transition-colors">
                    PE (HDPE / LDPE / LLDPE)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pvc" className="text-white/70 hover:text-white transition-colors">
                    PVC (Polyvinyl Chloride)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pet" className="text-white/70 hover:text-white transition-colors">
                    PET Resins
                  </Link>
                </li>
                <li>
                  <Link href="/products/ps" className="text-white/70 hover:text-white transition-colors">
                    PS (GPPS &amp; HIPS)
                  </Link>
                </li>
                <li>
                  <Link href="/products/engineering-plastics" className="text-white/70 hover:text-white transition-colors">
                    Engineering Plastics
                  </Link>
                </li>
                <li>
                  <Link href="/products/masterbatch-additives" className="text-white/70 hover:text-white transition-colors">
                    Masterbatch / Additives
                  </Link>
                </li>
                <li>
                  <Link href="/products/recycled" className="text-white/70 hover:text-white transition-colors">
                    Recycled Granules
                  </Link>
                </li>
                <li>
                  <Link href="/products/near-prime" className="text-white/70 hover:text-white transition-colors">
                    Near Prime Resins
                  </Link>
                </li>
                <li>
                  <Link href="/products/off-grade" className="text-white/70 hover:text-white transition-colors">
                    Off Grade / Off Spec
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions & Applications */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Solutions
              </h2>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/solutions/prime-supply" className="text-white/70 hover:text-white transition-colors">
                    Prime Supply Programs
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/alternative-materials" className="text-white/70 hover:text-white transition-colors">
                    Alternative Materials
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/recycled-materials" className="text-white/70 hover:text-white transition-colors">
                    Recycled Materials
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/grade-matching" className="text-white/70 hover:text-white transition-colors">
                    Grade Matching
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/global-sourcing" className="text-white/70 hover:text-white transition-colors">
                    Global Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/supply-chain-solutions" className="text-white/70 hover:text-white transition-colors">
                    Supply Chain Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="text-white font-semibold hover:underline block pt-2">
                    View All 7 Applications &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Markets & Inquiries */}
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Markets &amp; Desk
              </h2>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm">
                <li>
                  <Link href="/markets#middle-east" className="text-white/70 hover:text-white transition-colors">
                    Middle East &amp; GCC
                  </Link>
                </li>
                <li>
                  <Link href="/markets#indian-subcontinent" className="text-white/70 hover:text-white transition-colors">
                    Indian Subcontinent
                  </Link>
                </li>
                <li>
                  <Link href="/markets#africa" className="text-white/70 hover:text-white transition-colors">
                    Africa
                  </Link>
                </li>
                <li>
                  <Link href="/markets#europe" className="text-white/70 hover:text-white transition-colors">
                    Europe
                  </Link>
                </li>
                <li>
                  <Link href="/markets#latin-america" className="text-white/70 hover:text-white transition-colors">
                    Latin America
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white/70 hover:text-white transition-colors">
                    Industry Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                    Contact Form &amp; Map
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/enquiry"
                    className="inline-block rounded bg-white text-primary px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gray-100"
                  >
                    Enquiry Form RFQ
                  </Link>
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
