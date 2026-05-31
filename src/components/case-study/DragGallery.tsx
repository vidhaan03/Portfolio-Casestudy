"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type GalleryItem = {
  src: string;
  alt?: string;
  caption?: ReactNode;
};

/**
 * Horizontal drag-to-scroll image gallery.
 *
 * - Mouse drag (pointer events) and touch swipe both supported.
 * - Snaps gently to image boundaries via CSS scroll-snap as a backup when
 *   not actively dragging.
 * - Shows a small drag affordance hint on first paint that fades after a
 *   couple of seconds.
 * - Honors prefers-reduced-motion.
 */
export function DragGallery({
  items,
  caption,
}: {
  items: GalleryItem[];
  caption?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  // Measure track width to set drag constraints.
  useEffect(() => {
    const measure = () => {
      const c = containerRef.current;
      const t = trackRef.current;
      if (!c || !t) return;
      const containerW = c.offsetWidth;
      const trackW = t.scrollWidth;
      setConstraint(-Math.max(0, trackW - containerW));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Hide the drag hint after a short delay.
  useEffect(() => {
    const id = window.setTimeout(() => setShowHint(false), 2400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <figure className="my-12 not-prose">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing touch-pan-y"
      >
        <motion.div
          ref={trackRef}
          drag={reduced ? false : "x"}
          dragConstraints={{ left: constraint, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          onDragStart={() => setShowHint(false)}
          onUpdate={(latest) => {
            // Track which image is most visible based on translateX.
            const c = containerRef.current;
            if (!c || items.length < 2) return;
            const slotWidth = c.offsetWidth * 0.78 + 16; // matches w-[78%] + gap-4
            const x = Number(latest.x) || 0;
            const idx = Math.min(
              items.length - 1,
              Math.max(0, Math.round(-x / slotWidth))
            );
            if (idx !== activeIdx) setActiveIdx(idx);
          }}
          className="flex gap-4 pl-4 pr-4 py-2"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[78%] sm:w-[62%] lg:w-[54%]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt ?? ""}
                draggable={false}
                className="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 pointer-events-none"
              />
              {item.caption && (
                <div className="mt-3 text-xs text-neutral-500 leading-relaxed px-1">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Drag hint */}
        {!reduced && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: showHint ? 1 : 0, y: showHint ? 0 : 4 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full bg-neutral-900/80 backdrop-blur px-3 py-1.5 text-xs text-white font-medium"
          >
            <span aria-hidden>←</span>
            drag
            <span aria-hidden>→</span>
          </motion.div>
        )}

        {/* Edge fades for affordance */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent"
        />
      </div>

      {/* Position dots */}
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 18 : 6,
                height: 6,
                backgroundColor: i === activeIdx ? "#3f3f46" : "#d4d4d8",
              }}
            />
          ))}
        </div>
      )}

      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
