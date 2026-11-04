"use client";

import React, { useRef, useState, useEffect } from "react";

interface AboutVideoPlayerProps {
  className?: string;
  poster?: string;
}

export const AboutVideoPlayer: React.FC<AboutVideoPlayerProps> = ({
  className = "",
  poster = "/images/experience.png",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
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
    <div
      className={`relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-200 bg-slate-950 group ${className}`}
    >
      <video
        ref={videoRef}
        src="/video/about.mp4"
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-navy/90 backdrop-blur-md text-white rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-white/10 shadow-md">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/60 block">Global HQ</span>
        <span className="text-[11px] sm:text-xs font-bold">Dubai, UAE</span>
      </div>

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-200 shadow-md hidden sm:block">
        <span className="text-[10px] font-bold text-navy block">National Polymers FZ LLC</span>
        <span className="text-[9px] text-primary font-semibold">21+ Years Industry Reach</span>
      </div>

      {/* Interactive Sound Mute/Unmute Toggle */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
          className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer select-none"
        >
          {isMuted ? (
            <>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white/90" aria-hidden="true">
                <path d="M3.63 3.63a.996.996 0 0 0 0 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .69.68 1.2 1.33.94.8-.32 1.53-.76 2.18-1.28l1.39 1.39c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zm-7-8l-1.88 1.88L12 7.76zm4.5 8A4.5 4.5 0 0 0 14 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
              </svg>
              <span className="tracking-wide">Sound Off</span>
              <span className="text-[10px] text-white/60 font-normal hidden sm:inline">(Click to unmute)</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-primary" aria-hidden="true">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <span className="tracking-wide text-primary">Sound On</span>
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
  );
};
