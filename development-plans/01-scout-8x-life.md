# Scout Report: `https://8x.life/`

> **Inspection Scope:** Live browser inspection via Chrome DevTools on Desktop (`1440×900`) and Mobile (`390×844`), including scroll-through behavior, computed CSS/HTML inspection, network/font assets, and linked sister domains (`8x.careers`, `8x.social`, `8x.business`, `8x.sale`).  
> **Assignment Context:** `8x.life` is 8x's "life-at-8x" site. Its stated job in the assignment brief is _"to make the right people want to work here and give the wrong people a reason to self-select out."_

---

## 1. Technical Stack & Metadata

| Property                  | Observed Value                                                                                                                                            |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**                 | `8x \| the human company`                                                                                                                                 |
| **Meta Description / OG** | `"250k+ people in 50+ countries, working in marketing and engineering. 8x Social for consumer brands, 8x LinkedIn for B2B, plus 8x Hiring and 8x Sales."` |
| **Framework / Hosting**   | Next.js (App Router, Turbopack chunks, `x-matched-path: /[locale]`), hosted on Vercel                                                                     |
| **Theme Color**           | `#0b0b0c`                                                                                                                                                 |
| **Icons**                 | `/icon.svg`, `/apple-icon.png`                                                                                                                            |

### Font System (`@font-face` preloaded `.woff2`)

1. **Archivo** (`weight: 100 900`, `font-stretch: 62% 125%`) — `--font-display`. Used heavily condensed (`font-stretch: 62%`, `font-weight: 900`) for display headlines and large stats.
2. **Hanken Grotesk** (`weight: 100 900`) — `--font-sans`. Default UI and body copy font inside `.home-module__iyP_nG__root`.
3. **Geist Mono** (`weight: 100 900`) — `--font-geist-mono` / `--font-mono`.
4. **Newsreader** (`weight: 200 800`, normal & italic) — loaded in the root layout (`--font-newsreader` / `--font-serif` on `body`), overridden by `--font-sans` inside the `8x.life` home module, and actively used on `8x.careers`.

---

## 2. Design Tokens & Visual Language

### Color Palette

- **Base Dark Ground (`--color-ink` / `--ink`):** `#0b0b0c`
- **Base Light Ground (`--color-paper` / `--paper`):** `#ffffff`
- **Vertical Color Families (used in hero backdrop cycling, full-bleed vertical sections, and footer halftone tinting):**
  - **8x Social (Blue):** `--night: #082058`, `--field: #11378C`, `--deep: #2350FF`, `--core: #3D7BFF`, `--glow: #86B4FF`, `--accent: #A79BFF`
  - **8x LinkedIn (Purple):** `--night: #1B0C4D`, `--field: #3E2394`, `--deep: #5530F5`, `--core: #7A5CFF`, `--glow: #B79CFF`, `--accent: #FF8AD0`
  - **8x Hiring (Amber):** `--night: #2B1404`, `--field: #7A3A06`, `--deep: #FF7A00`, `--core: #FFB01F`, `--glow: #FFD465`, `--accent: #FF8F6B`
  - **8x Sales (Cyan):** `--night: #001C2D`, `--field: #005C8C`, `--deep: #0083C2`, `--core: #12B5D6`, `--glow: #7FE0F0`, `--accent: #6FE3C2`

### Typography & Scale

- **Hero `h1`:** `Archivo`, `900`, `font-stretch: 62%`, `font-size: min(12cqw, 18.4svh)` (~`165px` at `1440×900`), `line-height: 0.84`, `letter-spacing: -0.005em`, uppercase.
- **Vertical `h2`:** `Archivo`, `900`, `font-stretch: 62%`, `font-size: min(8cqw, 12svh)` (computed `60.64px`–`74.79px`), `line-height: 0.86`.
- **Team `h2` (Founder Names):** `Archivo`, `900`, `font-stretch: 62%`, `calc(7.8 * min(1cqw, 19.2px))` (~`112px` at `1440px`), `line-height: 0.92`.
- **Body / Nav / Pill CTAs:** `Hanken Grotesk`, `600`–`700`, `--t: clamp(17px, calc(.62cqw + 7px), 26px)` (~`17px` at `1440px`).
- **Footer Links:** `Hanken Grotesk`, `600`, `18px / 1.3`, `rgb(11 11 12 / 0.92)`.

### Spacing, Geometry & Surfaces

- **Pill Buttons:** `border-radius: 999px`, `height: 2.9em`, `padding: 0 1.4em` (or `1.35em`).
- **Horizontal Gutters:** `--gx: clamp(16px, 3cqw, 56px)` in hero; `clamp(20px, 3.9cqw, 72px)` in vertical bands.
- **Section Transitions:** Stepped polygonal `clip-path: polygon(...)` edges between vertical bands, creating a geometric staircase transition.
- **Atmospheric Textures:** Tiled `/life/grain.webp` (`256×256`), luminous `silk-*.webp` textures, foreground silhouette crowd video (`crowd.webm`), and halftone-dotted mountain footer artwork (`mist-ink.webp`, `mist-aux.png`).

