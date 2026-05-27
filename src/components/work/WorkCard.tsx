"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Folder-style case-study card.
 *
 * Visual: a single-color folder body with a notched top (L-shape — left
 * half is the "tab", the right half steps down). A stack of paper documents
 * is fanned out behind the folder, with the case study's cover image
 * acting as one of the peeking sheets.
 */
export function WorkCard({
  cs,
  index,
}: {
  cs: CaseStudy;
  index: number;
}) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Spring values for subtle parallax on the peeking documents.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 180, damping: 22, mass: 0.5 });
  const spy = useSpring(py, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    px.set((e.clientX - cx) * 0.018);
    py.set((e.clientY - cy) * 0.018);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const indexLabel = String(index + 1).padStart(2, "0");
  const folderColor = cs.accent ?? "#1f2937";

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        ref={cardRef}
        href={cs.href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-4 rounded-2xl"
      >
        {/* Folder + paper stack — compact, capped width, left-aligned */}
        <div className="relative w-full max-w-[300px] mx-auto">
          {/* Papers fanned out behind the folder (back to front) */}
          <motion.div
            style={{ x: spx, y: spy }}
            className="absolute inset-0 z-0"
            aria-hidden
          >
            {/* Back paper — plain */}
            <div className="absolute top-1 right-0 w-[55%] aspect-[3/4] rounded-md bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 rotate-[10deg] origin-bottom-left transition-transform duration-500 ease-out group-hover:rotate-[14deg] group-hover:-translate-y-1" />
            {/* Middle paper — plain with subtle lines */}
            <div className="absolute top-1 right-3 w-[55%] aspect-[3/4] rounded-md bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 rotate-[5deg] origin-bottom-left transition-transform duration-500 ease-out group-hover:rotate-[8deg] group-hover:-translate-y-2 overflow-hidden">
              <div className="p-2.5 space-y-1.5">
                <div className="h-1 w-3/4 bg-neutral-200 rounded-full" />
                <div className="h-1 w-2/3 bg-neutral-200 rounded-full" />
                <div className="h-1 w-1/2 bg-neutral-200 rounded-full" />
              </div>
            </div>
            {/* Front paper — the case study cover image */}
            {cs.cover && (
              <div className="absolute top-0 right-6 w-[55%] aspect-[3/4] rounded-md bg-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5 rotate-[1deg] origin-bottom-left overflow-hidden transition-transform duration-500 ease-out group-hover:rotate-[3deg] group-hover:-translate-y-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cs.cover}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>

          {/* Folder structure */}
          <div className="relative z-10">
            {/* Tab — left half on top */}
            <div
              aria-hidden
              className="h-9 w-[55%] rounded-t-2xl"
              style={{ backgroundColor: folderColor }}
            />
            {/* Body — full width, rounded except top-left where tab meets it */}
            <motion.div
              whileHover={reduced ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="relative rounded-2xl rounded-tl-none aspect-square p-5 text-white flex flex-col justify-between shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]"
              style={{ backgroundColor: folderColor }}
            >
              {/* Top: tags */}
              <div className="flex flex-wrap gap-x-2.5 gap-y-1 pr-[40%]">
                {cs.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Bottom: number + label */}
              <div>
                <div className="text-[52px] font-bold leading-none tracking-tight">
                  {indexLabel}
                </div>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/65">
                  {cs.client ?? cs.role}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Info below the folder */}
        <div className="mt-6 max-w-[300px] mx-auto">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 mb-2">
            <span>{cs.role}</span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span>{cs.year}</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-snug">
            {cs.title}
          </h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {cs.summary}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Read case study
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
