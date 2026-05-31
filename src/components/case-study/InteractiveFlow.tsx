"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Interactive vertical flow diagram for the motion.saas case study.
 *
 * Preserves the original SVG architecture (User prompt → Director → 4
 * parallel specialists → JSON storyboard → Remotion render → output) but
 * makes each node hoverable / tappable: the focused node scales, the
 * others dim, and a detail panel below the diagram updates to describe
 * the focused stage.
 */

type Node = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  variant: "outline" | "filled" | "outlineAccent";
  label: string;
  sub?: string;
  detail: ReactNode;
};

type Arrow = { d: string; from: string; to: string };

const ACCENT = "#0e7490";
const STROKE = "#3f3f46";
const SUB = "#71717a";

const NODES: Node[] = [
  {
    id: "prompt",
    x: 220,
    y: 20,
    w: 280,
    h: 54,
    variant: "outline",
    label: "1 · User prompt + brand preset",
    detail:
      "A free-form prompt plus the brand control panel — colour, accent, vibe, typeface, aspect ratio. The example prompts on the home page double as templates so new users learn the format by clicking.",
  },
  {
    id: "director",
    x: 200,
    y: 102,
    w: 320,
    h: 74,
    variant: "filled",
    label: "2 · Director Agent",
    sub: "picks scene types · enforces schema · retries",
    detail:
      "The Director enforces the storyboard schema, picks which scene types belong in this ad, and retries any specialist whose output doesn't conform. Keeps the downstream prompts tight.",
  },
  {
    id: "kineticTitle",
    x: 10,
    y: 224,
    w: 160,
    h: 68,
    variant: "outline",
    label: "kineticTitle",
    sub: "hero copy · type animation",
    detail:
      "Specialist for the opening hero card: kinetic type, big copy, animated reveal. Returns scene JSON, not video.",
  },
  {
    id: "statReveal",
    x: 180,
    y: 224,
    w: 160,
    h: 68,
    variant: "outline",
    label: "statReveal",
    sub: "numbers · highlight stat",
    detail:
      "Specialist for stat-driven moments — numbers ticking up, KPI highlights, comparison bars. Schema-validated by the Director.",
  },
  {
    id: "productDemo",
    x: 380,
    y: 224,
    w: 160,
    h: 68,
    variant: "outline",
    label: "productDemo",
    sub: "mock UI · cursor path",
    detail:
      "Renders a mock product UI plus a scriptable cursor path with click / zoom / move pins. Lets the user author the camera through the product.",
  },
  {
    id: "ctaCard",
    x: 550,
    y: 224,
    w: 160,
    h: 68,
    variant: "outline",
    label: "ctaCard",
    sub: "closer · call-to-action",
    detail:
      "The closing scene. CTA copy, brand lockup, end-card. Tightest schema — short, opinionated, brand-locked.",
  },
  {
    id: "storyboard",
    x: 200,
    y: 334,
    w: 320,
    h: 64,
    variant: "outline",
    label: "4 · JSON Storyboard",
    sub: "a structured, editable representation of the ad",
    detail:
      "The agents hand off to each other as structured JSON, not natural language. That's what makes the pipeline debuggable and what makes the canvas editor possible.",
  },
  {
    id: "render",
    x: 200,
    y: 426,
    w: 320,
    h: 64,
    variant: "filled",
    label: "5 · React Remotion Render",
    sub: "programmatic motion · no UGC · sharp output",
    detail:
      "React Remotion renders the storyboard programmatically. No UGC, no diffusion-generated frames — every visual is code, which means the output is sharp, on-brand, fast, and stays editable as data.",
  },
  {
    id: "output",
    x: 220,
    y: 518,
    w: 280,
    h: 44,
    variant: "outlineAccent",
    label: "6 · Cinematic ad · 9:16 · 1:1 · 16:9",
    detail:
      "Editable on the Mosaic canvas afterwards. Export to vertical, square, or landscape — same source storyboard, three renders.",
  },
];

const ARROWS: Arrow[] = [
  { d: "M 360 74 L 360 100", from: "prompt", to: "director" },
  { d: "M 270 176 L 90 222", from: "director", to: "kineticTitle" },
  { d: "M 320 176 L 260 222", from: "director", to: "statReveal" },
  { d: "M 400 176 L 460 222", from: "director", to: "productDemo" },
  { d: "M 450 176 L 630 222", from: "director", to: "ctaCard" },
  // Specialists → JSON (converging lines, not arrows)
  { d: "M 90 292 L 320 332", from: "kineticTitle", to: "storyboard" },
  { d: "M 260 292 L 340 332", from: "statReveal", to: "storyboard" },
  { d: "M 460 292 L 380 332", from: "productDemo", to: "storyboard" },
  { d: "M 630 292 L 400 332", from: "ctaCard", to: "storyboard" },
  { d: "M 360 398 L 360 424", from: "storyboard", to: "render" },
  { d: "M 360 490 L 360 516", from: "render", to: "output" },
];

