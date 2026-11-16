# Walkthrough & Demonstration Guide (`8x.life` Redesign)

> **Video Recording:** `8x-life-walkthrough-consolidated.mp4` (`2m 21s`, `1920x1080`, `30fps` H.264)  
> **Live Production Site:** [`https://8x-life-faraz.vercel.app`](https://8x-life-faraz.vercel.app)  
> **Public GitHub Repo:** [`https://github.com/asteroidcrib729/8x-life-redesign`](https://github.com/asteroidcrib729/8x-life-redesign)

Use the timestamped bullet points below while playing `8x-life-walkthrough-consolidated.mp4` (or walking through the live site with your camera on). Each section explains **what was broken**, **why we designed it this way**, and **how we engineered it**.

---

## Opening Hook (Before Pressing Play on Redesign)

- **State the core problem found on `8x.life`:** The live `8x.life` site looks cinematic, but someone visiting it walks away thinking it is a client-facing agency billboard rather than a place to decide if they belong at 8x.
- **Name the three specific gaps:**
  1. **Blurred audience:** `"250k+ humans"` and `"Earn with 8x"` mix up core software builders with the 250k+ creator and sales network.
  2. **Zero self-selection:** Nothing warns low-agency or consensus-driven candidates why they will struggle here.
  3. **Buried reality and broken mobile nav:** Evidence-first hiring is reduced to six words, two full-screen bands waste space on `"NOT UNLOCKED YET"` teasers, and mobile hides navigation links completely under `820px`.
- **State how `e2.vc` was used as a reference, not a template:**
  - **What we took:** Warm editorial paper (`#fcf7f0`) and deep slate (`#1c2121`), a strict 4-column architectural grid, light-to-dark emotional pacing, hand-drawn Rough.js accents for human candor, and sharp `0px` corners.
  - **What we deliberately left behind:** VC insider slang (`"from the group chat"`), scroll-jacking (`Locomotive Scroll`), heavy footer physics loops (`Matter.js`), and cursor gimmicks that caused mobile lag and edge-clipping.

---

## Timestamped Walkthrough Guide (Mapped to `8x-life-walkthrough-consolidated.mp4`)

### `00:00 - 00:15` | Hero & Dual-Path Clarity (`HeroPathToggle`)

- **Why:** First-time visitors must immediately know whether they are applying to build 8x's systems or joining the 250k+ contributor network.
- **What we built:**
  - Replaced dark, constantly scaling gradient backdrops with `e2.vc`'s calm `#fcf7f0` warm paper and 4-column `1px` architectural grid so typography is effortless to read.
  - Circled `"250k+ humans"` with a lightweight Rough.js stroke (`#2350FF`), pairing human warmth with crisp metrics (`250k+` humans, `50+` countries).
  - Built an interactive **Path Switcher (`01 / BUILD 8X` vs. `02 / EARN ON 8X`)** directly above the fold so creators and sellers self-route to `8x.careers/join` in one click while core builders stay focused on the engineering, design, and ops narrative.

### `00:15 - 00:22` | Interactive Proof Strip (`HumanProofStrip`)

- **Why:** Instead of hiding what 8x does down the scroll, candidates need a quick, scannable snapshot of the machine they will help build.
- **What we built:**
  - Tilted editorial proof cards (`8X SOCIAL`, `8X HIRING`, `8X LINKEDIN`, `8X SALES`, `CORE TEAM`) with custom 4-bar micro-telemetry indicators.
  - **How it avoids lag:** Uses native browser scrolling and CSS `scroll-snap` on mobile touchscreens alongside lightweight desktop pointer-drag and arrow controls, avoiding heavy JS carousel physics.

### `00:22 - 00:29` | `01 / The 8x Thesis` (Manifesto Ledger)

- **Why:** On the original site, the 6-line Manifesto sits inside a passive `16:9` dark video box that makes mobile reading awkward and leaves the claims abstract.
- **What we built:** Preserved all 6 core ideas verbatim, but restructured them into a numbered `01-06` editorial grid where every thesis statement is paired with one concrete sentence explaining what it means in practice for a builder.

### `00:29 - 01:02` | `02 / Honest Filter` & Live Builder Signals (`FitAndSignalSection`)

- **Why:** `8x.life`'s job is to attract high-agency builders and give the wrong people a reason to self-select out. This was completely missing from the original site.
- **What we built:**
  - **Interactive Self-Check (`YOU'LL THRIVE HERE IF` vs. `PLEASE DON'T APPLY IF`):** Toggling the three operating-principle cards updates a live, candid verdict (`0/3` explicitly advises saving yourself 12 hours; `3/3` points straight to open roles).
  - **Real Full-Stack Persistence (PostgreSQL + Prisma 7):** Rather than a static mockup, the `"Test the evidence-first mindset right here"` widget reads from and writes to a live **Prisma Postgres** database (`/api/signals`) with Next.js `revalidateTag`, letting candidates test logging a one-line work signal.

### `01:02 - 01:22` | Polarity Shift (`ColumnCurtain`) & `03 / Live Verticals` (`VerticalShowcase`)

- **Why:** Moving from warm paper into `#1c2121` dark slate signals a shift from philosophy to hard production proof, without forcing visitors through full-viewport neon washes or dead `"NOT UNLOCKED YET"` placeholders.
- **What we built:**
  - **Zero-lag Column Curtain:** Triggered once via `IntersectionObserver` using strictly GPU-composited `scaleY` transforms (no scroll-jacking).
  - **Database-Driven Staggered Vertical Cards:** Removed `8X EMAIL` and `8X GLOBAL` vaporware completely. All four live verticals (`Social`, `LinkedIn`, `Hiring`, `Sales`) load from PostgreSQL, keep their signature accent colors disciplined as crisp `0px` badges, and include an interactive **`Inspect pipeline & systems`** drawer revealing core engineering/design problems and stage flows (`01 LEADS -> 05 SHOWED UP AND QUALIFIED`).

### `01:22 - 01:41` | `04 / Founders`, Evidence-First Hiring & `RolesExplorer`

- **Why:** Simply showing oversized founder portraits (`Jaka Bavdek`, `Theo Bui`) with a tiny `"We're hiring."` circle reveals nothing about how hiring actually works at 8x.
- **What we built:**
  - Contextualized Jaka and Theo alongside how flat, founder-led execution operates day to day.
  - Promoted `"Evidence-first hiring"` out of a buried sub-banner into a transparent **3-step breakdown** (`01 Skip the resume black hole`, `02 Take apart one real problem`, `03 Talk us through why, not just what`).
  - Added a database-backed **`RolesExplorer`** with live department tabs (`ALL`, `DESIGN`, `ENGINEERING`, `OPERATIONS`, `PLATFORM NETWORK`) so candidates can inspect the exact problem prompt before clicking `Apply via 8x.careers`.

### `01:41 - 01:58` | Interactive Editorial Footer (`EditorialFooter`)

- **Why:** Borrowed `e2.vc`'s signature high-craft footer energy (live global timezones and color polarity flip) as a subtle craft signal, while replacing heavy continuous `Matter.js` canvas loops so smartphone batteries and scroll frame rates stay intact.
- **What we built:** Live clocks across `SAN FRANCISCO`, `LONDON`, and `GLOBAL REMOTE`, verified company/vertical/LinkedIn links, clean `© 2026 8X · THE HUMAN COMPANY` footer branding, and an interactive `#2350FF` Cobalt to `#E4FC53` Acid Lime polarity toggle.

### `01:58 - 02:21` | Mobile Responsiveness & Fixed Navigation (`<768px`)

- **Why:** The original `8x.life` hid all navigation links below `820px` with no mobile menu and clipped hero copy near the `844px` fold.
- **What we built:**
  - Guaranteed **mobile parity**: `MENU ✳` stays anchored in the sticky header on mobile and desktop, opening the full-screen `#1c2121` dual-path index overlay.
  - Verified **zero horizontal overflow** across Hero, self-selection cards, dark verticals, and footer clocks on narrow viewports.

---

## Technical & Engineering Summary (If Recruiters Ask How It Was Built)

- **Production Stack:** Next.js `16.4.6` (App Router, Cache Components, Partial Prerendering, React Compiler), TypeScript, Tailwind CSS v4, and Prisma ORM `7.10.1` (`@prisma/adapter-pg` + `@vercel/functions` pool attachment).
- **Dual Database Environments:** Local preview PostgreSQL via `npx prisma dev` (`eightx-preview`) for isolated development, and a managed production Prisma Postgres database (`8x-life-redesign-production`) wired directly to Vercel (`https://8x-life-faraz.vercel.app`) with SSO Deployment Protection disabled so every link opens anonymously.
- **Performance Discipline:** 100% native browser scrolling (zero scroll-jacking), GPU-only `transform`/`opacity` transitions, pre-computed SVG fallbacks for Rough.js on coarse/touch screens, and `prefers-reduced-motion` support.
- **Production CI/CD & Security:** Automated GitHub Actions pipeline with **CodeQL**, **Dependabot**, **Secret Scanning (`gitleaks`)**, **Dependency Audit**, **Prettier Formatting Validation**, **Workflow Validation (`actionlint`)**, **Public Release Verification**, and a **Quality Gate** running against a live `postgres:17-alpine` CI container.
