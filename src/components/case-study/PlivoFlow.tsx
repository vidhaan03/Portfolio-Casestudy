"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Interactive Plivo campaign-lifecycle diagram.
 *
 * Preserves the sketched-on-paper SVG layout (Customer · Plivo internal ·
 * Carrier · Introduced-in-redesign tones) but makes each node hoverable:
 * the focused node scales with a halo, the others dim, connected arrows
 * highlight with a traveling dot, and a detail panel below describes the
 * focused stage.
 */

type Variant = "customer" | "internal" | "carrier" | "introduced" | "verified";

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
const CUSTOMER = "#3f3f46";
const INTERNAL = "#a1a1aa";
const CARRIER = "#a78b5b";
const INTRODUCED_FILL = "#3f3f46";
const HALO = "#3f3f46";

const NODES: Node[] = [
  {
    kind: "rect",
    id: "register",
    x: 260,
    y: 68,
    w: 200,
    h: 54,
    variant: "customer",
    label: "1 · Register Brand",
    detail:
      "Customer registers their brand with required details. Triggers the rest of the vetting pipeline.",
  },
  {
    kind: "rect",
    id: "submit",
    x: 260,
    y: 150,
    w: 200,
    h: 54,
    variant: "customer",
    label: "2 · Submit Campaign",
    detail:
      "Customer submits a campaign under their registered brand. Goes through Plivo's internal vetting, then carrier-level vetting.",
  },
  {
    kind: "rect",
    id: "vetting",
    x: 240,
    y: 232,
    w: 240,
    h: 66,
    variant: "internal",
    label: "3 · Plivo Internal Vetting",
    sub: "info cross-check · brand volume",
    detail:
      "Plivo's internal layer: cross-checks brand info against existing data, evaluates brand volume signals, runs a first-pass screen before sending the campaign upstream to the carrier.",
  },
  {
    kind: "diamond",
    id: "pass",
    cx: 360,
    cy: 369,
    size: 45,
    label: "Pass?",
    detail:
      "Decision point. If internal vetting clears, the campaign proceeds to carrier vetting. If not, it lands in the rejection path with a reason exposed inline.",
  },
  {
    kind: "rect",
    id: "carrier",
    x: 240,
    y: 444,
    w: 240,
    h: 64,
    variant: "carrier",
    label: "4 · Carrier Vetting",
    sub: "submitted via TCR",
    detail:
      "Carrier-level vetting via TCR (The Campaign Registry). Operators check the campaign against industry rules and approve or reject. This step is outside Plivo's control.",
  },
  {
    kind: "diamond",
    id: "outcome",
    cx: 360,
    cy: 579,
    size: 45,
    label: "Outcome",
    detail:
      "Three terminal outcomes: verified (live), rejected with a path to resubmit, or rejected outright.",
  },
  {
    kind: "rect",
    id: "live",
    x: 555,
    y: 555,
    w: 140,
    h: 48,
    variant: "verified",
    label: "Live / Approved",
    detail:
      "Campaign is live. Customer can start sending messages immediately.",
  },
  {
    kind: "rect",
    id: "inline",
    x: 200,
    y: 654,
    w: 320,
    h: 84,
    variant: "introduced",
    label: "5 · Inline Rejection Reason",
    sub: "shown directly below the campaign card",
    detail:
      "Introduced in the redesign. The rejection reason now sits inline with the campaign card — no collapsibles, no API lookup, no support ping. This single move killed the FDE → support → messaging-team cascade.",
  },
  {
    kind: "rect",
    id: "edit",
    x: 100,
    y: 792,
    w: 200,
    h: 64,
    variant: "introduced",
    label: "6a · Edit & Resubmit",
    sub: "fix what was flagged · resend",
    detail:
      "Introduced in the redesign. Customer can fix the specific thing that was flagged and resubmit, without starting from scratch.",
  },
  {
    kind: "rect",
    id: "archive",
    x: 420,
    y: 792,
    w: 200,
    h: 64,
    variant: "introduced",
    label: "6b · Archive",
    sub: "explicit · irreversible",
    detail:
      "Introduced in the redesign. Customers now have a way to retire old campaigns from the list. Archive is irreversible by design — explicit confirmation modal, no accidents.",
  },
];

