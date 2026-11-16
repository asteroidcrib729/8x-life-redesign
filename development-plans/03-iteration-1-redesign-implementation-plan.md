# Iteration 1: Redesign, Implementation & Execution Plan (`8x.life` in the Style of `e2.vc`)

> **Goal:** Redesign the `https://8x.life/` homepage thoroughly (rather than thinly redesigning every subpage) so it fulfills its core job: **make the right builders want to work at 8x, and give the wrong people a clear reason to self-select out**, using the editorial craft, structural rigor, and human candor of `https://e2.vc/`.

---

## 1. Strategic Thesis & Problem-Solution Mapping

### What a Candidate Currently Believes After Visiting `8x.life`

1. _"8x is a huge marketing/sales/hiring agency or creator network (`250k+ humans`), and this page is mostly selling its 4 business lines (`Social`, `LinkedIn`, `Hiring`, `Sales`)."_
2. _"I can't tell if 'Earn with 8x' means applying for a Product Designer / Engineer role on the core team, or signing up as a freelance TikTok creator / cold caller."_
3. _"I have no idea what day-to-day life, pace, standards, or hiring process look like at 8x—except that two founders exist and two verticals are 'Not unlocked yet'."_

### Iteration 1 Core Fixes (Judgement & Prioritization)

| Priority                                                         | Problem Found on `8x.life`                                                                                            | Iteration 1 Redesign Fix                                                                                                                                                                                                                                                                                     |
| :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 — Clarify Audience & Dual Paths**                           | `"Earn with 8x"` & `"250k+ humans"` blur core company builders with the 250k+ contributor network.                    | Separate the two paths cleanly in the hero & nav: **Build 8x (Core Team: Engineering, Design, Ops)** vs. **Work on the 8x Platform (Creators & Sales Talent)**—with `8x.life` owned clearly by the **core builder narrative**.                                                                               |
| **P0 — Add Explicit Self-Selection**                             | Nothing tells the wrong candidate _not_ to apply; reads like generic optimism.                                        | Add a candid **"Who thrives here / Please don't apply if"** editorial section on the warm paper grid, modeled on `e2.vc`'s sharp, anti-corporate voice.                                                                                                                                                      |
| **P1 — Replace Product Billboard with Proof of Craft & Culture** | 80% of the page is 4 giant client-facing product banners + dead `"NOT UNLOCKED YET"` (`8X EMAIL`, `8X GLOBAL`) space. | Use `e2.vc`'s **light-to-dark column curtain** to transition into a staggered dark editorial showcase (`#1c2121`) showing **what the 4 live verticals actually ship, the real problems builders solve inside them, and evidence-first hiring in action**. Remove the `"Not unlocked yet"` filler completely. |
| **P1 — Surface Evidence-First Hiring Upfront**                   | `"Evidence-first hiring"` is buried in a 6-word line under `8x Hiring` and hidden on `8x.careers/about`.              | Feature a dedicated **"How we hire (and why there are no resume screens)"** block directly before the final CTA so candidates understand the real-work assignment model before clicking `Apply`.                                                                                                             |
| **P1 — Fix Mobile Navigation & Fold Clipping**                   | Desktop nav disappears under `820px` with no menu; `"50+ countries"` clips at the `844px` mobile fold.                | Adopt `e2.vc`'s crisp topbar (`8x` mark + direct `Open Roles` CTA + `MENU ✳` full-screen overlay) across both desktop and mobile, and tighten mobile hero vertical rhythm so the thesis + strip sit cleanly inside `390×844`.                                                                                |
| **P2 — Humanize the Team Section**                               | Only 2 oversized founder names + external links; zero team voice or builder reality.                                  | Keep Jaka & Theo, but pair them with real builder signals: operating principles, distributed hubs/timezones, and what working directly with product/engineering feels like.                                                                                                                                  |

---

## 2. Information Architecture & Section-by-Section Blueprint (Iteration 1)

### 0. Global Header & Full-Screen Menu Overlay

- **Top Bar (`height: 72px–80px`, `1px` bottom hairline):**
  - **Left:** `8x` serif SVG mark + subtle mono tag `LIFE AT 8X`.
  - **Right:** Direct desktop links (`Manifesto`, `How We Work`, `Verticals`, `How We Hire`), a primary sharp-cornered CTA (`Open Roles ->` to `8x.careers/join`), and the `MENU ✳` toggle button (always visible on mobile & desktop, opening `e2.vc`-style `#1c2121` full-screen overlay with clear links for both `Join the core team` and `Join the 250k+ platform`).

