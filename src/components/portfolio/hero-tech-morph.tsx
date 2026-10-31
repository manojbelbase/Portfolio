"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TextMorph } from "torph/react";
import { cn } from "@/lib/utils";

const TECHS = [
  { name: "React.js", logo: "/react-logo.svg" },
  { name: "Next.js", logo: "/next.svg" },
  { name: "Tailwind CSS", logo: "/tailwindcss-logo.svg" },
  { name: "shadcn/ui", logo: "/shadcn-logo.svg", darkInvert: true },
] as const;

const CYCLE_MS = 3000;

export function HeroTechMorph() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TECHS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1 align-middle" aria-label={TECHS.map((t) => t.name).join(", ")}>
      <span aria-hidden="true" className="relative inline-block h-4 w-4 shrink-0">
        {TECHS.map((tech, i) => (
          <Image
            key={tech.name}
            src={tech.logo}
            alt=""
            width={16}
            height={16}
            className={cn(
              "absolute inset-0 h-4 w-4 transition-opacity duration-300",
              i === index ? "opacity-100" : "opacity-0",
              "darkInvert" in tech && tech.darkInvert && "dark:invert",
            )}
          />
        ))}
      </span>
      <TextMorph duration={450} respectReducedMotion className="font-medium underline">
        {TECHS[index].name}
      </TextMorph>
    </span>
  );
}
