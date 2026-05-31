import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Get in touch — Vidhan Dubey",
  description:
    "Open to product design + build collaborations. Reach out by email or any of the channels below.",
};

const EMAIL = "vidhandubey03@gmail.com";

const LINKS: { label: string; sub: string; href: string; icon: IconKey }[] = [
  {
    label: "GitHub",
    sub: "code · case study repos",
    href: "https://github.com/vidhaan03",
    icon: "github",
  },
  {
    label: "LinkedIn",
    sub: "professional · DM friendly",
    href: "https://www.linkedin.com/in/vidhandubey03/",
    icon: "linkedin",
  },
  {
    label: "Read.cv",
    sub: "résumé · long form",
    href: "https://read.cv/vidhandubey",
    icon: "readcv",
  },
  {
    label: "X / Twitter",
    sub: "musings · half-shipped ideas",
    href: "https://twitter.com/vidhaan03",
    icon: "x",
  },
];

type IconKey = "github" | "linkedin" | "readcv" | "x";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5 font-medium">
          Get in touch
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-50">
          Let&apos;s build something{" "}
          <span className="text-neutral-400 dark:text-neutral-500">
            people enjoy using.
          </span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I&apos;m a product designer who codes. If you&apos;re shipping
          something that needs both, I&apos;d love to hear about it. Send a
          short note and I&apos;ll get back within a day or two.
        </p>

        {/* Availability pill */}
        <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
            Available for design + build collaborations
          </span>
        </div>
      </Reveal>

      {/* Primary email card (interactive — copy to clipboard) */}
      <ContactClient email={EMAIL} />

      {/* Channel links */}
      <Reveal delay={0.1}>
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5 font-medium">
            Other channels
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                    <ChannelIcon name={l.icon} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium text-neutral-900 dark:text-neutral-50">
                      {l.label}
                    </span>
                    <span className="block text-xs text-neutral-500 truncate">
                      {l.sub}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* What's a good fit */}
      <Reveal delay={0.15}>
        <div className="mt-20 grid sm:grid-cols-2 gap-10 sm:gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-4 font-medium">
              What&apos;s a good fit
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  →
                </span>
                <span>
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    0→1 product surfaces
                  </strong>{" "}
                  where design and front-end can ship together.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  →
                </span>
                <span>
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    AI / multi-agent
                  </strong>{" "}
                  product work — especially where the interface is the story.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  →
                </span>
                <span>
                  <strong className="font-semibold text-neutral-900 dark:text-neutral-50">
                    Enterprise consoles
                  </strong>{" "}
                  with sharp problems and real users.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0">
                  →
                </span>
                <span>
                  Short, well-scoped engagements where the design ships in
                  weeks, not quarters.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-4 font-medium">
              What to include
            </p>
            <ul className="space-y-3 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              <li className="flex gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                <span>One line on what you&apos;re building.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                <span>The problem you&apos;d want help with.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                <span>Rough timeline + scope.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">·</span>
                <span>A link to anything that&apos;s already live.</span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Closing line */}
      <Reveal delay={0.2}>
        <p className="mt-20 text-sm text-neutral-500">
          Based in Bengaluru, IN · Working remotely · Comfortable across IST,
          PT, and ET windows.
        </p>
      </Reveal>
    </div>
  );
}

/* ------------------------------ Icons ------------------------------ */

function ChannelIcon({ name }: { name: IconKey }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "w-5 h-5",
    fill: "currentColor",
  } as const;
  switch (name) {
    case "github":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.05.78 2.12v3.15c0 .31.21.67.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} aria-hidden>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07s.93-2.07 2.07-2.07 2.07.93 2.07 2.07-.93 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} aria-hidden>
          <path d="M17.53 3H20.5l-6.5 7.43L21.75 21H15.7l-4.74-6.2L5.55 21H2.58l6.96-7.95L1.99 3h6.16l4.28 5.66L17.53 3zm-2.13 16.2h1.64L7.7 4.7H5.94L15.4 19.2z" />
        </svg>
      );
    case "readcv":
      // Stylized "rcv" mark for read.cv (no official mark in current branding)
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
  }
}
