import Image from "next/image";
import ThemeToggle from "@/components/theme-toggle";

export default function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[760px] items-center justify-between px-4 pb-2 pt-6 sm:px-6">
      <div className="flex items-center">
        <a
          href="#top"
          aria-label="Back to top"
          className="inline-flex rounded-full transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.webp"
            alt="Manoj Belbase logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain dark:invert"
            priority
          />
        </a>
      </div>
      <nav
        aria-label="Portfolio sections"
        className="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]"
      >
        <a href="#work" className="transition hover:text-[var(--foreground)]">
          Projects
        </a>
        <a href="#writing" className="hidden transition hover:text-[var(--foreground)] sm:inline">
          Writing
        </a>
        <a href="#contact" className="hidden transition hover:text-[var(--foreground)] sm:inline">
          Contact
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
