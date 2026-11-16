"use client";

import { useState } from "react";

export interface RoleItem {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  engagement: string;
  whyHard: string;
  proofPrompt: string;
  applyUrl: string;
}

export function RolesExplorer({ roles }: { roles: RoleItem[] }) {
  const departments = ["All", ...Array.from(new Set(roles.map((r) => r.department)))];
  const [selected, setSelected] = useState("All");

  const filtered =
    selected === "All" ? roles : roles.filter((role) => role.department === selected);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2121]/15 pb-5">
        <div>
          <p className="font-mono text-[12px] tracking-[0.08em] text-[#2350FF] uppercase">
            OPEN PATHS · CORE TEAM VS. PLATFORM
          </p>
          <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-[#1c2121] md:text-[38px]">
            Where you fit right now.
          </h3>
        </div>

        <div
          role="tablist"
          aria-label="Filter roles by department"
          className="flex flex-wrap gap-2"
        >
          {departments.map((dept) => {
            const active = selected === dept;
            return (
              <button
                key={dept}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(dept)}
                className={`cursor-pointer border px-3 py-1.5 font-mono text-[11px] tracking-[0.06em] uppercase transition-colors ${
                  active
                    ? "border-[#1c2121] bg-[#1c2121] text-[#fcf7f0]"
                    : "border-[#1c2121]/25 bg-[#fcf7f0] text-[#1c2121] hover:border-[#1c2121]"
                }`}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map((role) => {
          const isPlatform = role.department === "Platform Network";
          return (
            <article
              key={role.id}
              className={`flex flex-col justify-between border p-6 transition-colors ${
                isPlatform
                  ? "border-[#1c2121]/30 bg-[#1c2121]/[0.03]"
                  : "border-[#1c2121] bg-[#fcf7f0]"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 font-mono text-[11px] tracking-[0.07em] uppercase ${
                      isPlatform
                        ? "border border-[#1c2121]/30 text-[#1c2121]"
                        : "bg-[#FFB01F] font-semibold text-[#1c2121]"
                    }`}
                  >
                    {role.department}
                  </span>
                  <span className="font-mono text-[11px] text-[#1c2121]/60 uppercase">
                    {role.engagement}
                  </span>
                </div>

                <h4 className="mt-4 text-[24px] leading-[1.12] font-semibold tracking-[-0.02em] text-[#1c2121]">
                  {role.title}
                </h4>
                <p className="mt-1 font-mono text-[12px] text-[#1c2121]/60">
                  {role.location}
                </p>

                <p className="mt-4 text-[15px] leading-[1.55] text-[#1c2121]/80">
                  {role.whyHard}
                </p>
              </div>

              <div className="mt-6 border-t border-[#1c2121]/15 pt-4">
                <p className="font-mono text-[11px] tracking-[0.06em] text-[#1c2121]/55 uppercase">
                  WHAT WE ASK FIRST
                </p>
                <p className="mt-1 text-[14px] font-medium text-[#1c2121]">
                  {role.proofPrompt}
                </p>
                <a
                  href={role.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-[#1c2121] px-4 py-2 font-mono text-[12px] tracking-[0.06em] text-[#fcf7f0] uppercase transition-colors hover:bg-[#2350FF]"
                >
                  <span>
                    {isPlatform ? "Join 250k+ Platform" : "Apply via 8x.careers"}
                  </span>
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
