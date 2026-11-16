# `8x.life` Redesign Recording Guide (`2m 21s`)

- **`00:00 - 00:15` | Hero & Dual Path Toggle:**
  - **What:** The hero separates core software builders from the 250k+ contributor network.
  - **Why:** Live `8x.life` reads like a dark agency site that blurs both groups.
  - **How:** An instant toggle sits on `e2.vc`'s `#fcf7f0` grid beside a Rough.js `"250k+ humans"` highlight.

- **`00:15 - 00:22` | Proof Strip:**
  - **What:** This strip previews live verticals right below the hero.
  - **Why:** Visitors see shipped work early instead of marketing claims.
  - **How:** It uses native CSS scroll snap and pointer drag without heavy carousel scripts.

- **`00:22 - 00:29` | `01 / The 8x Thesis`:**
  - **What:** This `01` to `06` ledger displays all six 8x thesis statements.
  - **Why:** The original manifesto video makes those principles hard to read.
  - **How:** Each original line appears beside one concrete rule explaining how teams work.

- **`00:29 - 01:02` | `02 / Honest Filter` & Live Builder Signals:**
  - **What:** This section pairs interactive fit checks with a live builder signal feed.
  - **Why:** `8x.life` currently lacks an honest filter for candidates who prefer consensus over ambiguity.
  - **How:** Clicking principles updates the `0/3` to `3/3` verdict dynamically, while submitted proof saves to PostgreSQL via Prisma 7, `/api/signals`, and `revalidateTag`.

- **`01:02 - 01:22` | Curtain & `03 / Live Verticals`:**
  - **What:** Dark slate cards highlight 8x's four live verticals alongside expandable pipeline stages.
  - **Why:** We shifted from philosophy to proof and removed the original `"NOT UNLOCKED YET"` placeholders.
  - **How:** An `IntersectionObserver` runs a GPU `scaleY` curtain into verticals loaded directly from PostgreSQL.

- **`01:22 - 01:41` | `04 / Founders`, Hiring & Roles:**
  - **What:** This section pairs founders Jaka and Theo with three hiring steps and a roles explorer.
  - **Why:** Founder portraits alone buried `"Evidence-first hiring"` inside six unclear words.
  - **How:** Candidates filter PostgreSQL roles by department and review real problem prompts before applying.

- **`01:41 - 01:58` | Footer & Polarity Flip:**
  - **What:** The footer features live global clocks, clean copyright, and a polarity toggle.
  - **Why:** It captures `e2.vc`'s craft without `Matter.js` physics draining mobile batteries.
  - **How:** Lightweight timers tick across regions, while polarity switches `#2350FF` Cobalt to `#E4FC53` Acid Lime.

- **`01:58 - 02:21` | Mobile Parity & Production Engineering:**
  - **What:** The closing mobile view shows responsive stacking, the sticky `MENU ✳` overlay, and smooth scrolling.
  - **Why:** `8x.life` hides navigation below `820px`, and `e2.vc`'s scroll hijacking lags on phones.
  - **How:** Native scroll runs with zero overflow on Next.js 16 and Vercel, backed by CodeQL, `gitleaks`, Prettier, and CI Postgres checks.
