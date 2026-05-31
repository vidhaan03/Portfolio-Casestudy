"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Ring + dot custom cursor.
 *
 * Two elements:
 *   - Inner dot — pinned to the exact pointer position (no spring lag).
 *   - Outer ring — follows with a gentle spring, expands when hovering
 *     interactive elements.
 *
 * Triggers (only one needs to be true):
 *   1) The pointer is hovering an element with [data-cursor-trigger].
 *   2) The user has scrolled past ~60% of the first viewport (past hero).
 *
 * mix-blend-difference makes both elements legible on light and dark
 * backgrounds without any color change. System cursor is left visible.
 * Hidden on touch / coarse-pointer devices.
 */
export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Outer ring — soft spring follows.
  const ringX = useSpring(x, { stiffness: 280, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 26, mass: 0.5 });

  // Inner dot — snappier (much higher stiffness) so it sits on the pointer.
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  const [active, setActive] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
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

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-900 dark:border-white mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: active ? 1 : 0,
          width: hoveringInteractive ? 56 : 34,
          height: hoveringInteractive ? 56 : 34,
          borderWidth: hoveringInteractive ? 1.5 : 2,
        }}
        transition={{
          opacity: { duration: 0.25 },
          width: { type: "spring", stiffness: 320, damping: 22 },
          height: { type: "spring", stiffness: 320, damping: 22 },
          borderWidth: { duration: 0.2 },
        }}
      />

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[61] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-900 dark:bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: active ? 1 : 0,
          width: hoveringInteractive ? 4 : 6,
          height: hoveringInteractive ? 4 : 6,
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
