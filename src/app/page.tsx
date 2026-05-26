import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <p className="text-sm uppercase tracking-[0.18em] text-neutral-500 mb-6">
          Vidhan Dubey
        </p>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-[1.05]">
          Product designer
          <br />
          <span className="text-neutral-400 dark:text-neutral-500">
            who builds.
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I design and ship products end-to-end — from research and interaction
          design to shipping the front-end. Selected case studies below.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="#work"
            className="inline-flex h-10 items-center rounded-full bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
          >
            See my work
          </Link>
          <a
            href="mailto:vidhandubey03@gmail.com"
            className="inline-flex h-10 items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="pb-24 scroll-mt-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl font-medium tracking-tight">Selected work</h2>
          <span className="text-sm text-neutral-500">
            {caseStudies.length} case stud{caseStudies.length === 1 ? "y" : "ies"}
          </span>
        </div>

        {caseStudies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-neutral-500">
            <p className="text-sm">
              No case studies yet. Add entries to{" "}
              <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900">
                src/content/case-studies.ts
              </code>
              .
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <li key={cs.slug}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="group block h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden"
                    style={
                      cs.accent
                        ? { backgroundColor: `${cs.accent}1A` }
                        : undefined
                    }
                  >
                    {cs.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cs.cover}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center text-2xl font-medium tracking-tight px-6 text-center"
                        style={cs.accent ? { color: cs.accent } : undefined}
                      >
                        {cs.title}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 text-xs text-neutral-500 mb-2">
                      <span>{cs.role}</span>
                      <span>{cs.year}</span>
                    </div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {cs.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {cs.summary}
                    </p>
                    {cs.tags && cs.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {cs.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* About */}
      <section id="about" className="pb-32 scroll-mt-20 max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight mb-6">About</h2>
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            I&apos;m Vidhan — a product designer who codes. I care about the
            small details that turn a working product into one people actually
            enjoy using.
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
      </section>
    </div>
  );
}
