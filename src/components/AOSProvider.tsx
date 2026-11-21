"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const AOSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Cleanup previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const animateElement = (el: HTMLElement) => {
      if (el.classList.contains("aos-animate")) return;

      const delay = el.getAttribute("data-aos-delay");
      if (delay) {
        el.style.transitionDelay = `${delay}ms`;
      }
      const duration = el.getAttribute("data-aos-duration");
      if (duration) {
        el.style.transitionDuration = `${duration}ms`;
      }
      el.classList.add("aos-animate");
    };

    // 2. Setup robust IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            animateElement(el);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
    );
    observerRef.current = observer;

    // 3. Scan & attach observer to all [data-aos] elements
    const scanAndObserve = () => {
      const elements = document.querySelectorAll<HTMLElement>("[data-aos]");
      const winH = typeof window !== "undefined" ? window.innerHeight : 800;

      elements.forEach((el) => {
        if (el.classList.contains("aos-animate")) return;

        // If element is already in or near viewport, make it visible immediately!
        // This completely eliminates blank screen / invisible content on route change!
        const rect = el.getBoundingClientRect();
        if (rect.top < winH + 80 && rect.bottom > -80) {
          animateElement(el);
        } else {
          observer.observe(el);
        }
      });
    };

    // Immediate initial scan
    scanAndObserve();

    // Secondary scan on next animation frame (covers client-component hydration & route transitions)
    const rafId = requestAnimationFrame(() => {
      scanAndObserve();
    });

    // 4. MutationObserver to catch dynamically rendered / streamed DOM elements
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    if (typeof document !== "undefined" && document.body) {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // 5. Ultimate safety net: ensure nothing remains hidden permanently
    const safetyTimer = setTimeout(() => {
      const winH = typeof window !== "undefined" ? window.innerHeight : 800;
      document
        .querySelectorAll<HTMLElement>("[data-aos]:not(.aos-animate)")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < winH * 1.5) {
            animateElement(el);
          }
        });
    }, 400);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
};
