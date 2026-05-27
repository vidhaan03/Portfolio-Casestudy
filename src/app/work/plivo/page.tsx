import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import {
  Shot,
  Pair,
  Triptych,
  Tile,
  Diagram,
  PhaseChip,
  ImpactList,
  BoldList,
  QuoteCard,
  QuoteGrid,
  BrainstormNote,
  BrainstormColumn,
  BrainstormPoint,
  Mark,
  Credits,
} from "@/components/case-study/elements";

export const metadata: Metadata = {
  title: "Rebuilding Plivo's Compliance Console, Vidhan Dubey",
  description:
    "A redesign of the 10DLC, Campaigns, and Compliance surfaces brands like Uber, Zomato, and Meta use to get messaging campaigns approved.",
};

export default function PlivoCaseStudy() {
  return (
    <CaseStudyLayout
      slug="plivo"
      eyebrow="Plivo · CX Platform"
      title="Making compliance legible: rebuilding Plivo's 10DLC, Campaigns, and Compliance console"
      deck={
        <>
          A redesign of the surfaces that <strong>Uber, Zomato, and Meta</strong>
          {" "}, and the Plivo FDEs supporting them, use every day to get
          messaging campaigns approved. The goal:{" "}
          <strong>turn a regulatory black box into a console anyone could read.</strong>
        </>
      }
      meta={[
        { label: "Role", value: "Product & Visual Designer" },
        { label: "Company", value: "Plivo" },
        { label: "Surface", value: "10DLC · Campaigns · Compliance" },
        { label: "Status", value: "Shipped to production" },
      ]}
    >
      <Shot
        src="/case-studies/plivo/10dlc.png"
        alt="Plivo Compliance · 10DLC tab, brands on the left, Zomato's campaigns on the right with an inline rejection reason and Edit & Re-submit action."
        caption={
          <>
            <strong>The redesigned 10DLC surface.</strong> Brands on the left
            with status pills. Zomato&apos;s campaigns on the right. The
            rejected &ldquo;Christmas&rdquo; campaign exposes its rejection
            reason inline, with a single-click <em>Edit &amp; Re-submit</em>{" "}
            right beneath it. <strong>No collapsibles, no API lookup, no
            support ping.</strong>
          </>
        }
      />

      <h2>Context</h2>
      <p>
        Plivo&apos;s CX platform is the dashboard customers use to manage SMS
        compliance, <strong>registering brands, submitting campaigns, and
        tracking them through the 10DLC and TCR vetting pipeline.</strong> The
        people on these pages aren&apos;t designers or engineers. They&apos;re{" "}
        <strong>PMs, CTOs, and ops leads</strong> at brands like Uber, Zomato,
        and Meta, plus Voice-AI and telephony API teams. They need to
        understand a regulatory landscape they didn&apos;t design, and they
        need to act on it.
      </p>
      <p>
        I worked across this surface with senior designers, engineering
        managers, PMs, and the Product Head of Messaging. The brief was wide:
        three pages, <strong>10DLC registration, Campaigns, and the
        Compliance hub</strong>, all overdue for a rethink.
      </p>

      <h2>The problem</h2>
      <p>
        The console <strong>buried the hardest parts of the regulation behind
        collapsibles.</strong> When a campaign was rejected, the reason
        wasn&apos;t visible by default. To find it, a customer (or, more often,
        the Plivo FDE supporting them) had to open the right section, parse
        internal vetting status, and frequently fall back to pinging the
        messaging team or hitting the API directly to figure out{" "}
        <em>at what stage</em> the rejection happened and <em>why</em>.
      </p>
      <p>
        That cascade was the real cost. Every rejection turned into multiple
        internal handoffs:{" "}
        <strong>FDE → support → messaging team → API.</strong> The Drafts
        experience was thin. There was no edit-and-resubmit path. There was{" "}
        <strong>no archive at all</strong>, customers had no way to retire old
        campaigns from the list. And there was no progress system telling a
        customer where their campaign stood in the multi-step vetting pipeline.
      </p>

      <QuoteGrid>
        <QuoteCard attribution="The insight that drove the redesign">
          &ldquo;The rejection reason was the <strong>single most important
          piece of information on the screen</strong>, and it was buried three
          clicks deep.&rdquo;
        </QuoteCard>
        <QuoteCard attribution="A Plivo FDE, paraphrased">
          &ldquo;Every time a campaign got rejected, I had to ping the
          messaging team and dig through the API just to tell the customer
          what was wrong.&rdquo;
        </QuoteCard>
      </QuoteGrid>

      <h2>Why now</h2>
      <p>
        FDE pain was the trigger. Customer-support escalations were a parallel
        pressure. Plivo&apos;s customer base had grown into brands that
        expected <strong>enterprise-grade clarity</strong>, and the console
        wasn&apos;t meeting that bar.
      </p>

      <h2>Research &amp; framing</h2>
      <p>
        I studied how mature messaging platforms, <strong>Twilio, Bandwidth,
        Sinch</strong>, surface compliance state, and where they fall short.
        Then I sat with the Product Head of Messaging and walked the full
        lifecycle: a customer registers a brand, submits a campaign under it,
        goes through internal vetting (info cross-check, brand volume), then
        carrier vetting, then lands in one of three terminal states ,
        verified, rejected with a resubmit path, or rejected outright.
      </p>
      <p>
        The biggest reframe came from auditing who actually lands on these
        pages.{" "}
        <strong>
          Not regulatory specialists. Not engineers. PMs and CTOs at brands
        </strong>{" "}
        who care about getting messaging shipped, not about TCR taxonomy. That
        shaped the language and the hierarchy on every screen.
      </p>

      <BrainstormNote date="Aug 2024" title="Reframing, who's actually here?">
        <BrainstormColumn heading="Old framing">
          <BrainstormPoint>
            Treat the console as an{" "}
            <Mark tone="rose">internal vetting pipeline</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            <Mark tone="rose">Hide complexity</Mark> behind collapsibles so the
            page looks tidy
          </BrainstormPoint>
          <BrainstormPoint>
            Surface speaks the language of{" "}
            <Mark tone="rose">TCR, vetting scores, carrier APIs</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Customer should ping support when{" "}
            <Mark tone="rose">a campaign gets rejected</Mark>
          </BrainstormPoint>
        </BrainstormColumn>
        <BrainstormColumn heading="New framing">
          <BrainstormPoint>
            Treat the console as a{" "}
            <Mark tone="emerald">customer-facing compliance posture</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            <Mark tone="emerald">Surface state</Mark>, especially the painful
            states, by default
          </BrainstormPoint>
          <BrainstormPoint>
            Surface speaks the language of{" "}
            <Mark tone="emerald">brands, campaigns, next actions</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Customer should{" "}
            <Mark tone="emerald">read the reason and resubmit</Mark> on the
            same page
          </BrainstormPoint>
        </BrainstormColumn>
      </BrainstormNote>

      <h2>Design principles</h2>
      <BoldList
        items={[
          {
            lead: "Surface state, don't hide it.",
            body: "No collapsibles for things people came here to read.",
          },
          {
            lead: "Make the lifecycle visible.",
            body: "A customer should always know where their campaign stands and what happens next.",
          },
          {
            lead: "Respect the limits of trust.",
            body: (
              <>
                Some signals (like internal vetting scores) stay internal, by
                policy. But everything a customer needs to <em>act</em>, they
                can see.
              </>
            ),
          },
          {
            lead: "One hub for compliance.",
            body: "Don't make people guess which page their problem lives on.",
          },
        ]}
      />

      <h2>User flow</h2>
      <p>
        The diagram below shows the <strong>full campaign lifecycle</strong> ,
        the path every customer travels from brand registration through to a
        verified or rejected outcome, and the recovery moves I introduced
        when the path turns bad. The dark nodes mark the four design additions
        that did the most work to remove internal handoffs.
      </p>

      <Diagram
        caption={
          <>
            Campaign lifecycle, brand registration through outcome and
            recovery. Dark nodes (5, 6a, 6b) are the additions that removed
            the FDE → support → messaging-team cascade.
          </>
        }
      >
        <svg
          viewBox="0 0 720 970"
          xmlns="http://www.w3.org/2000/svg"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="13"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#181818" />
            </marker>
            <marker id="arrG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#181818" />
            </marker>
          </defs>

          <g fontSize="11" fill="#6b6b6b">
            <rect x="20" y="18" width="14" height="14" rx="3" fill="#ffffff" stroke="#181818" strokeWidth="1.5" />
            <text x="42" y="30">Customer</text>
            <rect x="120" y="18" width="14" height="14" rx="3" fill="#ffffff" stroke="#6b6b6b" strokeWidth="1.5" />
            <text x="142" y="30">Plivo internal</text>
            <rect x="240" y="18" width="14" height="14" rx="3" fill="#ffffff" stroke="#8c6a3a" strokeWidth="1.5" />
            <text x="262" y="30">Carrier (TCR)</text>
            <rect x="360" y="18" width="14" height="14" rx="3" fill="#181818" />
            <text x="382" y="30">Introduced in redesign</text>
          </g>
          <line x1="20" y1="50" x2="700" y2="50" stroke="#e5e5e5" strokeWidth="1" />

          <rect x="260" y="68" width="200" height="50" rx="8" fill="#ffffff" stroke="#181818" strokeWidth="1.5" />
          <text x="360" y="98" textAnchor="middle" fill="#181818">1 · Register Brand</text>
          <line x1="360" y1="118" x2="360" y2="146" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <rect x="260" y="148" width="200" height="50" rx="8" fill="#ffffff" stroke="#181818" strokeWidth="1.5" />
          <text x="360" y="178" textAnchor="middle" fill="#181818">2 · Submit Campaign</text>
          <line x1="360" y1="198" x2="360" y2="226" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <rect x="240" y="228" width="240" height="62" rx="8" fill="#ffffff" stroke="#6b6b6b" strokeWidth="1.5" />
          <text x="360" y="254" textAnchor="middle" fill="#181818">3 · Plivo Internal Vetting</text>
          <text x="360" y="272" textAnchor="middle" fill="#6b6b6b" fontSize="11">info cross-check · brand volume</text>
          <line x1="360" y1="290" x2="360" y2="318" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <polygon points="360,320 425,365 360,410 295,365" fill="#ffffff" stroke="#6b6b6b" strokeWidth="1.5" />
          <text x="360" y="370" textAnchor="middle" fill="#181818">Pass?</text>

          <text x="370" y="428" fill="#6b6b6b" fontSize="11">yes</text>
          <line x1="360" y1="410" x2="360" y2="438" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <text x="285" y="358" fill="#6b6b6b" fontSize="11" textAnchor="end">no</text>
          <path d="M 295 365 L 140 365 L 140 690" fill="none" stroke="#181818" strokeWidth="1.2" />
          <line x1="140" y1="690" x2="198" y2="690" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <rect x="240" y="440" width="240" height="60" rx="8" fill="#ffffff" stroke="#8c6a3a" strokeWidth="1.5" />
          <text x="360" y="465" textAnchor="middle" fill="#181818">4 · Carrier Vetting</text>
          <text x="360" y="483" textAnchor="middle" fill="#6b6b6b" fontSize="11">submitted via TCR</text>
          <line x1="360" y1="500" x2="360" y2="528" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <polygon points="360,530 435,575 360,620 285,575" fill="#ffffff" stroke="#6b6b6b" strokeWidth="1.5" />
          <text x="360" y="580" textAnchor="middle" fill="#181818">Outcome</text>

          <text x="448" y="568" fill="#6b6b6b" fontSize="11">verified</text>
          <line x1="435" y1="575" x2="553" y2="575" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />
          <rect x="555" y="553" width="140" height="44" rx="8" fill="#f5f5f5" stroke="#181818" strokeWidth="1.5" />
          <text x="625" y="580" textAnchor="middle" fill="#181818">Live / Approved</text>

          <text x="370" y="640" fill="#6b6b6b" fontSize="11">rejected · resubmit</text>
          <line x1="360" y1="620" x2="360" y2="648" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <rect x="200" y="650" width="320" height="80" rx="8" fill="#181818" />
          <text x="360" y="676" textAnchor="middle" fill="#ffffff" fontWeight="600">5 · Inline Rejection Reason</text>
          <text x="360" y="696" textAnchor="middle" fill="#d4d4d4" fontSize="11">shown directly below the campaign card</text>
          <text x="360" y="712" textAnchor="middle" fill="#d4d4d4" fontSize="11">no collapsibles · no API lookup · no support ping</text>

          <line x1="360" y1="730" x2="360" y2="758" stroke="#181818" strokeWidth="1.2" />
          <line x1="200" y1="758" x2="520" y2="758" stroke="#181818" strokeWidth="1.2" />
          <line x1="200" y1="758" x2="200" y2="788" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />
          <line x1="520" y1="758" x2="520" y2="788" stroke="#181818" strokeWidth="1.2" markerEnd="url(#arr)" />

          <rect x="100" y="790" width="200" height="60" rx="8" fill="#181818" />
          <text x="200" y="814" textAnchor="middle" fill="#ffffff" fontWeight="600">6a · Edit &amp; Resubmit</text>
          <text x="200" y="832" textAnchor="middle" fill="#d4d4d4" fontSize="11">fix what was flagged · resend</text>

          <rect x="420" y="790" width="200" height="60" rx="8" fill="#181818" />
          <text x="520" y="814" textAnchor="middle" fill="#ffffff" fontWeight="600">6b · Archive</text>
          <text x="520" y="832" textAnchor="middle" fill="#d4d4d4" fontSize="11">explicit · irreversible</text>

          <path
            d="M 100 820 L 60 820 L 60 173 L 258 173"
            fill="none"
            stroke="#181818"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            markerEnd="url(#arrG)"
          />
          <text
            x="50"
            y="500"
            fill="#6b6b6b"
            fontSize="11"
            transform="rotate(-90, 50, 500)"
            textAnchor="middle"
          >
            loops back to Submit Campaign
          </text>
        </svg>
      </Diagram>

      <h2>Design solution</h2>
      <p>
        The redesign moved through <strong>three acts</strong>: 10DLC
        registration, the Campaigns surface, and the systemic move, a unified
        Compliance hub.
      </p>

      <PhaseChip tone="amber">Act 1 · 10DLC</PhaseChip>
      <h3>Mapping the vetting flow end-to-end</h3>
      <p>
        I mapped the full vetting flow end to end:{" "}
        <strong>brand registration → campaign registration under the brand →
        internal vetting → carrier vetting → outcome state.</strong> Each
        outcome, verified, rejected, resubmit, got its own treatment with
        the right next action surfaced.
      </p>
      <p>
        Where company policy permitted, I exposed both internal and
        carrier-level status. Where it didn&apos;t, I designed around the gap
        so the customer still understood what was happening to their
        submission, even if they couldn&apos;t see every signal feeding into
        it.
      </p>

      <PhaseChip tone="violet">Act 2 · Campaigns</PhaseChip>
      <h3>Killing the collapsibles</h3>
      <p>
        This was the heaviest lift. I reframed the page as a two-pane layout:{" "}
        <strong>brands on the left, their campaigns on the right.</strong>{" "}
        Inside each campaign card I killed the collapsibles. Rejection reasons
        now sit inline, directly below the campaign they apply to, viable
        because each brand caps at three or four campaigns, so the screen
        stays scannable rather than turning into a wall of text.
      </p>

      <BoldList
        items={[
          {
            lead: "A progress system",
            body: "spanning the campaign lifecycle, so customers can see where each submission sits.",
          },
          {
            lead: "Archive, a new action entirely.",
            body: "Customers previously had no way to retire old campaigns. I introduced archive as the missing terminal step, with explicit irreversibility messaging.",
          },
          {
            lead: "Drafts page redesign",
            body: ", cleaner hierarchy, clearer affordances for “in progress vs. ready to submit.”",
          },
          {
            lead: "Edit-and-resubmit",
            body: "for rejected campaigns. Previously customers were forced to start over; now they can fix exactly what was flagged.",
          },
        ]}
      />

      <h3>The debate: how much to expose</h3>
      <p>
        Two trade-offs took the longest to resolve. First: should customers
        see <em>internal vetting scores</em>?{" "}
        <strong>Company policy said no</strong>, that data stays internal. I
        couldn&apos;t change the policy, but I redesigned around it so the
        absence didn&apos;t feel like a black box. Second: should the{" "}
        <em>campaign use case</em> be exposed to the customer? I argued yes ,
        the use case is the most direct context a customer has for
        understanding the verdict on their submission.{" "}
        <strong>That one landed.</strong>
      </p>

      <Shot
        src="/case-studies/plivo/drafts.png"
        alt="Plivo Compliance · Drafts tab, 10DLC campaigns with status pills and inline rejection reasons."
        caption={
          <>
            <strong>Drafts surface.</strong> Status pills tell a customer at a
            glance which campaigns need work, which are ready to submit, and
            which were rejected. The detailed rejection reason sits inline
            beneath the row, and the action column on the right resolves to{" "}
            <em>Complete</em>, <em>Edit</em>, or <em>Submit</em> depending on
            state, so there&apos;s exactly one next move per campaign.
          </>
        }
      />

      <PhaseChip tone="emerald">Act 3 · Compliance hub</PhaseChip>
      <h3>One page for the entire regulatory posture</h3>
      <p>
        The systemic move. I unified <strong>10DLC, Drafts, Toll-Free, and
        the new brand/campaign regulations</strong> under a single Compliance
        page. Customers no longer needed to know which regulatory framework
        their issue lived under, the hub held all of it, with consistent
        state language across each section.
      </p>
      <p>
        This is the page I&apos;d point to first if asked &ldquo;what changed
        at the system level.&rdquo; It&apos;s the difference between a console
        that reflects Plivo&apos;s internal org chart and one that reflects
        how a customer actually thinks about their compliance posture.
      </p>

      <Triptych>
        <Tile src="/case-studies/plivo/drafts.png" label="Drafts" />
        <Tile src="/case-studies/plivo/10dlc.png" label="10DLC" />
        <Tile src="/case-studies/plivo/toll-free.png" label="Toll-free" />
      </Triptych>

      <h2>Process &amp; iteration</h2>
      <p>
        <strong>Three to four iteration rounds per surface</strong> with
        design and PM feedback before the work settled. The Figma file ended
        up split by surface, 10DLC, Draft Page Updates, Archive Popup,
        Research Addons, so each surface had its own tracked exploration
        history rather than getting buried in a single sprawling page.
      </p>

      <Shot
        src="/case-studies/plivo/10dlc-iterations.jpeg"
        alt="Figma canvas with multiple labeled iterations of the 10DLC compliance surface."
        caption={
          <>
            <strong>Iteration breadth on 10DLC.</strong> Each labeled artboard
            is a discrete decision being explored, search layout, add-button
            placement, brand-rejected state, campaign-rejected state. Keeping
            iterations parallel (not stacked) made it possible to compare
            options side-by-side in design review.
          </>
        }
      />

      <Shot
        src="/case-studies/plivo/drafts-iterations.jpeg"
        alt="Three iteration stages of the Drafts page: First → Rejected → Rejected Update with Action."
        caption={
          <>
            <strong>
              The Drafts iteration trail: First → Rejected → Rejected Update
              with Action.
            </strong>{" "}
            The third pass introduced the explicit recovery action, with an
            A/B between &ldquo;With Buttons&rdquo; and &ldquo;Without Action
            Button&rdquo;, the version with surfaced actions won because it
            removed a click and made the next step obvious.
          </>
        }
      />

      <Pair>
        <Tile
          src="/case-studies/plivo/archive-modal.jpeg"
          label="Archive confirm modal"
        />
        <Tile
          src="/case-studies/plivo/figma-pages.jpeg"
          label="Figma file pages"
        />
      </Pair>

      <p>
        Once the visuals were locked, I prototyped the final flows in code
        (working with Claude) so the handoff to engineering was a{" "}
        <strong>buildable spec, not a static file.</strong> That meant fewer
        rounds of &ldquo;what did you mean here?&rdquo; with dev, and the
        build closed faster than the previous campaigns redesigns had.
      </p>

      <h2>Impact</h2>
      <ImpactList
        items={[
          {
            lead: "Support tickets dropped.",
            body: "Customers stopped opening tickets just to ask why a campaign was rejected, the answer was on the screen.",
          },
          {
            lead: "FDE cascade collapsed.",
            body: "FDEs stopped routing rejection questions through the messaging team.",
          },
          {
            lead: "Positive direct feedback from brands",
            body: ", they said the console finally made the regulatory landscape legible.",
          },
          {
            lead: "All three surfaces shipped.",
            body: "10DLC, Campaigns, and Compliance are live in production.",
          },
        ]}
      />

      <h2>Reflection</h2>
      <p>
        If I did this again, I&apos;d spend more time <em>estimating</em> the
        problem before exploring solutions. The first two iterations on
        Campaigns were spent narrowing what the problem actually was, and in
        hindsight, a sharper framing up front would have gotten me to the
        two-pane layout in one round, not three. The lesson generalized for
        me:{" "}
        <strong>
          in regulated, multi-stakeholder products, time invested in problem
          framing compounds.
        </strong>{" "}
        Time spent iterating on the wrong frame doesn&apos;t.
      </p>

      <Credits>
        <p>
          <strong>Role:</strong> Led design across all three surfaces, flows,
          screens, and the systemic unification under the Compliance page.
          Prototyped final designs in code for engineering handoff.
          <br />
          <strong>Collaborators:</strong> Senior designers, engineering
          managers, product managers, and the Product Head of Messaging.
          <br />
          <strong>Stack:</strong> Figma, Claude for code prototyping.
        </p>
      </Credits>
    </CaseStudyLayout>
  );
}
