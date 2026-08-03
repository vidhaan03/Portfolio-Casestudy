"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

/* --------------------------- Shared context --------------------------- */

type PassportCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const PassportContext = createContext<PassportCtx | null>(null);

/**
 * Owns the passport's open state and renders the single PassportPanel
 * instance. All triggers (nav button, hero eyebrow, 3D booklet) consume
 * this context to open it.
 */
export function PassportProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const ctxValue: PassportCtx = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return (
    <PassportContext.Provider value={ctxValue}>
      {children}
      <PassportPanel open={isOpen} onClose={() => setIsOpen(false)} />
    </PassportContext.Provider>
  );
}

function usePassport(): PassportCtx {
  const ctx = useContext(PassportContext);
  if (!ctx)
    throw new Error("usePassport must be used inside <PassportProvider>");
  return ctx;
}

/* ------------------------------ Triggers ------------------------------ */

/**
 * Text-style trigger used in the nav and hero eyebrow.
 */
export function PassportButton({
  children = "Vidhan Dubey",
  className = "font-medium tracking-tight hover:opacity-80 transition-opacity cursor-pointer",
}: {
  children?: ReactNode;
  /** Override the default nav-style className. */
  className?: string;
}) {
  const { open, isOpen } = usePassport();
  return (
    <button
      type="button"
      onClick={open}
      className={className}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
}

/**
 * 3D booklet trigger — a realistic-looking closed passport meant to sit
 * in negative space (e.g. the right side of the hero). Click to open the
 * panel. Idles with a gentle hover-bob; on cursor-hover the cover rotates
 * toward the viewer with springy physics.
 */
export function PassportBooklet({ className }: { className?: string }) {
  const { open } = usePassport();
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{ perspective: 1200 }}
    >
      <motion.button
        type="button"
        onClick={open}
        aria-label="Open Vidhan's design passport"
        className="group relative block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-4"
        style={{
          width: 200,
          height: 280,
          transformStyle: "preserve-3d",
        }}
        initial={
          reduced
            ? { rotateY: 0, rotateX: 0 }
            : { rotateY: -14, rotateX: 6 }
        }
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={
          reduced
            ? undefined
            : {
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }
        }
        whileHover={
          reduced
            ? undefined
            : { rotateY: -4, rotateX: 2, scale: 1.04 }
        }
        whileTap={reduced ? undefined : { scale: 0.98 }}
      >
        {/* Page edges peeking from the right — gives the booklet thickness */}
        <div
          aria-hidden
          className="absolute top-1 bottom-1 -right-1.5 w-2 rounded-r-sm"
          style={{
            background:
              "repeating-linear-gradient(180deg, #f5efde 0 1px, #cdc2a4 1px 2px)",
            boxShadow: "1px 0 2px rgba(0,0,0,0.15)",
            transform: "translateZ(-2px)",
          }}
        />

        {/* Cover */}
        <div
          className="absolute inset-0 rounded-md overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_HIGHLIGHT} 50%, ${NAVY} 100%)`,
            boxShadow:
              "0 30px 60px -25px rgba(0,0,0,0.65), 0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Subtle leather-grain texture overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  43deg,
                  rgba(255,255,255,0.02) 0,
                  rgba(255,255,255,0.02) 1px,
                  transparent 1px,
                  transparent 3px
                ),
                repeating-linear-gradient(
                  137deg,
                  rgba(0,0,0,0.04) 0,
                  rgba(0,0,0,0.04) 1px,
                  transparent 1px,
                  transparent 3px
                )
              `,
              opacity: 0.7,
            }}
          />

          {/* Cover content */}
          <div
            className="absolute inset-0 flex flex-col items-center px-5 py-8"
            style={{ color: GOLD }}
          >
            <div className="text-[9px] tracking-[0.22em] opacity-95 mb-0.5">
              भारत गणराज्य
            </div>
            <div className="text-[10px] tracking-[0.28em] font-semibold">
              REPUBLIC OF INDIA
            </div>

            <div className="flex-1 flex items-center">
              <div className="w-20 h-20">
                <AshokaEmblem />
              </div>
            </div>

            <div className="text-[9px] tracking-[0.22em] opacity-95 mb-0.5">
              डिज़ाइन पासपोर्ट
            </div>
            <div className="text-[15px] tracking-[0.22em] font-bold">
              DESIGN PASSPORT
            </div>
          </div>

          {/* Diagonal sheen — moves on hover */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-30%" }}
            whileHover={reduced ? undefined : { x: "30%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.05) 50%, transparent 62%)",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Floor shadow */}
        <div
          aria-hidden
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Hover-only "Click to open" hint */}
        <div
          aria-hidden
          className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[11px] tracking-wider uppercase text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
        >
          click to open
        </div>
      </motion.button>
    </div>
  );
}

/* ------------------------------ Panel ------------------------------ */

// Tuned to match a real Indian passport: near-black cover with a subtle
// blue undertone, muted ochre-gold for the embossed text + emblem (NOT
// bright gold), warm cream paper inside.
const NAVY = "#0d1018";
const NAVY_HIGHLIGHT = "#1c2030";
const GOLD = "#9a7e3f";
const GOLD_DIM = "#9a7e3f55";
const PAPER = "#f5efde";
const INK = "#3a2e1d";

function PassportPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="passport-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-[3px]"
          />

          {/* Centered spread */}
          <div
            className="fixed inset-0 z-[81] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none"
            style={{ perspective: 1800 }}
          >
            <motion.div
              key="passport-spread"
              role="dialog"
              aria-label="Vidhan Dubey design passport"
              initial={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.6, rotateY: -75 }
              }
              animate={
                reduced
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, rotateY: 0 }
              }
              exit={
                reduced
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.7, rotateY: -45 }
              }
              transition={
                reduced
                  ? { duration: 0.25 }
                  : {
                      type: "spring",
                      stiffness: 160,
                      damping: 24,
                      mass: 0.9,
                    }
              }
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[940px] my-auto pointer-events-auto"
            >
              <PassportContent onClose={onClose} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* --------------------------- Content layout --------------------------- */

function PassportContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative">
      {/* Floating close button — sits outside the spread on top-right */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close passport"
        className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white text-neutral-800 shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 6L18 18M18 6L6 18" />
        </svg>
      </button>

      <div
        className="relative grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
        style={{
          backgroundColor: PAPER,
          boxShadow:
            "0 50px 100px -30px rgba(0,0,0,0.55), 0 20px 40px -10px rgba(0,0,0,0.25)",
        }}
      >
        {/* Centre binding strip — visible on md+ to suggest a real spine */}
        <div
          aria-hidden
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(58,46,29,0) 0%, rgba(58,46,29,0.18) 45%, rgba(58,46,29,0.3) 50%, rgba(58,46,29,0.18) 55%, rgba(58,46,29,0) 100%)",
          }}
        />

        <LeftPage />
        <RightPage />
      </div>
    </div>
  );
}

/* ------------------------------ Pages ------------------------------ */

function LeftPage() {
  return (
    <PassportPage side="left" pageCode="IND · M1">
      {/* Identity header */}
      <div className="text-center mb-7">
        <div className="text-[9px] tracking-[0.32em] opacity-70 mb-1">
          भारत गणराज्य
        </div>
        <div className="text-[10px] tracking-[0.32em] font-semibold mb-3">
          REPUBLIC OF INDIA
        </div>
        <div className="w-14 h-14 mx-auto mb-3">
          <AshokaEmblem />
        </div>
        <div className="text-[9px] tracking-[0.32em] opacity-70 mb-0.5">
          डिज़ाइन पासपोर्ट
        </div>
        <div className="text-[15px] tracking-[0.22em] font-bold">
          DESIGN PASSPORT
        </div>
      </div>

      {/* Photo + data */}
      <div className="grid grid-cols-[88px_1fr] gap-5 mb-7">
        <div
          className="aspect-[3/4] flex items-center justify-center"
          style={{
            backgroundColor: "white",
            border: `1.5px solid ${INK}`,
            boxShadow: "inset 0 0 0 4px white, inset 0 0 0 5px " + INK,
          }}
        >
          <span
            className="font-[family-name:var(--font-caveat)] text-4xl"
            style={{ color: INK }}
          >
            VD
          </span>
        </div>

        <dl className="space-y-2 text-[11px] leading-tight">
          <Field label="Type / Country / Code">
            <span className="font-mono">P · IND · DSGNR</span>
          </Field>
          <Field label="Surname / उपनाम">
            <span className="font-semibold tracking-wider">DUBEY</span>
          </Field>
          <Field label="Given name / नाम">
            <span className="font-semibold tracking-wider">VIDHAN</span>
          </Field>
          <Field label="Nationality">
            <span className="font-semibold tracking-wider">INDIAN</span>
          </Field>
        </dl>
      </div>

      {/* Designation */}
      <div className="mb-6">
        <dt
          className="text-[9px] uppercase tracking-[0.18em] opacity-60 mb-0.5"
          style={{ color: INK }}
        >
          Profession / Designation
        </dt>
        <dd
          className="text-sm font-semibold tracking-wider"
          style={{ color: INK }}
        >
          PRODUCT DESIGNER · BUILDER · SHIPPER
        </dd>
      </div>

      {/* MRZ */}
      <div
        className="font-mono text-[10px] tracking-[0.18em] mb-7 pb-2 overflow-hidden whitespace-nowrap opacity-80"
        style={{ borderBottom: `1px dashed ${INK}55` }}
      >
        P&lt;INDDUBEY&lt;&lt;VIDHAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </div>

      {/* Issue meta */}
      <div
        className="mb-6 grid grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.16em]"
        style={{ color: INK }}
      >
        <div>
          <div className="opacity-60 mb-0.5">Date of Issue</div>
          <div className="font-mono">2026 · MAY</div>
        </div>
        <div>
          <div className="opacity-60 mb-0.5">Authority</div>
          <div className="font-mono">SELF</div>
        </div>
        <div>
          <div className="opacity-60 mb-0.5">Date of Expiry</div>
          <div className="font-mono">NEVER</div>
        </div>
      </div>

      {/* QR + signature pinned to bottom */}
      <div className="mt-auto pt-4 flex items-end justify-between gap-4">
        <FakeQRCode />
        <div className="flex-1 text-right">
          <div
            className="font-[family-name:var(--font-caveat)] text-3xl leading-none"
            style={{ color: INK }}
          >
            Vidhan
          </div>
          <div className="text-[9px] uppercase tracking-[0.18em] opacity-60 mt-2">
            Signature of bearer
          </div>
        </div>
      </div>
    </PassportPage>
  );
}

function RightPage() {
  return (
    <PassportPage side="right" pageCode="IND · M2">
      {/* Visa header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px" style={{ backgroundColor: `${INK}30` }} />
        <span className="text-[10px] uppercase tracking-[0.24em] font-semibold opacity-70">
          Visa Entries · Experience
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: `${INK}30` }} />
      </div>

      {/* Experiences */}
      <div className="space-y-7 mb-8">
        {EXPERIENCES.map((exp, i) => (
          <VisaStamp key={exp.title} {...exp} index={i} />
        ))}
      </div>

      {/* Footnotes — pinned to bottom */}
      <div
        className="mt-auto pt-4 text-[10px] leading-[1.55] opacity-70"
        style={{ color: INK, borderTop: `1px dashed ${INK}40` }}
      >
        <p className="mt-3">
          <span className="font-semibold">* </span>
          Holder is entitled to design and ship product end-to-end.
        </p>
        <p>
          <span className="font-semibold">** </span>
          Not exchangeable for After Effects expertise.
        </p>
        <p>
          <span className="font-semibold">*** </span>
          Cross-disciplinary travel between design and engineering is
          permitted.
        </p>
        <p>
          <span className="font-semibold">**** </span>
          Passport must be presented before delegating UI work.
        </p>
      </div>
    </PassportPage>
  );
}

/* ------------------------------ Page shell ------------------------------ */

function PassportPage({
  children,
  side,
  pageCode,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  pageCode: string;
}) {
  // Icon strip lives on the OUTER edge (away from the binding) of each page.
  const stripPosition =
    side === "left"
      ? "absolute left-1.5 top-32 bottom-32"
      : "absolute right-1.5 top-32 bottom-32";

  const badgePosition =
    side === "left" ? "absolute top-3 left-3" : "absolute top-3 right-3";

  return (
    <div
      className="relative overflow-hidden px-6 sm:px-8 py-8 sm:py-10 min-h-[640px] flex flex-col"
      style={{
        backgroundColor: PAPER,
        color: INK,
        backgroundImage: `
          radial-gradient(ellipse at top, rgba(192,165,92,0.10), transparent 70%),
          repeating-linear-gradient(0deg, rgba(58,46,29,0.025) 0 2px, transparent 2px 4px)
        `,
      }}
    >
      {/* Wavy security pattern */}
      <SecurityWaves />

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <div
          className="font-bold tracking-[0.12em]"
          style={{
            fontSize: 120,
            lineHeight: 0.9,
            color: INK,
            opacity: 0.05,
            transform: side === "left" ? "rotate(-8deg)" : "rotate(6deg)",
            whiteSpace: "nowrap",
          }}
        >
          {side === "left" ? "VIDHAN" : "DUBEY"}
        </div>
      </div>

      {/* Outer-edge icon strip */}
      <IconStrip className={stripPosition} />

      {/* Page identifier badge */}
      <div
        aria-hidden
        className={`${badgePosition} px-2 py-0.5 rounded-full text-[9px] font-mono tracking-[0.18em] font-semibold z-10`}
        style={{ backgroundColor: INK, color: PAPER }}
      >
        {pageCode}
      </div>

      {/* Actual page content */}
      <div className="relative z-10 flex flex-col flex-1">{children}</div>
    </div>
  );
}

/* ------------------------------ Sub-bits ------------------------------ */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt
        className="text-[9px] uppercase tracking-[0.18em] opacity-60"
        style={{ color: INK }}
      >
        {label}
      </dt>
      <dd className="text-sm" style={{ color: INK }}>
        {children}
      </dd>
    </div>
  );
}

type Experience = {
  title: string;
  org: string;
  period: string;
  location: string;
  blurb: string;
  stampTone: "red" | "blue" | "green" | "violet";
  stampRotation: number;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Founder · Designer · Builder",
    org: "motion.saas",
    period: "2026 — Present",
    location: "Indie · Bengaluru",
    blurb:
      "A solo indie tool that turns a prompt into a cinematic SaaS launch ad. Multi-agent orchestration, React Remotion, NVIDIA NIM.",
    stampTone: "violet",
    stampRotation: -6,
  },
  {
    title: "Product & Visual Designer",
    org: "Plivo · CX Platform",
    period: "2024 — 2025",
    location: "Bengaluru, IN",
    blurb:
      "Rebuilt the 10DLC, Campaigns, and Compliance surfaces used by brands like Uber, Zomato, and Meta. Shipped to production.",
    stampTone: "blue",
    stampRotation: 4,
  },
  {
    title: "Co-builder · Designer",
    org: "Mrig AI",
    period: "2025",
    location: "Indie · India",
    blurb:
      "Virtual try-on for every marketplace. iOS + Android, designed in 8 days, 200+ downloads in three days.",
    stampTone: "red",
    stampRotation: -3,
  },
];

function VisaStamp({
  title,
  org,
  period,
  location,
  blurb,
  stampTone,
  stampRotation,
  index,
}: Experience & { index: number }) {
  const tones = {
    red: { ink: "#9f2222", bg: "#fcebea" },
    blue: { ink: "#1f3a85", bg: "#e8eefc" },
    green: { ink: "#1f6b3a", bg: "#e8f5ec" },
    violet: { ink: "#6b2585", bg: "#f3e8fa" },
  }[stampTone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
      className="grid grid-cols-[78px_1fr] gap-4 items-start"
    >
      {/* Stamp */}
      <div
        className="relative aspect-square flex items-center justify-center select-none"
        style={{ transform: `rotate(${stampRotation}deg)` }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${tones.ink}`,
            opacity: 0.85,
          }}
        />
        <div
          className="absolute inset-2 rounded-full"
          style={{
            border: `1px solid ${tones.ink}`,
            opacity: 0.5,
          }}
        />
        <div
          className="text-center font-mono text-[8px] tracking-[0.16em] leading-tight"
          style={{ color: tones.ink }}
        >
          <div className="font-bold">{abbr(org)}</div>
          <div className="opacity-80 mt-0.5">{periodShort(period)}</div>
          <div className="opacity-60 mt-0.5">{location.split(/[·,]/)[0].trim().slice(0, 6).toUpperCase()}</div>
        </div>
        {/* Inner faded star */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ color: tones.ink, opacity: 0.12 }}
        >
          <svg viewBox="0 0 24 24" className="w-12 h-12" fill="currentColor">
            <path d="M12 2l2.6 6.9L22 9.6l-5.3 4.6L18 21.5 12 17.8 6 21.5l1.3-7.3L2 9.6l7.4-.7z" />
          </svg>
        </div>
      </div>

      {/* Entry text */}
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] opacity-60">
          {period}
        </div>
        <div className="font-semibold text-base mt-0.5 leading-tight">
          {title}
        </div>
        <div className="text-sm mt-0.5 opacity-80">
          {org} · {location}
        </div>
        <p className="mt-2 text-[13px] leading-relaxed opacity-90">{blurb}</p>
      </div>
    </motion.div>
  );
}

