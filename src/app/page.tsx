import { caseStudies } from "@/content/case-studies";
import { Hero } from "@/components/hero/Hero";
import { WorkCard } from "@/components/work/WorkCard";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <Hero />

      {/* Work */}
      <section id="work" className="pb-24 scroll-mt-20">
        <Reveal>
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3 font-medium">
                Selected work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Case studies
              </h2>
            </div>
            <span className="text-sm text-neutral-500 pb-1">
              {String(caseStudies.length).padStart(2, "0")} total
            </span>
          </div>
        </Reveal>

        {caseStudies.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-neutral-500">
              <p className="text-sm">
                No case studies yet. Add entries to{" "}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900">
                  src/content/case-studies.ts
                </code>
                .
              </p>
            </div>
          </Reveal>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            {caseStudies.map((cs, i) => (
              <WorkCard key={cs.slug} cs={cs} index={i} />
            ))}
          </ul>
        )}
      </section>

      {/* About */}
      <section id="about" className="pb-32 scroll-mt-20 max-w-2xl">
        <Reveal>
          <h2 className="text-2xl font-medium tracking-tight mb-6">About</h2>
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              I&apos;m Vidhan, a product designer who codes. I care about the
              small details that turn a working product into one people
              actually enjoy using.
            </p>
            <p>
              Reach me at{" "}
              <a
                href="mailto:vidhandubey03@gmail.com"
                className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white"
              >
                vidhandubey03@gmail.com
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
