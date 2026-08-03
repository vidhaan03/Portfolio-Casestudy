import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { IdCardWall } from "./IdCardWall";

export const metadata: Metadata = {
  title: "About — Vidhan Dubey",
  description:
    "Vidhan Dubey is a product designer who codes. Based in Bengaluru, working at the intersection of design and front-end.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-16 pb-24">
      {/* Hero */}
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5 font-medium">
          About
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50">
          A product designer{" "}
          <span className="text-neutral-400 dark:text-neutral-500">
            who codes.
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 max-w-2xl space-y-5 text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <p>
            I&apos;m Vidhan. I design and ship products end-to-end, from
            research and interaction design through to writing the front-end
            that gets it in front of users. The small details are what turn a
            working product into one people actually enjoy.
          </p>
          <p>
            Recently:{" "}
            <Link
              href="/work/motion"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white"
            >
              motion.saas
            </Link>{" "}
            (a multi-agent SaaS-launch-ad generator I built solo in two
            weeks),{" "}
            <Link
              href="/work/plivo"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white"
            >
              Plivo&apos;s compliance console
            </Link>{" "}
            (used by Uber, Zomato, Meta), and{" "}
            <Link
              href="/work/mrig"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 dark:hover:decoration-white"
            >
              Mrig AI
            </Link>{" "}
            (virtual try-on, co-built with Aniket Khandelwal).
          </p>
          <p>
            Based in Bengaluru, working remote-first across IST/PT/ET. I care
            about regulated, multi-stakeholder products where framing the
            problem matters as much as drawing the screens. I also care about
            shipping in weeks, not quarters.
          </p>
        </div>
      </Reveal>

      {/* Identity papers — the ID card wall */}
      <Reveal delay={0.1}>
        <div className="mt-20">
          <div className="flex items-end justify-between mb-6 gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-2 font-medium">
                Identity papers
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                For the record
              </h2>
            </div>
            <p className="hidden sm:block max-w-xs text-sm text-neutral-500 pb-1">
              Government-style cards, designer edition. Hover to straighten.
            </p>
          </div>
          <IdCardWall />
        </div>
      </Reveal>

      {/* Currently */}
      <Reveal delay={0.15}>
        <div className="mt-20 grid sm:grid-cols-2 gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3 font-medium">
              Currently
            </p>
            <ul className="space-y-2 text-[15px] text-neutral-700 dark:text-neutral-300">
              <li>· Building motion.saas in the open.</li>
              <li>· Available for design + build engagements.</li>
              <li>· Reading on multi-agent UX patterns.</li>
              <li>· Drinking too much filter coffee.</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-3 font-medium">
              Past lives
            </p>
            <ul className="space-y-2 text-[15px] text-neutral-700 dark:text-neutral-300">
              <li>· Product &amp; Visual Designer at Plivo</li>
              <li>· Co-builder at Mrig AI</li>
              <li>· Founder &amp; designer at motion.saas</li>
            </ul>
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal delay={0.2}>
        <div className="mt-20 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-5 text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
          >
            Get in touch
          </Link>
          <Link
            href="/#work"
            className="inline-flex h-10 items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-5 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            See the work
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
