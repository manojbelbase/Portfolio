import { techStack } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function TechStackSection() {
  return (
    <section className="mt-6 sm:mt-10" aria-label="Tech stack">
      <SectionHeading>Tech stack</SectionHeading>
      <p className="text-[15px] leading-7 text-[var(--muted)]">{techStack.join(" · ")}</p>
    </section>
  );
}
