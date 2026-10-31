"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  return (
    <footer id="contact" className="w-full bg-primary text-white transition-colors duration-300">
      <div className="container mx-auto px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        {/* Main Footer Links & Company Info */}
        <div className="grid gap-8 lg:gap-10 border-b border-white/15 pb-8 lg:grid-cols-[1.25fr_2fr]">
          {/* Company Info Left */}
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-block"
              aria-label="National Polymers FZ LLC home"
            >
              <div className="relative h-12 w-48">
                <Image
                  src="/images/logo_footer.png"
                  alt="National Polymers FZ LLC"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/85">
              <strong>NATIONAL POLYMERS LLC FZ</strong> is a premier global distribution &amp; trading company connecting petrochemical producers with plastic manufacturers worldwide.
            </p>

            {/* Compact Official Contact Info */}
            <div className="mt-4 space-y-1.5 text-xs sm:text-sm text-white/90">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-white">Office:</span>
                <span>Shaikha Mhara Bldg, Al Qusais 2, Dubai, UAE</span>
              </p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  <strong>Tel:</strong>{" "}
                  <a href="tel:+97142217745" className="hover:underline">
                    +971 4 2217745
                  </a>
                </span>
                <span>
                  <strong>WhatsApp:</strong>{" "}
                  <a href="https://wa.me/971568512508" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    +971 56 8512508
                  </a>
                </span>
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

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers on LinkedIn"
                className="grid h-9 w-9 place-items-center rounded border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="linkedin" className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers on Facebook"
                className="grid h-9 w-9 place-items-center rounded border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="facebook" className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971568512508"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers WhatsApp"
                className="grid h-9 w-9 place-items-center rounded border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                <Icon name="mail" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 Focused Navigation Columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          >
            {/* Column 1: About */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                About Us
              </h2>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-white/75 hover:text-white transition-colors">
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link href="/about#vision-mission" className="text-white/75 hover:text-white transition-colors">
                    Vision &amp; Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about#global-network" className="text-white/75 hover:text-white transition-colors">
                    Global Network
                  </Link>
                </li>
                <li>
                  <Link href="/about#quality-compliance" className="text-white/75 hover:text-white transition-colors">
                    Quality &amp; Standards
                  </Link>
                </li>
                <li>
                  <Link href="/about#sustainability" className="text-white/75 hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Core Products */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                Products
              </h2>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/products/pp" className="text-white/75 hover:text-white transition-colors">
                    Polypropylene (PP)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pe" className="text-white/75 hover:text-white transition-colors">
                    Polyethylene (PE)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pvc" className="text-white/75 hover:text-white transition-colors">
                    PVC &amp; PET Resins
                  </Link>
                </li>
                <li>
                  <Link href="/products/engineering-plastics" className="text-white/75 hover:text-white transition-colors">
                    Engineering Plastics
                  </Link>
                </li>
                <li>
                  <Link href="/products/recycled" className="text-white/75 hover:text-white transition-colors">
                    Recycled Granules
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                Solutions
              </h2>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/solutions/prime-supply" className="text-white/75 hover:text-white transition-colors">
                    Prime Supply
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/alternative-materials" className="text-white/75 hover:text-white transition-colors">
                    Alternative Materials
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/recycled-materials" className="text-white/75 hover:text-white transition-colors">
                    Recycled Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/global-sourcing" className="text-white/75 hover:text-white transition-colors">
                    Global Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="text-white font-medium hover:underline inline-flex items-center gap-1">
                    Applications &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Links & RFQ */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                Quick Links
              </h2>
              <ul className="mt-3.5 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/markets" className="text-white/75 hover:text-white transition-colors">
                    Global Markets
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white/75 hover:text-white transition-colors">
                    Industry Insights
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/75 hover:text-white transition-colors">
                    Contact &amp; Map
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/enquiry"
                    className="inline-block rounded bg-white text-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    Request a Quote
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 National Polymers FZ LLC. All rights reserved.</p>
          <nav aria-label="Legal links">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Terms of Trade
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
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
          className="fixed bottom-6 right-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all hover:bg-primary hover:text-white cursor-pointer"
          aria-label="Back to top"
        >
          <Icon name="arrow-up" className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};
