import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function EducationSection() {
  return (
    <section className="mt-6 sm:mt-10" aria-label="Education">
        <SectionHeading>Education</SectionHeading>
      <div className="space-y-3">
        {education.map((item) => (
          <article key={item.degree} className="flex min-w-0 items-start gap-3 sm:py-3">
            <GraduationCap
              size={19}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-[var(--muted)]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--foreground)]">{item.degree}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-[14px] text-[var(--muted)] underline decoration-transparent underline-offset-4 transition hover:text-[var(--foreground)] hover:decoration-[var(--border)]"
                >
                  {item.institution}
                </a>
              ) : (
                <p className="mt-1 text-[14px] text-[var(--muted)]">{item.institution}</p>
              )}
            </div>
            <span className="shrink-0 pt-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--muted)]">
              {item.period}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
