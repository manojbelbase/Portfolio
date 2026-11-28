import { techStackGroups } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function TechStackSection() {
  return (
    <section className="mt-4 sm:mt-6" aria-label="Tech stack">
      <SectionHeading>Tech stack</SectionHeading>
      <div className="divide-y divide-[var(--border)]">
        {techStackGroups.map((group) => (
          <div
            key={group.label}
            className="grid min-w-0 gap-1.5 py-1.5 first:pt-1 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-2 sm:py-2"
          >
            <h3 className="text-[13px] font-medium text-[var(--foreground)] sm:pt-1">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-0.5 text-xs text-[var(--muted)] transition-colors hover:border-[var(--primary)]/40 hover:text-[var(--foreground)] sm:text-[13px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
