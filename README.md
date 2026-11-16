# 8x.life Redesign: Product Design & Engineering Case Study

> **Assignment:** Redesign [`8x.life`](https://8x.life/) in the editorial style of [`e2.vc`](https://e2.vc/) to make the right builders want to work at 8x and give the wrong people a clear reason to self-select out.

Live production URL: **[`8x-life-faraz.vercel.app`](https://8x-life-faraz.vercel.app)**

---

## 1. Analysis: What Was Broken on `8x.life`

1. **Blurred Audience (`Core Team` vs. `250k+ Platform`):**  
   The original hero (`"250k+ humans managed in marketing and engineering"`) and CTA (`"Earn with 8x"`) made it unclear whether a visitor was applying to _build 8x's software/systems_ or joining as a freelance creator/outbound rep.
2. **Zero Self-Selection Criteria:**  
   Nothing told low-agency or consensus-driven candidates why they would dislike working at 8x.
3. **Product Billboard Over Candidate Reality:**  
   80% of the vertical scroll showcased client-facing product banners (including two full-bleed `"NOT UNLOCKED YET"` placeholders for `8X EMAIL` and `8X GLOBAL`) while burying _"Evidence-first hiring"_ in a 6-word subline.
4. **Mobile Navigation Defect (`390×844`):**  
   Top navigation links (`Manifesto`, `Team`, `Jobs`) were hidden below `820px` with no mobile menu fallback, and hero metrics clipped near the `844px` fold.

## 2. Judgement: Taking What Serves `8x.life` From `e2.vc`

| Kept / Adapted From `e2.vc`                                                         | Deliberately Left Behind From `e2.vc`                                         |
| :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Warm paper (`#fcf7f0`) + deep slate (`#1c2121`) + 4-column `1px` architectural grid | VC insider slang (`"from the group chat"`) & valuation flex tags              |
| Rough.js hand-drawn ink callouts (`#2350FF`) for human candor                       | Locomotive Scroll (scroll-jacking) & heavy Matter.js canvas physics loops     |
| Light-to-dark column curtain pacing & staggered proof showcase                      | Mobile `ScrambleText` cursor edge clipping & idle DVD screensaver             |
| Full-screen `MENU ✳` overlay working identically on mobile & desktop                | All-lowercase typography on dense paragraphs (kept sentence case for clarity) |

## 3. Performance & Craft Decisions

- **100% Native Scroll (Zero Scroll-Jacking):** Eliminates trackpad/mobile inertia lag observed on both reference sites.
- **GPU-Only Motion:** Column curtain and transitions animate strictly `transform` and `opacity` with `IntersectionObserver` + `prefers-reduced-motion` support.
- **Mobile-First Touch Strip:** Desktop pointer-drag proof cards switch cleanly to native `overflow-x: auto; scroll-snap-type: x mandatory` on touch devices.
- **End-to-End PostgreSQL + Prisma 7 Persistence:**
  - `Vertical`: Live vertical showcase (`8x Social`, `8x LinkedIn`, `8x Hiring`, `8x Sales`) with interactive architecture & funnel inspection.
  - `CoreRole`: Filterable open paths distinguishing Core Team vs. Platform Network.
  - `CandidateSignal`: Interactive self-check score paired with live database-backed proof signals (`POST /api/signals`).

---

## 4. Tech Stack & Local Setup

- **Framework:** Next.js `16.4.6` (App Router, Cache Components + Partial Prerender, React Compiler)
- **Styling:** Tailwind CSS v4 + `Inter Tight`, `Newsreader`, `Geist Mono`
- **Database:** PostgreSQL via Prisma ORM `7.10.1` (`@prisma/adapter-pg` + `@vercel/functions`)
- **Formatting & Tooling:** Prettier (`prettier-plugin-tailwindcss`), ESLint, TypeScript, `.vscode/settings.json`

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy the secret-free example env file
cp .env.example .env

# 3. Start local Prisma Postgres preview database
npx prisma dev --name eightx-preview

# 4. Push schema and seed initial data
npx prisma db push
npm run db:seed

# 5. Start Next.js dev server
npm run dev
```

### Verification Commands

```bash
npm run format:check
npm run lint
npm exec tsc -- --noEmit
npm run build
```

---

## 5. Planning & Documentation

Full design audits, reference deconstructions, Iteration 1 architecture, and performance/content migration plans live under [`development-plans/`](./development-plans):

- [`01-scout-8x-life.md`](./development-plans/01-scout-8x-life.md)
- [`02-scout-e2-vc.md`](./development-plans/02-scout-e2-vc.md)
- [`03-iteration-1-redesign-implementation-plan.md`](./development-plans/03-iteration-1-redesign-implementation-plan.md)
- [`04-contingencies-performance-and-content-migration.md`](./development-plans/04-contingencies-performance-and-content-migration.md)
