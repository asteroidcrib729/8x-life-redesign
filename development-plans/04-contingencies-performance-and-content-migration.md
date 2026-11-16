# Contingencies: Differentiation, 60fps Mobile Performance & Content Migration

> **Purpose:** Address the three critical execution risks before writing application code:
>
> 1. **Differentiation:** Avoiding the "generic `e2.vc` reskin" trap that dozens of other Product Designer applicants will submit.
> 2. **Performance & Mobile Parity:** Eliminating the scroll lag observed on both live sites (`8x.life` and `e2.vc`), especially on smartphones.
> 3. **Content Continuity:** Auditing every string, metric, link, and section from `8x.life` so content is explicitly **Kept As-Is**, **Updated**, or **Phased Out**.

---

## 1. Standing Out From Other Redesign Submissions

Since every Product Designer applicant receives the same prompt (_"`8x.life` redesigned in the style of `e2.vc`"_), reviewers will see dozens of submissions that copy `e2.vc`'s `#fcf7f0` cream background, `#3451f5` blue, lowercase `Inter Tight`, and a Rough.js circle around `"the human company"`.

### What Will Look Like Every Other Applicant (Avoid)

- Swapping `8x.life`'s copy verbatim onto `e2.vc`'s layout without fixing the underlying candidate confusion.
- Leaving `"Earn with 8x"` ambiguous or keeping `"8X EMAIL / 8X GLOBAL, NOT UNLOCKED YET"`.
- Adding gratuitous Matter.js physics or custom ScrambleText cursors that lag on mobile just to imitate `e2.vc`.
- Presenting static Figma frames only, where recruiters cannot feel the responsive layout, interaction craft, or performance discipline.

### How Our Submission Stands Out (Mapped to Judging Criteria)

1. **Analysis, Solves the Core Structural Confusion (`Core Team` vs. `250k+ Platform`):**
   - Explicitly separates **Build 8x (Core Team: Engineering, Design, Operations)** from **Earn on the 8x Platform (Creators & Sales Talent)** right in the hero and navigation, with an interactive **Path Switcher / Filter** so the wrong audience self-routes immediately instead of bouncing or applying blindly.
2. **Judgement, Real Self-Selection + Removal of Dead Weight:**
   - Adds a sharp, honest **"Thrives here / Self-select out"** section grounded in how a lean, evidence-first company operates.
   - Cuts the `"NOT UNLOCKED YET"` teaser block completely and elevates `"Evidence-first hiring"` from a 6-word bullet into a clear 3-step explanation of what candidates are signing up for.
3. **Craft, Live, Silky-Smooth Hosted Build + Intentional Restraint:**
   - Ships a **live, public, zero-lag responsive web prototype** (tested at `1440×900` and `390×844`) that feels _faster_ and _more cohesive_ than either reference site, proving Product Design + front-end execution craft simultaneously.
   - Includes a subtle **"Design Rationale / Inspection Mode" toggle** (optional corner pill or cleanly separated) OR razor-sharp interactive micro-states (draggable/touch-scrollable proof strip, live global timezone strip, hover/focus card reveals) that feel purposeful rather than decorative. _(Note: Keep the main page 100% shippable as a real `8x.life` homepage, avoid cluttering the product UI with meta-notes unless toggled off by default.)_

---

## 2. Performance Contingency Plan (Why Both Sites Lagged & How We Prevent It)

### Observed Bottlenecks in the Live Sites

Based on our browser/DOM inspection, the scroll lag you felt comes from specific architectural choices:

- **On `8x.life`:**
  - Four overlapping full-viewport multi-stop radial gradient `.ground` layers continuously animating `scale(1) -> 1.09` (`19s` loop) over a tiled `grain.webp` overlay, forcing constant large-area GPU compositing/blending.
  - Sticky hero scaling (`scale: calc(1 - var(--c) * .055)`) + sticky `16:9` Manifesto stage simultaneously running a foreground `<video>` (`crowd.webm`), wiping `silk-*.webp` textures, mirrored reflection transforms, and `clip-path: polygon(...)` stepped transitions.
