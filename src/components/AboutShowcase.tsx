"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

const strengths = [
  { label: "Direct Producer Access", icon: "🔗" },
  { label: "Containerized Logistics", icon: "🚢" },
  { label: "Prime & Off-Grade Supply", icon: "🏭" },
  { label: "21+ Years Experience", icon: "⭐" },
  { label: "Global Trade Network", icon: "🌐" },
  { label: "Quality Guaranteed", icon: "✓" },
];

const supplyTags = [
  { label: "Global Sourcing", color: "var(--color-primary)" },
  { label: "Polymer Grades", color: "var(--color-primary-darker)" },
  { label: "Industrial Markets", color: "var(--color-navy)" },
];

export const AboutShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure video starts playing muted per browser autoplay standards
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, video will play on first user interaction
      });
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section
      id="about"
      aria-label="About National Polymers"
      className="w-full bg-white py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-[1360px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">

          {/* ═════ LEFT: Corporate Video Showcase ═════ */}
          <div
            data-aos="3d-tilt-left"
            data-aos-duration="900"
            className="relative order-1 lg:order-1 flex items-center justify-center"
          >
            {/* Decorations */}
            <div
              className="absolute -bottom-5 -left-5 w-3/4 h-3/4 rounded-3xl bg-[#EEF2FF] -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -right-4 w-1/2 h-1/2 rounded-2xl border-2 border-primary/20 -z-10"
              aria-hidden="true"
            />

            {/* Main Video Showcase Frame — balanced height matching right column */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[490px] xl:h-[510px] w-full bg-slate-950 group">
              <video
                ref={videoRef}
                src="/video/about.mp4"
                poster="/images/experience.png"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Bottom gradient overlay to keep badges and controls legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

              {/* Mute / Unmute Interactive Toggle Button */}
              <div className="absolute bottom-4 left-4 z-20">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                  className="flex items-center gap-2 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md px-3.5 py-2 text-xs font-semibold shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
                >
                  {isMuted ? (
                    <>
                      {/* Muted Speaker Icon */}
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white/90" aria-hidden="true">
                        <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .69.68 1.2 1.33.94.8-.32 1.53-.76 2.18-1.28l1.39 1.39c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
                      </svg>
                      <span className="text-[11px] tracking-wide">Sound Off</span>
                      <span className="text-[10px] text-white/60 font-normal hidden sm:inline">(Click to unmute)</span>
                    </>
                  ) : (
                    <>
                      {/* Unmuted Speaker with Audio Wave Pulse */}
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-primary" aria-hidden="true">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                      </svg>
                      <span className="text-[11px] tracking-wide text-primary">Sound On</span>
                      <span className="flex items-end gap-0.5 h-3 ml-0.5">
                        <span className="w-0.5 h-full bg-primary animate-pulse rounded-full" />
                        <span className="w-0.5 h-2 bg-primary animate-pulse delay-75 rounded-full" />
                        <span className="w-0.5 h-3 bg-primary animate-pulse delay-150 rounded-full" />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* "21 Years" floating badge — gentle float */}
            <div className="absolute -bottom-5 right-3 sm:right-6 z-10">
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3.5 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 cursor-default">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary to-primary-darker" />
                <span className="font-montserrat text-4xl sm:text-5xl font-black text-navy leading-none">21</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary mt-0.5">Years</span>
                <span className="text-[10px] text-gray-400 tracking-wide">Experience</span>
              </div>
            </div>

            {/* "Dubai HQ" badge */}
            <div className="absolute -top-3.5 left-3 sm:left-5 z-10 bg-navy text-white rounded-xl shadow-lg px-4 py-2.5 hover:scale-105 transition-transform duration-300 cursor-default">
              <p className="text-[9px] uppercase tracking-widest text-white/60 mb-0.5">Headquartered</p>
              <p className="text-xs sm:text-sm font-bold">Dubai, UAE</p>
              <p className="text-[10px] text-white/50 mt-0.5">Global Trade Hub</p>
            </div>

            {/* Dot grid */}
            <svg
              className="absolute -bottom-2 right-2 opacity-25 pointer-events-none"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <circle
                    key={`${r}-${c}`}
                    cx={c * 20 + 10}
                    cy={r * 20 + 10}
                    r="2.5"
                    fill="var(--color-primary)"
                  />
                ))
              )}
            </svg>
          </div>

          {/* ═════ RIGHT: Balanced Content Column ═════ */}
          <div
            data-aos="3d-tilt-right"
            data-aos-delay="100"
            data-aos-duration="900"
            className="order-2 lg:order-2 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3.5">
              <div className="h-px w-9 bg-gradient-to-r from-primary to-primary-darker" />
              <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-primary">
                About National Polymers
              </span>
            </div>

            {/* Headline — balanced medium scale */}
            <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold leading-tight tracking-tight text-navy">
              Connecting{" "}
              <span className="relative inline-block">
                <span className="text-primary">Global Polymer</span>
                {/* Animated wave underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full overflow-visible"
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="wave-draw"
                    d="M0 5 Q25 1 50 5 Q75 9 100 5 Q125 1 150 5 Q175 9 200 5"
                    stroke="var(--color-primary)"
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0.45"
                  />
                </svg>
              </span>{" "}
              Supply
            </h2>
            <p className="mt-2 text-sm sm:text-base font-semibold text-navy/65 tracking-tight">
              Materials. Markets. Opportunities.
            </p>

            {/* Body Text — Justified */}
            <div className="mt-4 space-y-3 text-[14px] sm:text-[14.5px] text-gray-600 leading-[1.75] text-justify">
              <p className="text-justify">
                National Polymers LLC FZ is an international distribution and trading company specializing
                in polymer raw materials. We supply prime, near-prime, and off-grade resins, alongside
                high-grade recycled polymers, granules, regrinds, and circular materials tailored for film
                extrusion, blow molding, injection molding, and pipe compounding.
              </p>
              <p className="text-justify">
                Headquartered at Dubai&apos;s global commercial crossroads, we source directly from major
                petrochemical producers across the USA, Canada, Australia, and Far East hubs, providing
                dependable, containerized supply chains to manufacturing converters across the Indian
                Subcontinent, Africa, Europe, and Latin America.
              </p>
            </div>

            {/* Strengths grid */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {strengths.map((s, i) => (
                <div
                  key={s.label}
                  data-aos="pop-in"
                  data-aos-delay={i * 50}
                  className="group flex items-center gap-2 bg-[#F7F9FC] hover:bg-primary-soft border border-transparent hover:border-primary/30 rounded-xl px-3 py-2 transition-all duration-300 cursor-default hover:shadow-sm"
                >
                  <span className="text-sm select-none transition-transform duration-300 group-hover:scale-115">
                    {s.icon}
                  </span>
                  <span className="text-[11.5px] font-semibold text-navy group-hover:text-primary transition-colors duration-300 leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Supply chain tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {supplyTags.map((t) => (
                <span
                  key={t.label}
                  className="pill-hover inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white shadow-xs"
                  style={{ color: t.color }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
                  {t.label}
                </span>
              ))}
            </div>

            {/* CTA — Theme Color Orange */}
            <div className="mt-6">
              <Link
                href="/about"
                className="group btn-scale inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/25 hover:bg-primary-darker hover:shadow-lg transition-all"
              >
                <span>Discover Our Company</span>
                <span className="w-6 h-6 rounded-full bg-white/15 grid place-items-center group-hover:bg-white/25 transition-transform group-hover:translate-x-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
