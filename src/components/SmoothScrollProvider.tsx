"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Icon } from "./Icons";

export const SmoothScrollProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with elite smooth momentum settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Track scroll progress and depth parallax
    lenis.on("scroll", (e: { progress: number; scroll: number }) => {
      const progressPercent = Math.min(Math.max(e.progress * 100, 0), 100);
      setScrollProgress(progressPercent);
      setShowScrollTop(e.scroll > 400);

      // Multi-dimensional parallax speed calculation
      const parallaxElements = document.querySelectorAll<HTMLElement>(
        "[data-parallax-speed]"
      );
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax-speed") || "0.1");
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const offset = (elementCenter - windowCenter) * speed;

        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    });

    // Support smooth anchor navigation (e.g. href="#about", href="#contact")
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.4,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Multi-Dimensional High-Quality Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#E95220] via-[#FF6B00] to-[#0F3B82] scroll-progress-glow transition-all duration-75 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {children}

      {/* 2. Floating Circular Progress & Smooth Back-To-Top Widget */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ease-out ${
          showScrollTop
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-90 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-[#0F3B82] shadow-xl backdrop-blur-md border border-gray-200 transition-transform duration-300 hover:scale-110 active:scale-95"
        >
          {/* Circular SVG Progress Ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90 p-0.5" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e2e8f0"
              strokeWidth="2.5"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#E95220"
              strokeWidth="2.5"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
              strokeLinecap="round"
              fill="none"
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Up Arrow Icon */}
          <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
            <Icon name="arrow-back" className="h-4 w-4 rotate-90 text-[#0F3B82] group-hover:text-[#E95220] transition-colors" />
          </div>
        </button>
      </div>
    </>
  );
};