- **On `e2.vc`:**
  - **Locomotive Scroll 5.0.1** (JavaScript scroll-jacking intercepts native wheel/touch momentum, which almost always feels sluggish or rubbery on trackpads and mobile).
  - **Heavy GSAP stack (`ScrollTrigger` + `SplitText` + `DrawSVG` + `ScrambleText` + `Draggable`)** running hundreds of per-character DOM spans and scroll-linked scrub timelines simultaneously.
  - **Continuous Matter.js `<canvas>` physics simulation** in the footer + mousemove listener for the custom ScrambleText cursor.

### Engineering Rules & Mobile Fallbacks for Our Redesign

| Surface / Technique           | Desktop (`>= 768px`, fine pointer)                                                                                                                                                                                                  | Mobile (`< 768px` / `pointer: coarse`) & `prefers-reduced-motion`                                                                                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Scrolling Engine**          | **100% native browser scroll** (zero Locomotive Scroll / zero scroll-jacking).                                                                                                                                                      | **100% native touch inertia**; zero scroll event listeners blocking the main thread.                                                                                            |
| **Animated Properties**       | Strictly GPU-composited **`transform` and `opacity`** (`will-change` applied sparingly only during active transition). Never animate `top`, `left`, `margin`, `height`, `blur`, or large `clip-path` per scroll frame.              | Reduced motion distances (`translateY(12px) -> 0`); instant settle once revealed (`once: true` `IntersectionObserver`).                                                         |
| **Column Curtain Transition** | Lightweight `IntersectionObserver` + CSS/WAAPI `transform: scaleY()` on 4 clean `<div>` bars (no heavy continuous scrub recalculation).                                                                                             | Clean immediate polarity transition or simple fade/border rule, zero heavy curtain occlusion over touch content.                                                                |
| **Angled Human/Proof Strip**  | CSS/pointer drag or gentle paused-when-offscreen ticker using `translate3d`, auto-pausing whenever not in viewport (`IntersectionObserver`) or `document.hidden`.                                                                   | **Native horizontal touch-scroll (`overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch`)**, zero JS drag physics fighting mobile swipe gestures. |
| **Rough.js Ink Highlights**   | Render 2-3 crisp lightweight inline `<svg>` paths once on mount (not redrawn on scroll/resize loops).                                                                                                                               | Pre-computed static responsive SVG paths (`viewBox` scaled), zero runtime Rough.js canvas/DOM churn on mobile.                                                                  |
| **Interactive Footer**        | Optional lightweight interactive `8x` block / hub clock strip rendered **only when footer enters viewport** (`IntersectionObserver` pause/resume), no continuous `requestAnimationFrame` running while reading the top of the page. | Static tactile `8x` typographic composition + live hub clocks (updated once every 30-60s, not every frame).                                                                     |
| **Assets & Fonts**            | `next/font` self-hosted variable subsets (`Inter Tight`, `Geist Mono`, `Newsreader` italic accents); compressed WebP media with explicit `aspect-ratio` / `width` / `height` for `0` CLS.                                           | Responsive `srcset` image sizes (`<= 800px` wide on mobile), lazy-loaded below the fold (`loading="lazy"`).                                                                     |
| **Target Metrics**            | Lighthouse Performance `>= 95`, `0` CLS, steady `60fps+` scroll.                                                                                                                                                                    | Lighthouse Mobile Performance `>= 90`, zero horizontal overflow (`scrollWidth <= clientWidth` at `390px`).                                                                      |

---

## 3. Content Migration & Disposition Matrix (`8x.life` -> Redesign)

Every piece of existing content from `8x.life` (and verified sister-site facts) is assigned a clear disposition: **KEEP AS-IS**, **UPDATE / REFRAME**, or **PHASE OUT**.

