# Project Memory: `8x.life` Redesign Assignment

> **Purpose:** Living project log tracking assignment requirements, live site research, architectural & design decisions, completed deliverables, and next actions. Updated at the completion of every milestone.

---

## 1. Assignment Overview & Constraints

- **Role:** Product Designer application at **8x**.
- **Prompt:** Redesign `https://8x.life/` in the style of `https://e2.vc/` (`8x.life` is the life-at-8x site; `e2.vc` is the reference, not the target).
- **Time Window:** 12 hours (started `Mon 16 Nov, 21:00`, due `Tue 17 Nov, 09:00` Asia/Karachi; clock tracked, not enforced).
- **Core Job of `8x.life`:** Make the right people want to work at 8x, and give the wrong people a reason to self-select out.
- **Judging Criteria:**
  1. **Analysis:** Found the real structural/messaging problems, not just surface cosmetics.
  2. **Judgement:** What was fixed first vs. left alone vs. deliberately left behind from `e2.vc`.
  3. **Craft:** Whether the resulting homepage is shippable (`"The homepage done properly beats every page done thinly"`).
- **Submission Requirements:**
  - Design / interactive prototype / hosted public HTTPS build (accessible without login).
  - Camera-on walkthrough video (public HTTPS link) explaining _why_ before _what_ (original teardown -> findings -> redesign rationale).
  - Written note summarizing thinking in own words.

---

## 2. Completed Work Log

### Milestone 1: Live Browser Scouting (`2026-11-16`)

- Connected Chrome DevTools (`127.0.0.1:9222`) via browser subagent and inspected both live websites top-to-bottom on Desktop (`1440×900`) and Mobile (`390×844`).
- **Inspected `https://8x.life/` + sister domains (`8x.careers`, `8x.social`, `8x.business`, `8x.sale`):**
  - Tech: Next.js App Router on Vercel; `Archivo` condensed (`font-stretch: 62%`, `900`), `Hanken Grotesk`, `Geist Mono`, `Newsreader` (used heavily on `8x.careers`).
  - Tokens: `#0b0b0c` ink, `#ffffff` paper, 4 vertical palettes (`Social` `#2350FF`, `LinkedIn` `#5530F5`, `Hiring` `#FFB01F`, `Sales` `#12B5D6`).
  - Critical findings: Mobile nav links hidden below `820px` with no menu; hero `"50+ countries"` clips near `844px` mobile fold; `"Earn with 8x"` & `"250k+ humans"` blur core staff vs. contributor network; 80% of scroll is client-facing product banners + dead `"NOT UNLOCKED YET"` (`8X EMAIL`, `8X GLOBAL`); `"Evidence-first hiring"` buried; zero self-selection criteria.
  - Saved full report to [01-scout-8x-life.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/01-scout-8x-life.md).
- **Inspected `https://e2.vc/` (`/`, `/friends`, `/friends/insider-one`):**
  - Tech: Webflow, `Inter Tight` (global lowercase body), GSAP 3.15 (`ScrollTrigger`, `SplitText`, `DrawSVG`, `Draggable`, `Inertia`, `ScrambleText`), Locomotive Scroll 5.0.1, Matter.js 0.19.0, Rough.js 4.6.6.
  - Tokens: `#fcf7f0` warm paper, `#1c2121` charcoal slate, `#3451f5` royal cobalt, `#E4FC53` / `#31FE6A` / `#C294FF` card accents, `0px` sharp corners, 4-column `1px` hairline grid (`2-col` on mobile).
  - Deconstructed what the style _does_ (candor + Swiss grid rigor + light-to-dark emotional pacing + tactile craft) vs. what to _leave behind_ (VC bragging, `"group chat"` slang, Locomotive scroll-jacking, mobile ScrambleText cursor clipping at `x=0`, DVD screensaver).
  - Saved full report to [02-scout-e2-vc.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/02-scout-e2-vc.md).

### Milestone 2: Iteration 1 Architecture & Execution Plan (`2026-11-16`)

- Designed the Iteration 1 homepage blueprint:
  1. Responsive Header + Mobile `MENU ✳` Overlay (fixes `8x.life` mobile nav defect) + clear `Core Team` vs `Platform` routing.
  2. Editorial Hero on `#fcf7f0` 4-column grid + Rough.js callout + interactive proof/human strip.
  3. Numbered `01–06` Manifesto Ledger (preserving all 6 original claims with concrete builder context).
  4. Explicit **Self-Selection Filter** (`You'll love building at 8x if...` / `Please self-select out if...`).
  5. Column-curtain transition into `#1c2121` staggered dark cards for the 4 live verticals (`Social`, `LinkedIn`, `Hiring`, `Sales` with `01 -> 05` meeting factory tags; `"Not unlocked yet"` removed).
  6. Team (`Jaka Bavdek`, `Theo Bui`) + transparent **3-step Evidence-First Hiring** section.
  7. Royal-cobalt `#2350FF` global-hub interactive footer.
- Saved plan to [03-iteration-1-redesign-implementation-plan.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/03-iteration-1-redesign-implementation-plan.md).

### Milestone 3: Contingencies, 60fps Mobile Optimization & Content Migration (`2026-11-16`)

