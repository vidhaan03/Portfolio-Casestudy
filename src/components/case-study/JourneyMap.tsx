"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Interactive user journey map for motion.saas.
 *
 * Shows the user's path through the product as a row of stages (Discover →
 * Trust → Type → Watch → Wow → Refine → Export → Ship). Each stage has an
 * action, a thought, a touchpoint, and an emotional valence (0–100).
 *
 * A smooth emotion curve runs underneath, with a marker dot on the active
 * stage. Hover a stage to focus it; the rest dim and the detail panel
 * swaps in the stage's action / thought / touchpoint.
 */

type Stage = {
  id: string;
  step: number;
  label: string;
  time: string;
  icon: string; // emoji
  action: string;
  thought: string;
  touchpoint: string;
  /** Emotional valence, 0–100. Drives the height of the curve dot. */
  emotion: number;
};

const STAGES: Stage[] = [
  {
    id: "discover",
    step: 1,
    label: "Discover",
    time: "0:00",
    icon: "👀",
    action: "Lands on motion.saas, reads the hero.",
    thought: "What is this? Is it real?",
    touchpoint: "Marketing site · hero",
    emotion: 30,
  },
  {
    id: "trust",
    step: 2,
    label: "Trust",
    time: "0:15",
    icon: "🧠",
    action: "Scans the 14 brand presets. Recognises Linear, Vercel, Stripe.",
    thought: "These look like real launch ads, not generic templates.",
    touchpoint: "Brand preset carousel",
    emotion: 55,
  },
  {
    id: "type",
    step: 3,
    label: "Type",
    time: "0:30",
    icon: "⌨️",
    action: "Picks an example prompt and tweaks it for their own product.",
    thought: "Okay, let me try this. Example prompts gave me the shape.",
    touchpoint: "Prompt input · example chips",
    emotion: 50,
  },
  {
    id: "watch",
    step: 4,
    label: "Watch",
    time: "0:35",
    icon: "🎬",
    action:
      "Watches the Director plan the storyboard and four specialists stream their scenes in parallel.",
    thought: "Wait — it's showing me the actual agents doing the work.",
    touchpoint: "Generation view · SSE stream",
    emotion: 70,
  },
  {
    id: "wow",
    step: 5,
    label: "Wow",
    time: "0:43",
    icon: "✨",
    action: "First cinematic ad arrives. Plays it. Plays it again.",
    thought: "Holy shit. In eight seconds.",
    touchpoint: "Studio · video preview",
    emotion: 95,
  },
  {
    id: "refine",
    step: 6,
    label: "Refine",
    time: "1:00",
    icon: "✂️",
    action:
      "Opens the Mosaic canvas. Drags a scene out, edits the cursor path on the productDemo scene.",
    thought: "I can actually fix the thing that's slightly off.",
    touchpoint: "Storyboard canvas · per-scene edit",
    emotion: 80,
  },
  {
    id: "export",
    step: 7,
    label: "Export",
    time: "1:30",
    icon: "📤",
    action: "Exports to 9:16 for Instagram, 1:1 for X, 16:9 for YouTube.",
    thought: "Three formats from one storyboard. Free.",
    touchpoint: "Studio · export menu",
    emotion: 90,
  },
  {
    id: "ship",
    step: 8,
    label: "Ship",
    time: "1:35",
    icon: "🚀",
    action: "Drops the ad in the launch tweet thread and the product page.",
    thought: "Shipping motion graphics in minutes feels illegal.",
    touchpoint: "External · launch surfaces",
    emotion: 100,
  },
];

const ACCENT = "#0e7490";
const INK = "#3f3f46";
const MUTED = "#71717a";

