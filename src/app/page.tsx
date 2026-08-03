import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <Hero />

      {/* Work */}
      <section id="work" className="pb-24 scroll-mt-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-10 font-medium">
            Selected work
          </p>
        </Reveal>
        <Reveal>
          <WorkGrid />
        </Reveal>
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/resume"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              View résumé
            </Link>
            <a
              href="/resume.pdf"
              download="Vidhan-Dubey-Resume.pdf"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 px-5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-y-0.5 motion-reduce:transition-none"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
              Download PDF
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