### 1. Hero — Editorial Thesis + Interactive Human Strip (`#fcf7f0` Warm Paper + 4-Col Grid)

- **Top Eyebrow Tag (mono uppercase):** `CORE TEAM · ENGINEERING, DESIGN, OPERATIONS · 50+ COUNTRIES`
- **H1 (`Inter Tight 600` or `Archivo/Hanken` editorial pairing, sentence case):**  
  `We orchestrate` _(Rough.js cobalt `#2350FF` oval around `250,000+ humans`)_ `250,000+ humans so AI-era distribution actually works.`
- **Subhead (Candid positioning):**  
  `8x builds the software, marketplaces, and hiring engines behind consumer creators, B2B voices, and outbound teams. We are a small, high-agency core team—and we hire on shipped work, not pedigree.`
- **Dual Action Row (Sharp `0px` buttons):**
  - Primary (`#1c2121` fill, `#fcf7f0` text): `See open team roles ->` (`8x.careers/join`)
  - Secondary (`1px solid #1c2121` outline): `Looking to earn as a creator or seller?` (switches/anchors to platform path)
- **Angled Draggable Strip (`--strip-angle: -8deg` to `-12deg`):**  
  Continuous horizontal strip of candid 8x moments & team/creator proof cards (e.g., _8x Social campaign shoot_, _8x Hiring assignment review_, _8x Sales dialer telemetry_, _Founder/team working session_) with `0px` sharp corners and vertical `1px` grid continuity.

### 2. The Thesis (`#manifesto`) — Grounded, Not Abstract (`#fcf7f0` Grid)

- Retain the 6 intellectual pillars from `8x.life`'s original manifesto, but break them out of the passive `16:9` dark cinema box into an **interactive, scannable 4-column editorial ledger** (`01` through `06`) where each thesis line pairs the bold claim with one concrete 8x reality:
  - `01` _AI is changing the world_ -> **Code & content are abundant.**
  - `02` _Anyone can build, so value lies in distribution_ -> **Attention and trust are the new moat.**
  - `03` _Jobs will change, never disappear_ -> **Execution shifts from manual grind to orchestration.**
  - `04` _The human in the loop is the bottleneck_ -> **250k+ humans across 50+ countries already run on our rails.**
  - `05` _8x supplies and orchestrates those humans_ -> **Real business outcomes across Social, LinkedIn, Hiring, and Sales.**
  - `06` _Implications are global and generational_ -> **Borderless meritocracy over ZIP-code hiring.**

### 3. Self-Selection Filter — _"Right for you / Wrong for you"_ (`#fcf7f0` Split Grid)

Directly answers the assignment brief's core mandate inside the 4-column grid:

- **Left 2 Columns (`You'll love building at 8x if...`):**
  - You'd rather show a working prototype or shipped teardown than polish a 40-slide deck.
  - Ambiguity energizes you—you write the spec, build the thing, and measure the outcome.
  - You care about distribution and real-world business mechanics, not design awards in a vacuum.
- **Right 2 Columns (`Please self-select out if...` — accented with Rough.js underline):**
  - You need a layered PM/committee hierarchy to tell you what to build next.
  - You optimize for title inflation, slow consensus, or credential-first gatekeeping.
  - You want a passive "maintenance mode" role—our verticals move at creator and startup speed.

### 4. Column Curtain Transition -> Staggered Dark Proof Showcase (`#1c2121` Slate)

