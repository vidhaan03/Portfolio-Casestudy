"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

/**
 * macOS-style window containing the case-studies grid as classic Mac
 * folder icons.
 *
 * Window-level interactivity:
 *   - Red traffic light: shake (can't close my work)
 *   - Yellow traffic light: minimise / restore (collapse the content area
 *     to just the title bar)
 *   - Green traffic light: toggle expanded (slightly larger window)
 *   - Drag from the title bar to reposition the whole window within its
 *     section
 *
 * Folder-level interactivity:
 *   - Folder lifts + scales on hover
 *   - Quirky sticky notes spring out around each folder on hover
 *
 * Honours prefers-reduced-motion (drag + spring animations are disabled).
 */

const STICKY_POSITIONS = [
  { x: 110, y: -50, r: 6, tone: "yellow" },
  { x: -110, y: -20, r: -7, tone: "pink" },
  { x: 100, y: 60, r: 4, tone: "mint" },
  { x: -90, y: 70, r: -5, tone: "sky" },
] as const;

const TONE_CLASSES: Record<string, string> = {
  yellow: "bg-yellow-200 text-yellow-900",
  pink: "bg-pink-200 text-pink-900",
  mint: "bg-emerald-200 text-emerald-900",
  sky: "bg-sky-200 text-sky-900",
};

