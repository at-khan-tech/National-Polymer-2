"use client";

import React, { useEffect } from "react";

export const AOSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Ultra-reliable, zero-dependency scroll animation observer
    const elements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const delay = el.getAttribute("data-aos-delay");
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }
          const duration = el.getAttribute("data-aos-duration");
          if (duration) {
            el.style.transitionDuration = `${duration}ms`;
          }

          if (entry.isIntersecting) {
            el.classList.add("aos-animate");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};
