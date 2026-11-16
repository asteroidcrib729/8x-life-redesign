import { Suspense } from "react";
import { connection } from "next/server";
import { ColumnCurtain } from "@/components/ColumnCurtain";
import { EditorialFooter } from "@/components/EditorialFooter";
import { FitAndSignalSection } from "@/components/FitAndSignalSection";
import { HeroPathToggle } from "@/components/HeroPathToggle";
import { HumanProofStrip } from "@/components/HumanProofStrip";
import { RolesExplorer } from "@/components/RolesExplorer";
import { RoughHighlight } from "@/components/RoughHighlight";
import { SiteHeader } from "@/components/SiteHeader";
import { VerticalShowcase } from "@/components/VerticalShowcase";
import { getCoreRoles, getSignalsSummary, getVerticals } from "@/lib/data";

const MANIFESTO_LEDGER = [
  {
    index: "01",
    statement: "AI is changing the world.",
    reality:
      "Code, mocks, and generic copy are near-free now. Execution speed is table stakes.",
  },
  {
    index: "02",
    statement: "Anyone can build, so the value lies in the distribution.",
    reality:
      "Shipping the product is half the battle; getting attention, trust, and buyers is the moat.",
  },
  {
    index: "03",
    statement: "Jobs will change, but never disappear.",
    reality:
      "Busywork vanishes. Judgment, taste, voice, and real human persuasion compound in value.",
  },
  {
    index: "04",
    statement:
      "The human in the loop becomes the most valuable—and bottlenecked—resource.",
    reality: "Software without orchestrated human accountability stalls at scale.",
  },
  {
    index: "05",
    statement: "8x supplies and orchestrates those humans.",
    reality:
      "Our lean core team builds the matching, QA, hiring, and payout systems powering 250k+ people.",
  },
  {
    index: "06",
    statement: "Implications are global and generational.",
    reality: "50+ countries today—built around proven capability, not your ZIP code.",
  },
];

const HIRING_STEPS = [
  {
    step: "01",
    title: "Skip the resume black hole.",
    detail:
      "We don't filter candidates by university brands, buzzwords, or cover letters. Start by showing what you've shipped.",
  },
  {
    step: "02",
    title: "Take apart one real problem.",
    detail:
      "Timed, realistic assignments (like redesigning a live 8x surface) show us how you analyze, prioritize, and execute.",
  },
  {
    step: "03",
    title: "Talk us through why, not just what.",
    detail:
      "A short camera-on walkthrough of your decisions lets the team evaluate your thinking directly.",
  },
];

const FOUNDERS = [
  {
    name: "Jaka Bavdek",
    role: "Co-founder, CEO",
    href: "https://jakabavdek.com/",
    note: "Leads distribution strategy, vertical expansion, and the evidence-first hiring bar across 8x.",
  },
  {
    name: "Theo Bui",
    role: "Co-founder, CTO",
    href: "https://www.theobui.com/",
    note: "Architects the software, automation, and telemetry behind 250k+ orchestrated humans.",
  },
];

async function FitSignalLoader() {
  await connection();
  const { totalCount, recent } = await getSignalsSummary();
  const serialized = recent.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return <FitAndSignalSection initialTotal={totalCount} initialSignals={serialized} />;
}

async function VerticalsLoader() {
  await connection();
  const verticals = await getVerticals();
  return <VerticalShowcase verticals={verticals} />;
}

