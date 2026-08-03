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
        </Reveal>
      </section>
    </div>
  );
}
