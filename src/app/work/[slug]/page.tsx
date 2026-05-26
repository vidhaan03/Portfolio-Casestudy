import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import type { Metadata } from "next";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Vidhan Dubey`,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const htmlPath = `/case-studies/${cs.htmlFile ?? `${cs.slug}.html`}`;
  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article>
      {/* Header */}
      <header className="mx-auto max-w-5xl px-6 pt-16 pb-12">
        <Link
          href="/#work"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-10"
        >
          ← All work
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500 mb-4">
          <span>{cs.role}</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <span>{cs.year}</span>
          {cs.client && (
            <>
              <span className="text-neutral-300 dark:text-neutral-700">·</span>
              <span>{cs.client}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] max-w-3xl">
          {cs.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {cs.summary}
        </p>
      </header>

      {/* Embedded HTML case study */}
      <div className="w-full bg-white dark:bg-neutral-950">
        <iframe
          src={htmlPath}
          title={cs.title}
          className="block w-full border-0"
          style={{ height: "calc(100vh - 80px)", minHeight: 800 }}
          // Allow the embedded doc to size to its own content if we add a
          // postMessage handshake later. For now we give it a tall viewport.
        />
      </div>

      {/* Footer nav */}
      {next && next.slug !== cs.slug && (
        <nav className="mx-auto max-w-5xl px-6 mt-16">
          <Link
            href={`/work/${next.slug}`}
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
      )}
    </article>
  );
}