async function RolesLoader() {
  await connection();
  const roles = await getCoreRoles();
  return <RolesExplorer roles={roles} />;
}

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-[#fcf7f0] text-[#1c2121]">
      <SiteHeader />

      <main>
        {/* ACT 1: EDITORIAL HERO + INTERACTIVE PROOF STRIP */}
        <section
          aria-labelledby="hero-title"
          className="editorial-grid-bg relative bg-[#fcf7f0]"
        >
          <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-8 md:px-16 md:pt-16 md:pb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c2121]/15 pb-4">
              <p className="font-mono text-[11px] tracking-[0.08em] text-[#1c2121]/75 uppercase md:text-[12px]">
                THE HUMAN COMPANY · CORE TEAM (DESIGN, ENGINEERING, OPS)
              </p>
              <span className="bg-[#1c2121] px-2.5 py-1 font-mono text-[11px] tracking-[0.07em] text-[#E4FC53] uppercase">
                50+ COUNTRIES · HIRING NOW
              </span>
            </div>

            <h1
              id="hero-title"
              className="mt-8 max-w-[16ch] text-[42px] leading-[0.95] font-semibold tracking-[-0.035em] text-[#1c2121] sm:text-[64px] lg:text-[96px]"
            >
              we orchestrate{" "}
              <RoughHighlight variant="oval" stroke="#2350FF">
                250k+ humans
              </RoughHighlight>{" "}
              so distribution works.
            </h1>

            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="max-w-[54ch] text-[18px] leading-[1.45] text-[#1c2121]/85 md:text-[21px]">
                  8x builds the software, matching engines, and hiring rails behind{" "}
                  <span className="font-medium text-[#1c2121]">
                    Social, LinkedIn, Hiring, and Sales
                  </span>
                  . This page is for the lean core team building that machine—not
                  corporate theater, and not a generic careers portal.
                </p>

                <HeroPathToggle />
              </div>

              <dl className="grid grid-cols-2 gap-4 border-t border-[#1c2121]/15 pt-5 md:col-span-5 md:border-t-0 md:pt-0">
                <div className="border-l border-[#1c2121]/20 pl-4">
                  <dt className="font-mono text-[11px] tracking-[0.07em] text-[#1c2121]/60 uppercase">
                    ORCHESTRATED SCALE
                  </dt>
                  <dd className="mt-1 text-[28px] font-semibold tracking-[-0.03em] text-[#1c2121] md:text-[34px]">
                    250k+
                  </dd>
                  <p className="text-[13px] text-[#1c2121]/70">
                    humans in marketing &amp; engineering
                  </p>
                </div>

                <div className="border-l border-[#1c2121]/20 pl-4">
                  <dt className="font-mono text-[11px] tracking-[0.07em] text-[#1c2121]/60 uppercase">
                    GLOBAL FOOTPRINT
                  </dt>
                  <dd className="mt-1 text-[28px] font-semibold tracking-[-0.03em] text-[#1c2121] md:text-[34px]">
                    50+
                  </dd>
                  <p className="text-[13px] text-[#1c2121]/70">
                    countries, 140+ in Social
                  </p>
                </div>
              </dl>
            </div>
          </div>

          <HumanProofStrip />
        </section>

        {/* SECTION 01: MANIFESTO LEDGER */}
        <section
          id="manifesto"
          aria-labelledby="manifesto-title"
          className="editorial-grid-bg border-t border-[#1c2121]/15 bg-[#fcf7f0] py-16 md:py-24"
        >
          <div className="mx-auto max-w-[1440px] px-5 md:px-16">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[12px] tracking-[0.08em] text-[#2350FF] uppercase">
                  01 / THE 8X THESIS
                </p>
                <h2
                  id="manifesto-title"
                  className="mt-2 text-[34px] leading-[1.02] font-semibold tracking-[-0.03em] text-[#1c2121] md:text-[52px]"
                >
                  Why we exist, without the fog.
                </h2>
              </div>
              <p className="max-w-sm text-[14px] leading-[1.5] text-[#1c2121]/70">
                Six core beliefs behind 8x—paired with what they actually mean for the
                people building our systems.
              </p>
            </div>

            <ol className="grid grid-cols-1 border-t border-[#1c2121] md:grid-cols-2 lg:grid-cols-3">
              {MANIFESTO_LEDGER.map((item) => (
                <li
                  key={item.index}
                  className="flex flex-col justify-between border-b border-[#1c2121]/20 p-6 md:border-r md:p-7"
                >
                  <div>
                    <span className="font-mono text-[12px] font-semibold text-[#2350FF]">
                      /{item.index}
                    </span>
                    <h3 className="mt-3 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#1c2121]">
                      {item.statement}
                    </h3>
                  </div>
                  <p className="mt-5 border-t border-[#1c2121]/10 pt-3 text-[14px] leading-[1.5] text-[#1c2121]/75">
                    {item.reality}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 02: SELF-SELECTION + LIVE POSTGRES BUILDER SIGNAL */}
        <Suspense
          fallback={
            <section className="border-t border-[#1c2121]/15 bg-[#fcf7f0] py-20">
              <div className="mx-auto max-w-[1440px] px-5 font-mono text-[12px] text-[#1c2121]/50 uppercase md:px-16">
                Loading self-selection &amp; builder signals...
              </div>
            </section>
          }
        >
          <FitSignalLoader />
        </Suspense>

        {/* POLARITY SHIFT: COLUMN CURTAIN */}
        <ColumnCurtain />

        {/* SECTION 03: STAGGERED DARK PROOF SHOWCASE */}
        <section
          id="verticals"
          aria-labelledby="verticals-title"
          className="editorial-grid-dark bg-[#1c2121] pb-20 text-[#fcf7f0] md:pb-28"
        >
          {/* Editorial Marquee Band */}
          <div className="marquee-wrap overflow-hidden border-y border-[#fcf7f0]/15 py-4">
            <div className="marquee-track flex items-center gap-8 font-mono text-[12px] tracking-[0.12em] text-[#fcf7f0]/80 uppercase">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-8">
                  <span>WHAT THE CORE TEAM ACTUALLY SHIPS</span>
                  <span className="text-[#E4FC53]">✳</span>
                  <span>4 LIVE VERTICALS · ZERO VAPORWARE TEASERS</span>
                  <span className="text-[#3D7BFF]">✳</span>
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-[1440px] px-5 pt-14 md:px-16 md:pt-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="font-mono text-[12px] tracking-[0.08em] text-[#E4FC53] uppercase">
                  03 / LIVE VERTICALS — POSTGRESQL CATALOG
                </p>
                <h2
                  id="verticals-title"
                  className="mt-3 text-[36px] leading-[0.98] font-semibold tracking-[-0.03em] text-[#fcf7f0] md:text-[58px]"
                >
                  Four engines running in production today.
                </h2>
              </div>
              <p className="text-[15px] leading-[1.5] text-[#fcf7f0]/70 md:col-span-4">
                Every vertical below represents real matching, trust, evaluation, or
                outbound telemetry engineered by our core builders.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="mt-12 border border-[#fcf7f0]/20 p-8 font-mono text-[12px] text-[#fcf7f0]/50 uppercase">
                  Loading live 8x verticals from PostgreSQL...
                </div>
              }
            >
              <VerticalsLoader />
            </Suspense>
          </div>
        </section>

        {/* SECTION 04: TEAM, EVIDENCE-FIRST HIRING & OPEN ROLES */}
        <section
          id="how-we-hire"
          aria-labelledby="hiring-title"
          className="editorial-grid-bg bg-[#fcf7f0] py-16 md:py-28"
        >
          <div className="mx-auto max-w-[1440px] px-5 md:px-16">
            {/* Founders & Working Culture */}
            <div className="grid grid-cols-1 gap-10 border-b border-[#1c2121]/15 pb-16 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="font-mono text-[12px] tracking-[0.08em] text-[#2350FF] uppercase">
                  04 / FOUNDERS &amp; HOW WE HIRE
                </p>
                <h2
                  id="hiring-title"
                  className="mt-3 text-[36px] leading-[1.0] font-semibold tracking-[-0.03em] text-[#1c2121] md:text-[50px]"
                >
                  Work directly with the people setting the bar.
                </h2>
                <p className="mt-4 text-[16px] leading-[1.55] text-[#1c2121]/75">
                  No middle layers hiding decisions. You build alongside the founders,
                  inspect real outcomes, and ship work that goes live.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:col-span-7">
                {FOUNDERS.map((founder) => (
                  <a
                    key={founder.name}
                    href={founder.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between border border-[#1c2121] bg-[#fcf7f0] p-6 transition-colors hover:bg-[#1c2121] hover:text-[#fcf7f0]"
                  >
                    <div>
                      <span className="font-mono text-[11px] tracking-[0.07em] text-[#2350FF] uppercase group-hover:text-[#E4FC53]">
                        {founder.role}
                      </span>
                      <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.025em]">
                        {founder.name}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.5] opacity-75">
                        {founder.note}
                      </p>
                    </div>
                    <span className="mt-6 font-mono text-[12px] tracking-[0.06em] uppercase">
                      Personal site ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* 3-Step Evidence-First Hiring */}
            <div className="border-b border-[#1c2121]/15 py-14">
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-[#1c2121] md:text-[30px]">
                  Evidence-first hiring, in three honest steps.
                </h3>
                <a
                  href="https://www.8x.careers/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[0.06em] text-[#2350FF] uppercase hover:underline"
                >
                  Read full hiring philosophy on 8x.careers ↗
                </a>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {HIRING_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="border border-[#1c2121]/20 bg-[#fcf7f0] p-6"
                  >
                    <span className="inline-block bg-[#FFB01F] px-2 py-0.5 font-mono text-[12px] font-semibold text-[#1c2121]">
                      STEP {item.step}
                    </span>
                    <h4 className="mt-4 text-[20px] leading-[1.2] font-semibold tracking-[-0.015em] text-[#1c2121]">
                      {item.title}
                    </h4>
                    <p className="mt-2.5 text-[14px] leading-[1.55] text-[#1c2121]/75">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Roles Explorer (PostgreSQL) */}
            <div id="roles" className="pt-14">
              <Suspense
                fallback={
                  <div className="border border-[#1c2121]/20 p-8 font-mono text-[12px] text-[#1c2121]/50 uppercase">
                    Loading open roles from PostgreSQL...
                  </div>
                }
              >
                <RolesLoader />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <EditorialFooter />
    </div>
  );
}
