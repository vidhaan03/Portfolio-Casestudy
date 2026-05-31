"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * Hero email card: a big copy-to-clipboard pill + a clear "Compose email"
 * mailto button. Shows a transient "Copied" confirmation when the address
 * is copied.
 */
export function ContactClient({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for very old browsers — open mailto.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Reveal delay={0.05}>
      <div className="mt-12">
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-4 font-medium">
          Email
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={copy}
            className="group relative flex-1 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 px-5 py-4 text-left hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <span className="text-base sm:text-lg font-mono text-neutral-900 dark:text-neutral-50 truncate">
              {email}
            </span>
            <span className="relative shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={reduced ? false : { scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={reduced ? { opacity: 0 } : { scale: 0, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 480, damping: 22 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CheckIcon />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={reduced ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { scale: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <CopyIcon />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            {/* Tooltip — "Copied" / "Click to copy" */}
            <motion.span
              aria-live="polite"
              initial={false}
              animate={{
                opacity: copied ? 1 : 0,
                y: copied ? -2 : 4,
              }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute -top-2 right-4 -translate-y-full px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium"
            >
              Copied
            </motion.span>
          </button>

          <a
            href={`mailto:${email}`}
            className="inline-flex h-auto sm:h-auto items-center justify-center rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-4 sm:py-0 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
          >
            Compose email →
          </a>
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          Reply within 1–2 days. Drop a short note, no formal pitch needed.
        </p>
      </div>
    </Reveal>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
