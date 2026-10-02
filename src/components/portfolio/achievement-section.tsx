import Image from "next/image";
import SectionHeading from "./section-heading";

export default function AchievementSection() {
  return (
    <section className="mt-6 sm:mt-10" aria-label="Achievements">
      <SectionHeading>Achievement</SectionHeading>
      <div className="py-1">
        <div className="flex items-start gap-3">
          <Image
            src="/british-council-logo.svg"
            alt="British Council"
            width={32}
            height={32}
            className="mt-0.5 h-7 w-7 shrink-0 object-contain"
          />
          <div className="space-y-1">
            <div className="text-sm sm:text-[15px] font-medium text-[var(--foreground)]">
              UK Knowledge Agent and Counsellor Training
            </div>
            <div className="text-[13px] sm:text-sm tracking-[0.12em] text-[var(--muted)]">
              Certificate of Completion
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
}
