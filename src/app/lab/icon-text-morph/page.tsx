import type { Metadata } from "next";
import { COMMUNITY_CHANNELS, IconTextMorph, TECH_LOGOS } from "@/components/ui/icon-text-morph";

export const metadata: Metadata = {
  title: "Icon + text morph",
  robots: { index: false, follow: false },
};

export default function IconTextMorphPreview() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center gap-14 px-6 py-20">
      <p className="text-4xl leading-[1.15] font-semibold tracking-[-0.03em] sm:text-6xl">
        Page your team on{" "}
        <IconTextMorph items={COMMUNITY_CHANNELS} suffix={<span className="text-[var(--muted)]">,</span>} />
      </p>

      <p className="text-4xl leading-[1.15] font-semibold tracking-[-0.03em] sm:text-6xl">
        I work with{" "}
        <IconTextMorph items={TECH_LOGOS} interval={3000} duration={450} suffix="." />
      </p>

      <p className="text-2xl leading-[1.2] font-medium sm:text-3xl">
        Same pill at a smaller size —{" "}
        <IconTextMorph items={COMMUNITY_CHANNELS} suffix="." />
      </p>

      <p className="text-[15px] leading-7 text-[var(--muted)]">
        It inherits font size, so it also works mid-paragraph with{" "}
        <IconTextMorph items={TECH_LOGOS} className="mx-0.5" suffix=" and" /> friends.
      </p>
    </main>
  );
}
