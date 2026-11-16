"use client";

import { useState } from "react";

type TrackMode = "core" | "platform";

export function HeroPathToggle() {
  const [mode, setMode] = useState<TrackMode>("core");

  return (
    <div className="mt-6 border border-[#1c2121] bg-[#fcf7f0]">
      <div
        role="tablist"
        aria-label="Choose your 8x path"
        className="grid grid-cols-2 border-b border-[#1c2121]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "core"}
          onClick={() => setMode("core")}
          className={`cursor-pointer px-4 py-2.5 text-left font-mono text-[11px] tracking-[0.06em] uppercase transition-colors md:text-[12px] ${
            mode === "core"
              ? "bg-[#1c2121] text-[#fcf7f0]"
              : "bg-[#fcf7f0] text-[#1c2121]/75 hover:text-[#1c2121]"
          }`}
        >
          01 / BUILD 8X (CORE TEAM)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "platform"}
          onClick={() => setMode("platform")}
          className={`cursor-pointer border-l border-[#1c2121] px-4 py-2.5 text-left font-mono text-[11px] tracking-[0.06em] uppercase transition-colors md:text-[12px] ${
            mode === "platform"
              ? "bg-[#2350FF] text-[#fcf7f0]"
              : "bg-[#fcf7f0] text-[#1c2121]/75 hover:text-[#1c2121]"
          }`}
        >
          02 / EARN ON 8X (250K+ NETWORK)
        </button>
      </div>

      {mode === "core" ? (
        <div className="p-4 md:p-5">
          <p className="text-[15px] leading-[1.5] text-[#1c2121]/85">
            <strong className="font-semibold text-[#1c2121]">
              You&apos;re in the right place if you build software, interfaces, or
              systems.
            </strong>{" "}
            Our lean core team designs and engineers the matching, QA, and payout rails
            powering all four verticals.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 bg-[#1c2121] px-4 py-2.5 font-mono text-[12px] tracking-[0.07em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#2350FF]"
            >
              <span>See core team roles</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a
              href="#fit"
              className="inline-flex items-center gap-2 border border-[#1c2121] px-4 py-2.5 font-mono text-[12px] tracking-[0.07em] text-[#1c2121] uppercase transition-colors hover:bg-[#1c2121] hover:text-[#fcf7f0]"
            >
              <span>Check if you fit first</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-5">
          <p className="text-[15px] leading-[1.5] text-[#1c2121]/85">
            <strong className="font-semibold text-[#1c2121]">
              Looking to earn as a creator, B2B voice, or outbound specialist?
            </strong>{" "}
            Skip the core-team manifesto and jump directly to our contributor onboarding
            flow on 8x.careers.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://www.8x.careers/join"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2350FF] px-4 py-2.5 font-mono text-[12px] tracking-[0.07em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#1c2121]"
            >
              <span>Join the 250k+ platform</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setMode("core")}
              className="cursor-pointer border border-[#1c2121]/30 px-4 py-2.5 font-mono text-[12px] tracking-[0.07em] text-[#1c2121]/75 uppercase hover:border-[#1c2121] hover:text-[#1c2121]"
            >
              Back to core team
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
