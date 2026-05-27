import type { ReactNode } from "react";

/**
 * Reusable content primitives for case studies — all built on the same
 * Tailwind tokens as the landing page so the typography stays consistent.
 */

export function Shot({
  src,
  alt,
  label,
  caption,
  aspect = "16/10",
  size = "full",
  align = "center",
}: {
  /** Absolute path under /public, e.g. "/case-studies/mrig/tryon.jpeg". */
  src?: string;
  alt?: string;
  /** Shown only when src is missing — labeled placeholder. */
  label?: string;
  caption?: ReactNode;
  aspect?: "16/10" | "4/3" | "1/1" | "3/4";
  /** Display width. "full" fills the prose column; smaller sizes constrain it. */
  size?: "xs" | "sm" | "md" | "full";
  /** Horizontal alignment when size < full. */
  align?: "left" | "center" | "right";
}) {
  const sizeClass: Record<string, string> = {
    xs: "max-w-[200px]",
    sm: "max-w-[280px]",
    md: "max-w-[440px]",
    full: "max-w-full",
  };
  const alignClass: Record<string, string> = {
    left: "mr-auto ml-0",
    center: "mx-auto",
    right: "ml-auto mr-0",
  };

  return (
    <figure
      className={`my-10 not-prose ${sizeClass[size]} ${alignClass[align]}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label ?? ""}
          className="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40"
        />
      ) : (
        <div
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 flex items-center justify-center text-center px-6 text-sm text-neutral-500"
          style={{ aspectRatio: aspect.replace("/", " / ") }}
        >
          {label}
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

export function Pair({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {children}
    </div>
  );
}

export function Triptych({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {children}
    </div>
  );
}

export function Tile({
  src,
  alt,
  label,
  aspect = "4/3",
  showCaption = true,
}: {
  src?: string;
  alt?: string;
  label: string;
  aspect?: "16/10" | "4/3" | "1/1" | "3/4";
  showCaption?: boolean;
}) {
  return (
    <figure>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? label}
          className="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40"
        />
      ) : (
        <div
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 flex items-center justify-center text-center px-4 text-sm text-neutral-500"
          style={{ aspectRatio: aspect.replace("/", " / ") }}
        >
          {label}
        </div>
      )}
      {showCaption && (
        <figcaption className="mt-2 text-xs text-neutral-500 text-center">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

export function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: ReactNode;
}) {
  return (
    <blockquote className="my-10 border-l-2 border-neutral-900 dark:border-neutral-100 pl-6 py-1">
      <p className="text-xl sm:text-2xl font-medium tracking-tight leading-snug text-neutral-900 dark:text-neutral-100">
        {children}
      </p>
      {attribution && (
        <footer className="mt-3 text-xs uppercase tracking-[0.12em] text-neutral-500">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}

export function Diagram({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: ReactNode;
}) {
  return (
    <figure className="my-10 not-prose">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 sm:p-6 overflow-x-auto">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-500 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Callout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-10 not-prose rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-6 sm:p-8">
      <h3 className="text-base font-medium tracking-tight mb-3">{title}</h3>
      <div className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:font-medium [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-100">
        {children}
      </div>
    </aside>
  );
}

/**
 * Colored pill chip used to mark a phase / act within a section.
 * Tone defaults to amber to match the reference design.
 */
export function PhaseChip({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "violet" | "emerald" | "sky" | "rose" | "neutral";
}) {
  const tones: Record<string, string> = {
    amber:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    violet:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    neutral:
      "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  };
  return (
    <div className="not-prose mt-16 mb-3">
      <span
        className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] ${tones[tone]}`}
      >
        {children}
      </span>
    </div>
  );
}

/**
 * Impact list — items rendered with a green check circle, bold lead-in,
 * and trailing description. Used for outcomes / results.
 */
export function ImpactList({
  items,
}: {
  items: { lead: ReactNode; body?: ReactNode }[];
}) {
  return (
    <ul className="not-prose my-8 space-y-5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            aria-hidden
            className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <path d="M2.5 6.5L5 9l4.5-5.5" />
            </svg>
          </span>
          <div className="text-[17px] leading-[1.6] text-neutral-700 dark:text-neutral-300">
            <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
              {item.lead}
            </strong>
            {item.body && <> {item.body}</>}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Bold-lead list — like ImpactList but no icon, used for principles / role.
 */
export function BoldList({
  items,
}: {
  items: { lead: ReactNode; body?: ReactNode }[];
}) {
  return (
    <ul className="not-prose my-8 space-y-5">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-[17px] leading-[1.6] text-neutral-700 dark:text-neutral-300"
        >
          <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
            {item.lead}
          </strong>
          {item.body && <> {item.body}</>}
        </li>
      ))}
    </ul>
  );
}

