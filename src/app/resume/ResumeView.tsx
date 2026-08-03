"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Interactive, on-brand résumé rendered as native HTML (not an embedded
 * PDF). Sticky section nav highlights the section in view. The PDF stays
 * available as a download.
 *
 * All content lives in the data objects below — edit here to update.
 */
const ACCENT = "#E24A28";

const CONTACT = {
  phone: "+91 8770261386",
  email: "vidhandubey03@gmail.com",
  github: { label: "GitHub", href: "https://github.com/vidhaan03" },
  // TODO: replace with your real LinkedIn URL
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/" },
};

const SUMMARY =
  "Product designer and design-minded engineer who takes features from research and user flows through high-fidelity UI to shipped code. I design intuitive, accessible interfaces in Figma, build and maintain scalable design systems, and prototype quickly, then bridge cleanly into engineering with React, Next.js, and Tailwind.";

const SKILLS: { label: string; items: string }[] = [
  { label: "Design", items: "Product Design, UX/UI, Visual Design, Interaction Design, Wireframing, Prototyping, Design Systems, Design QA & Handoff" },
  { label: "Research", items: "User Research, Usability Testing, Journey Mapping, Rapid Iteration" },
  { label: "Design Tools", items: "Figma, Webflow, Stitch, Claude Code" },
  { label: "Frontend & Prototyping", items: "React (Vite), Next.js, Tailwind CSS, shadcn/ui, HTML/CSS, JavaScript" },
  { label: "Engineering", items: "Node.js, Express, Flask, MongoDB, SQL, Firebase, Git" },
  { label: "AI / ML", items: "Generative AI (Gemini), Python, applied ML modelling" },
];

const EDUCATION = {
  school: "Manipal Institute of Technology",
  degree: "B.Tech in Information Technology",
  place: "Bengaluru, India",
  dates: "2022 – 2026",
};

const EXPERIENCE: {
  role: string;
  company: string;
  place: string;
  dates: string;
  bullets: string[];
}[] = [
  {
    role: "Product Designer",
    company: "Hoomanlabs",
    place: "Bengaluru, India",
    dates: "Apr 2026 – Present",
    bullets: [
      "Led the redesign and migration of the entire product from Mantine to shadcn/ui, modernising the interface and unifying a fragmented UI.",
      "Built a new company-wide design system and component library from the ground up, establishing consistency and scalability across products.",
      "Designed and shipped new features end-to-end, from user flows and wireframes to polished, high-fidelity UI.",
      "Audited and fixed UX issues across the legacy product, improving usability, clarity, and interaction quality.",
    ],
  },
  {
    role: "Product & Visual Designer",
    company: "Plivo",
    place: "Bengaluru, India",
    dates: "Dec 2025 – Mar 2026",
    bullets: [
      "Designed and shipped end-to-end flows for 10DLC, Toll-Free, and campaign registration, turning complex compliance requirements into clear, guided user journeys.",
      "Drove product and visual design across core platform features, translating complex requirements into clean, intuitive interfaces.",
      "Built and maintained design systems and component libraries, collaborating cross-functionally with engineering and product to ship polished, high-fidelity UI/UX.",
    ],
  },
  {
    role: "Machine Learning Intern",
    company: "Shigan Quantum Technologies Ltd.",
    place: "Gurugram, India",
    dates: "Jun 2025",
    bullets: [
      "Built ML models (Regression, K-Means, ANN) for auto-component analytics, achieving 90% accuracy.",
      "Designed dashboards for lifecycle performance insights, focusing on clear data presentation for non-technical users.",
    ],
  },
  {
    role: "Web Developer",
    company: "Cinechitra Mediaworks",
    place: "Bengaluru, India",
    dates: "Sep 2024 – Feb 2025",
    bullets: [
      "Built responsive MERN-stack websites and interfaces optimised for SEO, performance, and usability.",
      "Translated designs into production front-ends and managed backend architecture end-to-end.",
    ],
  },
];

const PROJECTS: { name: string; stack: string; bullets: string[] }[] = [
  {
    name: "ProjectMind",
    stack: "React, FastAPI, Claude API, Supabase",
    bullets: [
      "Designed and built a full-stack agentic AI product where users chat with an assistant that remembers project context across sessions.",
      "Owned the conversational UX and information architecture, how memory, project state, and background tasks surface to the user.",
      "Prototyped and shipped flows for image generation and per-project memory, with clear status feedback (pending / running / completed).",
    ],
  },
  {
    name: "FinFluence",
    stack: "Flask, yFinance, Tailwind, Firebase, Gemini API",
    bullets: [
      "Designed a clean, modern interface making real-time financial insights on Indian stocks approachable for everyday users.",
    ],
  },
];

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-28 mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500"
    >
      <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
      {children}
    </h2>
  );
}

export function ResumeView() {
  const [active, setActive] = useState("summary");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Top bar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          ← Back
        </Link>
        <a
          href="/resume.pdf"
          download="Vidhan-Dubey-Resume.pdf"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-y-0.5 motion-reduce:transition-none">
            <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
          </svg>
          Download PDF
        </a>
      </div>

      {/* Name + contact */}
      <header className="mb-14">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Vidhan Dubey
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Product designer who codes
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
          <span>{CONTACT.phone}</span>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline-offset-4 hover:underline">
            {CONTACT.email}
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline-offset-4 hover:underline">
            {CONTACT.linkedin.label}
          </a>
          <span className="text-neutral-300 dark:text-neutral-700">·</span>
          <a href={CONTACT.github.href} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline-offset-4 hover:underline">
            {CONTACT.github.label}
          </a>
        </div>
      </header>

      <div className="grid gap-12 md:grid-cols-[180px_1fr]">
        {/* Sticky section nav */}
        <nav className="hidden md:block">
          <ul className="sticky top-24 space-y-1 text-sm">
            {SECTIONS.map((s) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-md px-3 py-1.5 transition-colors"
                    style={
                      on
                        ? { color: ACCENT, background: `${ACCENT}14` }
                        : undefined
                    }
                  >
                    <span className={on ? "" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"}>
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content */}
        <div className="min-w-0">
          {/* Summary */}
          <section className="mb-14">
            <SectionHeading id="summary">Summary</SectionHeading>
            <p className="max-w-2xl text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {SUMMARY}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-14">
            <SectionHeading id="skills">Technical Skills</SectionHeading>
            <dl className="space-y-4">
              {SKILLS.map((g) => (
                <div key={g.label} className="grid gap-1 sm:grid-cols-[170px_1fr]">
                  <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {g.label}
                  </dt>
                  <dd className="text-sm text-neutral-600 dark:text-neutral-400">
                    {g.items}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Experience */}
          <section className="mb-14">
            <SectionHeading id="experience">Experience</SectionHeading>
            <div className="space-y-3">
              {EXPERIENCE.map((job) => (
                <div
                  key={job.company + job.role}
                  className="-mx-4 rounded-xl px-4 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                      {job.role}
                    </h3>
                    <span className="text-sm text-neutral-500">{job.dates}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                    {job.company} · {job.place}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-14">
            <SectionHeading id="projects">Projects</SectionHeading>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div
                  key={p.name}
                  className="-mx-4 rounded-xl px-4 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/60"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                      {p.name}
                    </h3>
                    <span className="text-sm text-neutral-500">{p.stack}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionHeading id="education">Education</SectionHeading>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
                  {EDUCATION.school}
                </h3>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  {EDUCATION.degree}
                </p>
              </div>
              <span className="text-sm text-neutral-500">
                {EDUCATION.place} · {EDUCATION.dates}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