const ARROWS: Arrow[] = [
  { d: "M 360 122 L 360 148", from: "register", to: "submit", arrowed: true },
  { d: "M 360 204 L 360 230", from: "submit", to: "vetting", arrowed: true },
  { d: "M 360 298 L 360 322", from: "vetting", to: "pass", arrowed: true },
  { d: "M 360 416 L 360 442", from: "pass", to: "carrier", arrowed: true },
  // "no" branch — pass routes around to inline rejection
  {
    d: "M 315 369 L 140 369 L 140 696 L 198 696",
    from: "pass",
    to: "inline",
    arrowed: true,
  },
  { d: "M 360 508 L 360 532", from: "carrier", to: "outcome", arrowed: true },
  {
    d: "M 405 579 L 553 579",
    from: "outcome",
    to: "live",
    arrowed: true,
  },
  {
    d: "M 360 624 L 360 652",
    from: "outcome",
    to: "inline",
    arrowed: true,
  },
  // From inline rejection, split to 6a and 6b
  { d: "M 360 738 L 360 762 L 200 762 L 200 788", from: "inline", to: "edit", arrowed: true },
  { d: "M 360 738 L 360 762 L 520 762 L 520 788", from: "inline", to: "archive", arrowed: true },
  // Loop back from 6a → Submit Campaign
  {
    d: "M 100 824 L 60 824 L 60 177 L 258 177",
    from: "edit",
    to: "submit",
    arrowed: true,
    dashed: true,
  },
];

const LEGEND = [
  { id: "customer", label: "Customer", swatchFill: "#fff", swatchStroke: CUSTOMER },
  { id: "internal", label: "Plivo internal", swatchFill: "#fff", swatchStroke: INTERNAL },
  { id: "carrier", label: "Carrier (TCR)", swatchFill: "#fff", swatchStroke: CARRIER },
  { id: "introduced", label: "Introduced in redesign", swatchFill: INTRODUCED_FILL, swatchStroke: INTRODUCED_FILL },
];

export function PlivoFlow({ caption }: { caption?: ReactNode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  const activeNode = NODES.find((n) => n.id === active);

  return (
    <figure className="my-12 not-prose">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-4 sm:p-6">
        <svg
          viewBox="0 0 720 880"
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="var(--font-caveat), cursive"
          fontSize="20"
          style={{ width: "100%", height: "auto", display: "block" }}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            <marker id="plv-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={STROKE} />
            </marker>
            <marker id="plv-arr-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={HALO} />
            </marker>
            <filter id="plv-sketch" x="-2%" y="-2%" width="104%" height="104%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.025"
                numOctaves="2"
                seed="11"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Legend */}
          <g fontSize="17" fill={STROKE}>
            {LEGEND.map((l, i) => {
              const x = 30 + i * 165;
              return (
                <g key={l.id}>
                  <rect
                    x={x}
                    y={18}
                    width={14}
                    height={14}
                    rx={3}
                    fill={l.swatchFill}
                    stroke={l.swatchStroke}
                    strokeWidth={1.5}
                  />
                  <text x={x + 22} y={32} fill={STROKE}>
                    {l.label}
                  </text>
                </g>
              );
            })}
          </g>
          <line x1="20" y1="52" x2="700" y2="52" stroke="#e5e5e5" strokeWidth="1" />

          {/* Arrows */}
          <g
            stroke={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#plv-sketch)"
          >
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
          <g filter="url(#plv-sketch)">
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
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: HALO }}
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
    customer: { fill: "#ffffff", stroke: CUSTOMER, textFill: STROKE },
    internal: { fill: "#ffffff", stroke: INTERNAL, textFill: STROKE },
    carrier: { fill: "#ffffff", stroke: CARRIER, textFill: STROKE },
    introduced: { fill: INTRODUCED_FILL, stroke: "none", textFill: "#ffffff" },
    verified: { fill: "#f5f5f5", stroke: STROKE, textFill: STROKE },
  }[node.variant];

  return (
    <>
      {/* Halo when active */}
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
      <polygon
        points={points}
        fill="#ffffff"
        stroke={INTERNAL}
        strokeWidth="1.5"
      />
      <text
        x={node.cx}
        y={node.cy + 7}
        textAnchor="middle"
        fill={STROKE}
        stroke="none"
      >
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
        markerEnd={
          arrowed
            ? highlighted
              ? "url(#plv-arr-active)"
              : "url(#plv-arr)"
            : undefined
        }
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
