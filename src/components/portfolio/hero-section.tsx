import Image from "next/image";
import { MousePointerClick } from "lucide-react";
import { TiltGlowImage } from "@/components/ui/tilt-glow-image";
import { ProfileMascot } from "./profile-mascot";
import { HeroInlineIcon, HeroKeyword, HeroKhukuri, HeroMotionWord } from "./hero-keyword";
import { HeroTechMorph } from "./hero-tech-morph";

export default function HeroSection() {
  return (
    <section>
      <TiltGlowImage
        src="/banner.png"
        alt="Manoj Belbase banner"
        className="aspect-[16/6] w-full rounded-lg sm:aspect-[1440/500] lg:aspect-[1440/430]"
      />
      <div className="relative ml-5 -mt-10 hidden md:block">
        <div data-profile-photo className="h-16 w-16 overflow-hidden rounded-lg bg-[#1a1a1a] ring-[var(--background)] border border-gray-100 dark:border-gray-600">
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
      <div className="mt-4 space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h1 className="flex min-w-0 flex-wrap items-center gap-2 text-3xl sm:text-[2rem] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
          Manoj Belbase
          <span className="inline-flex text-base leading-none" role="img" aria-label="Nepal">
            🇳🇵
          </span>
          </h1>
          <ProfileMascot />
        </div>

        <div className="space-y-1.5 sm:space-y-2 text-[15px] leading-7 text-[var(--muted)]">
          <p>
            I&apos;m a <HeroKhukuri label="Full Stack Developer" />{" "}
            turning complex ideas into end-to-end web applications, with a focus on{" "}
            <HeroInlineIcon emoji="🤔" label="thoughtful architecture" />
            {", "}
            <HeroMotionWord label="smooth interactions" />
            {", and products that are "}
            <HeroKeyword
              icon={MousePointerClick}
              label="easy to use"
              tip="Clear UX on the surface and reliable APIs underneath, simple to use and maintain."
            />
            .
          </p>
          <p>
            I build across the stack with <HeroTechMorph />, crafting responsive interfaces,
            reusable UI systems, and scalable <strong>backend services</strong> with{" "}
            <strong className="font-medium text-[var(--foreground)]">Nest.js</strong>,{" "}
            <strong className="font-medium text-[var(--foreground)]">Express.js</strong>,{" "}
            <strong className="font-medium text-[var(--foreground)]">PostgreSQL</strong>, and{" "}
            <strong>LLM integrations</strong>.
          </p>
          <p>
            <em>
              I focus on clear, practical software, from database and APIs to the interface, that is easy to use, maintain, and scale.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
}