### A. Navigation & Brand Identity

| Original Element (`8x.life`)                                     | Disposition    | Redesign Plan & Rationale                                                                                                                                                                                  |
| :--------------------------------------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `8x` serif SVG wordmark                                          | **KEEP AS-IS** | Core brand anchor; preserves continuity with `8x.life` and `8x.careers`.                                                                                                                                   |
| Header links: `Manifesto`, `Team`, `Jobs` (hidden on `<= 820px`) | **UPDATE**     | Keep visible on desktop (`Thesis`, `Culture`, `Verticals`, `How We Hire`, `Open Roles`) AND expose a real `MENU ✳` full-screen overlay on mobile (`390px`) so mobile navigation actually works.            |
| `Earn with 8x` CTA pill -> `8x.careers/join`                     | **UPDATE**     | Split into primary **`Open team roles ->`** (`8x.careers/join` core team) and secondary **`Earn on platform`** (`Join the platform`), eliminating the ambiguity between core staff and marketplace talent. |

### B. Hero & Positioning

| Original Element (`8x.life`)                         | Disposition             | Redesign Plan & Rationale                                                                                                                                                                                |
| :--------------------------------------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `THE HUMAN COMPANY`                                  | **KEEP / REFRAME**      | Keep `"The Human Company"` as the crisp brand identity/eyebrow or anchor, paired with a human, candid editorial H1 explaining _what_ 8x builds and _who_ should apply.                                   |
| `HUMAN ORCHESTRATION FOR BUSINESS OUTCOMES`          | **UPDATE**              | Translate from corporate jargon into concrete builder language: what 8x's software + orchestration engine actually does across creators, B2B demand, hiring, and sales.                                  |
| `250k+ humans managed in marketing and engineering.` | **KEEP (WITH CONTEXT)** | Retain the verified scale metric (`250k+` humans), but clarify that a **lean core team** builds the orchestration systems powering those `250k+` people, so candidates understand the leverage they get. |
| `50+ countries`                                      | **KEEP AS-IS**          | Retain verified global footprint stat; ensure it never clips at the `844px` mobile fold.                                                                                                                 |
| Cycling 4-color blurred radial `.ground` + grain     | **PHASE OUT**           | Replace with `e2.vc`'s high-contrast `#fcf7f0` warm paper + `1px` 4-column grid for readability and zero GPU lag; preserve the 4 vertical colors as sharp editorial tags/accents.                        |

### C. Manifesto Section

| Original Element (`8x.life`)                                                                       | Disposition   | Redesign Plan & Rationale                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 6 Manifesto statements (`AI is changing the world` ... `Implications are global and generational`) | **UPDATE**    | **Keep all 6 core ideas** (they are intellectually strong)but move them out of the passive `16:9` dark cinema video box into a scannable `01`-`06` editorial ledger where each statement connects directly to _why builders join 8x_. |
| `crowd.webm` + `silk-*.webp` + mirrored floor reflection                                           | **PHASE OUT** | Main source of scroll/GPU heaviness and low text-over-video legibility on smaller viewports; replaced with typographic clarity + candid human photography strip.                                                                      |

### D. Verticals (`#work`)

