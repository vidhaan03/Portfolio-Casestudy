"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Interactive Hoomanlabs agent-lifecycle diagram, in the same sketched-on-
 * paper style as the Plivo flow. Nodes are hoverable: the focused node
 * scales with a halo, others dim, connected arrows highlight with a
 * travelling dot, and a detail panel below describes the focused stage.
 *
 * The dark "introduced in redesign" nodes (Review call, Edit the node) are
 * the additions that turned a one-way launch into a loop.
 */

type Variant = "operator" | "system" | "introduced" | "done";

type Node =
  | {
      kind: "rect";
      id: string;
      x: number;
      y: number;
      w: number;
      h: number;
      variant: Variant;
      label: string;
      sub?: string;
      detail: ReactNode;
    }
  | {
      kind: "diamond";
      id: string;
      cx: number;
      cy: number;
      size: number;
      label: string;
      detail: ReactNode;
    };

type Arrow = {
  d: string;
  from: string;
  to: string;
  arrowed?: boolean;
  dashed?: boolean;
};

const STROKE = "#3f3f46";
const SUB = "#71717a";
const OPERATOR = "#3f3f46";
const SYSTEM = "#a1a1aa";
const INTRODUCED_FILL = "#3f3f46";
const HALO = "#3f3f46";

const NODES: Node[] = [
  {
    kind: "rect",
    id: "build",
    x: 260,
    y: 80,
    w: 200,
    h: 54,
    variant: "operator",
    label: "1 · Build agent",
    detail:
      "Start from the happy path — greet, verify, ask, close — and grow branches for the ways a real call goes sideways. Each node holds what the agent says and what it listens for.",
  },
  {
    kind: "rect",
    id: "attach",
    x: 260,
    y: 162,
    w: 200,
    h: 54,
    variant: "operator",
    label: "2 · Attach contacts",
    detail: "Upload the contact list the campaign will dial.",
  },
  {
    kind: "rect",
    id: "launch",
    x: 260,
    y: 244,
    w: 200,
    h: 54,
    variant: "operator",
    label: "3 · Launch campaign",
    detail: "Set scheduling, retries, and pacing, then go live.",
  },
  {
    kind: "rect",
    id: "live",
    x: 260,
    y: 326,
    w: 200,
    h: 54,
    variant: "system",
    label: "4 · Live calls",
    detail:
      "The agent makes calls at scale. Every call resolves to connected, dropped, or escalated.",
  },
  {
    kind: "diamond",
    id: "outcome",
    cx: 360,
    cy: 470,
    size: 48,
    label: "Outcome",
    detail:
      "Connected, dropped, or escalated. The calls that went wrong are where the loop begins.",
  },
  {
    kind: "rect",
    id: "done",
    x: 560,
    y: 446,
    w: 140,
    h: 48,
    variant: "done",
    label: "Connected",
    detail: "The call did its job. Nothing to fix.",
  },
  {
    kind: "rect",
    id: "review",
    x: 205,
    y: 580,
    w: 310,
    h: 76,
    variant: "introduced",
    label: "5 · Review call",
    sub: "transcript linked to node",
    detail:
      "Introduced in the redesign. Transcript, recording, summary, and outcome on one screen — and each transcript turn links back to the builder node that produced it.",
  },
  {
    kind: "rect",
    id: "edit",
    x: 240,
    y: 700,
    w: 240,
    h: 64,
    variant: "introduced",
    label: "6 · Edit the failed node",
    sub: "fix what failed · relaunch",
    detail:
      "Introduced in the redesign. Fix the node that failed and relaunch, without rebuilding the agent. This is the click that closes the loop.",
  },
];

const ARROWS: Arrow[] = [
  { d: "M 360 134 L 360 160", from: "build", to: "attach", arrowed: true },
  { d: "M 360 216 L 360 242", from: "attach", to: "launch", arrowed: true },
  { d: "M 360 298 L 360 324", from: "launch", to: "live", arrowed: true },
  { d: "M 360 380 L 360 420", from: "live", to: "outcome", arrowed: true },
  { d: "M 408 470 L 558 470", from: "outcome", to: "done", arrowed: true },
  { d: "M 360 518 L 360 578", from: "outcome", to: "review", arrowed: true },
  { d: "M 360 656 L 360 698", from: "review", to: "edit", arrowed: true },
  // Loop back from edit → build agent
  {
    d: "M 240 732 L 60 732 L 60 107 L 258 107",
    from: "edit",
    to: "build",
    arrowed: true,
    dashed: true,
  },
];

const LEGEND = [
  { id: "operator", label: "Operator", swatchFill: "#fff", swatchStroke: OPERATOR },
  { id: "system", label: "Live call", swatchFill: "#fff", swatchStroke: SYSTEM },
  {
    id: "introduced",
    label: "Introduced in redesign",
    swatchFill: INTRODUCED_FILL,
    swatchStroke: INTRODUCED_FILL,
  },
];

