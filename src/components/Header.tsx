"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed w-full z-40 top-0">
        <nav
          className={`relative flex items-center w-full h-16 md:h-20 transition-all duration-300 ${
            scrolled
              ? "bg-black/90 backdrop-blur-md shadow-md text-white"
              : "bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white"
          }`}
        >
          <div className="flex flex-row justify-start items-center w-full md:gap-4 h-full text-xs">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden justify-center items-center aspect-square w-14 h-14 md:w-20 md:h-20 text-white order-5 md:order-1 transition-colors hover:bg-primary-darker focus:bg-primary-darker bg-primary flex cursor-pointer"
              aria-label="Toggle navigation"
            >
              <Icon
                name={mobileMenuOpen ? "close" : "menu"}
                className="w-6 h-6 text-white"
              />
            </button>

            {/* Brand Logo - National Polymers FZ LLC */}
            <div className="flex-grow md:order-2 mx-4 md:mx-8">
              <Link
                href="/"
                className="focus-primary inline-flex items-center gap-3"
                title="National Polymers FZ LLC"
              >
                <div className="relative h-11 md:h-14 w-36 md:w-48 bg-white/95 rounded-sm p-1.5 shadow-sm flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="National Polymers FZ LLC Logo"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Skip link */}
            <div className="md:mx-8 md:order-3">
              <a
                href="#stage"
                className="focus-primary inline-block overflow-hidden relative -top-40 focus:top-0 text-white text-[11px] font-medium"
              >
                SKIP NAVIGATION
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden xl:flex items-center h-full uppercase md:order-4 text-xs font-medium tracking-wide">
              <li className="mx-3.5 hover:text-primary-lighter transition-colors">
                <Link href="#home">Home</Link>
              </li>

              {/* About Us Dropdown */}
              <li className="relative group h-full flex items-center mx-3.5">
                <Link
                  href="#about"
                  className="flex items-center gap-1 h-full hover:text-primary-lighter transition-colors"
                >
                  About Us
                  <Icon name="chevron-down" className="w-4 h-4" />
                </Link>
                <div className="hidden group-hover:flex absolute left-0 top-full pt-1 z-50">
                  <div className="bg-white text-black shadow-xl border-t-2 border-primary flex-col flex py-2 min-w-[210px]">
                    <Link
                      href="#about"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Who We Are
                    </Link>
                    <Link
                      href="#team"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Our Team
                    </Link>
                    <Link
                      href="#standards"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Polymer Standards
                    </Link>
                    <Link
                      href="#suppliers"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Our Suppliers
                    </Link>
                  </div>
                </div>
              </li>

              {/* Products Dropdown */}
              <li className="relative group h-full flex items-center mx-3.5">
                <Link
                  href="#products"
                  className="flex items-center gap-1 h-full hover:text-primary-lighter transition-colors"
                >
                  Products
                  <Icon name="chevron-down" className="w-4 h-4" />
                </Link>
                <div className="hidden group-hover:flex absolute left-0 top-full pt-1 z-50">
                  <div className="bg-white text-black shadow-xl border-t-2 border-primary flex-col flex py-2 min-w-[250px]">
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Prime, Near Prime &amp; Off Grade
                    </Link>
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Plastic Scraps &amp; Lumps
                    </Link>
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Recycled Granules &amp; Regrinds
                    </Link>
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Polyethylene (PE-HD / PE-LD)
                    </Link>
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      Polypropylene (PP &amp; PPCP)
                    </Link>
                    <Link
                      href="#products"
                      className="px-4 py-2 hover:bg-gray-50 hover:text-primary whitespace-nowrap block text-xs"
                    >
                      PVC &amp; PET Polymers
                    </Link>
                  </div>
                </div>
              </li>

              <li className="mx-3.5 hover:text-primary-lighter transition-colors">
                <Link href="#material-finder">Material Finder</Link>
              </li>

              <li className="mx-3.5 hover:text-primary-lighter transition-colors">
                <Link href="#gallery">Gallery</Link>
              </li>

              <li className="mx-3.5 hover:text-primary-lighter transition-colors">
                <Link href="#latest-news-title">Updates</Link>
              </li>

              {/* Contact Us */}
              <li className="mx-3.5 mr-8 hover:text-primary-lighter transition-colors">
                <Link href="#contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile Slide-Out Drawer Navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <nav
          className={`fixed left-0 top-0 w-full sm:w-2/3 md:w-1/2 xl:w-1/3 h-screen bg-white text-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full pt-16 md:pt-20 px-6 pb-10 flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div className="relative h-12 w-40">
                <Image
                  src="/images/logo.png"
                  alt="National Polymers FZ LLC"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-primary cursor-pointer"
                aria-label="Close menu"
              >
                <Icon name="close" className="w-6 h-6" />
              </button>
            </div>

            <ul className="text-sm font-medium w-full mt-4 space-y-3">
              <li>
                <Link
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  Products &amp; Polymers
                </Link>
              </li>
              <li>
                <Link
                  href="#material-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  Material Finder
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                NATIONAL POLYMERS LLC FZ · Dubai, U.A.E.
              </p>
              <a
                href="#material-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center bg-primary text-white py-2.5 rounded font-semibold text-xs tracking-wider uppercase mb-2 hover:bg-primary-darker transition-colors"
              >
                Find a Material
              </a>
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center border border-primary text-primary py-2.5 rounded font-semibold text-xs tracking-wider uppercase hover:bg-primary hover:text-white transition-colors"
              >
                Enquiry Now
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