| Original Element (`8x.life`)                                                                                                                                                      | Disposition          | Redesign Plan & Rationale                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **8x Social** (`REAL PEOPLE. REAL REACH.`, `140+ countries`, `Consumer brands. TikTok, Instagram, YouTube.`, `8x.social`)                                                         | **UPDATE**           | Preserve exact brand name, `140+ countries` proof, and `https://8x.social/` link; reframe inside a staggered `#1c2121` editorial card showing the _product & engineering challenge_ (matching, attribution, global payouts at `140+` country scale) + `#3D7BFF` accent tag. |
| **8x LinkedIn** (`THE VOICES BUYERS TRUST.`, `B2B creators on LinkedIn and X`, `8x.business`)                                                                                     | **UPDATE**           | Preserve copy & `https://8x.business/` link; present as staggered dark card with `#7A5CFF` accent tag, highlighting B2B creator distribution & demand mechanics.                                                                                                            |
| **8x Hiring** (`GET HIRED FOR THE WORK YOU CAN DO.`, `Evidence-first hiring, at 8x and partner companies.`, `8x.careers`)                                                         | **UPDATE & ELEVATE** | Keep the exact slogan (`Get hired for the work you can do`) and `https://www.8x.careers/` link, AND promote the `"Evidence-first hiring"` concept into its own dedicated candidate transparency section right before the final CTA.                                         |
| **8x Sales** (`QUALIFIED MEETINGS, ON YOUR CALENDAR.`, `01 LEADS -> 02 DIALS -> 03 CONNECTS -> 04 BOOKED -> 05 SHOWED UP AND QUALIFIED`, `Outbound and cold calling.`, `8x.sale`) | **KEEP & ADAPT**     | Keep the brilliant `"The meeting factory"` `01 -> 05` funnel taxonomy and `https://8x.sale/` link; restyle the tilted pills into crisp `0px` architectural sequence tags on the `#1c2121` card (`#12B5D6` accent).                                                          |
| **Locked Verticals** (`8X EMAIL`, `8X GLOBAL`, `NOT UNLOCKED YET.`)                                                                                                               | **PHASE OUT**        | Dead placeholder content hurts credibility on a hiring page. Candidates want to see real teams shipping real products, not locked video-game teaser screens.                                                                                                                |
| Full-bleed neon color washes + `clip-path` stepped cutouts                                                                                                                        | **PHASE OUT**        | Replaced by `e2.vc`'s column-curtain polarity shift into `#1c2121` dark slate, using each vertical's signature color strictly as crisp `0px` badge/hover accents.                                                                                                           |

### E. Missing Content Added in Redesign (New Sections)

| New Content Block                            | Source / Grounding                                                                                                           | Purpose                                                                                                        |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| **Right for you / Self-select out**          | Assignment Brief mandate (_"make the right people want to work here and give the wrong people a reason to self-select out"_) | Filters out hierarchy-seekers, slide-deck builders, and low-agency candidates before they waste anyone's time. |
| **How We Hire (Evidence-First 3-Step Flow)** | Synthesized from `8x.careers/about` + `8x Hiring` (`"Get hired for the work you can do"`) + this assignment's format         | Demystifies the application (work samples -> timed real-world assignment -> walkthrough of _why_).             |

### F. Team & Footer

| Original Element (`8x.life`)                                                                                                                           | Disposition              | Redesign Plan & Rationale                                                                                                                                                                         |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `JAKA BAVDEK` (`Co-founder, CEO`, `jakabavdek.com`) & `THEO BUI` (`Co-founder, CTO`, `theobui.com`)                                                    | **KEEP & CONTEXTUALIZE** | Keep exact names, titles, and verified personal URLs; integrate them cleanly into the Team + Culture section rather than isolated giant billboards.                                               |
| `We're hiring.` + small amber circle button                                                                                                            | **UPDATE**               | Upgrade into a decisive closing conversion block (`Core Team Roles` vs `Platform Network`) with clear expectations.                                                                               |
| Footer tagline (`Human orchestration for business outcomes.`), `COMPANY` & `VERTICALS` links, LinkedIn (`linkedin.com/company/8x-human/`), `© 2026 8x` | **KEEP & RESTYLE**       | Carry forward every single verified link and legal line into an `e2.vc`-inspired `#2350FF` royal-cobalt editorial footer with live distributed hub clocks and lightweight interactive `8x` craft. |
| Halftone mountain landscape (`mist-ink.webp`, `mist-aux.png`)                                                                                          | **PHASE OUT**            | Doesn't align with `e2.vc`'s sharp architectural grid + interactive typographic footer; phased out in favor of crisp grid typography + lightweight `8x` interactive mark.                         |
