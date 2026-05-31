"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Site-wide custom cursor.
 *
 * Renders a magic blob + fading trail that fades in only when:
 *   1) The pointer is hovering an element with [data-cursor-trigger], OR
 *   2) The user has scrolled past ~60% of the first viewport (past the hero)
 *
 * The system cursor is left alone — this layer is additive ornamentation.
 * Hidden on coarse (touch) pointers.
 */
export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Main blob: snappy spring, leads the trail.
  const mainX = useSpring(x, { stiffness: 480, damping: 30, mass: 0.4 });
  const mainY = useSpring(y, { stiffness: 480, damping: 30, mass: 0.4 });

  // Trail dots: progressively softer springs so they lag behind.
  const t1x = useSpring(x, { stiffness: 280, damping: 26, mass: 0.5 });
  const t1y = useSpring(y, { stiffness: 280, damping: 26, mass: 0.5 });
  const t2x = useSpring(x, { stiffness: 180, damping: 24, mass: 0.6 });
  const t2y = useSpring(y, { stiffness: 180, damping: 24, mass: 0.6 });
  const t3x = useSpring(x, { stiffness: 110, damping: 22, mass: 0.7 });
  const t3y = useSpring(y, { stiffness: 110, damping: 22, mass: 0.7 });
  const t4x = useSpring(x, { stiffness: 70, damping: 20, mass: 0.8 });
  const t4y = useSpring(y, { stiffness: 70, damping: 20, mass: 0.8 });

  const [active, setActive] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices entirely.
    const mq = window.matchMedia("(pointer: fine)");
    setSupported(mq.matches);
    const onChange = () => setSupported(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!supported) return;

    let scrolledPastHero = false;
    let hoveringTrigger = false;

    const recompute = () => setActive(scrolledPastHero || hoveringTrigger);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onScroll = () => {
      scrolledPastHero = window.scrollY > window.innerHeight * 0.6;
      recompute();
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !("closest" in t)) return;
      hoveringTrigger = !!t.closest("[data-cursor-trigger]");
      const interactive = !!t.closest(
        'a, button, [role="button"], [data-cursor-interactive]'
      );
      setHoveringInteractive(interactive);
      recompute();
    };

    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerover", onOver);
    };
  }, [supported, x, y]);

  if (!supported) return null;

  const baseFade = active ? 1 : 0;

  return (
    <>
      {/* Trail dots — slower springs, smaller, more transparent toward the tail */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/30"
        style={{ x: t4x, y: t4y, width: 6, height: 6 }}
        animate={{ opacity: baseFade * 0.35 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/40"
        style={{ x: t3x, y: t3y, width: 8, height: 8 }}
        animate={{ opacity: baseFade * 0.5 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/50"
        style={{ x: t2x, y: t2y, width: 10, height: 10 }}
        animate={{ opacity: baseFade * 0.65 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 dark:bg-white"
        style={{ x: t1x, y: t1y, width: 12, height: 12 }}
        animate={{ opacity: baseFade * 0.8 }}
        transition={{ duration: 0.25 }}
      />

      {/* Main blob — leads, expands on interactive targets */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[61] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 dark:bg-white mix-blend-difference"
        style={{ x: mainX, y: mainY }}
        animate={{
          opacity: baseFade,
          width: hoveringInteractive ? 36 : 14,
          height: hoveringInteractive ? 36 : 14,
        }}
        transition={{
          opacity: { duration: 0.25 },
          width: { type: "spring", stiffness: 320, damping: 22 },
          height: { type: "spring", stiffness: 320, damping: 22 },
        }}
      />
    </>
  );
}
