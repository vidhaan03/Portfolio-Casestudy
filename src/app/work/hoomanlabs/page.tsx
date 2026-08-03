import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import { HoomanlabsFlow } from "@/components/case-study/HoomanlabsFlow";
import {
  Shot,
  Pair,
  PullQuote,
  QuoteCard,
  Callout,
  PhaseChip,
  BoldList,
  ImpactList,
  BrainstormNote,
  BrainstormColumn,
  BrainstormPoint,
  Mark,
  Credits,
} from "@/components/case-study/elements";

export const metadata: Metadata = {
  title: "Hoomanlabs, Vidhan Dubey",
  description:
    "Making the conversation visible: redesigning Hoomanlabs' voice-agent platform and rebuilding its foundation (Mantine → shadcn/ui).",
};

function WipBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
      <span aria-hidden>🚧</span> WIP · being written
    </span>
  );
}

export default function HoomanlabsCaseStudy() {
  return (
    <CaseStudyLayout
      slug="hoomanlabs"
      eyebrow="Case Study · Hoomanlabs · Voice AI Platform"
      title="Making the conversation visible"
      badge={<WipBadge />}
      deck={
        <>
          A full redesign of the four surfaces that ops leads, collections
          managers, and support heads use to run AI voice agents across millions
          of calls, plus the migration out of Mantine into shadcn/ui. Sole
          designer, owned end to end from research to launch. The goal: let
          someone who has never written a prompt run a working agent, on a
          product that finally looked like one product.
        </>
      }
      meta={[
        {
          label: "Role",
          value: "Product Designer — sole designer, research through launch",
        },
        { label: "Company", value: "Hoomanlabs" },
        {
          label: "Surface",
          value: "Agent Builder · Call Logs · Campaigns · Insights · Design system",
        },
        { label: "Status", value: "Live in production, still shipping" },
      ]}
    >
      <Shot
        label="Hero — the redesigned Agent Builder (drop screenshot later)"
        caption={
          <>
            The redesigned Agent Builder. A collections agent, greeting, identity
            check, promise-to-pay. The expanded node shows what the agent says and
            what it listens for, written the way you&apos;d brief a new hire. No
            prompt box, no JSON, no engineer.
          </>
        }
      />

      <h2>Context</h2>
      <p>{`Hoomanlabs sells AI voice agents that make and take phone calls at scale: debt collection, lead qualification, support, recruitment screening. The platform has run [10M+] calls across lending, e-commerce, travel, and logistics.`}</p>
      <p>{`The people on these pages are not who the category was built for. They're collections leads at NBFCs, support managers at D2C brands, recruiters screening at volume — operators with a number to hit and no engineering budget to hit it with. They'd been sold on replacing a call centre. Then they opened a product that assumed they could write a system prompt.`}</p>
      <p>{`The product already existed and already had customers. That's the harder brief: four live surfaces to redesign without breaking the people already depending on them — and a component library underneath that had quietly become the ceiling on how good any of them could get.`}</p>

      <h2>The problem</h2>
      <p>{`Three problems, and the third is the reason the first two kept not getting fixed.`}</p>
      <p>{`The builder asked people to think in the wrong shape. A call is a graph, but operators don't think in graphs — they think in scripts. First I greet them, then I check I've got the right person, then it depends. The product asked them to declare that structure up front, in the abstract, before hearing a single call. For a developer that's fine. For a collections lead it's a blank page with stakes.`}</p>
      <p>{`A bad call and its cause lived on different planets. Call logs told you what happened on one call. Usage dashboards told you aggregate minutes. Neither answered the only question an ops manager actually has — which part of my script is losing people, and what do I change — and nothing connected a call that went wrong to the place you'd go to fix it.`}</p>
      <p>{`And the four surfaces didn't look related. Mantine was the right call when the team picked it; it bought speed at the stage where speed was the whole strategy. But every screen carried its defaults, and years of one-off overrides on top had drifted the surfaces apart. Design work kept terminating at the same wall — a spec came back as "the library can't do that," a compromise shipped, and over enough compromises the compromises were the product. The data-dense screens suffered worst: call logs and campaigns needed density and custom cells the library's table wouldn't give.`}</p>

      <PullQuote attribution="The insight that drove the redesign">
        {`Operators don't think in graphs. They think in scripts, and the product was asking them to think in the wrong shape.`}
      </PullQuote>

      <div className="my-10">
        <QuoteCard attribution="[Ops lead, lending customer, paraphrased]">
          {`[One real sentence from a customer or ops lead. The single highest-value line you can add to this page.]`}
        </QuoteCard>
      </div>

      <h2>Why now</h2>
      <p>{`Every new customer needed hand-holding through their first agent, which doesn't scale past a handful of logos. The voice models had gotten good enough that the interface was the bottleneck, not the AI. And the redesign was the only moment the migration would ever get funded — nobody approves a quarter of "rewrite the components and change nothing." Coupled to a redesign, it's just how the redesign ships.`}</p>

      <h2>Research &amp; framing</h2>
      <p>{`I interviewed ops leads at customer accounts directly, and worked backwards through support tickets and what the founders and CS team already knew — the recurring questions nobody had connected into a pattern yet.`}</p>
      <p>{`I also studied how Bland, Vapi, Retell, ElevenLabs Agents, and [regional players — name them] structure agent creation. Nearly all of them design for a developer building on behalf of a customer. Hoomanlabs' users had no developer. That gap was the opportunity.`}</p>
      <p>{`Then I walked the full lifecycle: an operator writes an agent, attaches a contact list, launches a campaign, reviews the calls that went badly, edits, relaunches. The reframe that reset everything: the loop is the product, not the launch. Creation was the moment the product had been designed for. Repair is the moment users actually live in.`}</p>

      <BrainstormNote date="2026" title="Reframing, who's actually here?">
        <BrainstormColumn heading="Old framing">
          <BrainstormPoint>
            An agent is a <Mark tone="rose">prompt to be configured</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Show the model&apos;s capabilities; let the user{" "}
            <Mark tone="rose">assemble them</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Language of <Mark tone="rose">prompts, tokens, LLM settings</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Success is <Mark tone="rose">creating an agent</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Reviewing calls and editing agents are{" "}
            <Mark tone="rose">separate jobs</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            The <Mark tone="rose">component library</Mark> decides what design is
            possible
          </BrainstormPoint>
        </BrainstormColumn>
        <BrainstormColumn heading="New framing">
          <BrainstormPoint>
            An agent is a <Mark tone="emerald">script</Mark>, written the way
            you&apos;d brief a person
          </BrainstormPoint>
          <BrainstormPoint>
            Show the <Mark tone="emerald">conversation</Mark>; hide the machinery
            behind it
          </BrainstormPoint>
          <BrainstormPoint>
            Language of{" "}
            <Mark tone="emerald">scripts, callers, outcomes</Mark>, next actions
          </BrainstormPoint>
          <BrainstormPoint>
            Success is a{" "}
            <Mark tone="emerald">campaign that ran and got fixed</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            Reviewing a bad call is{" "}
            <Mark tone="emerald">one click from fixing its cause</Mark>
          </BrainstormPoint>
          <BrainstormPoint>
            We <Mark tone="emerald">own the components</Mark>, so design sets the
            ceiling
          </BrainstormPoint>
        </BrainstormColumn>
      </BrainstormNote>

      <h2>Design principles</h2>
      <BoldList
        items={[
          {
            lead: "Show the conversation, not the configuration.",
            body: "If it can be said the way you'd say it to a person, don't express it as a setting.",
          },
          {
            lead: "A bad call points at its own cause.",
            body: "Review and repair belong on the same rail.",
          },
          {
            lead: "Density is a feature, not a compromise.",
            body: "These are people reading hundreds of calls a day, not browsing.",
          },
          {
            lead: "Own the primitives.",
            body: "A component we can't change is a design decision someone else already made for us.",
          },
        ]}
      />

      <h2>User flow</h2>
      <p>{`The full agent lifecycle — blank canvas to a campaign that's actually working, plus the recovery path that closes the loop when it isn't. The dark nodes are the additions that turned a one-way launch into a loop.`}</p>
      <HoomanlabsFlow caption="Dark nodes (5, 6) are the additions that made launching a loop instead of a one-way trip. Hover or tap any node." />

      <h2>Design solution</h2>
      <p>{`Three acts: the Agent Builder, the operational surfaces around a live campaign, and the systemic move — replacing the foundation all of it stands on.`}</p>

      <PhaseChip tone="violet">Act 1 · Agent Builder</PhaseChip>
      <h3>Making a conversation something you can see</h3>
      <p>{`The canvas now starts from the happy path, not an empty graph. A new agent opens with a spine already laid down — greet, verify, ask, close — and branches grow out of it as the operator remembers the ways a real call goes sideways.`}</p>
      <p>{`Each node holds two things: what the agent says, and what it listens for. The instructions field is framed as briefing a new hire rather than prompting a model — same underlying content, and it changed the sentences people wrote. [What changed, if you noticed it.]`}</p>
      <p>{`The version that didn't work: a wizard. Before the canvas, I explored a step-by-step form builder — answer a sequence of questions, get an agent. It tested well right up until a conversation branched, which is immediately. Real calls fork on the second turn: wrong person, no answer, call me later. A wizard can express a sequence and not a shape, and a phone call is a shape. Killing it is what made the canvas non-negotiable.`}</p>
      <Pair>
        <Shot label="Agent Builder — canvas + expanded node (drop later)" />
        <Shot label="The wizard exploration, killed (drop later)" />
      </Pair>
      <Callout title="The debate: how much to show a non-technical user">
        <p>
          {`The hardest trade-off on the project, and it recurred on every surface: how much capability to expose to someone who didn't come here to learn a new discipline. Hide too much and the people running real campaigns hit a ceiling and route around the product. Show too much and the operator we redesigned for is back where they started, staring at settings they can't evaluate.`}
        </p>
        <p className="mt-4">
          {`[Where you landed and the mechanism you used — progressive disclosure, an advanced section, defaults that quietly do the right thing. This paragraph is the intellectual centre of the case study; it's worth three specific sentences.]`}
        </p>
      </Callout>

      <PhaseChip tone="sky">Act 2 · Call console, Campaigns &amp; Insights</PhaseChip>
      <h3>From one call to a thousand</h3>
      <p>{`Transcript, recording, summary, and outcome on a single screen — the transcript as the spine, everything else anchored to timestamps in it.`}</p>
      <p>{`The move that mattered: each transcript turn links back to the builder node that produced it. Reviewing a bad call is one click from fixing its cause. That link is what makes the loop in the flow diagram real rather than aspirational, and it's the improvement I'd point to first.`}</p>
      <p>{`Hinglish shaped the transcript design. Calls code-switch constantly — a sentence starts in Hindi and lands in English. I render Hindi in Devanagari and English in Latin, mixed inline, exactly as the caller spoke it. Romanizing everything would have made a tidier column and a less true one; an ops lead scanning a transcript is checking whether the agent sounded right, and a transliterated sentence doesn't let you hear it. [What you traded to get this — font stack, line height, mixed-script alignment.]`}</p>
      <p>{`Campaigns wrapped the launch itself: contact upload, scheduling, retries, pacing, live monitoring. [Compliance constraints — calling windows, DND — if they shaped the design.]`}</p>
      <p>{`Insights answers the aggregate question the same way the call console answers the single one: drop-off by conversation stage, plotted against the flow the operator built rather than against abstract KPIs. A chart reading "62% of calls end at the identity-check node" names the problem, names the node, and puts the fix one click away. "Average handle time: 47s" names nothing. [Confirm this is the shape you shipped.]`}</p>
      <Pair>
        <Shot label="Call console — transcript linked to nodes (drop later)" />
        <Shot label="Insights — drop-off by conversation stage (drop later)" />
      </Pair>

      <PhaseChip tone="amber">Act 3 · The foundation</PhaseChip>
      <h3>Mantine → shadcn/ui, without a rewrite quarter</h3>
      <p>{`The systemic move. Mantine is a library you theme; shadcn is source you own — Radix primitives underneath for accessible behaviour, Tailwind tokens on top, and component files sitting in the repo where they can be edited. The practical difference: the design system stopped being a Figma file nobody opened and became variables the product actually reads.`}</p>
      <p>{`Three things forced it. The surfaces had drifted apart — defaults plus years of overrides had left four screens that didn't look like one product. The theming ceiling meant Hoomanlabs couldn't look like Hoomanlabs. And the data-dense screens — call logs, campaigns — needed density and custom cells the library's table wouldn't give at any amount of configuration.`}</p>
      <p>{`The strategy was to never let it become a separate project. One rule held it together:`}</p>
      <PullQuote>
        {`No screen migrated without being redesigned. No redesign shipped on Mantine.`}
      </PullQuote>
      <p>{`That coupling is why it's still moving. Migration work is the easiest thing in the world to defund halfway; attached to a redesign customers were waiting for, it has cover the whole way. We went surface by surface rather than big-bang, which kept every release shippable and meant the product was never half-broken in front of customers. [Which surface first, and why.]`}</p>
      <p>{`The honest cost. We own the maintenance now. There's no upstream release that fixes our components while we sleep, and accessibility is our problem rather than a vendor's promise. [What you did about that.] Worth it, but it's a trade, not a free upgrade.`}</p>

      <h2>Process &amp; iteration</h2>
      <p>{`Sole designer across all four surfaces, working with [N] engineers who built it. Owning research through launch meant the reframe survived the trip — nothing got translated into someone else's summary between the customer interview and the shipped screen. It also meant every unmade decision was mine, and there were a lot of them.`}</p>
      <p>{`[N] iteration rounds per surface. The wizard exploration above was the biggest thing I killed; [anything else worth naming].`}</p>

      <h2>Impact</h2>
      <p>{`No clean before/after metrics — instrumentation landed after the surfaces did. What I have instead:`}</p>
      <ImpactList
        items={[
          { lead: "The surfaces shipped,", body: "redesigned and migrated, live in production and still rolling forward." },
          { lead: "The product stopped looking borrowed.", body: "Four surfaces that read as one product instead of four eras of one." },
          { lead: "Sales changed how they demo.", body: "[What specifically changed — live builds instead of slides, a deal that turned on it.]" },
          { lead: "Onboarding stopped needing hand-holding", body: "for a customer's first agent. [Or the specific support question that disappeared.]" },
          { lead: "Design velocity changed shape.", body: "New surfaces stopped starting with \"can the library do this.\"" },
          { lead: "[The real customer quote goes here.]" },
        ]}
      />

      <h2>Reflection</h2>
      <p>{`If I ran it again I'd migrate the shared primitives before touching any surface. Going surface-first put the user pain first, which felt right and meant the earliest screens got built on components that were still moving — some of them got redone. The boring layer first would have felt slower for a few weeks and been faster by the end.`}</p>
      <p>{`The lesson that generalised: a redesign is the only affordable moment to replace a foundation, but inside that window the foundation still has to go first. Couple the two efforts to get the migration funded, then sequence them the other way round.`}</p>

      <Credits>
        <p>
          <strong>Role</strong> Sole designer. Led the redesign across all four
          surfaces and the Mantine → shadcn migration — research, flows, screens,
          and the system underneath, through to launch.
          <br />
          <strong>Collaborators</strong> [Founders, engineering, CS.]
          <br />
          <strong>Stack</strong> Figma, shadcn/ui, Radix, Tailwind.
        </p>
      </Credits>
    </CaseStudyLayout>
  );
}