---

## 3. Section-by-Section Content & Visual Inventory

### Section 1: Header & Sticky Hero (`section[aria-labelledby="hero-title"]`)

- **Header (`<header>`):**
  - Left nav: `Manifesto` (`/#manifesto`), `Team` (`/#team`), `Jobs` (`https://www.8x.careers/join`), each prefixed with a `6px` dot `::before`.
  - Center brand mark: `8x` SVG serif wordmark linking to `/`.
  - Right CTA pill: `Earn with [8x SVG]` -> `https://www.8x.careers/join`.
- **Hero Center Copy:**
  - **H1:** `THE` / `HUMAN` / `COMPANY` (3 stacked lines; `HUMAN` uses a multi-stop gradient fill transitioning via CSS variables `--w0`..`--w3` over `1.2s`).
  - **Subtitle:** `HUMAN ORCHESTRATION` / `FOR BUSINESS OUTCOMES`
  - **Two Key Facts:**
    - `250k+` — `humans managed in marketing and engineering.`
    - `50+` — `countries`
- **Motion:** Four radial/linear gradient `.ground` layers cycle through Social (blue), LinkedIn (violet), Hiring (amber), and Sales (cyan) while slowly breathing (`scale(1) -> 1.09` over 19s). On scroll, the sticky hero scales down slightly (`calc(1 - var(--c) * .055)`) and darkens.

### Section 2: Manifesto (`section#manifesto`)

- **Label / H2:** `Manifesto` (`The 8x Manifesto` for screen readers).
- **Six Stacked Statements:**
  1. `AI is changing the world`
  2. `Anyone can build so the value lies in the distribution`
  3. `Jobs will change but never disappear`
  4. `The human in the loop becomes the most valuable and the bottlenecked resource`
  5. `8x supplies and orchestrates those humans`
  6. `Implications are global and generational`
- **Motion & Framing (Desktop):** Sticky `16:9` projection frame (`--stageH: min(100svh, 100vw * 9 / 16)`) inside `#000` with a mirrored floor reflection (`--axis`) and a slow 30s camera zoom (`scale(1) -> 1.045`). `silk-*.webp` backdrops wipe behind a looping silhouette video (`crowd.webm`).

### Section 3: Verticals (`section#work`)

Five full-bleed color-blocked vertical bands with stepped top edges and alternating cutout portrait photography:

1. **8x Social** (`#2350FF` / `#3D7BFF` / `#86B4FF`, white text, photo on right `person-social.webp`):
   - Lockup: `8x SOCIAL` (`8x-social-lockup-paper.svg`)
   - H2: `REAL PEOPLE. REAL REACH.`
   - Animated count-up stat: `140+` `countries` (observed ticking from `37+` up to `140+`)
   - Copy: `Consumer brands. TikTok, Instagram, YouTube.`
   - CTA pill: `8x.social` -> `https://8x.social/`
2. **8x LinkedIn** (`#5530F5` / `#7A5CFF` / `#B79CFF`, white text, photo on left `person-linkedin.webp`):
   - Eyebrow: `B2B creators on LinkedIn and X`
   - H2: `THE VOICES BUYERS TRUST.`
   - Lockup: `8x LINKEDIN`
   - Copy: `B2B demand, on LinkedIn.`
   - CTA pill: `8x.business` -> `https://8x.business/`
3. **8x Hiring** (`#FFB01F` warm amber, `#0b0b0c` ink, cream `#fff` stepped card behind `person-hiring.webp` on right):
   - H2: `GET HIRED FOR THE WORK YOU CAN DO.`
   - Copy: `Evidence-first hiring, at 8x and partner companies.`
   - CTA pill: `8x.careers` -> `https://www.8x.careers/`
4. **8x Sales** (`#12B5D6` / `#0083C2` cyan, `#0b0b0c` ink, `person-sales.webp` on left):
   - Lockup: `8x SALES`
   - H2: `QUALIFIED MEETINGS, ON YOUR CALENDAR.`
   - Ordered list (`"The meeting factory"`): staggered tilted black-and-white pills: `01 LEADS`, `02 DIALS`, `03 CONNECTS`, `04 BOOKED`, `05 SHOWED UP AND QUALIFIED`.
   - Copy: `Outbound and cold calling.`
   - CTA pill: `8x.sale` -> `https://8x.sale/`
5. **Locked / Teaser Verticals** (`#0b0b0c` / `#000` with `#232226` spotlight, `person-locked.webp`):
   - Labels: `8X EMAIL`, `8X GLOBAL`
   - H2: `NOT UNLOCKED YET.`

### Section 4: Team (`section#team`)

- **H2:** `Team`
- **Two Staggered Founder Portraits + Oversized Names:**
  - `JAKA BAVDEK` — `Co-founder, CEO` (links to `https://jakabavdek.com/`, `jaka.webp` on left)
  - `THEO BUI` — `Co-founder, CTO` (links to `https://www.theobui.com/`, `theo.webp` staggered lower-right)