- **Transition:** Staggered `#1c2121` vertical column bars rise up the 4 hairline columns (inspired by `e2.vc`).
- **Marquee Divider:** `"what the core team actually ships"` (horizontal scroll track with crisp `8x` vertical dot markers—dropping `e2.vc`'s `"group chat"` VC slang).
- **4 Staggered Editorial Vertical Cards (`0px` corners, alternating `margin-top` stagger on desktop, collapsing cleanly to 1-column on mobile):**
  Each card keeps `8x.life`'s vertical accent color strictly as its **tag/hover highlight** (`--card-color`) rather than flooding the entire viewport in neon gradients:
  1. **`8X SOCIAL`** | `140+ COUNTRIES` _(Accent: `#3D7BFF` Cobalt)_ — _"Scaling consumer creator distribution across TikTok, Instagram, and YouTube—and the matching/payout systems behind it."_ -> `Explore 8x.social`
  2. **`8X LINKEDIN`** | `B2B DEMAND` _(Accent: `#7A5CFF` Violet)_ — _"Turning technical founders and B2B voices into predictable pipeline on LinkedIn and X."_ -> `Explore 8x.business`
  3. **`8X HIRING`** | `EVIDENCE-FIRST` _(Accent: `#FFB01F` Amber)_ — _"Replacing resume roulette with 12-hour real-work challenges—for 8x itself and partner teams."_ -> `Explore 8x.careers`
  4. **`8X SALES`** | `01 LEADS -> 05 QUALIFIED` _(Accent: `#12B5D6` Cyan)_ — _"The meeting factory: managed outbound dialing, live coaching, and qualified pipeline on autopilot."_ -> `Explore 8x.sale`
  - _(Deliberate omission: `"8X EMAIL"` and `"8X GLOBAL — NOT UNLOCKED YET"` are removed from the homepage so candidates only see real, shippable work.)_

### 5. Team & How We Hire (`#1c2121` -> `#fcf7f0` Crisp Split)

- **Leadership & Builders:** Feature `Jaka Bavdek (CEO)` and `Theo Bui (CTO)` cleanly within the editorial grid with direct links, alongside **a concise 3-step breakdown of Evidence-First Hiring**:
  1. **No resume black hole:** Skip cover letters; apply with your portfolio or work samples.
  2. **One real problem:** A timed, realistic assignment (like redesigning `8x.life` with clear criteria: Analysis, Judgement, Craft).
  3. **Talk through your thinking:** A short walkthrough showing _why_ you made each decision.

### 6. Interactive Editorial Footer (`#2350FF` / `#3451f5` Cobalt -> Interactive Accent)

- Adapts `e2.vc`'s signature high-craft footer for 8x's global identity:
  - **Top Row:** Live global hub clocks (`SAN FRANCISCO`, `LONDON`, `GLOBAL REMOTE / 50+ COUNTRIES`) + clean 2-column navigation (`COMPANY`: Manifesto, How We Work, Team, Open Roles | `VERTICALS`: 8x.social, 8x.business, 8x.careers, 8x.sale) + LinkedIn & Careers links.
  - **Interactive Bottom Stage:** Oversized `8x` geometric/physics mark (lightweight Matter.js or interactive spring blocks on desktop, static crisp composition on mobile/reduced-motion) + `© 2026 8x — The Human Company`.

---

## 3. Iteration 1 Design System Specification

| Token                                               | Value                                                                   | Source / Rationale                                                        |
| :-------------------------------------------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `--bg-paper`                                        | `#fcf7f0`                                                               | From `e2.vc` + harmonizes with `8x.careers` warm cream aesthetic          |
| `--bg-slate`                                        | `#1c2121`                                                               | From `e2.vc` (softer editorial contrast than `#0b0b0c` void black)        |
| `--grid-light` / `--grid-dark`                      | `rgba(28,33,33,0.14)` / `rgba(252,247,240,0.14)`                        | 4-column structural hairline grid (`2-col` on `<768px`)                   |
| `--accent-primary`                                  | `#2350FF`                                                               | Bridges `e2.vc`'s `#3451f5` with `8x Social`'s native `#2350FF`           |
| `--accent-social` / `linkedin` / `hiring` / `sales` | `#3D7BFF` / `#7A5CFF` / `#FFB01F` / `#12B5D6`                           | Preserved from `8x.life` as disciplined editorial tags & hover accents    |
| **Display / Body Font**                             | `Inter Tight` (or `Hanken Grotesk` + `Newsreader` serif italic accents) | Tight editorial authority; natural sentence case for H1/body              |
| **Mono / Metadata Font**                            | `Geist Mono` (`12px–14px`, uppercase, `0.06em` tracking)                | Preserved from `8x.life` for section indices (`01..06`), tags, and clocks |
| **Corner Radius**                                   | `0px` (cards, buttons, tags, badges)                                    | Adopted from `e2.vc` to eliminate generic SaaS pill-soup                  |

---

## 4. Implementation & Execution Process (12-Hour Assignment Workflow)

### Phase 1: Copy & Narrative Lock (Hours 0–2)

1. Audit every existing string on `8x.life` against the 3 assignment questions (_vague, buried, generic_).
2. Write final Iteration 1 copy for Hero, 6-step Manifesto Ledger, Right-for-you / Wrong-for-you Self-Selection block, 4 Vertical Proof Cards, and 3-step Evidence-First Hiring block.
3. Verify every outbound URL (`8x.careers/join`, `8x.social`, `8x.business`, `8x.sale`, `jakabavdek.com`, `theobui.com`, `linkedin.com/company/8x-human/`).

### Phase 2: Design Prototype / Hosted Build Setup (Hours 2–4)

_(Recommended deliverable: **Hosted live Next.js / React + Tailwind/CSS build** deployed publicly on Vercel with no login gate, backed by Figma frames or high-res desktop/mobile captures so reviewers can both click/drag and inspect layout.)_

1. Initialize Next.js (App Router) + TypeScript project with Google Fonts (`Inter Tight`, `Geist Mono`, `Newsreader`).
2. Implement global CSS tokens (`#fcf7f0`, `#1c2121`, `#2350FF`, vertical tag accents) and the persistent 4-column (`2-col` mobile) architectural hairline grid overlay.
3. Add `roughjs` (for sketchy vector oval/underlines) and lightweight scroll/drag animations (`framer-motion` or `gsap` ScrollTrigger + Draggable strip), honoring `prefers-reduced-motion`.

### Phase 3: Section Implementation — Desktop (`1440×900`) & Mobile (`390×844`) (Hours 4–8.5)

1. **Header + Mobile Overlay Menu:** Ensure `MENU ✳` works cleanly on both desktop and `390px` mobile (fixing `8x.life`'s missing mobile nav).
2. **Hero + Draggable Strip:** Build responsive H1, Rough.js callout, dual path buttons (`Core Team` vs `Platform`), and draggable horizontal photo/proof strip with zero horizontal body overflow.
3. **Manifesto Ledger + Self-Selection Split:** Build the 4-column numbered thesis and 2-column `"Right for you / Self-select out"` section.
4. **Column Curtain + Staggered Dark Proof Section:** Implement the 4-column dark curtain transition and the 4 staggered vertical cards (`Social`, `LinkedIn`, `Hiring`, `Sales`) with `0px` tags and hover states.
5. **Team + Evidence-First Hiring + Interactive Footer:** Build founder cards, 3-step hiring transparency block, live hub clocks, and lightweight interactive `8x` footer stage.

### Phase 4: Craft, QA & Deployment (Hours 8.5–10.5)

1. **Cross-Viewport Audit:** Test `1440×900`, `1280×800`, and `390×844` in Chrome DevTools—check fold framing, contrast ratios (WCAG AA on `#fcf7f0` and `#1c2121`, especially amber `#FFB01F` tags using dark `#1c2121` ink), zero horizontal scrollbars, and keyboard navigation (`Tab` / `Esc` on menu).
2. **Deploy Public Build:** Deploy to a public HTTPS URL (e.g., Vercel preview/production link) and verify it opens cleanly in an Incognito window (not signed in).

### Phase 5: Walkthrough Recording & Submission (Hours 10.5–12)

Follow the brief's exact walkthrough rubric (_"Talk us through the thinking, not the layers panel"_):

1. **Act 1 — Original `8x.life` Teardown (~90 sec):** Show desktop & mobile screenshots of live `8x.life`; point out the broken mobile nav, audience confusion (`Earn with 8x` vs core builder), buried evidence-first hiring, and wasted `"Not unlocked yet"` section.
2. **Act 2 — `e2.vc` Deconstruction (~60 sec):** Explain _why_ `e2.vc` works (warm paper + architectural grid = candor + rigor; light-to-dark pacing; Rough.js human touch) and explicitly name what was **left behind** (VC bragging, `"group chat"` slang, cursor bugs, DVD screensaver).
3. **Act 3 — Redesigned `8x.life` Walkthrough (~2–3 min):** Scroll desktop & mobile live build top-to-bottom, explaining _why_ each section exists (Hero split CTAs, Manifesto ledger, Self-selection filter, Staggered vertical proof, Evidence-first hiring, Interactive footer).
4. **Pre-Submit Checklist:**
   - [ ] Camera is **ON** in the Loom/walkthrough recording with clear voiceover.
   - [ ] Walkthrough link is **public HTTPS** (tested in Incognito).
   - [ ] Hosted redesign build / Figma / screenshot links are **public HTTPS** (tested in Incognito) and labeled clearly in the submission form.
   - [ ] Note field summarizes core thesis concisely in your own words.
