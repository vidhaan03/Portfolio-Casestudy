"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import type { CaseStudy } from "@/content/case-studies";

/**
 * Work-grid card with subtle 3D tilt on hover. Honors prefers-reduced-motion.
 */
export function WorkCard({
  cs,
  index,
}: {
  cs: CaseStudy;
  index: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  // Tilt — values are normalised mouse offset, -0.5..0.5
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useTransform(sx, (v) => v * 6);
  const rotateX = useTransform(sy, (v) => -v * 6);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { y: -3 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Link
          ref={ref}
          href={cs.href}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="group block h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <div
            className="aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden"
            style={cs.accent ? { backgroundColor: `${cs.accent}1A` } : undefined}
          >
            {cs.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cs.cover}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center text-2xl font-medium tracking-tight px-6 text-center"
                style={cs.accent ? { color: cs.accent } : undefined}
              >
                {cs.title}
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between gap-4 text-xs text-neutral-500 mb-2">
              <span>{cs.role}</span>
              <span>{cs.year}</span>
            </div>
            <h3 className="text-lg font-medium tracking-tight flex items-center gap-2">
              {cs.title}
              <span className="inline-block translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 text-neutral-400">
                →
              </span>
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {cs.summary}
            </p>
            {cs.tags && cs.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {cs.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </motion.div>
    </motion.li>
  );
}
