import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/content/case-studies";

type MetaItem = { label: string; value: React.ReactNode };

export function CaseStudyLayout({
  slug,
  eyebrow,
  title,
  deck,
  meta,
  children,
}: {
  slug: string;
  eyebrow?: string;
  title: string;
  deck: React.ReactNode;
  meta: MetaItem[];
  children: React.ReactNode;
}) {
  return (
    <article>
      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pt-16 pb-12">
        <Link
          href="/#work"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-12"
        >
          ← All work
        </Link>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5 font-medium">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50">
          {title}
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed [&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-50">
          {deck}
        </p>
        <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-6 border-y border-neutral-200 dark:border-neutral-800">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[11px] uppercase tracking-[0.12em] text-neutral-500 mb-1.5">
                {m.label}
              </dt>
              <dd className="text-sm">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-6">
        <Prose>{children}</Prose>
      </div>

      <NextStudy currentSlug={slug} />
    </article>
  );
}

/**
 * Applies consistent editorial typography to all descendant content
 * (headings, paragraphs, lists) using Tailwind arbitrary variants —
 * no need for the @tailwindcss/typography plugin.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "text-[17px] leading-[1.7] text-neutral-700 dark:text-neutral-300",
        "[&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-20 [&_h2]:mb-5 [&_h2]:text-neutral-900 dark:[&_h2]:text-neutral-50",
        "[&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:mt-12 [&_h3]:mb-3 [&_h3]:text-neutral-900 dark:[&_h3]:text-neutral-50",
        "[&_p]:my-5",
        "[&_ul]:list-none [&_ul]:pl-0 [&_ul]:my-6 [&_ul]:space-y-3",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-6 [&_ol]:space-y-3",
        "[&_li]:leading-relaxed",
        "[&_strong]:font-semibold [&_strong]:text-neutral-900 dark:[&_strong]:text-neutral-50",
        "[&_em]:italic",
        "[&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-neutral-400 hover:[&_a]:decoration-neutral-900",
        "[&_hr]:my-16 [&_hr]:border-neutral-200 dark:[&_hr]:border-neutral-800",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function NextStudy({ currentSlug }: { currentSlug: string }) {
  const idx = caseStudies.findIndex((c) => c.slug === currentSlug);
  if (idx === -1 || caseStudies.length < 2) return null;
  const next: CaseStudy = caseStudies[(idx + 1) % caseStudies.length];
  if (next.slug === currentSlug) return null;

  return (
    <nav className="mx-auto max-w-3xl px-6 mt-24 mb-24">
      <Link
        href={next.href}
        className="group flex items-center justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2">
            Next case study
          </p>
          <p className="text-lg sm:text-xl font-medium tracking-tight">
            {next.title}
          </p>
        </div>
        <span className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors ml-6 shrink-0">
          →
        </span>
      </Link>
    </nav>
  );
}
