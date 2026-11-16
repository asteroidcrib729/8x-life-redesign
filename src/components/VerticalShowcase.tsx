"use client";

import { useState } from "react";

export interface VerticalItem {
  id: string;
  slug: string;
  name: string;
  tagLabel: string;
  proofMetric: string;
  accentHex: string;
  headline: string;
  summary: string;
  builderChallenge: string;
  funnelSteps: string[];
  externalUrl: string;
}

const SLUG_ARCHITECTURE_NOTES: Record<string, string> = {
  social:
    "Core systems: automated brief validation, viral clip telemetry, and multi-currency payouts across 140+ countries.",
  linkedin:
    "Core systems: voice credibility scoring, editorial approval queues, and B2B attribution linking posts to pipeline.",
  hiring:
    "Core systems: timed work-sample workspaces, structured rubric scoring, and camera-on walkthrough review.",
  sales:
    "Core systems: lead enrichment pipelines, live dialer QA telemetry, and calendar conversion tracking (01 -> 05).",
};

export function VerticalShowcase({ verticals }: { verticals: VerticalItem[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>("sales");

  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
      {verticals.map((v, idx) => {
        const isDarkInkOnTag =
          v.accentHex.toUpperCase() === "#FFB01F" ||
          v.accentHex.toUpperCase() === "#12B5D6";
        const isExpanded = expandedSlug === v.slug;
        const archNote =
          SLUG_ARCHITECTURE_NOTES[v.slug] ??
          "Core systems: matching, quality control, and operational telemetry.";

        return (
          <article
            key={v.id}
            className={`group flex flex-col justify-between border border-[#fcf7f0]/20 bg-[#1c2121] p-6 transition-colors hover:border-[#fcf7f0]/60 md:p-8 ${
              idx % 2 === 1 ? "md:mt-20" : ""
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  style={{ backgroundColor: v.accentHex }}
                  className={`px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase ${
                    isDarkInkOnTag ? "text-[#1c2121]" : "text-[#fcf7f0]"
                  }`}
                >
                  {v.name} · {v.tagLabel}
                </span>
                <span className="border border-[#fcf7f0]/25 px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-[#fcf7f0]/80 uppercase">
                  {v.proofMetric}
                </span>
              </div>

              <h3 className="mt-6 text-[28px] leading-[1.08] font-semibold tracking-[-0.025em] text-[#fcf7f0] md:text-[34px]">
                {v.headline}
              </h3>

              <p className="mt-3 text-[15px] leading-[1.55] text-[#fcf7f0]/75">
                {v.summary}
              </p>

              <div className="mt-6 border-t border-[#fcf7f0]/15 pt-4">
                <p className="font-mono text-[11px] tracking-[0.08em] text-[#fcf7f0]/50 uppercase">
                  CORE BUILDER CHALLENGE
                </p>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-[#fcf7f0]/90">
                  {v.builderChallenge}
                </p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSlug((curr) => (curr === v.slug ? null : v.slug))
                  }
                  aria-expanded={isExpanded}
                  className="inline-flex cursor-pointer items-center gap-2 border border-[#fcf7f0]/25 px-3 py-1.5 font-mono text-[11px] tracking-[0.07em] text-[#fcf7f0]/85 uppercase transition-colors hover:border-[#E4FC53] hover:text-[#E4FC53]"
                >
                  <span>
                    {isExpanded
                      ? "Hide pipeline & systems"
                      : "Inspect pipeline & systems"}
                  </span>
                  <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && (
                  <div className="mt-4 border border-[#fcf7f0]/15 bg-[#fcf7f0]/[0.03] p-4">
                    <p className="text-[13px] leading-[1.5] text-[#fcf7f0]/80">
                      {archNote}
                    </p>
                    {v.funnelSteps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {v.funnelSteps.map((step) => (
                          <span
                            key={step}
                            style={{ borderColor: v.accentHex }}
                            className="border bg-[#1c2121] px-2 py-1 font-mono text-[10px] tracking-[0.06em] text-[#fcf7f0]/90 uppercase"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#fcf7f0]/15 pt-4">
              <a
                href={v.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.07em] text-[#fcf7f0] uppercase transition-colors group-hover:text-[#E4FC53]"
              >
                <span>Inspect {v.name}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <span className="font-mono text-[11px] text-[#fcf7f0]/40">
                0{idx + 1} / LIVE
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
