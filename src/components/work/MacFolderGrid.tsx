"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

/**
 * macOS-style window containing the case-studies grid as classic Mac
 * folder icons. Each folder is clickable and navigates to its case study.
 */
export function MacFolderGrid({ title = "vidhan's work" }: { title?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl bg-neutral-50/95 backdrop-blur shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] border border-neutral-200 dark:border-neutral-800 overflow-hidden"
    >
      {/* Title bar */}
      <div className="relative flex items-center px-4 h-10 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57] ring-1 ring-[#E04A45]/40" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E] ring-1 ring-[#E0A024]/40" />
          <span className="w-3 h-3 rounded-full bg-[#28C840] ring-1 ring-[#1AAD2C]/40" />
        </div>
        <div className="absolute inset-x-0 text-center text-sm text-neutral-700 dark:text-neutral-200 font-medium pointer-events-none">
          {title}
        </div>
      </div>

      {/* Folder grid */}
      <div className="p-8 sm:p-12 bg-white dark:bg-neutral-950">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4 sm:gap-x-8 justify-items-center">
          {caseStudies.map((cs, i) => (
            <MacFolder key={cs.slug} cs={cs} index={i} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MacFolder({
  cs,
  index,
  reduced,
}: {
  cs: CaseStudy;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full max-w-[140px]"
    >
      <Link
        href={cs.href}
        className="group flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100"
      >
        <motion.div
          whileHover={reduced ? undefined : { y: -3, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="origin-bottom"
        >
          <FolderIcon />
        </motion.div>
        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center leading-tight">
          {cs.shortName ?? cs.title}
        </span>
      </Link>
    </motion.div>
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
        {/* Darker back panel with tab */}
        <linearGradient id="mac-folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
        {/* Lighter front pocket */}
        <linearGradient id="mac-folder-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CB7F1" />
          <stop offset="1" stopColor="#5EA3E8" />
        </linearGradient>
        {/* Subtle highlight on the front pocket */}
        <linearGradient id="mac-folder-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="0.4" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Back panel: tab on top-left, slope into the rest of the top edge */}
      <path
        d="M 4 14 Q 4 10 8 10 L 28 10 L 32 6 Q 33.5 4.5 35.5 4.5 L 72 4.5 Q 76 4.5 76 8.5 L 76 56 Q 76 60 72 60 L 8 60 Q 4 60 4 56 Z"
        fill="url(#mac-folder-back)"
      />

      {/* Front pocket: starts a bit below the top, rounded all around */}
      <path
        d="M 4 22 L 76 22 L 76 56 Q 76 60 72 60 L 8 60 Q 4 60 4 56 Z"
        fill="url(#mac-folder-front)"
      />

      {/* Highlight on the front pocket */}
      <path
        d="M 4 22 L 76 22 L 76 30 L 4 30 Z"
        fill="url(#mac-folder-shine)"
        opacity="0.8"
      />
    </svg>
  );
}