export function JourneyMap({ caption }: { caption?: ReactNode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const activeStage = STAGES.find((s) => s.id === active);

  return (
    <figure className="my-12 not-prose">
      <div
        className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 sm:p-6"
        onPointerLeave={() => setActive(null)}
      >
        {/* Header strip: axis labels (left) and "user happiness" legend */}
        <div className="flex items-end justify-between mb-3 px-1">
          <div className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-semibold">
            User journey · prompt → ship
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-neutral-500">
            <span>frustrated</span>
            <span className="inline-block w-10 h-px bg-gradient-to-r from-neutral-300 via-neutral-400 to-emerald-500" />
            <span>delighted</span>
          </div>
        </div>

        {/* Stage row (responsive scrolling on mobile) */}
        <div className="overflow-x-auto -mx-2">
          <div className="min-w-[860px] px-2">
            <ul className="grid grid-cols-8 gap-2">
              {STAGES.map((s) => (
                <StageCard
                  key={s.id}
                  stage={s}
                  active={active === s.id}
                  dimmed={active !== null && active !== s.id}
                  onActivate={(on) => setActive(on ? s.id : null)}
                />
              ))}
            </ul>

            {/* Emotion curve */}
            <EmotionCurve activeId={active} />

            {/* Time axis */}
            <ul className="grid grid-cols-8 gap-2 mt-1">
              {STAGES.map((s) => (
                <li
                  key={s.id}
                  className="text-center text-[10px] font-mono text-neutral-500"
                >
                  {s.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Detail panel — shows the focused stage's action / thought / touchpoint */}
      <div className="mt-4 min-h-[120px]">
        <AnimatePresence mode="wait" initial={false}>
          {activeStage ? (
            <motion.div
              key={activeStage.id}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {activeStage.step}
                </span>
                <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 font-semibold">
                  {activeStage.label} · {activeStage.time}
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <DetailField label="Action" value={activeStage.action} />
                <DetailField
                  label="Thinking"
                  value={`“${activeStage.thought}”`}
                  italic
                />
                <DetailField label="Touchpoint" value={activeStage.touchpoint} />
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-neutral-500 text-center py-6"
            >
              Hover or tap any stage to see what the user is doing,
              thinking, and where it&apos;s happening.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* --------------------------- Stage card --------------------------- */

function StageCard({
  stage,
  active,
  dimmed,
  onActivate,
}: {
  stage: Stage;
  active: boolean;
  dimmed: boolean;
  onActivate: (on: boolean) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      onPointerEnter={() => onActivate(true)}
      onPointerLeave={() => onActivate(false)}
      onFocus={() => onActivate(true)}
      onBlur={() => onActivate(false)}
      tabIndex={0}
      animate={
        reduced
          ? undefined
          : {
              opacity: dimmed ? 0.4 : 1,
              y: active ? -3 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative rounded-xl border bg-white dark:bg-neutral-900/80 py-3 px-2 text-center cursor-pointer focus:outline-none"
      style={{
        borderColor: active ? ACCENT : "rgba(0,0,0,0.1)",
        boxShadow: active ? `0 0 0 1px ${ACCENT}33` : undefined,
      }}
    >
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-500 mb-1">
        Step {String(stage.step).padStart(2, "0")}
      </div>
      <div className="text-xl leading-none mb-1.5">{stage.icon}</div>
      <div
        className="text-sm font-bold leading-tight"
        style={{ color: active ? ACCENT : INK }}
      >
        {stage.label}
      </div>
    </motion.li>
  );
}

/* --------------------------- Emotion curve --------------------------- */

function EmotionCurve({ activeId }: { activeId: string | null }) {
  const reduced = useReducedMotion();

  // Convert stages to x,y SVG points. The grid is 8 columns, ~100 wide.
  const VB_W = 800;
  const VB_H = 110;
  const PAD_X = 50;
  const PAD_Y = 12;
  const colWidth = (VB_W - 2 * PAD_X) / (STAGES.length - 1);

  const points = STAGES.map((s, i) => ({
    id: s.id,
    x: PAD_X + i * colWidth,
    y: PAD_Y + (1 - s.emotion / 100) * (VB_H - 2 * PAD_Y),
    emotion: s.emotion,
  }));

  // Build a smooth cubic Bezier path through the points.
  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1]!;
    const midX = (prev.x + p.x) / 2;
    return `${acc} C ${midX} ${prev.y}, ${midX} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  return (
    <div className="mt-4">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 110 }}
        fontFamily="var(--font-caveat), cursive"
        fontSize="14"
      >
        <defs>
          {/* Hand-drawn displacement filter — same family as the other case study SVGs */}
          <filter id="journey-sketch" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="2"
              seed="13"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="curve-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={MUTED} />
            <stop offset="0.4" stopColor={MUTED} />
            <stop offset="1" stopColor={ACCENT} />
          </linearGradient>
        </defs>

        {/* Baseline */}
        <line
          x1={PAD_X - 10}
          y1={VB_H - PAD_Y}
          x2={VB_W - PAD_X + 10}
          y2={VB_H - PAD_Y}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
        <text
          x={PAD_X - 14}
          y={PAD_Y + 4}
          textAnchor="end"
          fill={MUTED}
          fontSize="13"
        >
          high
        </text>
        <text
          x={PAD_X - 14}
          y={VB_H - PAD_Y - 2}
          textAnchor="end"
          fill={MUTED}
          fontSize="13"
        >
          low
        </text>

        {/* Sketched curve */}
        <g filter="url(#journey-sketch)" stroke="url(#curve-grad)" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d={pathD} />
        </g>

        {/* Stage dots */}
        {points.map((p) => {
          const isActive = activeId === p.id;
          return (
            <g key={p.id}>
              {/* Connector down to time axis */}
              <line
                x1={p.x}
                y1={p.y}
                x2={p.x}
                y2={VB_H - PAD_Y}
                stroke={isActive ? ACCENT : "#d4d4d8"}
                strokeWidth={isActive ? 1.2 : 0.6}
                strokeDasharray="2 3"
              />
              {/* Halo on active */}
              {isActive && !reduced && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r="9"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="1.2"
                  initial={{ opacity: 0.4, scale: 0.7 }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.6, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 5 : 3.5}
                fill={isActive ? ACCENT : "#ffffff"}
                stroke={ACCENT}
                strokeWidth="1.4"
              />
              {/* Emotion number */}
              <text
                x={p.x}
                y={p.y - 10}
                textAnchor="middle"
                fill={isActive ? ACCENT : MUTED}
                fontSize="11"
                fontFamily="ui-monospace, monospace"
                fontWeight={isActive ? 700 : 500}
              >
                {p.emotion}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* --------------------------- Detail field --------------------------- */

function DetailField({
  label,
  value,
  italic,
}: {
  label: string;
  value: string;
  italic?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500 font-semibold mb-1">
        {label}
      </div>
      <div
        className={`text-neutral-700 dark:text-neutral-300 leading-relaxed ${italic ? "italic" : ""}`}
        style={{ fontSize: 14 }}
      >
        {value}
      </div>
    </div>
  );
}
