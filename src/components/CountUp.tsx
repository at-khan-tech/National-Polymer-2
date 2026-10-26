"use client";

import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2000,
  separator = ",",
  prefix = "",
  suffix = "",
  className = "",
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            let startTime: number | null = null;
            const animate = (currentTime: number) => {
              if (!startTime) startTime = currentTime;
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // easeOutCubic: 1 - (1 - progress)^3
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(start + (end - start) * easeOut);

              setCount(currentVal);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, start, duration, hasAnimated]);

  const formattedNumber =
    separator && end >= 1000
      ? count.toLocaleString("en-US").replace(/,/g, separator)
      : count.toString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
