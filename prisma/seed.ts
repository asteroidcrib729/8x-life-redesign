import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const VERTICALS = [
  {
    slug: "social",
    name: "8x Social",
    tagLabel: "CONSUMER CREATORS",
    proofMetric: "140+ COUNTRIES",
    accentHex: "#3D7BFF",
    headline: "Real people. Real reach.",
    summary:
      "Consumer creator distribution across TikTok, Instagram, and YouTube, built on software that matches, briefs, tracks, and pays global creators at scale.",
    builderChallenge:
      "Designing cross-border creator attribution, automated brief QA, and instant payouts across 140+ countries without losing human authenticity.",
    funnelSteps: [
      "BRAND BRIEF",
      "CREATOR MATCH",
      "CONTENT SHIPPING",
      "ORGANIC DISTRIBUTION",
      "VERIFIED REACH",
    ],
    externalUrl: "https://8x.social/",
    sortOrder: 1,
  },
  {
    slug: "linkedin",
    name: "8x LinkedIn",
    tagLabel: "B2B DEMAND",
    proofMetric: "LINKEDIN & X",
    accentHex: "#7A5CFF",
    headline: "The voices buyers trust.",
    summary:
      "B2B demand on LinkedIn and X powered by credible operators and technical voices, not faceless corporate ad spend.",
    builderChallenge:
      "Modeling B2B buyer trust, orchestrating high-signal creator sponsorships, and tying editorial reach directly to pipeline.",
    funnelSteps: [
      "CATEGORY POSITIONING",
      "OPERATOR VOICES",
      "SPONSORED DISTRIBUTION",
      "BUYER CONVERSATIONS",
    ],
    externalUrl: "https://8x.business/",
    sortOrder: 2,
  },
  {
    slug: "hiring",
    name: "8x Hiring",
    tagLabel: "EVIDENCE-FIRST",
    proofMetric: "REAL WORK > RESUMES",
    accentHex: "#FFB01F",
    headline: "Get hired for the work you can do.",
    summary:
      "Evidence-first hiring at 8x and partner companies, replacing keyword resume filters with timed, real-world execution challenges and walkthroughs.",
    builderChallenge:
      "Building an evaluation environment where raw craft, judgement, and reasoning beat pedigree or polished interview scripts.",
    funnelSteps: [
      "PORTFOLIO SIGNAL",
      "REAL ASSIGNMENT",
      "WALKTHROUGH WHY",
      "DIRECT HIRE",
    ],
    externalUrl: "https://www.8x.careers/",
    sortOrder: 3,
  },
  {
    slug: "sales",
    name: "8x Sales",
    tagLabel: "THE MEETING FACTORY",
    proofMetric: "OUTBOUND ENGINE",
    accentHex: "#12B5D6",
    headline: "Qualified meetings, on your calendar.",
    summary:
      "Managed outbound and cold calling orchestrated end-to-end, combining human persistence with tight systems telemetry.",
    builderChallenge:
      "Engineering every handoff in the meeting factory so dialers, scripts, QA, and scheduling compound conversion.",
    funnelSteps: [
      "01 LEADS",
      "02 DIALS",
      "03 CONNECTS",
      "04 BOOKED",
      "05 SHOWED UP AND QUALIFIED",
    ],
    externalUrl: "https://8x.sale/",
    sortOrder: 4,
  },
];

const CORE_ROLES = [
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Global Remote (50+ countries)",
    engagement: "Core Team · Full-time",
    whyHard:
      "You own end-to-end product surfaces across hiring, creator workflows, and outbound ops, moving from problem teardown to shippable interface in days, not quarters.",
    proofPrompt: "Redesign a live surface, show what's broken, and explain why.",
    applyUrl: "https://www.8x.careers/join",
    sortOrder: 1,
  },
  {
    slug: "founding-fullstack-engineer",
    title: "Full-Stack Product Engineer",
    department: "Engineering",
    location: "Global Remote (Async + High Overlap)",
    engagement: "Core Team · Full-time",
    whyHard:
      "You build orchestration rails serving 250k+ humans across 140+ countries, shipping TypeScript, Next.js, Postgres, and reliable payout and matching automation.",
    proofPrompt: "Ship a complete vertical slice with real data and zero fluff.",
    applyUrl: "https://www.8x.careers/join",
    sortOrder: 2,
  },
  {
    slug: "growth-orchestration-lead",
    title: "Distribution & Systems Operator",
    department: "Operations",
    location: "Global Remote",
    engagement: "Core Team · Full-time",
    whyHard:
      "You turn ambiguous supply/demand bottlenecks across Social, LinkedIn, and Sales into repeatable human + software playbooks.",
    proofPrompt: "Diagnose a real funnel bottleneck and lay out the fix.",
    applyUrl: "https://www.8x.careers/join",
    sortOrder: 3,
  },
  {
    slug: "platform-talent-network",
    title: "Creators, Voices & Outbound Specialists",
    department: "Platform Network",
    location: "140+ Countries",
    engagement: "250k+ Human Network",
    whyHard:
      "Separate from the core software team: earn by shipping consumer content (8x Social), B2B posts (8x LinkedIn), or qualified outbound (8x Sales).",
    proofPrompt: "Join the contributor platform directly via 8x.careers.",
    applyUrl: "https://www.8x.careers/join",
    sortOrder: 4,
  },
];

const INITIAL_SIGNALS = [
  {
    track: "Core Team",
    craft: "Product Design",
    shippedNote:
      "Rebuilt a hiring funnel around work samples instead of PDFs, cutting screening noise in half.",
    alignmentHits: 3,
  },
  {
    track: "Core Team",
    craft: "Full-Stack Engineering",
    shippedNote:
      "Zero-scroll-jacking editorial architecture backed by PostgreSQL + Prisma.",
    alignmentHits: 3,
  },
];

async function main() {
  for (const v of VERTICALS) {
    await prisma.vertical.upsert({
      where: { slug: v.slug },
      update: v,
      create: v,
    });
  }

  for (const r of CORE_ROLES) {
    await prisma.coreRole.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }

  const existingSignals = await prisma.candidateSignal.count();
  if (existingSignals === 0) {
    await prisma.candidateSignal.createMany({
      data: INITIAL_SIGNALS,
    });
  }

  console.log("Seeded 8x.life database successfully.");
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
