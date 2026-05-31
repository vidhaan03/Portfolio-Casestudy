import type { Metadata } from "next";
import { CaseStudyLayout } from "@/components/case-study/Layout";
import {
  Shot,
  PhaseChip,
  ImpactList,
  BoldList,
  QuoteCard,
  QuoteGrid,
  Credits,
} from "@/components/case-study/elements";
import { InteractiveFlow } from "@/components/case-study/InteractiveFlow";
import { DragGallery } from "@/components/case-study/DragGallery";

export const metadata: Metadata = {
  title: "motion.saas — Vidhan Dubey",
  description:
    "A solo indie tool that turns a prompt into a SaaS launch ad. Multi-agent storyboards rendered programmatically with React Remotion. Built in two weeks. Open source.",
};

export default function MotionCaseStudy() {
  return (
    <CaseStudyLayout
      slug="motion"
      eyebrow="Case Study · motion.saas · Indie · Open Source"
      title="motion.saas: prompt to cinematic ad in eight seconds."
      deck={
        <>
          A solo indie tool that turns a prompt into a SaaS launch ad.{" "}
          <strong>Multi-agent storyboards</strong> orchestrated by a Director
          agent, rendered programmatically with{" "}
          <strong>React Remotion</strong>, edited on a canvas. Built
          end-to-end in two weeks. Open-sourced on GitHub. Live at{" "}
          <em>saasmotion-theta.vercel.app</em>.
        </>
      }
      meta={[
        { label: "Role", value: "Designer · Builder (solo)" },
        { label: "Type", value: "Indie · Open source" },
        { label: "Stack", value: "Next.js · Remotion · NIM · Gemini" },
        { label: "Status", value: "Live · WIP" },
      ]}
    >
      <Shot
        src="/case-studies/motion/landing.png"
        alt="motion.saas landing page with italic serif wordmark, prompt input, brand controls, and example prompts."
        caption={
          <>
            <strong>The pitch in one screen.</strong> Italic serif wordmark,
            single prompt input, brand controls (Plivo · #0EA5E9 · #22D3EE ·
            16:9), and four tested example prompts as a fast-onboarding nudge.
          </>
        }
      />

      <h2>What motion.saas does</h2>
      <p>
        A user types a prompt,{" "}
        <em>
          &ldquo;Launch announcement for our AI agent platform with 50k
          developer users&rdquo;
        </em>
        , picks a brand preset (Linear, Vercel, Stripe, Notion, Claude, Cursor,
        fourteen in total), and gets back a cinematic SaaS launch ad in{" "}
        <strong>roughly eight seconds</strong>. The ad is editable on a canvas
        afterwards: change the sequence, edit any node, retool the copy.
        Export to 9:16, 1:1, or 16:9.
      </p>

      <h2>The problem</h2>
      <p>
        A product marketer, a PM, or a product head wants to ship a
        feature-launch announcement. They don&apos;t want to learn After
        Effects. They don&apos;t want to wait <strong>2–3 days</strong> for a
        freelancer. They want something that looks like the kind of ad a
        well-funded startup ships, and they want it before the end of the
        afternoon.
      </p>
      <p>
        Existing AI-video tools mostly went the user-generated-content route
        (stock clips, talking-head avatars, generated video frames). That&apos;s
        the wrong shape for SaaS launches.{" "}
        <strong>SaaS launch ads are motion graphics</strong>: type animating in,
        charts ticking up, a logo locking into place, a feature card sliding
        across a product UI. That category was open.
      </p>

      <QuoteGrid>
        <QuoteCard attribution="The original brief I gave myself">
          &ldquo;I wanted people to make motion graphics with ease,{" "}
          <strong>managers, PMs, product heads</strong>. Without learning the
          tools.&rdquo;
        </QuoteCard>
        <QuoteCard attribution="A PMM I spoke with, paraphrased">
          &ldquo;We need a 10-second launch graphic{" "}
          <strong>today</strong>, not in three days when the freelancer gets
          back.&rdquo;
        </QuoteCard>
      </QuoteGrid>

      <h2>Who it&apos;s for</h2>
      <p>
        Primary user:{" "}
        <strong>product marketers and PMs at new-age startups</strong> who need
        to ship announcement graphics regularly but aren&apos;t designers and
        shouldn&apos;t have to be. Designers can use it too, and several of
        those I spoke with said they would, especially for quick takes and
        feature-update graphics where the heavy-lift After Effects pipeline is
        overkill.
      </p>

      <h2>Validation</h2>
      <p>
        Before building anything, I walked the concept past designers and
        product marketing managers I knew. The reaction landed in two
        directions at once:{" "}
        <strong>PMMs immediately recognised the pain</strong> (the 2–3 day
        freelancer loop for a 10-second graphic), and{" "}
        <strong>
          designers said the canvas-edit-after-generation step is what would
          actually convince them
        </strong>{" "}
        to use the output instead of redoing it themselves. Both signals
        shaped the product.
      </p>

      <h2>The competitive gap</h2>
      <p>
        The AI-video space crowded fast: Runway, Pika, Synthesia and others
        all push generated video frames or UGC-style stock. motion.saas takes
        the opposite approach:
      </p>
      <BoldList
        items={[
          {
            lead: "No UGC, no generated video frames.",
            body: (
              <>
                Every visual is programmatically rendered with{" "}
                <strong>React Remotion</strong>. That means the output is
                sharp, on-brand, fast, and editable as data, not a black-box
                video file you can&apos;t tweak.
              </>
            ),
          },
          {
            lead: "Brand-aware presets, not generic templates.",
            body: (
              <>
                Each preset loads a brand&apos;s actual colour palette,
                typeface, and visual elements. The result reads as{" "}
                <em>Vercel</em> or <em>Linear</em>, not as a generic ad with a
                logo slapped on.
              </>
            ),
          },
          {
            lead: "Canvas editing after generation.",
            body: "The output isn't terminal. Users can re-sequence scenes, edit copy and visuals inside any node, and re-render. That's the part designers said earned their trust.",
          },
        ]}
      />

      <h2>The system: a Director agent orchestrating specialists</h2>
      <p>
        The interesting engineering decision was to do this as{" "}
        <strong>multi-agent orchestration</strong> rather than one giant
        prompt. A single prompt that has to &ldquo;write the script, pick the
        scenes, lay out the timeline, format the data, and animate the
        result&rdquo; is the kind of prompt that fails in five different ways
        at once.{" "}
        <strong>
          Splitting it into specialists made each step inspectable,
          retryable, and individually upgradable.
        </strong>
      </p>

      <InteractiveFlow caption="Architecture as it appears in the live 'generating' view of motion.saas. Hover or tap any node to focus it." />

      <h3>Why this orchestration matters</h3>
      <p>
        The Director agent doesn&apos;t just route, it enforces structure (the
        agents have to return data the storyboard schema accepts), retries
        when a specialist returns something malformed, and keeps the prompt
        context tight for each downstream call.{" "}
        <strong>
          The handoff between agents is a structured JSON document, not
          natural language passed between LLMs.
        </strong>{" "}
        That makes the pipeline debuggable in a way that single-prompt systems
        never are.
      </p>

      <h2>The model layer: MoE via NVIDIA NIM, Gemini as fallback</h2>
      <p>
        Most solo builders reach straight for OpenAI or Anthropic. I went the
        other direction, a{" "}
        <strong>Mixture-of-Experts setup through NVIDIA NIM</strong> with
        open-weight models (Llama, Qwen, and others) doing the agent work, and{" "}
        <strong>Gemini as a fallback</strong> when NIM is unavailable or
        returns degraded output. The reason was unfashionably simple:{" "}
        <strong>open source and free.</strong> An indie tool that depends on
        per-call costs from a frontier API can&apos;t stay free forever; one
        that runs on open models can.
      </p>
      <p>
        The side benefit is architectural,{" "}
        <strong>different agents can use different models</strong> without
        rewriting anything. The Timeline agent doesn&apos;t need the same
        model the Data agent does. MoE lets the right model handle the right
        job.
      </p>

      <BoldList
        items={[
          {
            lead: "Frontend",
            body: "Next.js (App Router) deployed on Vercel.",
          },
          {
            lead: "Rendering",
            body: "React Remotion, programmatic motion graphics.",
          },
          {
            lead: "Agent runtime",
            body: "Director + 4 scene specialists (kineticTitle, statReveal, productDemo, ctaCard) running in parallel.",
          },
          {
            lead: "Model layer",
            body: "MoE via NVIDIA NIM (Llama, Qwen, …) · Gemini fallback.",
          },
          { lead: "Repo", body: "Open source on GitHub." },
        ]}
      />

      <h2>The product</h2>

      <PhaseChip tone="amber">Surface 1 · The prompt</PhaseChip>
      <h3>One screen, one job</h3>
      <p>
        The home screen is one screen and one screen only: a serif{" "}
        <em>motion.saas</em> wordmark, a single prompt input, the brand
        controls (colour, accent, aspect ratio), and four tested example
        prompts that double as a fast-onboarding guide. The example prompts
        are{" "}
        <strong>clickable demos and prompt-shape templates</strong>, a new
        user learns the format by doing, not by reading docs.
      </p>

      <PhaseChip tone="violet">Surface 2 · The generation moment</PhaseChip>
      <h3>Stream the agentic work, not a spinner</h3>
      <p>
        This is the part of the product I&apos;m proudest of as a design
        decision. Instead of showing a generic spinner, motion.saas streams
        the actual agentic work to the screen, the Director plans the
        storyboard first, then the four scene specialists run in parallel,
        each producing their scene live as it streams via{" "}
        <strong>server-sent events</strong>. The user watches the architecture
        do its job.
      </p>
      <p>
        It&apos;s a working diagram of the system, and it&apos;s also a
        trust-builder: when something arrives in eight seconds, you want to{" "}
        <em>see</em> that something was happening behind it.
      </p>
      <DragGallery
        caption="Drag to scrub through the generation moment. Director plans first, then four specialists run in parallel and stream their output live via SSE."
        items={[
          {
            src: "/case-studies/motion/director.png",
            alt: "motion.saas generating view — Director agent planning the storyboard.",
            caption: (
              <>
                <strong>Director planning</strong> · &ldquo;Plivo in
                progress.&rdquo;
              </>
            ),
          },
          {
            src: "/case-studies/motion/parallel.png",
            alt: "motion.saas generating view — four specialist agents running in parallel.",
            caption: (
              <>
                <strong>4 specialists in parallel</strong> · streamed live via
                SSE
              </>
            ),
          },
        ]}
      />

      <PhaseChip tone="emerald">Surface 3 · The Studio</PhaseChip>
      <h3>Generated output + brand controls</h3>
      <p>
        Once the storyboard finishes, the user lands in the Studio: prompt on
        the left, brand controls (colour, accent, vibe, typeface, format), and
        the rendered ad with a scene timeline on the right. The timeline
        shows each scene as a labelled segment, <em>Kinetic Title</em>,{" "}
        <em>Stat</em>, <em>Demo</em>, <em>CTA</em>, with the underlying video,
        decor, and audio tracks visible underneath. Editing a scene goes
        straight from a click on the timeline to a focused editor.
      </p>
      <Shot
        src="/case-studies/motion/studio.png"
        alt="motion.saas Studio editor — brand controls on the left, generated ad with timeline on the right."
        caption={
          <>
            <strong>The Studio.</strong> Brand controls left, generated ad
            and timeline right. &ldquo;Generated by Agentic MoE · NIM&rdquo;
            sits above the preview so the user knows what they&apos;re looking
            at.
          </>
        }
      />

      <PhaseChip tone="sky">Surface 4 · The Mosaic canvas</PhaseChip>
      <h3>The storyboard as an editable graph</h3>
      <p>
        Behind the linear Studio timeline is the storyboard graph: every
        scene as a node, every connection as a draggable edge, with a live
        preview locked to the right. Drag a node onto an edge to splice it
        in. Hover for actions. The mental model is a{" "}
        <strong>Mosaic-style canvas</strong> where the structure of the ad is
        editable as a graph, not just as a timeline.
      </p>
      <Shot
        src="/case-studies/motion/canvas.png"
        alt="motion.saas storyboard graph with four scene nodes and live preview."
        caption={
          <>
            <strong>Storyboard graph.</strong> Four scene nodes, draggable
            edges, live preview. The output isn&apos;t a video file, it&apos;s
            a graph the user can rewrite.
          </>
        }
      />

      <PhaseChip tone="rose">Surface 5 · Per-scene edit</PhaseChip>
      <h3>Authoring the camera, not just the content</h3>
      <p>
        Open any node and you get a focused editor: caption, screenshot
        upload (or a generated mock if none), and, for product demo scenes, a{" "}
        <strong>cursor path</strong> editor where you can place click, zoom,
        and move pins on the dashboard. Frame-level duration in the footer.
        This is the layer most AI-video tools don&apos;t have at all: the
        user can <em>author the camera</em>, not just the content.
      </p>
      <Shot
        src="/case-studies/motion/edit-scene.png"
        alt="motion.saas per-scene edit modal showing the cursor path editor with click, zoom, and move pins."
        caption={
          <>
            <strong>Per-scene edit.</strong> Click-to-add pins, drag to move,
            choose click / zoom / move. The user authors how the camera
            moves through the scene.
          </>
        }
      />

      <h2>Outcomes</h2>
      <ImpactList
        items={[
          {
            lead: "Live and open source.",
            body: (
              <>
                Deployed at <em>saasmotion-theta.vercel.app</em> and
                open-sourced on GitHub.
              </>
            ),
          },
          {
            lead: "Not commercially deployed.",
            body: "This is a portfolio and learning piece, not (yet) a product with paying users.",
          },
          {
            lead: "Positive validation feedback",
            body: "from the designers and PMMs I've shown it to, particularly on the canvas-edit step.",
          },
          {
            lead: "Actively maintained.",
            body: "New presets, better agent prompts, and render-quality improvements all on the roadmap.",
          },
        ]}
      />

      <h2>What I learned</h2>
      <p>
        The single thing I&apos;m taking forward from this project is how to
        think about <strong>multi-agent orchestration as a design problem</strong>
        , not just an engineering one. A Director-and-specialists pattern is a
        design pattern as much as a system architecture: it forces you to be
        specific about what each agent <em>knows</em>, what it&apos;s allowed
        to <em>say</em>, and how its output combines with others. That
        clarity shows up in the product.{" "}
        <strong>
          The reason motion.saas can generate something usable in eight
          seconds isn&apos;t model speed, it&apos;s that the agents have
          small, well-defined jobs.
        </strong>
      </p>
      <p>
        The secondary lesson was about{" "}
        <strong>open-weight models in production</strong>. The economics of an
        indie tool change completely when you&apos;re not paying per token at
        a frontier price. NIM + Llama/Qwen made the difference between
        &ldquo;I can keep this free&rdquo; and &ldquo;I have to charge or kill
        it.&rdquo;
      </p>

      <h2>What&apos;s next</h2>
      <p>
        motion.saas keeps evolving, more presets, better defaults, deeper
        canvas editing, sharper agent prompts. The bigger question is whether
        to keep it as a portfolio piece or push it toward a real product
        surface. The honest answer right now is: I&apos;m watching how people
        use it and letting that decide.
      </p>

      <Credits>
        <p>
          <strong>Designed &amp; built by:</strong> Vidhan Dubey (solo).
          <br />
          <strong>Stack:</strong> Next.js, React Remotion, NVIDIA NIM (Llama /
          Qwen / MoE), Gemini fallback, Vercel.
          <br />
          <strong>Live:</strong>{" "}
          <a
            href="https://saasmotion-theta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            saasmotion-theta.vercel.app
          </a>{" "}
          ·{" "}
          <strong>Source:</strong>{" "}
          <a
            href="https://github.com/vidhaan03/Saas.Motion"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/vidhaan03/Saas.Motion
          </a>
        </p>
      </Credits>
    </CaseStudyLayout>
  );
}
