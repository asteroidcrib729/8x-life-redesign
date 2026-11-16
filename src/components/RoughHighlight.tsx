"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";

interface RoughHighlightProps {
  children: React.ReactNode;
  variant?: "oval" | "underline";
  stroke?: string;
  className?: string;
}

/**
 * Renders a lightweight hand-drawn Rough.js SVG accent around or under text.
 * Generated once on mount for desktop fine-pointer devices; falls back cleanly
 * to the static pre-computed SVG path on SSR and coarse/mobile viewports.
 */
export function RoughHighlight({
  children,
  variant = "oval",
  stroke = "#2350FF",
  className = "",
}: RoughHighlightProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const rc = rough.svg(svg);
    if (variant === "oval") {
      const node = rc.ellipse(150, 44, 286, 74, {
        stroke,
        strokeWidth: 2.6,
        roughness: 1.35,
        bowing: 1.4,
        seed: 8,
      });
      svg.appendChild(node);
    } else {
      const node = rc.line(6, 12, 294, 10, {
        stroke,
        strokeWidth: 3,
        roughness: 1.4,
        bowing: 1.6,
        seed: 12,
      });
      svg.appendChild(node);
    }
  }, [variant, stroke]);

  if (variant === "underline") {
    return (
      <span className={`relative inline-block ${className}`}>
        <span className="relative z-10">{children}</span>
        <svg
          ref={svgRef}
          viewBox="0 0 300 22"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full"
        >
          <path
            d="M4 13 Q 150 6 296 12"
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className={`relative inline-block px-2 md:px-3 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        ref={svgRef}
        viewBox="0 0 300 88"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)]"
      >
        <ellipse
          cx="150"
          cy="44"
          rx="142"
          ry="36"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
        />
      </svg>
    </span>
  );
}
