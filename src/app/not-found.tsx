import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/portfolio";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main className="mx-auto flex min-h-[75vh] max-w-[760px] flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 rounded-full border border-[var(--border)] bg-[var(--surface)] p-4">
          <Image src="/logo.webp" alt="Manoj Belbase logo" width={56} height={56} className="dark:invert" />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">A little off the path</p>
        <p className="mt-2 font-mono text-8xl font-bold tracking-tighter text-[var(--primary)] sm:text-9xl">404</p>
        <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">This page wandered off.</h1>
        <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">The link may be outdated, or the address might have a typo. Let’s get you somewhere familiar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-medium text-black focus-visible:outline-2 focus-visible:outline-offset-4">
            <ArrowLeft size={16} aria-hidden="true" /> Back to home
          </Link>
          <Link href="/#work" className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-4">
            Explore projects <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </main>
    </div>
  );
}
