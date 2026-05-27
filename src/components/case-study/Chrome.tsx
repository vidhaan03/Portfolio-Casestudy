import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

export function BackLink() {
  return (
    <Link
      href="/#work"
      className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
    >
      ← All work
    </Link>
  );
}

export function NextStudy({ currentSlug }: { currentSlug: string }) {
  const idx = caseStudies.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || caseStudies.length < 2) return null;
  const next: CaseStudy = caseStudies[(idx + 1) % caseStudies.length];
  if (next.slug === currentSlug) return null;

  return (
    <nav className="mx-auto max-w-5xl px-6 mt-16 mb-24">
      <Link
        href={next.href}
        className="group flex items-center justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
            Next case study
          </p>
          <p className="text-xl font-medium tracking-tight">{next.title}</p>
        </div>
        <span className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
          →
        </span>
      </Link>
    </nav>
  );
}
