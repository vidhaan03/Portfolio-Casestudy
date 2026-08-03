import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import {
  Shot,
  Pair,
  PullQuote,
  Credits,
} from "@/components/case-study/elements";

export const metadata: Metadata = {
  title: "Hoomanlabs, Vidhan Dubey",
  description:
    "A complete redesign of the Hoomanlabs platform. Product design, ongoing since 2026.",
};

export default function HoomanlabsCaseStudy() {
  return (
    <CaseStudyLayout
      slug="hoomanlabs"
      eyebrow="Case Study · Hoomanlabs · Platform"
      title="Hoomanlabs, a complete platform redesign."
      deck="Rethinking the Hoomanlabs platform end to end, structure, flows, and visual language. Product design work, ongoing since 2026."
      meta={[
        { label: "Role", value: "Product Designer" },
        { label: "Year", value: "2026 — current" },
        { label: "Client", value: "Hoomanlabs" },
        { label: "Scope", value: "Full platform redesign" },
      ]}
    >
      <Shot
        label="Hero — redesigned Hoomanlabs platform (drop image later)"
        caption="The new Hoomanlabs, rebuilt from the ground up."
      />

      <h2>Overview</h2>
      <p>
        Hoomanlabs brought me in to rethink the platform end to end, not a
        reskin, a redesign. The goal: take a product that had grown feature by
        feature and give it a coherent structure, clearer flows, and a visual
        language that scales as the team ships.
      </p>

      <h2>The problem</h2>
      <p>
        Like most platforms that grow fast, Hoomanlabs had accumulated
        surface area faster than it had accumulated structure. Navigation,
        hierarchy, and patterns had drifted, so the first job was to map what
        was really there before deciding what to keep, cut, and rebuild.
      </p>

      <h2>Approach</h2>
      <ul>
        <li>Audit the existing product, catalogue every surface and flow.</li>
        <li>Define the information architecture the redesign hangs on.</li>
        <li>Build a design language, tokens, components, patterns, that the team can extend.</li>
        <li>Redesign the core flows first, then work outward.</li>
      </ul>

      <h2>The redesign</h2>
      <Pair>
        <Shot label="Before / after — key surface (drop image later)" />
        <Shot label="Redesigned flow (drop image later)" />
      </Pair>
      <p>
        <em>
          Section in progress. As screens land I&apos;ll swap these
          placeholders for the real work and walk through the decisions behind
          each surface.
        </em>
      </p>

      <PullQuote>
        &ldquo;A redesign isn&apos;t a new coat of paint, it&apos;s deciding
        what the product is actually for.&rdquo;
      </PullQuote>

      <h2>What&apos;s next</h2>
      <p>
        The work is ongoing. I&apos;ll keep this case study updated as the
        redesign ships surface by surface.
      </p>

      <Credits>
        <p>
          <strong>Designed by</strong> Vidhan Dubey
          <br />
          <strong>Role</strong> Product Designer
          <br />
          <strong>At</strong> Hoomanlabs · 2026 — current
        </p>
      </Credits>
    </CaseStudyLayout>
  );
}
