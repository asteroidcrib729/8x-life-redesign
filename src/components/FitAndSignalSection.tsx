"use client";

import { useState } from "react";
import { RoughHighlight } from "./RoughHighlight";

export interface SignalItem {
  id: string;
  track: string;
  craft: string;
  shippedNote: string;
  alignmentHits: number;
  createdAt: string | Date;
}

const THRIVE_ITEMS = [
  {
    id: "ship",
    title: "You show work before slides.",
    detail:
      "You'd rather tear down a live bottleneck or build a working prototype in 12 hours than polish a 40-slide deck.",
  },
  {
    id: "ambiguity",
    title: "Ambiguity turns into a spec in your hands.",
    detail:
      "Nobody hands you a Jira backlog. You talk to operators, find what's broken, ship the fix, and measure it.",
  },
  {
    id: "outcomes",
    title: "You care about distribution and business truth.",
    detail:
      "Design and engineering are means to outcomes: creators paid, buyers converted, right candidates hired.",
  },
];

const SELF_SELECT_OUT = [
  {
    title: "You need layered approvals to move.",
    detail:
      "If you wait for a PM committee, design review ritual, or brand sign-off before shipping obvious improvements, you'll feel stranded.",
  },
  {
    title: "You optimize for title inflation or pedigree.",
    detail:
      "We don't care where you went to school or what BigCo title you held if your actual output doesn't hold up under scrutiny.",
  },
  {
    title: "You want a predictable, maintenance-mode lane.",
    detail:
      "Our verticals move at creator and startup velocity. Scope shifts fast when data proves an assumption wrong.",
  },
];

interface FitAndSignalSectionProps {
  initialTotal: number;
  initialSignals: SignalItem[];
}

