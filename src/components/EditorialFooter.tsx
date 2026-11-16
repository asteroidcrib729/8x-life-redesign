"use client";

import { useEffect, useState } from "react";
import { EightXWordmark } from "./EightXMark";

interface ClockData {
  sf: string;
  london: string;
  karachi: string;
}

function getHubTimes(): ClockData {
  const now = new Date();
  const fmt = (tz: string) =>
    new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

  return {
    sf: fmt("America/Los_Angeles"),
    london: fmt("Europe/London"),
    karachi: fmt("Asia/Karachi"),
  };
}

/**
 * Editorial cobalt footer inspired by e2.vc's live-clock & tone-flip craft,
 * engineered without continuous canvas physics loops so mobile scrolling stays locked at 60fps.
 */
export function EditorialFooter() {
  const [limeTone, setLimeTone] = useState(false);
  const [clocks, setClocks] = useState<ClockData | null>(null);

  useEffect(() => {
    const update = () => setClocks(getHubTimes());
    const initialId = window.setTimeout(update, 0);
    const intervalId = window.setInterval(update, 30_000);
    return () => {
      window.clearTimeout(initialId);
      window.clearInterval(intervalId);
    };
  }, []);

  const bgClass = limeTone
    ? "bg-[#E4FC53] text-[#1c2121]"
    : "bg-[#2350FF] text-[#fcf7f0]";
  const borderClass = limeTone ? "border-[#1c2121]/20" : "border-[#fcf7f0]/20";
  const mutedClass = limeTone ? "text-[#1c2121]/70" : "text-[#fcf7f0]/75";

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-300 ${bgClass}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 pt-14 pb-10 md:px-16 md:pt-20 md:pb-12">
        <div
          className={`grid grid-cols-1 gap-10 border-b pb-12 md:grid-cols-12 ${borderClass}`}
        >
          {/* Distributed Hubs / Live Clocks */}
          <div className="md:col-span-5">
            <p
              className={`font-mono text-[11px] tracking-[0.08em] uppercase ${mutedClass}`}
            >
              DISTRIBUTED FOOTPRINT · 50+ COUNTRIES
            </p>
            <div className="mt-4 space-y-2.5 font-mono text-[15px] tracking-[0.04em] uppercase md:text-[17px]">
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span>SAN FRANCISCO</span>
                <span>{clocks?.sf ?? "--:--"} PST</span>
              </div>
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span>LONDON</span>
                <span>{clocks?.london ?? "--:--"} GMT</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span>GLOBAL REMOTE</span>
                <span>{clocks?.karachi ?? "--:--"} PKT</span>
              </div>
            </div>

            <p className={`mt-6 max-w-sm text-[15px] leading-[1.45] ${mutedClass}`}>
              Human orchestration for business outcomes. Small core team; global creator,
              voice, hiring, and sales infrastructure.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:pl-12">
            <div>
              <p
                className={`mb-4 font-mono text-[11px] tracking-[0.08em] uppercase ${mutedClass}`}
              >
                COMPANY
              </p>
              <ul className="space-y-2.5 text-[15px] font-medium">
                <li>
                  <a href="#manifesto" className="hover:underline">
                    Manifesto
                  </a>
                </li>
                <li>
                  <a href="#fit" className="hover:underline">
                    Self-Selection
                  </a>
                </li>
                <li>
                  <a href="#how-we-hire" className="hover:underline">
                    How We Hire
                  </a>
                </li>
                <li>
                  <a href="#roles" className="hover:underline">
                    Open Roles
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p
                className={`mb-4 font-mono text-[11px] tracking-[0.08em] uppercase ${mutedClass}`}
              >
                VERTICALS
              </p>
              <ul className="space-y-2.5 text-[15px] font-medium">
                <li>
                  <a
                    href="https://8x.social/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    8x.social ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://8x.business/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    8x.business ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.8x.careers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    8x.careers ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://8x.sale/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    8x.sale ↗
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p
                className={`mb-4 font-mono text-[11px] tracking-[0.08em] uppercase ${mutedClass}`}
              >
                CONNECT
              </p>
              <ul className="space-y-2.5 text-[15px] font-medium">
                <li>
                  <a
                    href="https://www.linkedin.com/company/8x-human/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.8x.careers/join"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Apply Now ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.8x.careers/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    About 8x ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Oversized Brand Stage */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <button
            type="button"
            onClick={() => setLimeTone((prev) => !prev)}
            title="Toggle editorial accent polarity"
            className="group cursor-pointer text-left focus:outline-none"
          >
            <EightXWordmark className="text-[88px] transition-transform duration-300 group-hover:scale-[1.03] sm:text-[128px] md:text-[164px]" />
          </button>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={() => setLimeTone((prev) => !prev)}
              className={`cursor-pointer border px-3 py-1.5 font-mono text-[11px] tracking-[0.07em] uppercase transition-colors ${
                limeTone
                  ? "border-[#1c2121] bg-[#1c2121] text-[#E4FC53]"
                  : "border-[#fcf7f0]/40 text-[#fcf7f0] hover:bg-[#fcf7f0] hover:text-[#2350FF]"
              }`}
            >
              {limeTone ? "SWITCH TO COBALT (#2350FF)" : "FLIP POLARITY (#E4FC53)"}
            </button>
            <p
              className={`font-mono text-[12px] tracking-[0.06em] uppercase ${mutedClass}`}
            >
              © 2026 8X · THE HUMAN COMPANY · REDESIGN ITERATION 01
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