/**
 * Quote card — gray card with handwritten-script font for the quote and a
 * muted attribution underneath.
 */
export function QuoteCard({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: ReactNode;
}) {
  return (
    <figure className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/60 p-6">
      <blockquote
        className="font-[family-name:var(--font-caveat)] text-2xl leading-[1.35] text-neutral-800 dark:text-neutral-200 [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-50"
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-sm italic text-neutral-500">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Quote grid — 2-column container for QuoteCards on desktop, stacks on mobile.
 */
export function QuoteGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

/**
 * Marker-pen highlight applied to a span of inline content. Used inside
 * BrainstormPoint or anywhere else to call out a keyword.
 */
export function Mark({
  children,
  tone = "rose",
}: {
  children: ReactNode;
  tone?: "rose" | "emerald" | "amber" | "sky" | "violet" | "yellow";
}) {
  const tones: Record<string, string> = {
    rose: "bg-rose-200/70 dark:bg-rose-500/25",
    emerald: "bg-emerald-200/70 dark:bg-emerald-500/25",
    amber: "bg-amber-200/70 dark:bg-amber-500/25",
    sky: "bg-sky-200/70 dark:bg-sky-500/25",
    violet: "bg-violet-200/70 dark:bg-violet-500/25",
    yellow: "bg-yellow-200/80 dark:bg-yellow-500/25",
  };
  return (
    <span className={`${tones[tone]} px-1.5 py-0.5 rounded-sm`}>
      {children}
    </span>
  );
}

/**
 * Brainstorm note — rounded card that mimics a handwritten brainstorm page
 * with a date+title header and (typically) two columns of points contrasted
 * via Mark highlights. Columns auto-stack on mobile.
 *
 * Usage:
 *   <BrainstormNote date="03.03.2024" title="Brainstorm — Day 3">
 *     <BrainstormColumn heading="Meeting-level">
 *       <BrainstormPoint>
 *         Focus on <Mark tone="rose">running meetings</Mark> smoothly
 *       </BrainstormPoint>
 *     </BrainstormColumn>
 *     <BrainstormColumn heading="Deal level">
 *       <BrainstormPoint>
 *         Focus on key moments that <Mark tone="emerald">move deal forward</Mark>
 *       </BrainstormPoint>
 *     </BrainstormColumn>
 *   </BrainstormNote>
 */
export function BrainstormNote({
  date,
  title,
  children,
}: {
  date?: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-8 sm:p-12 shadow-sm">
      {(date || title) && (
        <div className="flex flex-wrap items-baseline gap-3 mb-10 font-[family-name:var(--font-caveat)]">
          {date && (
            <>
              <span className="text-xl text-neutral-700 dark:text-neutral-300 underline underline-offset-4 decoration-1">
                {date}
              </span>
              {title && (
                <span className="text-neutral-400 text-xl">|</span>
              )}
            </>
          )}
          {title && (
            <span className="text-2xl text-neutral-800 dark:text-neutral-200">
              {title}
            </span>
          )}
        </div>
      )}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
        {/* Vertical divider on desktop only */}
        <div
          aria-hidden
          className="hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-neutral-200 dark:bg-neutral-800"
        />
        {children}
      </div>
    </div>
  );
}

export function BrainstormColumn({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="font-[family-name:var(--font-caveat)]">
      <h4 className="text-2xl text-neutral-800 dark:text-neutral-200 mb-5">
        {heading}
      </h4>
      <ul className="space-y-5 list-none p-0">{children}</ul>
    </div>
  );
}

export function BrainstormPoint({ children }: { children: ReactNode }) {
  return (
    <li className="text-lg sm:text-xl leading-snug text-neutral-700 dark:text-neutral-300">
      {children}
    </li>
  );
}

export function Credits({ children }: { children: ReactNode }) {
  return (
    <footer className="not-prose mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 leading-relaxed [&_strong]:font-medium [&_strong]:text-neutral-700 dark:[&_strong]:text-neutral-300">
      {children}
    </footer>
  );
}
