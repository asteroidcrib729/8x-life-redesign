"use client";

import { useEffect, useState } from "react";
import { AsteriskMark, EightXWordmark } from "./EightXMark";

const CORE_LINKS = [
  { label: "01 thesis", href: "#manifesto" },
  { label: "02 self-selection", href: "#fit" },
  { label: "03 what we ship", href: "#verticals" },
  { label: "04 how we hire", href: "#how-we-hire" },
  { label: "05 open roles", href: "#roles" },
];

const PLATFORM_LINKS = [
  {
    label: "8x.careers — apply or join",
    href: "https://www.8x.careers/join",
    tag: "HIRING",
  },
  {
    label: "8x.social — consumer creators",
    href: "https://8x.social/",
    tag: "140+ COUNTRIES",
  },
  {
    label: "8x.business — b2b voices",
    href: "https://8x.business/",
    tag: "LINKEDIN & X",
  },
  { label: "8x.sale — meeting factory", href: "https://8x.sale/", tag: "OUTBOUND" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#1c2121]/15 bg-[#fcf7f0]/92 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-16">
          <div className="flex items-center gap-4">
            <a
              href="#top"
              aria-label="8x home"
              className="inline-flex items-center gap-3 text-[#1c2121] transition-opacity hover:opacity-75"
            >
              <EightXWordmark className="text-[22px]" />
              <span className="hidden border border-[#1c2121]/20 px-2 py-0.5 font-mono text-[11px] tracking-[0.08em] text-[#1c2121]/75 uppercase sm:inline-block">
                LIFE AT 8X
              </span>
            </a>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-[14px] font-medium tracking-[-0.01em] text-[#1c2121]/80 lg:flex"
          >
            <a href="#manifesto" className="transition-colors hover:text-[#2350FF]">
              Thesis
            </a>
            <a href="#fit" className="transition-colors hover:text-[#2350FF]">
              Fit Check
            </a>
            <a href="#verticals" className="transition-colors hover:text-[#2350FF]">
              What We Ship
            </a>
            <a href="#how-we-hire" className="transition-colors hover:text-[#2350FF]">
              How We Hire
            </a>
          </nav>

          <div className="flex items-center gap-2.5 md:gap-4">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 bg-[#1c2121] px-3.5 py-2 font-mono text-[12px] tracking-[0.06em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#2350FF]"
            >
              <span>Open Roles</span>
              <span aria-hidden="true">-&gt;</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu-overlay"
              aria-label="Open menu"
              className="group inline-flex cursor-pointer items-center gap-2 border border-[#1c2121]/25 bg-[#fcf7f0] px-3 py-2 font-mono text-[12px] tracking-[0.08em] text-[#1c2121] uppercase transition-colors hover:border-[#1c2121] hover:bg-[#1c2121] hover:text-[#fcf7f0]"
            >
              <span>MENU</span>
              <AsteriskMark className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="site-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#1c2121] text-[#fcf7f0]"
        >
          <div className="mx-auto flex h-[72px] w-full max-w-[1440px] shrink-0 items-center justify-between border-b border-[#fcf7f0]/15 px-5 md:px-16">
            <div className="flex items-center gap-3">
              <EightXWordmark className="text-[22px] text-[#fcf7f0]" />
              <span className="border border-[#fcf7f0]/25 px-2 py-0.5 font-mono text-[11px] tracking-[0.08em] text-[#fcf7f0]/70 uppercase">
                INDEX
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex cursor-pointer items-center gap-2 border border-[#fcf7f0]/30 px-3.5 py-2 font-mono text-[12px] tracking-[0.08em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#fcf7f0] hover:text-[#1c2121]"
            >
              <span>CLOSE</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-12 px-5 py-10 md:grid-cols-2 md:gap-16 md:px-16 md:py-16">
            <div>
              <p className="mb-6 font-mono text-[12px] tracking-[0.1em] text-[#E4FC53] uppercase">
                Build 8x — Core Team
              </p>
              <ul className="space-y-3 md:space-y-4">
                {CORE_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[34px] leading-[1.04] font-semibold tracking-[-0.03em] text-[#fcf7f0] transition-colors hover:text-[#E4FC53] md:text-[52px]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between border-t border-[#fcf7f0]/15 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12">
              <div>
                <p className="mb-6 font-mono text-[12px] tracking-[0.1em] text-[#fcf7f0]/60 uppercase">
                  Earn on the 250k+ Platform & Live Products
                </p>
                <ul className="space-y-5">
                  {PLATFORM_LINKS.map((item) => (
                    <li key={item.href} className="border-b border-[#fcf7f0]/10 pb-4">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline justify-between gap-4"
                      >
                        <span className="text-[20px] font-medium tracking-[-0.02em] text-[#fcf7f0] transition-colors group-hover:text-[#3D7BFF] md:text-[24px]">
                          {item.label}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-[#fcf7f0]/55 uppercase group-hover:text-[#fcf7f0]">
                          {item.tag} ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border border-[#fcf7f0]/15 bg-[#fcf7f0]/[0.03] p-5">
                <p className="font-mono text-[11px] tracking-[0.08em] text-[#FFB01F] uppercase">
                  EVIDENCE-FIRST NOTE
                </p>
                <p className="mt-2 text-[15px] leading-[1.45] text-[#fcf7f0]/80">
                  We don&apos;t screen on resumes or keyword matching. Every core
                  applicant ships a real problem and walks us through how they thought
                  about it.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-[#fcf7f0]/15 px-5 py-5 font-mono text-[12px] tracking-[0.06em] text-[#fcf7f0]/60 uppercase md:px-16">
            <span>250k+ HUMANS · 50+ COUNTRIES</span>
            <span>ESC TO CLOSE</span>
          </div>
        </div>
      )}
    </>
  );
}