export function MacFolderGrid({ title = "vidhan's work" }: { title?: string }) {
  const reduced = useReducedMotion();
  const dragControls = useDragControls();

  const [minimised, setMinimised] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shakeId, setShakeId] = useState(0);

  return (
    <motion.div
      drag={reduced ? false : true}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
      dragElastic={0.18}
      dragMomentum={false}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      animate={{
        scale: expanded ? 1.03 : 1,
        // Shake effect — keyframes triggered by shakeId
        x: shakeId > 0 && !reduced ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        scale: { type: "spring", stiffness: 260, damping: 22 },
        x: { duration: 0.5, ease: "easeInOut" },
      }}
      // Key on shakeId so the keyframe re-runs on each red click
      key={`win-${shakeId}`}
      className="relative rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] border border-neutral-200 dark:border-neutral-800"
    >
      {/* Title bar — drag handle */}
      <div
        onPointerDown={(e) => {
          if (reduced) return;
          dragControls.start(e);
        }}
        className="relative flex items-center px-4 h-10 rounded-t-2xl border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 cursor-grab active:cursor-grabbing select-none"
        title="Drag to move"
      >
        <div className="flex gap-1.5">
          <TrafficLight
            color="red"
            label="Close"
            glyph={<CloseGlyph />}
            onClick={() => setShakeId((id) => id + 1)}
          />
          <TrafficLight
            color="yellow"
            label="Minimise"
            glyph={<MinimiseGlyph />}
            onClick={() => setMinimised((m) => !m)}
          />
          <TrafficLight
            color="green"
            label={expanded ? "Restore" : "Expand"}
            glyph={<ExpandGlyph />}
            onClick={() => setExpanded((e) => !e)}
          />
        </div>
        <div className="absolute inset-x-0 text-center text-sm text-neutral-700 dark:text-neutral-200 font-medium pointer-events-none">
          {title}
        </div>
      </div>

      {/* Content area — collapses when minimised */}
      <AnimatePresence initial={false}>
        {!minimised && (
          <motion.div
            key="window-content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 240, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden rounded-b-2xl bg-white dark:bg-neutral-950"
          >
            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 sm:gap-x-8 justify-items-center">
                {caseStudies.map((cs, i) => (
                  <MacFolder
                    key={cs.slug}
                    cs={cs}
                    index={i}
                    reduced={!!reduced}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------- Window chrome bits ------------------------- */

function TrafficLight({
  color,
  label,
  glyph,
  onClick,
}: {
  color: "red" | "yellow" | "green";
  label: string;
  glyph: React.ReactNode;
  onClick: () => void;
}) {
  const palette = {
    red: { fill: "#FF5F57", ring: "#E04A45" },
    yellow: { fill: "#FEBC2E", ring: "#E0A024" },
    green: { fill: "#28C840", ring: "#1AAD2C" },
  }[color];

  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className="group/light relative w-3 h-3 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: palette.fill, boxShadow: `inset 0 0 0 1px ${palette.ring}40` }}
    >
      <span className="opacity-0 group-hover/light:opacity-100 transition-opacity text-[8px] text-neutral-900/80 leading-none">
        {glyph}
      </span>
    </button>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 8 8" className="w-1.5 h-1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 2L6 6M6 2L2 6" />
    </svg>
  );
}
function MinimiseGlyph() {
  return (
    <svg viewBox="0 0 8 8" className="w-1.5 h-1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 4H6" />
    </svg>
  );
}
function ExpandGlyph() {
  return (
    <svg viewBox="0 0 8 8" className="w-1.5 h-1.5" fill="currentColor">
      <path d="M2.5 2H5L2 5V2.5z M5.5 6H3l3-3v2.5z" />
    </svg>
  );
}

/* ------------------------- Folders ------------------------- */

function MacFolder({
  cs,
  index,
  reduced,
}: {
  cs: CaseStudy;
  index: number;
  reduced: boolean;
}) {
  const [hovering, setHovering] = useState(false);
  const folderRef = useRef<HTMLDivElement>(null);
  const quirks = cs.quirks ?? [];

  return (
    <motion.div
      ref={folderRef}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      className="relative w-full max-w-[140px]"
    >
      <Link
        href={cs.href}
        className="group flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100"
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : hovering
              ? { y: -3, scale: 1.04 }
              : { y: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="origin-bottom"
        >
          <FolderIcon />
        </motion.div>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center leading-tight">
          {cs.shortName ?? cs.title}
        </span>
      </Link>

      {/* Sticky-note quirks — rendered in a portal so they paint above any
          container clipping (the Mac window's content area is clipped for
          the minimise animation). */}
      <StickyNoteLayer
        hovering={hovering && !reduced}
        anchorRef={folderRef}
        quirks={quirks}
        slug={cs.slug}
      />
    </motion.div>
  );
}

function StickyNoteLayer({
  hovering,
  anchorRef,
  quirks,
  slug,
}: {
  hovering: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  quirks: string[];
  slug: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  // Only render the portal after mount (avoids SSR mismatch).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track the folder's screen position while hovering, so stickers stay
  // anchored if the user drags the window or scrolls the page.
  useEffect(() => {
    if (!hovering) return;
    let raf = 0;
    const tick = () => {
      const el = anchorRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovering, anchorRef]);

  if (!mounted || quirks.length === 0) return null;

  return createPortal(
    <AnimatePresence>
      {hovering &&
        origin &&
        quirks.map((q, i) => {
          const pos =
            STICKY_POSITIONS[Math.min(i, STICKY_POSITIONS.length - 1)];
          return (
            <motion.div
              key={`${slug}-quirk-${i}`}
              aria-hidden
              style={{
                position: "fixed",
                top: origin.y,
                left: origin.x,
                zIndex: 9999,
                pointerEvents: "none",
              }}
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: pos.x,
                y: pos.y,
                rotate: pos.r,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                x: 0,
                y: 0,
                rotate: 0,
                transition: { duration: 0.18 },
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                delay: i * 0.06,
              }}
            >
              {/* Inner div centers the sticker on the motion-translated point */}
              <div
                style={{ transform: "translate(-50%, -50%)" }}
                className={`px-3.5 py-1.5 rounded-lg shadow-[0_8px_20px_-8px_rgba(0,0,0,0.25)] text-[12px] font-medium tracking-tight whitespace-nowrap select-none ${TONE_CLASSES[pos.tone]}`}
              >
                {q}
              </div>
            </motion.div>
          );
        })}
    </AnimatePresence>,
    document.body
  );
}

function FolderIcon() {
  return (
    <svg
      viewBox="0 0 80 64"
      className="w-20 h-16"
      style={{ filter: "drop-shadow(0 6px 10px rgba(59,130,246,0.25))" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="mac-folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="mac-folder-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CB7F1" />
          <stop offset="1" stopColor="#5EA3E8" />
        </linearGradient>
        <linearGradient id="mac-folder-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="0.4" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path
        d="M 4 14 Q 4 10 8 10 L 28 10 L 32 6 Q 33.5 4.5 35.5 4.5 L 72 4.5 Q 76 4.5 76 8.5 L 76 56 Q 76 60 72 60 L 8 60 Q 4 60 4 56 Z"
        fill="url(#mac-folder-back)"
      />
      <path
        d="M 4 22 L 76 22 L 76 56 Q 76 60 72 60 L 8 60 Q 4 60 4 56 Z"
        fill="url(#mac-folder-front)"
      />
      <path
        d="M 4 22 L 76 22 L 76 30 L 4 30 Z"
        fill="url(#mac-folder-shine)"
        opacity="0.8"
      />
    </svg>
  );
}
