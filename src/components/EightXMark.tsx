import React from "react";

export function EightXWordmark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-serif leading-none font-medium tracking-[-0.06em] select-none ${className}`}
      aria-label="8x"
    >
      <span className="text-[1.45em]">8</span>
      <span className="-ml-[0.03em] text-[1.22em] italic">x</span>
    </span>
  );
}

export function AsteriskMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}