export function HoomanlabsFlow({ caption }: { caption?: ReactNode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <figure className="my-12 not-prose">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 sm:p-6">
        <svg
          viewBox="0 0 720 800"
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="var(--font-caveat), cursive"
          fontSize="20"
          style={{ width: "100%", height: "auto", display: "block" }}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            <marker id="hml-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={STROKE} />
            </marker>
            <marker id="hml-arr-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={HALO} />
            </marker>
            <filter id="hml-sketch" x="-2%" y="-2%" width="104%" height="104%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Legend */}
          <g fontSize="17" fill={STROKE}>
            {LEGEND.map((l, i) => {
              const x = 30 + i * 190;
              return (
                <g key={l.id}>
                  <rect x={x} y={18} width={14} height={14} rx={3} fill={l.swatchFill} stroke={l.swatchStroke} strokeWidth={1.5} />
                  <text x={x + 22} y={32} fill={STROKE}>
                    {l.label}
                  </text>
                </g>
              );
            })}
          </g>
          <line x1="20" y1="52" x2="700" y2="52" stroke="#e5e5e5" strokeWidth="1" />

          {/* Arrows */}
          <g stroke={STROKE} strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#hml-sketch)">
            {ARROWS.map((arrow, i) => {
              const involves = active === arrow.from || active === arrow.to;
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

          {/* Nodes */}
          <g filter="url(#hml-sketch)">
            {NODES.map((n) => (
              <NodeGroup
                key={n.id}
                node={n}
                active={active === n.id}
                dimmed={active !== null && active !== n.id}
                onActivate={(on) => setActive(on ? n.id : null)}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Detail panel */}
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
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: HALO }} aria-hidden />
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

/* ----------------------------- Sub-components ----------------------------- */

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
  return (
    <motion.g
      style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "center" }}
      animate={{ opacity: dimmed ? 0.35 : 1, scale: active ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onPointerEnter={() => onActivate(true)}
      onPointerLeave={() => onActivate(false)}
      onClick={() => onActivate(!active)}
    >
      {node.kind === "rect" ? (
        <RectNode node={node} active={active} />
      ) : (
        <DiamondNode node={node} active={active} />
      )}
    </motion.g>
  );
}

function RectNode({
  node,
  active,
}: {
  node: Extract<Node, { kind: "rect" }>;
  active: boolean;
}) {
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;

  const variantStyles = {
    operator: { fill: "#ffffff", stroke: OPERATOR, textFill: STROKE },
    system: { fill: "#ffffff", stroke: SYSTEM, textFill: STROKE },
    introduced: { fill: INTRODUCED_FILL, stroke: "none", textFill: "#ffffff" },
    done: { fill: "#f5f5f5", stroke: STROKE, textFill: STROKE },
  }[node.variant];

  return (
    <>
      {active && (
        <rect
          x={node.x - 4}
          y={node.y - 4}
          width={node.w + 8}
          height={node.h + 8}
          rx={14}
          fill="none"
          stroke={HALO}
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
        fill={variantStyles.fill}
        stroke={variantStyles.stroke === "none" ? undefined : variantStyles.stroke}
        strokeWidth={variantStyles.stroke === "none" ? 0 : 1.5}
      />
      <text
        x={cx}
        y={node.sub ? cy - 6 : cy + 7}
        textAnchor="middle"
        fill={variantStyles.textFill}
        stroke="none"
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fill={node.variant === "introduced" ? "#d4d4d4" : SUB}
          fontSize="14"
          stroke="none"
        >
          {node.sub}
        </text>
      )}
    </>
  );
}

function DiamondNode({
  node,
  active,
}: {
  node: Extract<Node, { kind: "diamond" }>;
  active: boolean;
}) {
  const points = `${node.cx},${node.cy - node.size} ${node.cx + node.size},${node.cy} ${node.cx},${node.cy + node.size} ${node.cx - node.size},${node.cy}`;

  return (
    <>
      {active && (
        <polygon
          points={`${node.cx},${node.cy - node.size - 5} ${node.cx + node.size + 5},${node.cy} ${node.cx},${node.cy + node.size + 5} ${node.cx - node.size - 5},${node.cy}`}
          fill="none"
          stroke={HALO}
          strokeWidth="1.5"
          opacity="0.35"
        />
      )}
      <polygon points={points} fill="#ffffff" stroke={SYSTEM} strokeWidth="1.5" />
      <text x={node.cx} y={node.cy + 7} textAnchor="middle" fill={STROKE} stroke="none">
        {node.label}
      </text>
    </>
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
  const opacity = faded ? 0.15 : highlighted ? 1 : 0.65;
  const stroke = highlighted ? HALO : STROKE;
  const arrowed = arrow.arrowed !== false;

  return (
    <motion.g animate={{ opacity }} transition={{ duration: 0.2 }}>
      <path
        d={arrow.d}
        stroke={stroke}
        strokeWidth={highlighted ? 1.8 : 1.4}
        strokeDasharray={arrow.dashed ? "6 5" : undefined}
        markerEnd={arrowed ? (highlighted ? "url(#hml-arr-active)" : "url(#hml-arr)") : undefined}
      />
      {highlighted && !reduced && (
        <motion.circle
          r="3"
          fill={HALO}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
          style={{ offsetPath: `path("${arrow.d}")` }}
        />
      )}
    </motion.g>
  );
}