export function InteractiveFlow({
  caption,
}: {
  caption?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <figure className="my-12 not-prose">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 sm:p-6">
        <svg
          viewBox="0 0 720 580"
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="var(--font-caveat), cursive"
          fontSize="20"
          style={{ width: "100%", height: "auto", display: "block" }}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            <marker
              id="if-arr"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={STROKE} />
            </marker>
            <marker
              id="if-arr-accent"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={ACCENT} />
            </marker>
            <filter id="if-sketch" x="-2%" y="-2%" width="104%" height="104%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.025"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          {/* Parallel label */}
          <text
            x="360"
            y="200"
            textAnchor="middle"
            fill={SUB}
            fontSize="15"
            fontStyle="italic"
          >
            4 scene specialists · in parallel
          </text>

          {/* Arrows layer */}
          <g
            stroke={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#if-sketch)"
          >
            {ARROWS.map((arrow, i) => {
              const involves =
                active === arrow.from || active === arrow.to;
              return (
                <ArrowLine
                  key={i}
                  arrow={arrow}
                  highlighted={involves}
                  faded={active !== null && !involves}
                  reduced={!!reduced}
                />
              );
            })}
          </g>

          {/* Nodes layer */}
          <g filter="url(#if-sketch)">
            {NODES.map((node) => (
              <NodeGroup
                key={node.id}
                node={node}
                active={active === node.id}
                dimmed={active !== null && active !== node.id}
                onActivate={(on) => setActive(on ? node.id : null)}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Active-node detail panel */}
      <div className="mt-4 min-h-[88px]">
        <AnimatePresence mode="wait" initial={false}>
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-5 py-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden
                />
                <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 font-semibold">
                  {activeNode.label}
                </p>
              </div>
              <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {activeNode.detail}
              </p>
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
              Hover or tap any node to see what it does.
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

function NodeGroup({
  node,
  active,
  dimmed,
  onActivate,
}: {
  node: Node;
  active: boolean;
  dimmed: boolean;
  onActivate: (active: boolean) => void;
}) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;

  // Visual config per variant
  const fill =
    node.variant === "filled"
      ? ACCENT
      : node.variant === "outlineAccent"
      ? "#ffffff"
      : "#ffffff";
  const textColor = node.variant === "filled" ? "#ffffff" : STROKE;
  const subColor =
    node.variant === "filled" ? "rgba(255,255,255,0.78)" : SUB;
  const stroke =
    node.variant === "filled"
      ? "none"
      : node.variant === "outlineAccent"
      ? ACCENT
      : STROKE;
  const strokeWidth = node.variant === "outlineAccent" ? 1.7 : 1.5;

  return (
    <motion.g
      style={{
        cursor: "pointer",
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
      animate={{
        opacity: dimmed ? 0.35 : 1,
        scale: active ? 1.04 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onPointerEnter={() => onActivate(true)}
      onPointerLeave={() => onActivate(false)}
      onClick={() => onActivate(!active)}
    >
      {/* Glow halo when active */}
      {active && (
        <rect
          x={node.x - 4}
          y={node.y - 4}
          width={node.w + 8}
          height={node.h + 8}
          rx={14}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          opacity="0.35"
        />
      )}

      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={10}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <text
        x={cx}
        y={node.sub ? cy - 6 : cy + 8}
        textAnchor="middle"
        fill={
          node.variant === "outlineAccent" ? ACCENT : textColor
        }
        stroke="none"
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fill={subColor}
          fontSize="14"
          stroke="none"
        >
          {node.sub}
        </text>
      )}
    </motion.g>
  );
}

function ArrowLine({
  arrow,
  highlighted,
  faded,
  reduced,
}: {
  arrow: Arrow;
  highlighted: boolean;
  faded: boolean;
  reduced: boolean;
}) {
  // Only the main flow lines get arrowheads (specialists converging into the
  // storyboard read better as plain converging strokes).
  const isConverger =
    arrow.from === "kineticTitle" ||
    arrow.from === "statReveal" ||
    arrow.from === "productDemo" ||
    arrow.from === "ctaCard";

  const opacity = faded ? 0.15 : highlighted ? 1 : 0.65;
  const stroke = highlighted ? ACCENT : STROKE;

  return (
    <motion.g
      animate={{ opacity }}
      transition={{ duration: 0.2 }}
    >
      <path
        d={arrow.d}
        stroke={stroke}
        strokeWidth={highlighted ? 1.8 : 1.4}
        markerEnd={
          isConverger
            ? undefined
            : highlighted
            ? "url(#if-arr-accent)"
            : "url(#if-arr)"
        }
      />
      {/* Animated traveling dot when highlighted */}
      {highlighted && !reduced && (
        <motion.circle
          r="3"
          fill={ACCENT}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
          style={{
            offsetPath: `path("${arrow.d}")`,
          }}
        />
      )}
    </motion.g>
  );
}
