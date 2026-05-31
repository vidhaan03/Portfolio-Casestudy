import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Caveat,
  Patrick_Hand,
} from "next/font/google";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import {
  PassportButton,
  PassportProvider,
} from "@/components/passport/Passport";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Vidhan Dubey, Product Designer who Builds",
  description:
    "Selected case studies and work by Vidhan Dubey, a product designer who builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrainsMono.variable} ${caveat.variable} ${patrickHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <PassportProvider><Cursor />
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
            <PassportButton>Vidhan Dubey</PassportButton>
            <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <Link href="/#work" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Work
              </Link>
              <Link href="/#about" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 mt-24">
          <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Vidhan Dubey</p>
            <a
              href="mailto:vidhandubey03@gmail.com"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              vidhandubey03@gmail.com
            </a>
          </div>
        </footer>
        </PassportProvider>
      </body>
    </html>
  );
}
