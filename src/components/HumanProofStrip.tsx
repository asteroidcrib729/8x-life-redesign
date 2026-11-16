"use client";

import { useRef, useState } from "react";

interface ProofCard {
  index: string;
  tag: string;
  accent: string;
  inkOnAccent?: boolean;
  title: string;
  metric: string;
  detail: string;
  bars: number[];
}

const PROOF_CARDS: ProofCard[] = [
  {
    index: "01",
    tag: "8X SOCIAL",
    accent: "#3D7BFF",
    title: "Consumer creator rails",
    metric: "140+ countries",
    detail:
      "Automated briefs, content QA, and cross-border payouts for TikTok, Instagram, and YouTube.",
    bars: [45, 72, 88, 100],
  },
  {
    index: "02",
    tag: "8X HIRING",
    accent: "#FFB01F",
    inkOnAccent: true,
    title: "Evidence over resumes",
    metric: "12h work sprints",
    detail:
      "No pedigree filter. Candidates take apart a live problem and explain their judgement.",
    bars: [100, 75, 50, 90],
  },
  {
    index: "03",
    tag: "8X LINKEDIN",
    accent: "#7A5CFF",
    title: "B2B voices buyers trust",
    metric: "LinkedIn & X",
    detail:
      "Operator-led sponsorships that turn technical credibility into compounding pipeline.",
    bars: [35, 60, 82, 95],
  },
  {
    index: "04",
    tag: "8X SALES",
    accent: "#12B5D6",
    inkOnAccent: true,
    title: "The meeting factory",
    metric: "01 Leads -> 05 Qualified",
    detail:
      "Managed outbound and live coaching telemetry delivering booked, qualified calendars.",
    bars: [100, 80, 62, 48],
  },
  {
    index: "05",
    tag: "CORE TEAM",
    accent: "#E4FC53",
    inkOnAccent: true,
    title: "Small team, huge leverage",
    metric: "250k+ orchestrated",
    detail:
      "Lean engineering, product design, and ops running global distribution infrastructure.",
    bars: [30, 55, 85, 100],
  },
];

export function HumanProofStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    setDragging(true);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    const delta = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    scrollerRef.current?.releasePointerCapture(e.pointerId);
  };

  const scrollByCard = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-x-clip border-t border-[#1c2121]/15 pt-6 pb-10 md:pt-8 md:pb-14">
      <div className="mx-auto mb-4 flex max-w-[1440px] items-center justify-between px-5 md:px-16">
        <span className="font-mono text-[11px] tracking-[0.08em] text-[#1c2121]/65 uppercase">
          INSIDE THE MACHINE · DRAG OR SWIPE TO INSPECT
        </span>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll proof strip left"
            className="cursor-pointer border border-[#1c2121]/25 bg-[#fcf7f0] px-2.5 py-1 font-mono text-[12px] text-[#1c2121] transition-colors hover:bg-[#1c2121] hover:text-[#fcf7f0]"
          >
            &lt;-
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll proof strip right"
            className="cursor-pointer border border-[#1c2121]/25 bg-[#fcf7f0] px-2.5 py-1 font-mono text-[12px] text-[#1c2121] transition-colors hover:bg-[#1c2121] hover:text-[#fcf7f0]"
          >
            -&gt;
          </button>
        </div>
      </div>

      {/* Subtle architectural cant on md+ only; flat touch-native snap strip on mobile */}
      <div className="md:-rotate-2 md:transform-gpu">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-3 md:snap-none md:gap-5 md:px-16 ${
            dragging ? "cursor-grabbing select-none" : "md:cursor-grab"
          }`}
        >
          {PROOF_CARDS.map((card) => (
            <article
              key={card.index}
              className="flex w-[272px] shrink-0 snap-start flex-col justify-between border border-[#1c2121] bg-[#fcf7f0] p-5 transition-transform duration-200 hover:-translate-y-1 md:w-[320px] md:p-6"
            >
              <div>
                <div className="mb-5 flex items-center justify-between gap-2">
                  <span
                    style={{ backgroundColor: card.accent }}
                    className={`px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.07em] uppercase ${
                      card.inkOnAccent ? "text-[#1c2121]" : "text-[#fcf7f0]"
                    }`}
                  >
                    {card.tag}
                  </span>
                  <span className="font-mono text-[12px] text-[#1c2121]/55">
                    /{card.index}
                  </span>
                </div>

                <h3 className="text-[22px] leading-[1.12] font-semibold tracking-[-0.02em] text-[#1c2121]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.5] text-[#1c2121]/75">
                  {card.detail}
                </p>
              </div>

              <div className="mt-6 border-t border-[#1c2121]/15 pt-3">
                <div aria-hidden="true" className="mb-2.5 flex h-5 items-end gap-1">
                  {card.bars.map((pct, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        height: `${pct}%`,
                        backgroundColor:
                          bIdx === card.bars.length - 1 ? card.accent : "#1c2121",
                        opacity: bIdx === card.bars.length - 1 ? 1 : 0.2 + bIdx * 0.15,
                      }}
                      className="w-2.5"
                    />
                  ))}
                </div>
                <div className="font-mono text-[12px] font-medium tracking-[0.06em] text-[#1c2121] uppercase">
                  {card.metric}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