function abbr(s: string): string {
  // Strip noise then take first 5–7 letters.
  return s.replace(/[^A-Za-z0-9]/g, "").slice(0, 7).toUpperCase();
}
function periodShort(p: string): string {
  // "2024 — 2025" -> "24-25", "2026 — Present" -> "26-NOW"
  const years = p.match(/\d{4}/g) ?? [];
  const y0 = years[0];
  const y1 = years[1];
  if (y0 && y1) return `${y0.slice(2)}–${y1.slice(2)}`;
  if (/present/i.test(p)) return `${y0?.slice(2) ?? ""}-NOW`;
  return y0?.slice(2) ?? "";
}

function AshokaEmblem() {
  // Stylized Ashoka Lion Capital — more detailed silhouettes of three
  // lions atop an abacus, with the Dharma chakra below, and the
  // Devanagari inscription सत्यमेव जयते underneath, all in muted ochre
  // tones to match a printed-on-leather passport cover look.
  return (
    <svg viewBox="0 0 100 110" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="emblem-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfa05a" />
          <stop offset="1" stopColor="#7a6133" />
        </linearGradient>
      </defs>

      <g fill="url(#emblem-gold)" stroke="url(#emblem-gold)">
        {/* === Three lions === */}

        {/* Center lion — front-facing head, full mane */}
        <g strokeWidth="0">
          {/* Mane */}
          <path d="M 50 12
                   C 42 12, 38 18, 38 24
                   C 38 30, 42 34, 50 35
                   C 58 34, 62 30, 62 24
                   C 62 18, 58 12, 50 12 Z" />
          {/* Inner mane shape (slightly darker via opacity) */}
          <path
            d="M 50 16 C 44 16, 41 21, 41 26 C 41 30, 44 33, 50 33 C 56 33, 59 30, 59 26 C 59 21, 56 16, 50 16 Z"
            fill="#0d1018"
            opacity="0.18"
          />
          {/* Ears */}
          <ellipse cx="43" cy="15" rx="1.6" ry="2.2" />
          <ellipse cx="57" cy="15" rx="1.6" ry="2.2" />
          {/* Eyes (subtle gaps using dark fill) */}
          <ellipse cx="46" cy="24" rx="0.9" ry="0.7" fill="#0d1018" />
          <ellipse cx="54" cy="24" rx="0.9" ry="0.7" fill="#0d1018" />
          {/* Snout */}
          <path d="M 47 27 Q 50 31, 53 27 L 51 30 L 50 31 L 49 30 Z" fill="#0d1018" opacity="0.4" />
        </g>

        {/* Left lion — profile facing left */}
        <g strokeWidth="0">
          {/* Body / mane */}
          <path d="M 28 22
                   C 22 22, 18 26, 18 31
                   C 18 35, 21 38, 25 38
                   L 32 38
                   L 32 26
                   C 32 24, 30 22, 28 22 Z" />
          {/* Head profile */}
          <path d="M 17 28 C 14 28, 12 30, 12 33 C 12 35, 14 36, 17 35 Z" />
          {/* Nose tip */}
          <circle cx="11.5" cy="33" r="0.8" fill="#0d1018" />
        </g>

        {/* Right lion — profile facing right */}
        <g strokeWidth="0">
          <path d="M 72 22
                   C 78 22, 82 26, 82 31
                   C 82 35, 79 38, 75 38
                   L 68 38
                   L 68 26
                   C 68 24, 70 22, 72 22 Z" />
          <path d="M 83 28 C 86 28, 88 30, 88 33 C 88 35, 86 36, 83 35 Z" />
          <circle cx="88.5" cy="33" r="0.8" fill="#0d1018" />
        </g>

        {/* === Abacus (the platform the lions stand on) === */}
        <rect x="14" y="40" width="72" height="2" fill="url(#emblem-gold)" />
        <rect x="14" y="44" width="72" height="6" fill="url(#emblem-gold)" />
        {/* Tiny chakra glyphs on the abacus band */}
        <g fill="#0d1018" opacity="0.35">
          <circle cx="22" cy="47" r="1.6" />
          <circle cx="50" cy="47" r="1.6" />
          <circle cx="78" cy="47" r="1.6" />
        </g>
        <rect x="14" y="51" width="72" height="2" fill="url(#emblem-gold)" />

        {/* Bell base (lotus) — pinched-curve outline */}
        <path
          d="M 24 53
             C 28 60, 32 62, 50 62
             C 68 62, 72 60, 76 53
             Z"
          fill="url(#emblem-gold)"
        />
      </g>

      {/* === Dharma chakra wheel below === */}
      <g transform="translate(50 76)">
        <circle r="11" fill="none" stroke="url(#emblem-gold)" strokeWidth="1.3" />
        <circle r="3" fill="url(#emblem-gold)" />
        {Array.from({ length: 24 }).map((_, i) => {
          // Round to 3 decimals — React serializes raw floats differently on
          // server vs client (precision-loss artefacts) which trips
          // hydration mismatch. 0.001 SVG units is well below sub-pixel.
          const angle = (i * Math.PI * 2) / 24;
          const r = (v: number) => Math.round(v * 1000) / 1000;
          const x1 = r(Math.cos(angle) * 3.4);
          const y1 = r(Math.sin(angle) * 3.4);
          const x2 = r(Math.cos(angle) * 10.5);
          const y2 = r(Math.sin(angle) * 10.5);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#emblem-gold)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>

      {/* === Devanagari inscription === */}
      <text
        x="50"
        y="100"
        textAnchor="middle"
        fontSize="6.5"
        fontFamily="'Noto Sans Devanagari', 'Mukta', 'Hind', 'Tiro Devanagari Hindi', system-ui, serif"
        fontWeight="700"
        letterSpacing="0.04em"
        fill="url(#emblem-gold)"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
}

function CornerOrnament({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-7 h-7 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path
        d="M 1 1 L 20 1 M 1 1 L 1 20 M 4 4 L 16 4 M 4 4 L 4 16"
        stroke={GOLD}
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------------- Page-decoration components ---------------------- */

/**
 * Subtle horizontal wavy lines covering the page, like passport security
 * paper. Very faint — they sit behind everything else.
 */
function SecurityWaves() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 400 800"
    >
      <defs>
        <pattern
          id="wave-pattern"
          x="0"
          y="0"
          width="400"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 7 Q 25 0, 50 7 T 100 7 T 150 7 T 200 7 T 250 7 T 300 7 T 350 7 T 400 7"
            fill="none"
            stroke={INK}
            strokeWidth="0.5"
            opacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="400" height="800" fill="url(#wave-pattern)" />
    </svg>
  );
}

/**
 * Vertical strip of small design-tool icons running down one edge of the
 * page. Mirrors the decorative coffee-equipment column in the reference.
 */
function IconStrip({ className }: { className?: string }) {
  const icons = [
    // pen / nib
    "M12 3l3 6-3 12-3-12 3-6z",
    // ruler
    "M3 17l14-14 4 4-14 14H3v-4z M7 17l-2-2 M9 15l-1-1 M11 13l-2-2 M13 11l-1-1 M15 9l-2-2 M17 7l-1-1",
    // cursor
    "M3 3l8 18 2-8 8-2L3 3z",
    // grid
    "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    // braces
    "M8 3c-3 0-3 4-3 5s0 4-3 4c3 0 3 3 3 4s0 5 3 5 M16 3c3 0 3 4 3 5s0 4 3 4c-3 0-3 3-3 4s0 5-3 5",
    // circle
    "M12 4a8 8 0 100 16 8 8 0 000-16z",
    // dot grid
    "M5 5h1v1H5z M11 5h1v1h-1z M17 5h1v1h-1z M5 11h1v1H5z M11 11h1v1h-1z M17 11h1v1h-1z M5 17h1v1H5z M11 17h1v1h-1z M17 17h1v1h-1z",
  ];
  return (
    <div
      aria-hidden
      className={`flex flex-col items-center justify-between gap-2 ${className ?? ""}`}
    >
      {icons.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.5 }}
        >
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}

/**
 * Decorative QR-code-shaped block. Not a scannable QR — just reads as
 * "QR code" visually next to the signature.
 */
function FakeQRCode() {
  // Pseudo-random but deterministic pattern based on cell index.
  const SIZE = 13;
  const cells: boolean[] = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    // Force the three corner-marker squares like a real QR.
    const row = Math.floor(i / SIZE);
    const col = i % SIZE;
    const inMarker =
      (row < 4 && col < 4) ||
      (row < 4 && col > SIZE - 5) ||
      (row > SIZE - 5 && col < 4);
    if (inMarker) {
      // Outline + center pattern for QR finder.
      const isEdge =
        row === 0 ||
        col === 0 ||
        row === 3 ||
        col === 3 ||
        row === SIZE - 1 ||
        col === SIZE - 1 ||
        row === SIZE - 4 ||
        col === SIZE - 4;
      const isCenter =
        (row >= 1 && row <= 2 && col >= 1 && col <= 2) ||
        (row >= 1 && row <= 2 && col >= SIZE - 3 && col <= SIZE - 2) ||
        (row >= SIZE - 3 && row <= SIZE - 2 && col >= 1 && col <= 2);
      cells.push(isEdge || isCenter);
    } else {
      // Deterministic noise.
      cells.push(((i * 73 + 13) % 5) < 2);
    }
  }
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${SIZE}, 4px)`,
        gridTemplateRows: `repeat(${SIZE}, 4px)`,
        gap: 1,
        padding: 4,
        backgroundColor: "white",
        border: `1px solid ${INK}`,
      }}
      aria-label="QR code (decorative)"
    >
      {cells.map((on, i) => (
        <div
          key={i}
          style={{
            backgroundColor: on ? INK : "transparent",
          }}
        />
      ))}
    </div>
  );
}
