/**
 * Case studies manifest, drives the landing-page grid and "next study" nav.
 *
 * To add a new case study:
 *   1. Create a page at `src/app/work/<slug>/page.tsx`
 *      (and, if you want a scoped editorial look, a `<slug>.module.css`
 *      alongside it, see /work/mrig and /work/plivo for templates).
 *   2. Add an entry below. Newest first.
 *
 * Drop images into `public/case-studies/<slug>/...` and reference them with
 * absolute paths like `/case-studies/mrig/hero.png`.
 */

export type CaseStudy = {
  slug: string;
  /** Route the card links to. Usually `/work/<slug>`. */
  href: string;
  title: string;
  /** Short blurb shown on the landing-page card. */
  summary: string;
  /** Short label shown under the Mac folder icon. Falls back to title. */
  shortName?: string;
  /** e.g. "Product Design", "Design + Engineering" */
  role: string;
  /** Free-form, e.g. "2025", "Mar 2025" */
  year: string;
  /** Optional client / org / context label */
  client?: string;
  /** Optional hero image path under /public */
  cover?: string;
  /** Accent color for card hover/tint. Any valid CSS color. */
  accent?: string;
  /** Tags shown on the card. */
  tags?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "motion",
    href: "/work/motion",
    shortName: "motion.saas",
    title: "motion.saas, prompt to cinematic ad in 8 seconds",
    summary:
      "A solo indie tool that turns a prompt into a SaaS launch ad. Multi-agent storyboards orchestrated by a Director agent, rendered programmatically with React Remotion. Built end-to-end in two weeks. Open source.",
    role: "Designer + Builder (solo)",
    year: "2026",
    client: "motion.saas · Indie · OSS",
    cover: "/case-studies/motion/landing.png",
    tags: ["0→1", "Multi-agent", "Open source"],
    accent: "#0e7490",
  },
  {
    slug: "plivo",
    href: "/work/plivo",
    shortName: "Plivo",
    title:
      "Rebuilding Plivo's 10DLC, Campaigns, and Compliance console",
    summary:
      "Turned a regulatory black box into a console PMs and CTOs at brands like Uber, Zomato, and Meta could read at a glance.",
    role: "Product & Visual Design",
    year: "2025",
    client: "Plivo · CX Platform",
    cover: "/case-studies/plivo/10dlc.png",
    tags: ["Enterprise", "Compliance", "Shipped"],
    accent: "#1e3a8a",
  },
  {
    slug: "mrig",
    href: "/work/mrig",
    shortName: "Mrig AI",
    title: "Mrig AI, a virtual try-on for every marketplace",
    summary:
      "iOS + Android app. Upload your photo, pick a marketplace, see how clothes will look before you buy. Co-built with Aniket Khandelwal.",
    role: "Design + Co-builder",
    year: "2025",
    client: "Mrig AI",
    cover: "/case-studies/mrig/tryon.jpeg",
    tags: ["0→1", "Mobile", "AI"],
    accent: "#9a1b1b",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
