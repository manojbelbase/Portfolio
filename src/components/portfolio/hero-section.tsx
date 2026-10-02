import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import { TiltGlowImage } from "@/components/ui/tilt-glow-image";
import { HeroInlineIcon, HeroKeyword, HeroKhukuri, HeroMotionWord } from "./hero-keyword";

export default function HeroSection() {
  return (
    <section>
      <TiltGlowImage
        src="/banner.png"
        alt="Manoj Belbase banner"
        className="aspect-[16/6] w-full rounded-lg sm:aspect-[1440/500] lg:aspect-[1440/430]"
      />
      <div className="relative ml-5 -mt-10">
        <div className="h-16 w-16 overflow-hidden rounded-lg bg-[#1a1a1a] ring-[var(--background)] border border-gray-100 dark:border-gray-600">
          <Image
            src="/profile-cropped.png"
            alt="Manoj Belbase"
            width={64}
            height={64}
            className="h-full w-full object-cover object-top"
            priority
          />
        </div>
      </div>
      <div className="mt-4 space-y-2 sm:space-y-3">
        <h1 className="flex items-center gap-2 text-[2rem] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
          Manoj Belbase
          <span className="inline-flex text-base leading-none" role="img" aria-label="Nepal">
            🇳🇵
          </span>
        </h1>

        <div className="space-y-2 sm:space-y-4 text-[15px] leading-7 text-[var(--muted)]">
          <p>
            I&apos;m a <HeroKhukuri label="Frontend Developer" />{" "}
            turning complex ideas into intuitive web experiences, with a focus on{" "}
            <HeroInlineIcon emoji="🤔" label="thoughtful design" />
            {", "}
            <HeroMotionWord label="smooth interactions" />
            {", and interfaces that are "}
            <HeroKeyword
              icon={MousePointerClick}
              label="easy to use"
              tip="Clear paths, readable UI — simple to use and maintain."
            />
            .
          </p>
          <p>
            I build with{" "}
            <span className="inline-flex items-center gap-1 align-middle">
              <Image src="/react-logo.svg" alt="React" width={14} height={14} className="h-3.5 w-3.5" />
              <u>React</u>
            </span>{" "}
            and <u>Next.js</u>, turning complex workflows into responsive interfaces, reusable
            components, dashboards, and production-ready UI systems. I also work across{" "}
            <strong>backend services</strong> with{" "}
            <span className="inline-flex items-center gap-1 align-middle">
              <Image src="/express-logo.svg" alt="Express" width={14} height={14} className="h-3.5 w-3.5" />
              <u>Express</u>
            </span>{" "}
            and <strong>LLM integrations</strong> when products need the full experience.
          </p>
          <p>
            <em>
              I focus on clear, practical interfaces that are easy to use, maintain, and improve.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}
