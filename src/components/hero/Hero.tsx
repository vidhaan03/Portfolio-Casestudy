"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const ROTATING_WORDS = ["builds", "ships", "listens", "iterates"];
const ROTATE_INTERVAL = 2200;

/**
 * Animated hero section:
 * - Rotating word in the headline
 * - Staggered fade-up on mount
 * - Magnetic CTA buttons
 */
export function Hero() {
  const reduced = useReducedMotion();

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setWordIdx((i) => (i + 1) % ROTATING_WORDS.length),
      ROTATE_INTERVAL
    );
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28">
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-sm uppercase tracking-[0.18em] text-neutral-500 mb-6"
      >
        Vidhan Dubey
      </motion.p>

      <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-[1.05]">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          Product designer
        </motion.span>
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="block text-neutral-400 dark:text-neutral-500"
        >
          who{" "}
          <span className="group/word relative inline-block align-baseline">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={ROTATING_WORDS[wordIdx]}
                initial={reduced ? false : { y: "55%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { y: "-55%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative inline-block"
              >
                {/* Base, muted, fades out on hover */}
                <span className="transition-opacity duration-300 group-hover/word:opacity-0">
                  {ROTATING_WORDS[wordIdx]}
                </span>
                {/* Gradient overlay, fades in on hover, shimmers */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover/word:opacity-100 group-hover/word:animate-gradient-shimmer"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b, #ec4899, #8b5cf6)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  {ROTATING_WORDS[wordIdx]}
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
          .
        </motion.span>
      </h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 max-w-xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
      >
        I design and ship products end-to-end, from research and interaction
        design to shipping the front-end. Selected case studies below.
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex items-center gap-4"
      >
        <MagneticButton href="#work" variant="solid">
          See my work
        </MagneticButton>
        <MagneticButton href="mailto:vidhandubey03@gmail.com" variant="outline">
          Get in touch
        </MagneticButton>
      </motion.div>
    </section>
  );
}

function MagneticButton({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "outline";
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    x.set(dx);
    y.set(dy);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition-colors";
  const styles =
    variant === "solid"
      ? "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      : "border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900";

  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  const Inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center"
    >
      {children}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`${base} ${styles}`}
      >
        {Inner}
      </a>
    );
  }
  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`${base} ${styles}`}
    >
      {Inner}
    </Link>
  );
}
