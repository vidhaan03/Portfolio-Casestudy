import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import {
  Shot,
  Pair,
  PullQuote,
  Diagram,
  Credits,
} from "@/components/case-study/elements";

export const metadata: Metadata = {
  title: "Mrig AI, Vidhan Dubey",
  description:
    "A virtual try-on for every marketplace. Co-built with Aniket Khandelwal. Live on App Store and Play Store.",
};

export default function MrigCaseStudy() {
  return (
    <CaseStudyLayout
      slug="mrig"
      eyebrow="Case Study · Mrig AI · Mobile"
      title="Mrig AI, a virtual try-on for every marketplace."
      deck="An iOS & Android app. Upload your photo, pick a marketplace, see how clothes will look before you buy. Co-built with Aniket Khandelwal. Live on App Store and Play Store. 200+ downloads in three days."
      meta={[
        { label: "Role", value: "Designer · co-builder" },
        { label: "Team", value: "Vidhan + Aniket" },
        { label: "Platform", value: "iOS · Android · Swift" },
        { label: "Tools", value: "Stitch · Claude · Figma" },
      ]}
    >
      <Shot
        src="/case-studies/mrig/tryon.jpeg"
        alt="Mrig try-on screen showing a person wearing a piece they haven't bought yet."
        caption="See yourself in a piece you haven't bought yet."
      />

      <h2>What it does</h2>
      <p>
        Upload your photo. Pick Myntra, Zara, H&amp;M, or Amazon. Try anything
        on virtually before buying. Mrig means <em>deer</em> in Sanskrit, we
        wanted the brand to feel Indian, contemporary, a little playful.
      </p>

      <h2>The problem</h2>
      <p>
        Young shoppers buy, wait, try, return. Existing try-on tools work
        inside one brand&apos;s app (Zara&apos;s only shows Zara) or rely on
        clunky webcam features that don&apos;t survive real shopping
        behaviour. We wanted one app, every marketplace, your photo, instant
        try-on.
      </p>

      <PullQuote attribution="What we asked 15–20 friends and family">
        &ldquo;If AI could solve one problem in your daily life, what would it
        be?&rdquo;
      </PullQuote>

      <p>
        Clothing came up loudest, visual, intuitive, instantly testable on
        day one. That picked the first app for an AI umbrella Aniket and I had
        been planning.
      </p>

      <h2>Designing in 8 days</h2>
      <p>
        Two days on concept and references. Six on design iteration.
        Engineering ran in parallel.{" "}
        <em>The eight days is design time, not the full build.</em>
      </p>

      <h3>Stitch + Claude workflow</h3>
      <ul>
        <li>
          I used Claude to write Stitch prompts, feeding it references, having
          it draft prompts, iterating until the output was close.
        </li>
        <li>
          Stitch got us 70%. Figma did the 30% that matters most: interaction
          detail, edge states, brand voice.
        </li>
        <li>
          Aniket used Claude for Swift, model selection (Gemini won for image
          outputs), and debugging.
        </li>
      </ul>

      <h2>Flow</h2>
      <Diagram caption="From sign-in to wow moment in five taps.">
        <svg
          viewBox="0 0 680 150"
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="11"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <marker
              id="m-arr"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#111111" />
            </marker>
            <marker
              id="m-arr-g"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#888888" />
            </marker>
          </defs>

          {[
            { x: 0, label: "Onboard", n: 1 },
            { x: 140, label: "Upload photo", n: 2 },
            { x: 280, label: "Pick marketplace", n: 3 },
            { x: 420, label: "Try on", n: 4 },
          ].map((b) => (
            <g key={b.n}>
              <rect
                x={b.x}
                y="30"
                width="110"
                height="60"
                rx="6"
                fill="#ffffff"
                stroke="#111111"
                strokeWidth="1"
              />
              <text x={b.x + 55} y="55" textAnchor="middle" fill="#888888" fontSize="10">
                {b.n}
              </text>
              <text x={b.x + 55} y="72" textAnchor="middle" fill="#111111" fontWeight="500">
                {b.label}
              </text>
              <line
                x1={b.x + 110}
                y1="60"
                x2={b.x + 139}
                y2="60"
                stroke="#111111"
                strokeWidth="1"
                markerEnd="url(#m-arr)"
              />
            </g>
          ))}
          <rect x="560" y="30" width="120" height="60" rx="6" fill="#ffffff" stroke="#111111" strokeWidth="1" />
          <text x="620" y="55" textAnchor="middle" fill="#888888" fontSize="10">5</text>
          <text x="620" y="72" textAnchor="middle" fill="#111111" fontWeight="500">Save · chat</text>

          <path
            d="M 620 92 C 620 130, 335 130, 335 92"
            fill="none"
            stroke="#888888"
            strokeWidth="1"
            strokeDasharray="3 3"
            markerEnd="url(#m-arr-g)"
          />
          <text x="477" y="146" textAnchor="middle" fill="#888888" fontSize="10">
            try another
          </text>
        </svg>
      </Diagram>

      <h2>The product</h2>

      <h3>Onboarding</h3>
      <Pair>
        <Shot src="/case-studies/mrig/onboarding-1.jpeg" alt="Onboarding screen one." />
        <Shot src="/case-studies/mrig/onboarding-2.jpeg" alt="Onboarding screen two." />
      </Pair>
      <p>Two screens, then Firebase Auth. Value first, then the ask.</p>

      <h3>Photo upload</h3>
      <Pair>
        <Shot src="/case-studies/mrig/upload-ask.jpeg" alt="Photo upload ask, post-onboarding." />
        <Shot src="/case-studies/mrig/uploaded-photos.jpeg" alt="Uploaded photos." />
      </Pair>
      <p>
        The most sensitive moment. Lead with the trust statement ,{" "}
        <em>we won&apos;t misuse your photo</em>, then guide on close-up, half,
        full body. Multiple uploads suggested. Stored safely on the backend.
      </p>

      <h3>Home + marketplace</h3>
      <Pair>
        <Shot src="/case-studies/mrig/home-1.jpeg" alt="Mrig home, marketplaces." />
        <Shot src="/case-studies/mrig/home-2.jpeg" alt="Mrig home, alternate state." />
      </Pair>
      <p>
        Pick a marketplace. It opens in an in-app webview so users browse the
        real catalogue without leaving Mrig.
      </p>

      <h3>Try-on</h3>
      <Pair>
        <Shot src="/case-studies/mrig/tryon-trigger.jpeg" alt="Try-on trigger on a product." />
        <Shot src="/case-studies/mrig/saved-looks.jpeg" alt="Saved looks library." />
      </Pair>
      <p>
        One tap from any product. Gemini occasionally hallucinates, we surface
        that honestly rather than overpromise.
      </p>

      <h3>Chat + photos</h3>
      <Pair>
        <Shot src="/case-studies/mrig/chat.jpeg" alt="Mrig chat with style assistant." />
        <Shot src="/case-studies/mrig/photo-section.jpeg" alt="Photo section." />
      </Pair>
      <p>
        Ask the assistant for style help. Swap which photo drives the try-on
        without re-uploading.
      </p>

      <h2>Identity</h2>
      <p>
        White deer on red. Sanskrit name, Indian energy, a little quirky. The
        interior of the app stays quiet so the brand can breathe at the edges.
      </p>

      <h2>Minimal vs. fancy</h2>
      <p>
        The longest debate Aniket and I had. I wanted minimal. He wanted
        fancy. We built both in Figma and held them side-by-side until the
        answer was obvious: mostly-minimal with a few deliberately quirky
        moments. Pure minimal would have read generic. Pure fancy would have
        buried the function.
      </p>
      <p>
        Generalised lesson: in a two-person team, design debates resolve
        faster when you build both options visibly instead of arguing in the
        abstract.
      </p>

      <h2>Launch</h2>
      <ul>
        <li>200+ downloads in three days across both stores.</li>
        <li>
          App Store review took multiple rounds, a crash course in consent,
          content review, and image-use policies.
        </li>
        <li>
          Gemini&apos;s hallucinations are real. We surface that, we don&apos;t
          hide it, and we keep tuning.
        </li>
      </ul>

      <h2>Reflection</h2>
      <PullQuote>
        &ldquo;Building isn&apos;t just about AI and using it, learning how
        end users react is more important.&rdquo;
      </PullQuote>
      <p>
        The model isn&apos;t the product. The pipeline isn&apos;t the product.
        What happens when a real person opens the app for the first time is
        the product. You can design in eight days. You have to listen for
        months.
      </p>

      <h2>What&apos;s next</h2>
      <p>
        Aniket and I are building the next app under the same umbrella. Mrig
        stays live.
      </p>

      <Credits>
        <p>
          <strong>Designed by</strong> Vidhan Dubey ·{" "}
          <strong>Co-built with</strong> Aniket Khandelwal
          <br />
          <strong>Tools</strong> Figma, Stitch, Claude, Swift, Firebase, Gemini
          <br />
          <strong>Live on</strong> App Store · Google Play Store
        </p>
      </Credits>
    </CaseStudyLayout>
  );
}
