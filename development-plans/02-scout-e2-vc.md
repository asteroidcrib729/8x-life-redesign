# Scout Report: `https://e2.vc/`

> **Inspection Scope:** Live browser inspection via Chrome DevTools on Desktop (`1440×900`) and Mobile (`390×844`), including scroll-through triggers, interactive menu/physics/keyboard states, computed CSS tokens, and subpages (`/friends`, `/friends/insider-one`).  
> **Assignment Context:** `e2.vc` is the style reference, not the target. As the brief states: _"name what its style is actually doing rather than copying the surface of it... Take what serves 8x.life and say what you deliberately left behind."_

---

## 1. Technical Stack & Metadata

| Property                       | Observed Value                                                                                                                                                                                                                                                                   |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**                      | `e2vc - home`                                                                                                                                                                                                                                                                    |
| **Meta Description / OG**      | `"we just have great taste in friends"` (`twitter:card: summary_large_image`)                                                                                                                                                                                                    |
| **Platform / Builder**         | Webflow (`e2vc-test-vasa.webflow.shared.042f7aabd.css`)                                                                                                                                                                                                                          |
| **Typography**                 | Google Font **`Inter Tight`** (`100..900`, normal & italic)                                                                                                                                                                                                                      |
| **Motion & Physics Libraries** | jQuery 3.5.1, **GSAP 3.15** (`ScrollTrigger`, `SplitText`, `DrawSVGPlugin`, `Draggable`, `InertiaPlugin`, `CustomEase`, `ScrambleTextPlugin`), **Locomotive Scroll 5.0.1**, **Matter.js 0.19.0** (2D rigid-body physics), **Rough.js 4.6.6** (hand-drawn sketchy vector strokes) |

### Typography Quirks

- `body` applies `font-family: 'Inter Tight', system-ui, sans-serif;` and `text-transform: lowercase;` globally, creating an immediate anti-corporate, conversational voice.
- Labels, card metadata, and footer columns override this to `uppercase` (`15px`-`22px`), while article titles reset to normal sentence case (`text-transform: none`).

---

## 2. Design Tokens & Visual Language

### Color Palette

- **Paper Ground (`--bg`):** `#fcf7f0` (warm off-white editorial paper)
- **Ink / Dark Slate (`--ink` / `--section-ink`):** `#1c2121` (deep charcoal slate, softer and warmer than pure `#000`)
- **Primary Accent & Default Footer (`--e2vc-accent` / `--footer-bg`):** `#3451f5` (royal cobalt blue)
- **Architectural Hairline Grids:**
  - Light surface (`--grid`): `rgba(28, 33, 33, 0.15)`
  - Dark footer (`--footer-grid`): `rgba(255, 255, 255, 0.15)`
- **Observed Editorial Card Hover Accents (`--card-color`):**
  - `#E4FC53` (acid lime, also cycles onto the footer when interacting with Spacejump, flipping footer ink/grid to dark via `:root[data-footer-tone='light']`)
  - `#31FE6A` (neon green)
  - `#C294FF` (soft lavender)

### Spatial & Structural Geometry

- **Desktop Gutter (`--gutter-x`):** `64px`
- **Border Radius:** **`0px` everywhere:** strict brutalist/editorial sharp rectangles across images, tags, buttons, and hairline dividers.
- **Architectural 4-Column Grid:** Vertical `1px` hairline columns run continuously down the page, anchoring every headline, transition curtain, staggered card, and footer block to a visible structural scaffold.

---

## 3. Section-by-Section Breakdown

### Global Header & Full-Screen Menu Overlay

- **Top Bar (`nav[aria-label="Primary"]`):** `position: absolute`, `padding: 24px 64px`, bounded underneath by a crisp `1px` full-width rule at `top: 80px`.
  - Left: `e2VC` inline SVG wordmark linking to `/`.
  - Right: `MENU` + 8-pointed asterisk SVG (`button "Open menu"`). Hovering `MENU` shifts the label vertically (`translateY(-100%)` roll).
- **Menu Overlay (`.bold-nav-full__tile`):** Opens full-screen in `#1c2121` with `#fcf7f0` oversized lowercase links (`font-size: calc(4vw + 4vh)`, `font-weight: 600`, `letter-spacing: -0.04em`):
  - Column 1: `friends` (`/friends`), `tribe` (`/tribe`), `talent` (`/talent`), `chill` (`/chill`)
  - Column 2: `content` (`/content`), `impact` (`/impact`), `team` (`/team`), `nextgen` (`/nextgen`)

### Section 1: Hero & Angled Draggable Portrait Strip