- Diagnosed scroll lag observed on both live sites (`8x.life` full-viewport animated gradients/video/clip-path + `e2.vc` Locomotive scroll-jacking, SplitText spans, continuous Matter.js canvas).
- Locked strict performance rules: **100% native scroll** (no scroll-jacking), strictly GPU-composited `transform`/`opacity` animations, `IntersectionObserver` viewport pausing, native horizontal touch-scroll (`scroll-snap-type`) on mobile instead of JS drag physics, and pre-computed static SVG highlights on mobile.
- Audited and classified every `8x.life` element into **Keep As-Is**, **Update / Reframe**, or **Phase Out**.
- Saved full contingency & migration spec to [04-contingencies-performance-and-content-migration.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/04-contingencies-performance-and-content-migration.md).

---

## 3. Current Workspace Artifacts

- [MEMORY.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/MEMORY.md) _(this file)_
- [01-scout-8x-life.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/01-scout-8x-life.md)
- [02-scout-e2-vc.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/02-scout-e2-vc.md)
- [03-iteration-1-redesign-implementation-plan.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/03-iteration-1-redesign-implementation-plan.md)
- [04-contingencies-performance-and-content-migration.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/development-plans/04-contingencies-performance-and-content-migration.md)

---

## 4. Milestone 4: Full-Stack Scaffold, Local Preview DB & Iteration 1 Build (`2026-11-16`)

- **Stack:** Next.js `16.4.6` (`cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true`) + Tailwind CSS v4 (`@tailwindcss/turbopack`) + TypeScript + `roughjs` + `pg` + `@prisma/adapter-pg` + `@vercel/functions` + Prisma `7.10.1` (`prisma7.config.ts`).
- **Database Schema (`prisma/schema.prisma`):**
  - `Vertical` (4 live verticals: `social`, `linkedin`, `hiring`, `sales` with builder challenges and `01 -> 05` funnel steps).
  - `CoreRole` (core-team vs. platform openings with department filtering and proof prompts).
  - `CandidateSignal` (powers live PostgreSQL-backed evidence-first work signal submission and feed).
- **Local Preview Database (`eightx-preview`):** Running locally via `npx prisma dev --name eightx-preview`, schema pushed and seeded via `prisma/seed.ts`.
- **API & Data Layer:** `src/lib/data.ts` (`use cache` + `cacheLife`/`cacheTag`), `/api/health`, `/api/signals` (`GET`/`POST` with `revalidateTag("signals", "max")`).
- **Iteration 1 UI (`src/app/page.tsx` & `src/components/`):** `SiteHeader` (mobile/desktop overlay menu), `RoughHighlight`, `HumanProofStrip` (desktop pointer-drag + mobile native touch `scroll-snap`), `FitAndSignalSection`, `ColumnCurtain`, `RolesExplorer`, `EditorialFooter` (`#2350FF` <-> `#E4FC53` polarity toggle + live global clocks).
- **Vercel Project:** Created `8x-life-redesign` (`prj_C73OncuyTiD3Crnmm1WDhodSrlSX`) under team `farazhussain-5000s-projects` with `ssoProtection` disabled (`enabled: false`) so public links open without login.
- **QA & Verification (`2026-11-16`):**
  - Chrome DevTools QA verified `http://localhost:3000` across Desktop (`1440×900`) and Mobile (`390×844`): `GET /` (`200`), `GET /api/health` (`200`, `{"ok":true,"database":"connected","counts":{"verticals":4,"roles":4,"signals":2}}`), zero JS/hydration errors, zero horizontal overflow, and all interactive controls (`MENU` overlay, Fit Check scoring, `RolesExplorer` tabs, Footer `#2350FF` <-> `#E4FC53` toggle) verified.
  - Fixed minor DevTools accessibility flag on `Track` group label and H2 spacing in `FitAndSignalSection.tsx`.

## 5. Milestone 5: End-to-End Polish, Production Prisma DB, Prettier/VS Code & GitHub (`2026-11-16`)

- **Production Database (`8x-life-redesign-production`):** Provisioned via Prisma MCP (`db_l0y7zir5h55k1grucv9tg8vp`, `ap-southeast-1`), schema pushed and seeded (`4` verticals, `4` roles, `2` signals). Verified no Vercel Marketplace Prisma integration is required.
- **End-to-End Product Upgrades:** Added `src/app/icon.svg`, `src/app/opengraph-image.tsx`, `HeroPathToggle` (`Core Team` vs `250k+ Platform`), interactive expandable `VerticalShowcase` pipeline inspection, dynamic `0/3`–`3/3` fit verdict in `FitAndSignalSection`, micro-telemetry bars on `HumanProofStrip`, `metadataBase` in `layout.tsx`, and portfolio [README.md](file:///c:/Users/DESKTOP-Q2TMP8U/Downloads/Source-Code/8x/README.md).
- **IDE, Formatting & Env Hygiene:** Added `.vscode/settings.json`, `.vscode/extensions.json`, `.prettierrc`, `.prettierignore`, `npm run format`, `npm run format:check`, and tracked secret-free `.env.example` (`!.env.example` in `.gitignore`).
- **Remaining:** Re-authenticate `vercel-plugin_vercel` MCP to set production `DATABASE_URL` on `8x-life-redesign` (`prj_C73OncuyTiD3Crnmm1WDhodSrlSX`) and deploy live to `https://8x-life-redesign.vercel.app`.
