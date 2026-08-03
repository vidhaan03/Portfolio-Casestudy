"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

/**
 * Centered hero:
 * - Big headline + short intro with inline links.
 * - A row of the tools I work in, below the intro.
 *
 * Edit TOOLS to change the list. Each entry is a name + an inline SVG logo.
 */
function FigmaLogo() {
  return (
    <svg viewBox="0 0 38 57" width="12" height="18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

function ClaudeLogo() {
  // Anthropic / Claude sunburst, radial spokes in the clay brand color.
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {spokes.map((deg) => (
        <line
          key={deg}
          x1="12"
          y1="12"
          x2="12"
          y2="2.5"
          stroke="#D97757"
          strokeWidth="2.2"
          strokeLinecap="round"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
    </svg>
  );
}

function CodexLogo() {
  // OpenAI mark (Codex), adapts to text color.
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.5093-2.6115-1.4997z" />
    </svg>
  );
}

const TOOLS = [
  { name: "Figma", logo: <FigmaLogo /> },
  { name: "Claude", logo: <ClaudeLogo /> },
  { name: "Codex", logo: <CodexLogo /> },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center py-20 sm:py-28">
      <div className="max-w-2xl">
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]"
        >
          Design with attention
          <br />
          to{" "}
          <span className="relative inline-block">
            people
            <svg
              aria-hidden
              viewBox="0 0 300 24"
              preserveAspectRatio="none"
              className="absolute left-0 w-full overflow-visible"
              style={{ bottom: "-0.14em", height: "0.42em" }}
            >
              <motion.path
                d="M5 15 C 70 4 120 21 185 11 C 232 4 268 14 296 11"
                fill="none"
                stroke="#F0603A"
                strokeWidth="7"
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Hand-drawn margin note pointing back at the word. Desktop
                only; decorative, so aria-hidden. */}
            <motion.span
              aria-hidden
              className="hidden md:flex absolute left-full top-1/2 -translate-y-1/2 ml-3 items-center gap-1.5 whitespace-nowrap"
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                viewBox="0 0 60 32"
                className="w-10 h-6 overflow-visible"
                fill="none"
                stroke="#F0603A"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M57 7 C 40 5 20 11 9 22"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, delay: 1.25, ease: "easeOut" }}
                />
                <motion.path
                  d="M9 22 L 18 21 M9 22 L 13 14"
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 1.6 }}
                />
              </svg>
              <span
                className="text-2xl leading-none text-[#E24A28] -rotate-[5deg]"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                not personas
              </span>
            </motion.span>
          </span>
          .
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed"
        >
          Product designer who designs and ships end-to-end.
          <br className="hidden sm:block" />
          Currently at{" "}
          <Link
            href="/work/hoomanlabs"
            className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white transition-colors"
          >
            Hoomanlabs
          </Link>
          , previously{" "}
          <Link
            href="/work/plivo"
            className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white transition-colors"
          >
            Plivo
          </Link>
          .
        </motion.p>

        {/* Tools I use */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 mb-4">
            Tools I use
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {TOOLS.map((tool) => (
              <li
                key={tool.name}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3.5 py-1.5 text-sm text-neutral-700 dark:text-neutral-300"
              >
                <span className="inline-flex w-[18px] justify-center">
                  {tool.logo}
                </span>
                {tool.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