- **Canvas:** `#fcf7f0` warm paper with 4 vertical hairline columns.
- **H1:** `we just have great taste in friends` (`Inter Tight 600`, `clamp(52px, 9.4vw, 136px)`, `line-height: 0.95`, `letter-spacing: -0.01em`).
- **Hand-Drawn Callout:** A **Rough.js** royal-blue (`#3451f5`) sketchy oval circles the word `friends`.
- **Interactive Strip (`aria-roledescription="carousel"`):** An angled (`--strip-angle: -13.2deg`) horizontal conveyor of 15+ founder portrait cards (`--card-lg: 434px`) that drifts continuously and responds to GSAP `Draggable` + `InertiaPlugin` + scroll velocity.
- **Column Curtain Transition:** Staggered `#1c2121` vertical bars rise up within the 4 grid columns to shift seamlessly from light cream paper (`#fcf7f0`) into the dark editorial showcase (`#1c2121`).

### Section 2: Horizontal Marquee (`section#resources`)

- On `#1c2121` dark slate: `"from the group chat"` pinned and scrubbed horizontally on scroll, with individual letter bobbing (`SplitText`) and a Rough.js royal-blue `#3451f5` hand-drawn underline.

### Section 3: Staggered 12-Card Editorial Grid (`.editorial-section`)

- **Layout:** 12-column asymmetric staggered grid on `#1c2121`; even cards are offset downward by `margin-top: 40vh` on desktop, creating editorial breathing room and natural visual pacing.
- **Card Anatomy:** Sharp `0px` photography, overlapping `#1c2121` rectangular badge tags (`15px` uppercase, `padding: 0.65em 1.2em`), per-card `--card-color` accent, and a scroll-triggered headline (`24px`, `font-weight: 500`, `line-height: 1.25`).
- **Content Pattern (12 Founder Stories):** Each card pairs a crisp entity tag + one concrete proof tag + one sharp thesis headline, e.g.:
  - `INSIDER ONE` | `RAISED $750M`: _"AI marketing revolution: A unicorn in 50 countries"_
  - `FAL` | `RAISED $1.65B`: _"Powering the next generation of generative media applications"_
  - `BILLIONTOONE` | `NASDAQ: BLLN`: _"A Nasdaq-listed unicorn transforming prenatal diagnostics"_
  - `LOOM GAMES` | `EXIT $1.2B`: _"How Turkey’s gaming ecosystem creates global category leaders"_
  - _(plus Carbon Health, Daytona, Ubicloud, Cypher Games, Arf & Huma, Firefly, Plum, Agave Games)_

### Section 4: Interactive Matter.js Physics Footer (`footer#contact`)

- **Default Theme:** `#3451f5` royal blue with `#fcf7f0` cream ink and `rgba(255,255,255,0.15)` gridlines.
- **Top Row (`22px` uppercase, `letter-spacing: 0.02em`):**
  - Left: Live office clocks (`SAN FRANCISCO`, `LONDON`, `ISTANBUL`).
  - Center: Minimalist wireframe vector clock.
  - Right: 3 link columns (`FRIENDS/TRIBE/TALENT/CHILL`, `CONTENT/IMPACT/TEAM/NEXTGEN`, `DISCLAIMER / LINKEDIN ↗ / EMAIL ↗ / PERKHUB ↗`).
- **Bottom Physics Stage (Matter.js `<canvas>`):** Giant rigid-body `e`, `2`, `v`, `c` letter blocks resting on the footer floor. Pressing `Space` (or interacting) launches the letters upward (`R TO RESET · HOLD SPACE FOR SPACEJUMP`) and cycles `--footer-bg` (e.g., to `#E4FC53` acid lime with dark ink).

### Ambient & Subpage Behaviors

- **Custom Floating Cursor:** Displays `FOUNDER` / `COMPANY` + asterisk with GSAP `ScrambleText` on hover.
- **Idle DVD Screensaver (`.dvd-screensaver`):** Bouncing `e2vc` mark over `#1c2121` + grain overlay after idle time.
- **Subpage Pattern (`/friends`, `/friends/insider-one`):** Filterable directory (`verticals`, `status`, `funds`) and rich case-study pages with founders, office locations, YouTube/Spotify embeds, and press links.

---

## 4. Mobile (`390×844`) Behavior

- **Header & Menu:** Top bar stays compact (`e2VC` left, `MENU ✳` right); opening `MENU` gives a crisp single-column full-bleed `#1c2121` navigation screen.
- **Grid & Hero:** The 4-column grid collapses cleanly to 2 columns (1 center hairline). The Rough.js oval and angled draggable portrait strip adapt with zero horizontal scroll overflow.
- **Editorial Cards:** `margin-top: 40vh` is removed below `767px` so cards stack cleanly in one column.
- **Footer:** Live office clocks stack cleanly above wrapped link columns; keyboard-only hint (`R TO RESET · HOLD SPACE FOR SPACEJUMP`) is smartly hidden on mobile while the `e2vc` physics blocks remain visible.
- **Minor Mobile Defect Observed:** The custom `*` ScrambleText cursor indicator occasionally peeks/clips along `x=0` (`#E4FC53` asterisk at the left viewport edge) during mobile scrolling.

