/**
 * Case studies manifest.
 *
 * To add a new case study:
 *   1. Drop the HTML file into `public/case-studies/<slug>.html`
 *      (any assets it references — images, css — can sit next to it).
 *   2. Add an entry to the array below. Newest first.
 *
 * The page at /work/<slug> will render the HTML inside a framed container.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short blurb shown on the landing page card. */
  summary: string;
  /** e.g. "Product Design", "Design + Engineering" */
  role: string;
  /** Free-form, e.g. "2025", "Mar 2025" */
  year: string;
  /** Optional client / org / context label */
  client?: string;
  /** Optional hero image path under /public, e.g. "/case-studies/foo/cover.png" */
  cover?: string;
  /** Accent color used for the card hover state. Any valid CSS color. */
  accent?: string;
  /** Tags shown on the card. */
  tags?: string[];
  /** Filename inside /public/case-studies/. Defaults to `${slug}.html`. */
  htmlFile?: string;
};

export const caseStudies: CaseStudy[] = [
  // Example — replace with your real entries once you drop the HTML in:
  // {
  //   slug: "acme-redesign",
  //   title: "Redesigning Acme's onboarding",
  //   summary:
  //     "Cut activation drop-off by 38% by rebuilding the first-run experience around a single core action.",
  //   role: "Product Design + Front-end",
  //   year: "2025",
  //   client: "Acme Inc.",
  //   tags: ["Onboarding", "Web", "0→1"],
  //   accent: "#FF6A3D",
  // },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
