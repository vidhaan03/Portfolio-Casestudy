"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Interactive horizontal flow diagram.
 *
 * Renders a sequence of "stages" laid out left-to-right with connector arrows.
 * Hovering or tapping any stage highlights it and dims the others; a small
 * animated pulse travels along each arrow when the diagram is at rest.
 *
 * One stage can be a `parallel` group, which renders as a small vertical
 * stack of agents inside the flow.
 */

export type FlowStage =
  | {
      id: string;
      title: string;
      sub?: string;
      detail?: ReactNode;
      tone?: "neutral" | "accent" | "outline";
    }
  | {
      id: string;
      title: string;
      sub?: string;
      detail?: ReactNode;
      tone: "parallel";
      children: { title: string; sub?: string }[];
    };

export function HorizontalFlow({
  stages,
  accent = "#0e7490",
  caption,
}: {
  stages: FlowStage[];
  accent?: string;
  caption?: ReactNode;
}) {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <figure className="my-12 not-prose">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 sm:p-6 overflow-x-auto">
        {/* Scrollable track. min-w forces horizontal layout even on narrow screens. */}
        <div className="flex items-stretch gap-2 sm:gap-3 min-w-max py-6 px-2">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-stretch gap-2 sm:gap-3">
              {i > 0 && (
                <Connector
                  active={active === stage.id || active === stages[i - 1].id}
                  accent={accent}
                  reduced={!!reduced}
                />
              )}
              <StageCard
                stage={stage}
                active={active === stage.id}
                dimmed={active !== null && active !== stage.id}
                accent={accent}
                onHover={(hovering) => setActive(hovering ? stage.id : null)}
              />
            </div>
          ))}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function StageCard({
  stage,
  active,
  dimmed,
  accent,
  onHover,
}: {
  stage: FlowStage;
  active: boolean;
  dimmed: boolean;
  accent: string;
  onHover: (hovering: boolean) => void;
}) {
  const tone = stage.tone ?? "neutral";

  // Base appearance per tone.
  const bg =
    tone === "accent"
      ? accent
      : tone === "outline"
      ? "#ffffff"
      : tone === "parallel"
      ? "transparent"
      : "#ffffff";
  const textColor = tone === "accent" ? "#ffffff" : "#3f3f46";
  const subColor = tone === "accent" ? "rgba(255,255,255,0.75)" : "#71717a";
  const border =
    tone === "outline"
      ? `2px solid ${accent}`
      : tone === "parallel"
      ? "none"
      : "1px solid #e4e4e7";

  return (
    <motion.div
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      tabIndex={0}
      animate={{
        opacity: dimmed ? 0.4 : 1,
        scale: active ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-xl"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      {stage.tone === "parallel" ? (
        <ParallelStack
          title={stage.title}
          sub={stage.sub}
          items={stage.children}
          accent={accent}
          active={active}
        />
      ) : (
        <div
          className="flex flex-col justify-center min-w-[150px] sm:min-w-[170px] max-w-[200px] px-4 py-4 rounded-xl shadow-sm"
          style={{
            backgroundColor: bg,
            color: textColor,
            border,
          }}
        >
          <div
            className="font-[family-name:var(--font-caveat)] text-lg sm:text-xl leading-tight"
            style={{ color: tone === "outline" ? accent : textColor }}
          >
            {stage.title}
          </div>
          {stage.sub && (
            <div
              className="font-[family-name:var(--font-caveat)] text-sm mt-1.5 leading-snug"
              style={{ color: subColor }}
            >
              {stage.sub}
            </div>
          )}
        </div>
      )}

      {/* Detail tooltip — appears when active */}
      {stage.detail && (
        <motion.div
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 4,
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-56 pointer-events-none z-10"
        >
          <div className="rounded-lg bg-neutral-900 text-white text-xs leading-snug px-3 py-2 shadow-lg">
            {stage.detail}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function ParallelStack({
  title,
  sub,
  items,
  accent,
  active,
}: {
  title: string;
  sub?: string;
  items: { title: string; sub?: string }[];
  accent: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-[180px]">
      <div className="text-center mb-1">
        <div
          className="font-[family-name:var(--font-caveat)] text-sm italic"
          style={{ color: active ? accent : "#71717a" }}
        >
          {sub ?? title}
        </div>
      </div>
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={false}
          animate={{ x: active ? [0, -2, 2, 0][i % 4] : 0 }}
          transition={{ duration: 0.5, repeat: active ? Infinity : 0, delay: i * 0.1 }}
          className="bg-white border border-neutral-200 rounded-lg px-3 py-2 shadow-sm"
        >
          <div className="font-[family-name:var(--font-caveat)] text-base text-neutral-800 leading-tight">
            {item.title}
          </div>
          {item.sub && (
            <div className="font-[family-name:var(--font-caveat)] text-xs text-neutral-500 leading-snug mt-0.5">
              {item.sub}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function Connector({
  active,
  accent,
  reduced,
}: {
  active: boolean;
  accent: string;
  reduced: boolean;
}) {
  return (
    <div className="relative flex items-center justify-center w-8 sm:w-10 shrink-0 self-center">
      <svg
        viewBox="0 0 40 12"
        className="w-full h-3"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <marker
            id={`flow-arrow-${active ? "on" : "off"}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              fill={active ? accent : "#3f3f46"}
            />
          </marker>
        </defs>
        <line
          x1="0"
          y1="6"
          x2="34"
          y2="6"
          stroke={active ? accent : "#3f3f46"}
          strokeWidth="1.4"
          strokeLinecap="round"
          markerEnd={`url(#flow-arrow-${active ? "on" : "off"})`}
        />
      </svg>
      {/* Pulse dot traveling along the arrow when at rest */}
      {!reduced && !active && (
        <motion.div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 left-0 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accent }}
          animate={{ x: ["0%", "1800%"], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 0.8,
          }}
        />
      )}
    </div>
  );
}
