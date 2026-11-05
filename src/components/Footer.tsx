"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="w-full bg-primary text-white transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 pb-24 md:pb-14">
        {/* Main Footer Links & Company Info */}
        <div className="grid gap-8 lg:gap-10 border-b border-white/15 pb-8 lg:grid-cols-[1.25fr_2fr]">
          {/* Company Info Left */}
          <div className="max-w-md no-justify text-left">
            <Link
              href="/"
              className="inline-block"
              aria-label="National Polymers FZ LLC home"
            >
              <div className="relative h-10 w-44 sm:h-12 sm:w-48">
                <Image
                  src="/images/logo_footer.png"
                  alt="National Polymers FZ LLC"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-white/90">
              <strong>NATIONAL POLYMERS LLC FZ</strong> is a premier global distribution &amp; trading company connecting petrochemical producers with plastic manufacturers worldwide.
            </p>

            {/* Compact Official Contact Info */}
            <div className="mt-4 space-y-1.5 text-xs sm:text-sm text-white/90">
              <p className="flex items-start gap-2">
                <span className="font-semibold text-white shrink-0">Office:</span>
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
                className="grid h-9 w-9 place-items-center rounded-md border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary active:scale-95"
              >
                <Icon name="linkedin" className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers on Facebook"
                className="grid h-9 w-9 place-items-center rounded-md border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary active:scale-95"
              >
                <Icon name="facebook" className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971568512508"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="National Polymers WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-md border border-white/30 text-white transition-all hover:border-white hover:bg-white hover:text-primary active:scale-95"
              >
                <Icon name="mail" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 Focused Navigation Columns */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 no-justify text-left"
          >
            {/* Column 1: About */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                About Us
              </h2>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link href="/about#vision-mission" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Vision &amp; Mission
                  </Link>
                </li>
                <li>
                  <Link href="/about#global-network" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Global Network
                  </Link>
                </li>
                <li>
                  <Link href="/about#quality-compliance" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Quality &amp; Standards
                  </Link>
                </li>
                <li>
                  <Link href="/about#sustainability" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Core Products */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Products
              </h2>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/products/pp" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Polypropylene (PP)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pe" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Polyethylene (PE)
                  </Link>
                </li>
                <li>
                  <Link href="/products/pvc" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    PVC &amp; PET Resins
                  </Link>
                </li>
                <li>
                  <Link href="/products/engineering-plastics" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Engineering Plastics
                  </Link>
                </li>
                <li>
                  <Link href="/products/recycled" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Recycled Granules
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Solutions
              </h2>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/solutions/prime-supply" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Prime Supply
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/alternative-materials" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Alternative Materials
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/recycled-materials" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Recycled Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/global-sourcing" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Global Sourcing
                  </Link>
                </li>
                <li>
                  <Link href="/applications" className="text-white font-medium hover:underline inline-flex items-center gap-1 py-0.5">
                    Applications &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Links & RFQ */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Quick Links
              </h2>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/markets" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Global Markets
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Industry Insights
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white transition-colors block py-0.5">
                    Contact &amp; Map
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/enquiry"
                    className="inline-block rounded-md bg-white text-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    Request a Quote
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/75 md:flex-row md:items-center md:justify-between no-justify">
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
    </footer>
  );
};
