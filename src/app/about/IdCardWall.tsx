"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Three bespoke "ID badges" — one per place Vidhan has been. Each badge
 * has its own visual identity, layout, and contents — not a shared
 * template. Cards lay on a desk slightly rotated; hover to straighten.
 */
export function IdCardWall() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const cards = [
    <MotionBadge key="motion" />,
    <PlivoBadge key="plivo" />,
    <MrigBadge key="mrig" />,
  ];

  const REST_ROTATIONS = [-5, 2.5, -1.5];

  return (
    <div className="relative -mx-2 sm:mx-0">
      <div
        className="rounded-3xl p-6 sm:p-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,0,0,0.05), transparent 60%), linear-gradient(180deg, #f4ede0, #ece3d0)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-3 flex-wrap sm:flex-nowrap">
          {cards.map((node, i) => (
            <motion.div
              key={i}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              initial={false}
              animate={
                reduced
                  ? undefined
                  : {
                      rotate: active === i ? 0 : REST_ROTATIONS[i],
                      y: active === i ? -10 : 0,
                      opacity: active !== null && active !== i ? 0.55 : 1,
                      scale: active === i ? 1.04 : 1,
                    }
              }
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              tabIndex={0}
              className="relative flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 rounded-xl"
              style={{ zIndex: active === i ? 10 : 5 - i }}
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   BADGE 1 — motion.saas · Founder pass
   Aesthetic: dark, code-editor-coded, terminal cursor, contribution graph
   ================================================================== */

function MotionBadge() {
  return (
    <BadgeShell tetherColor="#0e7490">
      <article
        className="relative w-[220px] rounded-xl overflow-hidden font-sans select-none"
        style={{
          background:
            "linear-gradient(180deg, #0c1014 0%, #161b22 100%)",
          color: "#e6edf3",
          boxShadow:
            "0 18px 40px -15px rgba(0,0,0,0.5), 0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Lanyard hole */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-2 w-7 h-2.5 rounded-full bg-neutral-700/70"
        />

        {/* Top status bar — like a code editor titlebar */}
        <div className="pt-7 pb-2 px-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
            <span className="w-2 h-2 rounded-full bg-[#28C840]" />
          </div>
          <div className="text-[8px] font-mono opacity-50 tracking-wider">
            ~/founder
          </div>
        </div>

        {/* Identity block — terminal-like */}
        <div className="p-3 font-mono text-[10px] leading-snug">
          <div className="text-[#7ee787]">
            <span className="opacity-50">$</span> whoami
          </div>
          <div className="text-[#e6edf3] mt-0.5">
            <span className="text-[#79c0ff]">vidhan</span>
            <span className="opacity-60">@</span>
            <span className="text-[#d2a8ff]">motion.saas</span>
          </div>

          <div className="mt-2 text-[#7ee787]">
            <span className="opacity-50">$</span> role
          </div>
          <div className="mt-0.5 text-[#e6edf3] flex items-center gap-1">
            FOUNDER · DESIGNER · BUILDER
            <span className="inline-block w-1.5 h-2.5 bg-[#79c0ff] animate-pulse" />
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-3 pb-3 grid grid-cols-3 gap-1.5">
          <Stat n="20" l="AGENTS" />
          <Stat n="8s" l="RENDER" />
          <Stat n="14" l="BRANDS" />
        </div>

        {/* Contribution graph — pseudo GitHub heatmap */}
        <div className="px-3 pb-3">
          <div className="text-[7px] font-mono uppercase tracking-[0.18em] text-white/40 mb-1.5">
            Contributions · last 30 days
          </div>
          <div
            className="grid gap-[2px]"
            style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
          >
            {Array.from({ length: 30 }).map((_, i) => {
              // Deterministic intensity
              const h = (i * 73 + 19) % 5;
              const colors = [
                "rgba(255,255,255,0.06)",
                "#0e4429",
                "#006d32",
                "#26a641",
                "#39d353",
              ];
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[1px]"
                  style={{ backgroundColor: colors[h] }}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 flex items-center justify-between text-[8px] font-mono tracking-wider border-t border-white/10"
          style={{ backgroundColor: "#0a0d12" }}
        >
          <span className="text-[#7ee787]">● live</span>
          <span className="text-white/50">github.com/vidhaan03</span>
        </div>
      </article>
    </BadgeShell>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div
      className="rounded-md px-1.5 py-1 text-center"
      style={{ backgroundColor: "rgba(126,231,135,0.08)" }}
    >
      <div className="text-[15px] font-bold leading-tight text-[#7ee787]">
        {n}
      </div>
      <div className="text-[6px] uppercase tracking-[0.16em] text-white/50 leading-tight mt-0.5">
        {l}
      </div>
    </div>
  );
}

/* ==================================================================
   BADGE 2 — Plivo · Designer pass
   Aesthetic: corporate office ID with Plivo brand green, signal bars
   ================================================================== */

function PlivoBadge() {
  const PLIVO_GREEN = "#2DC899";
  const PLIVO_NAVY = "#0F1733";
  return (
    <BadgeShell tetherColor={PLIVO_NAVY}>
      <article
        className="relative w-[220px] rounded-xl overflow-hidden font-sans select-none bg-white"
        style={{
          boxShadow:
            "0 18px 40px -15px rgba(15,23,51,0.35), 0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Lanyard hole */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-2 w-7 h-2.5 rounded-full bg-neutral-200 border border-neutral-300 z-10"
        />

        {/* Top brand band */}
        <div
          className="pt-7 pb-3 px-3 text-white relative"
          style={{ backgroundColor: PLIVO_NAVY }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-block w-5 h-5 rounded-full"
                style={{ backgroundColor: PLIVO_GREEN }}
              />
              <span className="text-[14px] font-bold tracking-[0.06em]">
                plivo
              </span>
            </div>
            <div className="flex items-end gap-[2px]" aria-hidden>
              <span className="w-[3px] h-1.5 rounded-sm" style={{ backgroundColor: PLIVO_GREEN }} />
              <span className="w-[3px] h-2.5 rounded-sm" style={{ backgroundColor: PLIVO_GREEN }} />
              <span className="w-[3px] h-3.5 rounded-sm" style={{ backgroundColor: PLIVO_GREEN }} />
              <span className="w-[3px] h-4 rounded-sm" style={{ backgroundColor: PLIVO_GREEN }} />
            </div>
          </div>
          <div className="text-[8px] tracking-[0.18em] opacity-60 mt-1.5">
            EMPLOYEE ACCESS · BENGALURU
          </div>
        </div>

        {/* Photo + name */}
        <div className="p-3 grid grid-cols-[64px_1fr] gap-3">
          <div
            className="aspect-square flex items-center justify-center bg-neutral-100"
            style={{ border: `2px solid ${PLIVO_GREEN}` }}
          >
            <span
              className="font-[family-name:var(--font-caveat)] text-3xl"
              style={{ color: PLIVO_NAVY }}
            >
              VD
            </span>
          </div>
          <div>
            <div className="text-[7px] uppercase tracking-[0.16em] text-neutral-500 font-medium">
              Designer
            </div>
            <div
              className="text-[14px] font-bold leading-tight mt-0.5"
              style={{ color: PLIVO_NAVY }}
            >
              VIDHAN DUBEY
            </div>
            <div className="text-[9px] text-neutral-600 leading-snug mt-1">
              CX Platform
              <br />
              Messaging · Compliance
            </div>
          </div>
        </div>

        {/* Access levels — like real corporate badge */}
        <div className="px-3 pb-3">
          <div className="text-[7px] uppercase tracking-[0.16em] text-neutral-500 font-medium mb-1.5">
            Access · Authorisations
          </div>
          <div className="flex flex-wrap gap-1">
            {[
              { label: "PROD", on: true },
              { label: "STG", on: true },
              { label: "DESIGN", on: true },
              { label: "10DLC", on: true },
              { label: "FDE", on: true },
              { label: "HR", on: false },
            ].map((a) => (
              <span
                key={a.label}
                className="text-[7px] font-mono font-bold px-1.5 py-[1px] rounded-sm"
                style={{
                  backgroundColor: a.on ? PLIVO_GREEN : "#f3f4f6",
                  color: a.on ? "white" : "#9ca3af",
                  opacity: a.on ? 1 : 0.6,
                }}
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-3 py-2 flex items-center justify-between text-[7px] font-mono tracking-wider border-t"
          style={{ borderColor: "#e5e7eb", backgroundColor: "#fafafa" }}
        >
          <span className="text-neutral-500">EMP · PLV-2024-042</span>
          <span style={{ color: PLIVO_NAVY }} className="font-bold">
            ✓ VERIFIED
          </span>
        </div>
      </article>
    </BadgeShell>
  );
}

/* ==================================================================
   BADGE 3 — Mrig AI · Co-founder pass
   Aesthetic: festival-style red + gold, Devanagari, perforated stub
   ================================================================== */

function MrigBadge() {
  const MRIG_RED = "#9a1b1b";
  const MRIG_GOLD = "#d4a849";
  return (
    <BadgeShell tetherColor={MRIG_RED}>
      <article
        className="relative w-[220px] rounded-xl overflow-hidden font-sans select-none"
        style={{
          background: `linear-gradient(180deg, ${MRIG_RED} 0%, #6d0f0f 100%)`,
          color: "white",
          boxShadow:
            "0 18px 40px -15px rgba(154,27,27,0.5), 0 4px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Lanyard hole */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-2 w-7 h-2.5 rounded-full bg-white/20"
        />

        {/* Gold ornamental top band */}
        <div
          className="pt-7 pb-2 px-3 flex items-center justify-between"
          style={{
            borderBottom: `1px dashed ${MRIG_GOLD}`,
          }}
        >
          <div>
            <div
              className="text-[16px] font-bold leading-none"
              style={{
                color: MRIG_GOLD,
                fontFamily: "'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif",
              }}
            >
              मृग
            </div>
            <div
              className="text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5"
              style={{ color: MRIG_GOLD }}
            >
              Mrig AI
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-[7px] tracking-[0.16em] uppercase opacity-70"
              style={{ color: MRIG_GOLD }}
            >
              Founder pass
            </div>
            <div className="text-[14px] font-bold leading-none mt-0.5">
              No. 002
            </div>
          </div>
        </div>

        {/* Decorative gold ornament */}
        <div className="flex justify-center py-2" aria-hidden>
          <svg viewBox="0 0 60 10" className="w-20 h-3">
            <path
              d="M 0 5 L 22 5 M 28 5 C 28 2, 32 2, 32 5 C 32 8, 28 8, 28 5 M 38 5 L 60 5"
              stroke={MRIG_GOLD}
              strokeWidth="0.6"
              fill="none"
            />
            <circle cx="30" cy="5" r="1.5" fill={MRIG_GOLD} />
          </svg>
        </div>

        {/* Photo with circular frame */}
        <div className="px-3 flex justify-center mb-2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-white/95"
            style={{ border: `2px solid ${MRIG_GOLD}` }}
          >
            <span
              className="font-[family-name:var(--font-caveat)] text-4xl"
              style={{ color: MRIG_RED }}
            >
              VD
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="px-3 text-center">
          <div className="text-[15px] font-bold tracking-wider">
            VIDHAN DUBEY
          </div>
          <div className="text-[9px] opacity-80 mt-0.5">
            Co-builder · Designer
          </div>
        </div>

        {/* Field strip */}
        <div className="px-3 mt-3">
          <div
            className="grid grid-cols-2 gap-2 text-[8px] py-2"
            style={{ borderTop: `1px dashed ${MRIG_GOLD}`, borderBottom: `1px dashed ${MRIG_GOLD}` }}
          >
            <div>
              <div
                className="text-[7px] uppercase tracking-[0.16em] opacity-60"
                style={{ color: MRIG_GOLD }}
              >
                Founded
              </div>
              <div className="font-mono font-bold">2025</div>
            </div>
            <div className="text-right">
              <div
                className="text-[7px] uppercase tracking-[0.16em] opacity-60"
                style={{ color: MRIG_GOLD }}
              >
                Live on
              </div>
              <div className="font-mono font-bold">iOS · ANDROID</div>
            </div>
          </div>
        </div>

        {/* Perforated tear-off stub */}
        <div
          className="mt-2 px-3 py-2 flex items-center justify-between text-[8px] tracking-wider"
          style={{
            borderTop: `1px dashed ${MRIG_GOLD}`,
            backgroundColor: "rgba(0,0,0,0.18)",
          }}
        >
          <div className="text-left">
            <div
              className="text-[7px] uppercase tracking-[0.18em] opacity-60"
              style={{ color: MRIG_GOLD }}
            >
              Stub · keep
            </div>
            <div className="font-mono font-bold mt-0.5">MRG-2025-002</div>
          </div>
          <div
            className="font-[family-name:var(--font-caveat)] text-lg leading-none"
            style={{ color: MRIG_GOLD }}
          >
            Aniket × Vidhan
          </div>
        </div>
      </article>
    </BadgeShell>
  );
}

/* ==================================================================
   Shared lanyard shell (clip + tether), wraps each badge
   ================================================================== */

function BadgeShell({
  children,
  tetherColor,
}: {
  children: React.ReactNode;
  tetherColor: string;
}) {
  return (
    <div className="relative" style={{ width: 220 }}>
      <div className="relative flex justify-center mb-1" aria-hidden>
        <svg viewBox="0 0 60 36" className="w-14 h-9">
          {/* Carabiner */}
          <rect
            x="20"
            y="2"
            width="20"
            height="10"
            rx="2"
            fill="#9ca3af"
            stroke="#6b7280"
            strokeWidth="0.6"
          />
          <rect
            x="22"
            y="4"
            width="16"
            height="6"
            rx="1"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="0.6"
          />
          {/* Tether — coloured per badge */}
          <rect
            x="26"
            y="12"
            width="8"
            height="14"
            fill={tetherColor}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="0.4"
          />
          {/* Hook */}
          <path d="M 26 26 L 26 30 L 34 30 L 34 26" fill="#9ca3af" />
        </svg>
      </div>
      {children}
    </div>
  );
}
