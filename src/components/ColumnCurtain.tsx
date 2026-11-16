"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight IntersectionObserver-driven 4-column polarity shift from warm paper (#fcf7f0)
 * into dark slate (#1c2121). Uses purely GPU-composited scaleY transforms with zero scroll-jacking.
 */
export function ColumnCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delays = ["0ms", "75ms", "40ms", "110ms"];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="editorial-grid-bg relative grid h-20 grid-cols-2 overflow-hidden bg-[#fcf7f0] md:h-28 md:grid-cols-4"
    >
      {delays.map((delay, i) => (
        <div
          key={i}
          style={{
            transitionDelay: delay,
            transform: revealed ? "scaleY(1)" : "scaleY(0.18)",
          }}
          className={`origin-bottom bg-[#1c2121] transition-transform duration-500 ease-out will-change-transform motion-reduce:scale-y-100 motion-reduce:transform-none motion-reduce:transition-none ${
            i >= 2 ? "hidden md:block" : ""
          }`}
        />
      ))}
    </div>
  );
}