- **Hiring CTA:** `We're hiring.` + circular `#ffb01f` arrow button -> `https://www.8x.careers/join`.

### Section 5: Footer (`<footer>`)

- Rounded white card (`#fff`) over `#0b0b0c`:
  - Top-left: `8x` SVG mark, tagline `Human orchestration for business outcomes.`, LinkedIn link (`https://www.linkedin.com/company/8x-human/`).
  - Top-right 2 columns:
    - `COMPANY`: `Manifesto`, `Team`, `Jobs`
    - `VERTICALS`: `8x.social`, `8x.business`, `8x.careers`, `8x.sale`
  - Legal line: `© 2026 8x`
  - Bottom full-bleed halftone mountain landscape (`mist-ink.webp`, `mist-aux.png`) tinting across the 4 vertical colors behind a giant white `8x` serif mark.

---

## 4. Linked Sister Ecosystem (Why `8x.life` Feels Thin)

`8x.life` has **zero internal subroutes** (`/about`, `/culture`, `/team`, etc.). Everything externalizes to sister domains:

- `https://www.8x.careers/join` & `/about` — Editorial cream aesthetic (`Newsreader` serif, floating dark pill topbar, `Join the team` vs `Join the platform` toggle, explanation of evidence-first assignments).
- `https://www.8x.careers/` — Main hiring platform home (`Engineering, Design, Marketing & Operations`).
- `https://www.8x.social/for-brands` — Consumer creator marketing.
- `https://8x.business/` — B2B LinkedIn & X creator sponsorships.
- `https://8x.sale/` — Managed outbound sales force.

---

## 5. Mobile (`390×844`) Audit

1. **Navigation disappears completely:** Under `@media (max-width:820px)`, the top-left nav links (`Manifesto`, `Team`, `Jobs`) are set to `display: none` with **no hamburger menu replacement**. Mobile visitors only see the `8x` logo and `Earn with 8x` CTA; they cannot jump to `Manifesto` or `Team` without scrolling all the way down.
2. **Above-the-fold clipping:** The hero `h1` (`~82px`) and stacked facts push `"50+ countries"` onto/below the `844px` fold line, partially clipping it on initial mobile load.
3. **Manifesto adapts well:** Instead of forcing tiny text over the `16:9` video stage, mobile separates the animated silk/crowd stage above and stacks the 6 sentences cleanly below on solid `#0b0b0c`.
4. **Team & Footer stack cleanly:** Founder portraits stack vertically without horizontal overflow, and the 2-column footer stays legible.

---

## 6. Critical Product & Candidate-Experience Audit (Assignment Lens)

Evaluating `8x.life` against its stated job (_"make the right people want to work here and give the wrong people a reason to self-select out"_):

### What Works Today

- **Scale & visual authority:** Dark atmospheric gradients, condensed `Archivo`, and bold color-blocked verticals immediately signal ambition, high energy, and non-traditional consumer/creator velocity.
- **Clear high-level thesis in the Manifesto:** The 6 lines about AI lowering the cost of building while making distribution and the human-in-the-loop the real bottleneck are sharp and memorable.
- **Concrete funnel in `8x Sales`:** The `01 LEADS -> 05 SHOWED UP AND QUALIFIED` pills are the one place where 8x shows _how_ an outcome is actually engineered rather than just stating a slogan.

### What Is Vague, Buried, or Missing for a Candidate

1. **Who is this site actually for—core builders or platform talent?**  
   The hero says `"250k+ humans managed in marketing and engineering"`, and the CTA says `"Earn with 8x"`. A Product Designer or Engineer applying to build 8x itself can easily confuse _building the orchestration platform_ with _being a creator/caller on the network_ (a distinction buried over on `8x.careers/join` via the `Join the team` vs. `Join the platform` toggle).
2. **Zero self-selection criteria (nothing pushes the wrong people out):**  
   There is no articulation of 8x's operating pace, expectations, autonomy, or what kind of person _hates_ working at 8x. High-agency builders and credential-chasers come away with the exact same impression.
3. **Reads like a corporate product landing page, not a "life-at-8x" page:**  
   80% of the vertical scroll is a billboard for `Social`, `LinkedIn`, `Hiring`, and `Sales` aimed at clients, with two giant `"NOT UNLOCKED YET"` (`8X EMAIL`, `8X GLOBAL`) placeholders wasting a massive full-bleed dark band at the bottom of `#work`.
4. **Generic Team section:**  
   Showing only two founder portraits (`Jaka Bavdek`, `Theo Bui`) with external personal links and a tiny `"We're hiring."` button reveals nothing about the team a candidate will actually join, what craft looks like inside 8x, or what the founders actually believe about building.
5. **Evidence-first hiring is buried in a 6-word subcopy:**  
   One of 8x's strongest differentiators—`"Evidence-first hiring, at 8x and partner companies"`—is tucked inside the `8x Hiring` product banner instead of being explained clearly to candidates _about to apply to 8x itself_.
