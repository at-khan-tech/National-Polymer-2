"use client";

import React from "react";

interface CardBorderBeamProps {
  className?: string;
  durationSeconds?: number;
}

/**
 * CardBorderBeam
 * Renders an animated glowing border ray that rapidly traces around the rounded card perimeter
 * for 3 seconds on hover, with zero background color distortion and complete transparency in the center.
 */
export const CardBorderBeam: React.FC<CardBorderBeamProps> = ({
  className = "",
  durationSeconds = 3,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`card-border-runner pointer-events-none ${className}`}
    >
      <div
        className="card-border-runner-beam"
        style={{
          animationDuration: `${durationSeconds}s`,
        }}
      />
    </div>
  );
};

