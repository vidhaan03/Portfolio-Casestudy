import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

/** Flip to true once real cover thumbnails are ready; until then every card
 *  shows an accent-colored placeholder panel. */
const SHOW_COVERS = true;

/**
 * Two-column grid of case-study cards.
 *
 * Each card: brand icon + title, a "View" affordance, a tag row (first tag
 * as an accent pill), a short description, and a large accent-tinted panel
 * with the cover screenshot floating on it. Hovering reveals an
 * "Open case study" pill. Pure CSS hover — no client JS needed.
 */
export function WorkGrid() {
  if (caseStudies.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-neutral-500">
        <p className="text-sm">No case studies yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
      {caseStudies.map((cs) => {
        const accent = cs.accent ?? "#404040";
        return (
          <Link key={cs.slug} href={cs.href} className="group flex flex-col h-full">
            {/* Title + year, with a "View" affordance. The project's accent
                appears only as a hover underline under the name — no badge,
                no colored chip. */}
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                <span className="relative inline-block">
                  {cs.shortName ?? cs.title}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out motion-reduce:transition-none"
                    style={{ backgroundColor: accent }}
                  />
                </span>
                <span className="ml-2 font-normal text-base text-neutral-400 dark:text-neutral-500">
                  {cs.year}
                </span>
                {cs.wip && (
                  <span className="ml-2 inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.1em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                    WIP
                  </span>
                )}
              </h3>
              <span className="shrink-0 inline-flex items-center gap-1 text-sm text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                View
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
            </div>

            {/* Metadata: one quiet line, role first then tags. */}
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {[cs.role, ...(cs.tags ?? [])].join("  ·  ")}
            </p>

            {/* Description — clamped to a fixed height so every card's text
                block is the same size and the panels below line up. */}
            <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 min-h-[3.25rem]">
              {cs.summary}
            </p>

            {/* Accent panel with floating cover screenshot. `mt-auto` pushes
                it to the bottom of the (equal-height) card so panels align
                across the row. */}
            <div className="mt-auto pt-5">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
                style={{ backgroundColor: accent }}
              >
              {SHOW_COVERS && cs.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cs.cover}
                  alt={`${cs.shortName ?? cs.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center px-6 text-center text-white/80 text-sm font-medium">
                  Thumbnail coming soon
                </div>
              )}

              {/* Hover: darken + CTA pill */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="rounded-full bg-black text-white text-sm font-medium px-4 py-2 shadow-lg">
                  Open case study
                </span>
              </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