---

## 5. What `e2.vc`'s Style Is Actually Doing (Beyond the Surface)

The assignment asks us to _"name what its style is actually doing rather than copying the surface of it."_ Here is the functional breakdown of `e2.vc`'s design choices:

1. **Anti-Corporate Candor via Typography & Tone (`#fcf7f0` + lowercase `Inter Tight` + Rough.js ink):**  
   Venture and corporate sites typically hide behind cold dark gradients, rounded SaaS cards, and polished PR jargon. Warm editorial paper + lowercase `Inter Tight` + hand-drawn Rough.js circles simulate a human sketching in a notebook. It signals _opinionated taste and real people_, not a faceless institution.
2. **Visible Architectural Grid (`1px` `rgba(28,33,33,0.15)` 4-column scaffold) + `0px` Corners:**  
   Without the strict 4-column hairline grid and sharp `0px` corners, lowercase playful copy would feel sloppy. The grid imposes Swiss-editorial discipline, balancing casual voice with high rigor.
3. **Emotional Pacing via Polarity Shift (Warm Light Hero -> Column Curtain -> Dark Slate Proof):**
   - **Act 1 (Light `#fcf7f0`):** Approachable invitation, human faces drifting across an interactive strip (`"we just have great taste in friends"`).
   - **Act 2 (Column Curtain -> Dark `#1c2121`):** Serious substance. The staggered 40vh editorial cards force the reader to slow down and inspect concrete proof (`RAISED $750M`, `NASDAQ: BLLN`, `EXIT $1.2B`) one story at a time instead of skimming a dense grid.
4. **Playful Craft as a Talent Signal (Draggable strip + Matter.js physics footer):**  
   Nobody _needs_ a physics engine in a footer. Its real job is signaling to founders and builders: _"the people behind this site sweat small details and have fun doing serious work."_

---

## 6. Transfer Matrix: What Serves `8x.life` vs. What to Leave Behind

| `e2.vc` Element                                                               | Keep / Adapt for `8x.life`?   | Rationale                                                                                                                                                                                                                               |
| :---------------------------------------------------------------------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Warm `#fcf7f0` paper + `#1c2121` slate + `1px` 4-col grid + `0px` corners** | **Keep & Adapt**              | Replaces `8x.life`'s generic dark-glow SaaS aesthetic with sharp editorial credibility, directly harmonizing with `8x.careers`'s existing editorial cream direction.                                                                    |
| **Rough.js hand-drawn highlights (`#3451f5` or 8x accent)**                   | **Keep (Sparingly)**          | Ideal for circling or underlining key self-selection phrases (e.g., _"the right people"_, _"work you can do"_) to add human warmth.                                                                                                     |
| **Angled / Draggable Strip of Real People**                                   | **Adapt**                     | Replace `e2.vc`'s portfolio founders with real 8x builders, product sprints, and global creators, showing life inside 8x immediately above the fold.                                                                                    |
| **Column Curtain + Staggered Dark Editorial Proof Cards**                     | **Adapt**                     | Use the light-to-dark shift to transition from _"Why 8x & who belongs here"_ into concrete proof of 8x's 4 live verticals (`Social`, `LinkedIn`, `Hiring`, `Sales`) and real team stories.                                              |
| **Full-screen Menu + Mobile Parity**                                          | **Adapt (Fix `8x.life` gap)** | Gives mobile users immediate navigation (`Manifesto`, `How We Work`, `Verticals`, `Team`, `Open Roles`), fixing `8x.life`'s broken mobile nav, while keeping primary CTAs visible in the bar.                                           |
| **All-lowercase `text-transform: lowercase` everywhere**                      | **Modify / Soften**           | `e2.vc`'s lowercase works for VC coolness, but 8x's brand voice is direct, high-agency, and crisp (`"Human orchestration"`). Use natural sentence case for readability + uppercase mono/tags for structure.                             |
| **`"from the group chat"` slang & VC valuation flexes (`RAISED $X`)**         | **Leave Behind**              | VC insider phrasing alienates serious engineering/design candidates if used without substance. Replace with 8x's real candidate proof: shipped work, team expectations, and measurable business outcomes.                               |
| **Custom ScrambleText cursor & DVD idle screensaver**                         | **Leave Behind**              | The ScrambleText cursor causes mobile edge-clipping (`x=0`), and the idle DVD screensaver is pure nostalgia gimmick that adds zero clarity for a job candidate.                                                                         |
| **Heavy Matter.js Spacejump keyboard-only footer**                            | **Simplify / Reinterpret**    | Keep the tactile, memorable craft in the footer (e.g., interactive live global hubs / timezones across 8x's distributed footprint or lightweight interactive `8x` mark), without hiding critical info behind keyboard-only easter eggs. |