export function FitAndSignalSection({
  initialTotal,
  initialSignals,
}: FitAndSignalSectionProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    ship: true,
    ambiguity: false,
    outcomes: false,
  });
  const [track, setTrack] = useState<"Core Team" | "Platform Network">("Core Team");
  const [craft, setCraft] = useState("Product Design");
  const [shippedNote, setShippedNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [signals, setSignals] = useState<SignalItem[]>(initialSignals);
  const [totalCount, setTotalCount] = useState(initialTotal);

  const alignmentHits = Object.values(checked).filter(Boolean).length;

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track,
          craft,
          shippedNote,
          alignmentHits,
        }),
      });

      const data = (await res.json()) as {
        error?: string;
        signal?: SignalItem;
        totalCount?: number;
      };

      if (!res.ok || !data.signal) {
        setError(data.error ?? "Could not save your builder signal.");
        return;
      }

      setSignals((prev) => [data.signal!, ...prev].slice(0, 4));
      if (typeof data.totalCount === "number") {
        setTotalCount(data.totalCount);
      }
      setShippedNote("");
      setSuccessMsg("Saved to PostgreSQL. Real proof beats a resume line.");
    } catch {
      setError("Network error while saving signal. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="fit"
      aria-labelledby="fit-title"
      className="editorial-grid-bg border-t border-[#1c2121]/15 bg-[#fcf7f0] py-16 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-16">
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4 md:items-end">
          <div className="md:col-span-3">
            <p className="font-mono text-[12px] tracking-[0.08em] text-[#2350FF] uppercase">
              02 / HONEST FILTER · BEFORE YOU APPLY
            </p>
            <h2
              id="fit-title"
              className="mt-3 text-[36px] leading-[0.98] font-semibold tracking-[-0.03em] text-[#1c2121] md:text-[58px]"
            >
              Built for high-agency builders.{" "}
              <span className="block text-[#1c2121]/60 sm:inline">
                Everyone else should{" "}
                <RoughHighlight variant="underline" stroke="#2350FF">
                  self-select out.
                </RoughHighlight>
              </span>
            </h2>
          </div>

          <div className="border border-[#1c2121]/20 bg-[#fcf7f0] p-4">
            <p className="font-mono text-[11px] tracking-[0.07em] text-[#1c2121]/60 uppercase">
              YOUR SELF-CHECK VERDICT
            </p>
            <p className="mt-1 font-mono text-[24px] font-semibold text-[#1c2121]">
              {alignmentHits} / 3{" "}
              <span className="text-[12px] font-normal text-[#1c2121]/65">aligned</span>
            </p>
            <p className="mt-1.5 text-[12px] leading-[1.4] text-[#1c2121]/75">
              {alignmentHits === 0
                ? "Candidly: you'll likely dislike how fast and unstructured 8x moves."
                : alignmentHits === 1
                  ? "Borderline fit. Read 'Please don't apply if' closely before investing 12h."
                  : "Strong alignment. Show us what you've shipped below or inspect open roles."}
            </p>
          </div>
        </div>

        {/* Two-column candid split */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="border border-[#1c2121] bg-[#fcf7f0] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-[#1c2121]/15 pb-4">
              <span className="bg-[#2350FF] px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] text-[#fcf7f0] uppercase">
                YOU&apos;LL THRIVE HERE IF
              </span>
              <span className="font-mono text-[11px] text-[#1c2121]/55 uppercase">
                CLICK TO CHECK FIT
              </span>
            </div>

            <div className="space-y-4">
              {THRIVE_ITEMS.map((item) => {
                const active = Boolean(checked[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCheck(item.id)}
                    aria-pressed={active}
                    className={`w-full cursor-pointer border p-4 text-left transition-colors ${
                      active
                        ? "border-[#1c2121] bg-[#1c2121] text-[#fcf7f0]"
                        : "border-[#1c2121]/20 bg-[#fcf7f0] text-[#1c2121] hover:border-[#1c2121]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[18px] leading-[1.2] font-semibold tracking-[-0.015em]">
                        {item.title}
                      </span>
                      <span
                        className={`mt-0.5 shrink-0 border px-1.5 py-0.5 font-mono text-[11px] ${
                          active
                            ? "border-[#E4FC53] bg-[#E4FC53] text-[#1c2121]"
                            : "border-[#1c2121]/30 text-[#1c2121]/60"
                        }`}
                      >
                        {active ? "YES" : "NO"}
                      </span>
                    </div>
                    <p
                      className={`mt-2 text-[14px] leading-[1.5] ${
                        active ? "text-[#fcf7f0]/80" : "text-[#1c2121]/75"
                      }`}
                    >
                      {item.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-[#1c2121]/30 bg-[#1c2121]/[0.03] p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-[#1c2121]/15 pb-4">
              <span className="border border-[#1c2121] px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.08em] text-[#1c2121] uppercase">
                PLEASE DON&apos;T APPLY IF
              </span>
              <span className="font-mono text-[11px] text-[#1c2121]/55 uppercase">
                SAVE YOURSELF 12H
              </span>
            </div>

            <ul className="space-y-5">
              {SELF_SELECT_OUT.map((item, idx) => (
                <li
                  key={item.title}
                  className="border-b border-[#1c2121]/12 pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] text-[#1c2121]/45">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-[19px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1c2121]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-[1.55] text-[#1c2121]/75">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live PostgreSQL-backed Builder Signal Log */}
        <div className="mt-10 grid grid-cols-1 border border-[#1c2121] bg-[#fcf7f0] lg:grid-cols-12">
          <form
            onSubmit={handleSubmit}
            className="border-b border-[#1c2121]/15 p-6 lg:col-span-6 lg:border-r lg:border-b-0 lg:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[11px] tracking-[0.08em] text-[#2350FF] uppercase">
                INTERACTIVE WORK SIGNAL · PRISMA + POSTGRESQL
              </span>
              <span className="font-mono text-[11px] text-[#1c2121]/60 uppercase">
                {totalCount} SIGNALS LOGGED
              </span>
            </div>

            <h3 className="mt-2.5 text-[22px] font-semibold tracking-[-0.02em] text-[#1c2121]">
              Test the evidence-first mindset right here.
            </h3>
            <p className="mt-1 text-[14px] text-[#1c2121]/70">
              In one honest line, what is something real you shipped without being asked?
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <span
                  id="track-group-label"
                  className="mb-1.5 block font-mono text-[11px] tracking-[0.06em] text-[#1c2121]/70 uppercase"
                >
                  Track
                </span>
                <div
                  role="group"
                  aria-labelledby="track-group-label"
                  className="grid grid-cols-2 border border-[#1c2121]"
                >
                  {(["Core Team", "Platform Network"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTrack(option)}
                      className={`cursor-pointer px-2 py-2 font-mono text-[11px] uppercase transition-colors ${
                        track === option
                          ? "bg-[#1c2121] text-[#fcf7f0]"
                          : "bg-[#fcf7f0] text-[#1c2121] hover:bg-[#1c2121]/5"
                      }`}
                    >
                      {option === "Core Team" ? "Core Team" : "Platform"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="craft-select"
                  className="mb-1.5 block font-mono text-[11px] tracking-[0.06em] text-[#1c2121]/70 uppercase"
                >
                  Craft
                </label>
                <select
                  id="craft-select"
                  value={craft}
                  onChange={(e) => setCraft(e.target.value)}
                  className="w-full border border-[#1c2121] bg-[#fcf7f0] px-3 py-2 text-[13px] font-medium text-[#1c2121] focus:ring-2 focus:ring-[#2350FF] focus:outline-none"
                >
                  <option value="Product Design">Product Design</option>
                  <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                  <option value="Operations & Growth">Operations & Growth</option>
                  <option value="Creator / B2B / Sales">Creator / B2B / Sales</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="shipped-note"
                className="mb-1.5 block font-mono text-[11px] tracking-[0.06em] text-[#1c2121]/70 uppercase"
              >
                One-line shipped proof (8-220 chars)
              </label>
              <textarea
                id="shipped-note"
                rows={2}
                value={shippedNote}
                onChange={(e) => setShippedNote(e.target.value)}
                maxLength={220}
                required
                placeholder="e.g., Audited our onboarding drop-off and shipped a working 2-step flow over the weekend."
                className="w-full border border-[#1c2121] bg-[#fcf7f0] p-3 text-[14px] text-[#1c2121] placeholder:text-[#1c2121]/40 focus:ring-2 focus:ring-[#2350FF] focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="mt-2 font-mono text-[12px] text-red-700">
                {error}
              </p>
            )}
            {successMsg && (
              <p className="mt-2 font-mono text-[12px] text-[#2350FF]">{successMsg}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-[#1c2121]/60">
                ATTACHING ALIGNMENT: {alignmentHits}/3
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer bg-[#1c2121] px-5 py-2.5 font-mono text-[12px] tracking-[0.06em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#2350FF] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "SAVING..." : "LOG PROOF SIGNAL ->"}
              </button>
            </div>
          </form>

          <div className="p-6 lg:col-span-6 lg:p-8">
            <p className="font-mono text-[11px] tracking-[0.08em] text-[#1c2121]/60 uppercase">
              RECENT BUILDER SIGNALS (LIVE FROM POSTGRES)
            </p>
            <ul className="mt-4 divide-y divide-[#1c2121]/12">
              {signals.map((s) => (
                <li key={s.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1c2121] px-2 py-0.5 font-mono text-[10px] tracking-[0.06em] text-[#fcf7f0] uppercase">
                        {s.track}
                      </span>
                      <span className="font-mono text-[11px] font-medium text-[#2350FF]">
                        {s.craft}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#1c2121]/55">
                      {s.alignmentHits}/3 FIT
                    </span>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-[1.45] text-[#1c2121]">
                    &ldquo;{s.shippedNote}&rdquo;
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
