"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Award, X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import type { TradeShowEvent } from "@/data/exhibitionsData";

interface TradeShowsGalleryProps {
  initialExhibitions?: TradeShowEvent[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TradeShowsGallery({
  initialExhibitions = [],
  title = "Trade Shows & Global Exhibitions",
  subtitle = "Demonstrating our industry presence, business activities, and worldwide credibility across premier international polymer exhibitions and trade summits.",
  className = "",
}: TradeShowsGalleryProps) {
  const [events, setEvents] = useState<TradeShowEvent[]>(initialExhibitions);
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialExhibitions.length > 0) {
      setEvents(initialExhibitions);
    } else {
      fetch("/api/exhibitions", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data?.exhibitions && Array.isArray(data.exhibitions)) {
            setEvents(data.exhibitions);
          }
        })
        .catch(() => {});
    }
  }, [initialExhibitions]);

  // Extract distinct years for filters
  const years = Array.from(new Set(events.map((e) => e.year).filter(Boolean))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const filteredEvents = events.filter((e) => {
    if (selectedYear === "all") return true;
    return e.year === selectedYear;
  });

  const activeLightboxItem = lightboxIndex !== null ? filteredEvents[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredEvents.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredEvents.length - 1 ? prev! + 1 : 0));
  };

  return (
    <section className={`py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/80 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                Industry Presence &amp; Global Footprint
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="shrink-0 flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Award size={22} />
            </span>
            <div>
              <span className="block text-base font-extrabold text-slate-900">{events.length}+ Trade Events</span>
              <span className="text-[11px] text-slate-500 font-medium">UAE, Germany, India, China &amp; Eurasia</span>
            </div>
          </div>
        </div>

        {/* Year Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedYear("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedYear === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              All Events ({events.length})
            </button>
            {years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedYear === yr
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-200"
                }`}
              >
                <Calendar size={13} />
                <span>{yr}</span>
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredEvents.length} exhibition highlights
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredEvents.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                    <Calendar size={12} className="text-blue-400" />
                    <span>{item.year}</span>
                  </span>

                  {item.standNumber && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                      <Sparkles size={11} />
                      <span>{item.standNumber}</span>
                    </span>
                  )}
                </div>

                {/* Hover Eye Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye size={15} className="text-blue-600" />
                    <span>View Exhibition Photo</span>
                  </span>
                </div>

                {/* Bottom Location Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 text-[11px] font-medium text-slate-200 truncate">
                  <MapPin size={13} className="text-orange-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                    {item.category || "Industry Exhibition"}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">National Polymers FZ LLC</span>
                  <span className="font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    Explore Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Meet Us at Upcoming Petrochemical &amp; Polymer Expos
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Interested in scheduling a meeting or discussing bulk prime resin allocations for your facility?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Schedule a Meeting
          </Link>
        </div>
      </div>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative flex flex-col lg:flex-row w-full max-w-4xl max-h-[90vh] rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-slate-800/80 p-2 text-slate-300 hover:bg-slate-700 hover:text-white transition"
              aria-label="Close photo view"
            >
              <X size={20} />
            </button>

            {/* Left: Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:w-3/5 bg-black flex items-center justify-center overflow-hidden">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition cursor-pointer"
                aria-label="Previous event photo"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition cursor-pointer"
                aria-label="Next event photo"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Right: Info Column */}
            <div className="p-6 lg:w-2/5 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-blue-600/30 border border-blue-500/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    {activeLightboxItem.year}
                  </span>
                  {activeLightboxItem.standNumber && (
                    <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono text-slate-300">
                      {activeLightboxItem.standNumber}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white leading-snug">
                  {activeLightboxItem.title}
                </h3>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-orange-400">
                  <MapPin size={14} className="shrink-0" />
                  <span>{activeLightboxItem.location}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Event Overview &amp; Presence:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {lightboxIndex! + 1} of {filteredEvents.length} photos
                </span>
                <Link
                  href="/contact"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition"
                >
                  Contact Trade Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
