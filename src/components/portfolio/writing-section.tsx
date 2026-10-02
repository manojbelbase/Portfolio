import { ArrowUpRight } from "lucide-react";
import { writingItems } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function WritingSection() {
  return (
    <section id="writing" className="mt-6 sm:mt-10 scroll-mt-6">
      <SectionHeading>Writing</SectionHeading>
      <div className="sm:space-y-2 text-sm sm:text-[15px]">
        {writingItems.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.includes("medium.com") ? "_blank" : undefined}
            rel={item.href.includes("medium.com") ? "noreferrer" : undefined}
            className="group flex items-center justify-between gap-3 py-2 text-[var(--foreground)] transition hover:text-[var(--primary)]"
          >
            <span className="min-w-0 bg-[linear-gradient(var(--primary),var(--primary))] bg-left-bottom bg-no-repeat pb-0.5 text-left [background-size:0%_1px] transition-[background-size,color] duration-300 group-hover:[background-size:100%_1px]">
              {item.title}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] sm:text-[12px] uppercase tracking-[0.08em] text-[var(--muted)] transition group-hover:text-[var(--primary)]">
              Read
              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
