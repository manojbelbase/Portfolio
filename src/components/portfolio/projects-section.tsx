"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { TextMorph } from "torph/react";
import { workItems, npmPackages } from "@/data/portfolio-data";
import { LinkPreview } from "@/components/ui/link-preview";
import { TextHoverCard } from "@/components/ui/text-hover-card";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

const VISIBLE_COUNT = 3;

function MorphText({ show, delay = 0, children }: { show: boolean; delay?: number; children: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!show || ready) return;
    const id = window.setTimeout(() => setReady(true), 60 + delay);
    return () => window.clearTimeout(id);
  }, [show, ready, delay]);

  if (!show) return <>{children}</>;

  return (
    <TextMorph duration={450} respectReducedMotion>
      {ready ? children : ""}
    </TextMorph>
  );
}

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const [hintDone, setHintDone] = useState(false);
  const visibleItems = expanded ? workItems : workItems.slice(0, VISIBLE_COUNT);

  return (
    <section id="work" className="mt-6 sm:mt-10 scroll-mt-6">
      <SectionHeading>Projects</SectionHeading>
      <div className="space-y-2" key={expanded ? "all" : "top"}>
        {visibleItems.map((item, i) => {
          const isNew = expanded && i >= VISIBLE_COUNT;
          const morphDelay = isNew ? (i - VISIBLE_COUNT) * 120 : 0;
          return (
          <div
            key={item.title}
            className="group flex items-center gap-2 sm:gap-3 py-1 text-[15px] text-[var(--muted)]"
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-sm bg-[var(--primary-soft)] text-[10px] font-medium text-[var(--primary)] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
              {item.logo ? (
                <Image src={item.logo} alt="" width={20} height={20} className="h-full w-full object-contain" />
              ) : (
                "•"
              )}
            </span>
            <span className="relative">
              {item.href ? (
                item.image ? (
                  <LinkPreview
                    url={item.href}
                    isStatic
                    imageSrc={item.image}
                    width={280}
                    height={160}
                    className="font-medium text-sm sm:text-base text-[var(--foreground)]  decoration-[var(--primary)] decoration-1 transition hover:text-[var(--primary)]"
                >
                  <MorphText show={isNew} delay={morphDelay}>{item.title}</MorphText>
                </LinkPreview>
                ) : (
                  <LinkPreview
                    url={item.href}
                    width={280}
                    height={160}
                    className="font-medium text-sm sm:text-base text-[var(--foreground)]  decoration-[var(--primary)] decoration-1 underline-offset-4 transition hover:text-[var(--primary)]"
                  >
                    <MorphText show={isNew} delay={morphDelay}>{item.title}</MorphText>
                  </LinkPreview>
                )
              ) : (
                <span className="font-medium text-[var(--foreground)]">
                  <MorphText show={isNew} delay={morphDelay}>{item.title}</MorphText>
                </span>
              )}
              <span className="text-[var(--muted)]">
                <MorphText show={isNew} delay={morphDelay + 150}>{` - ${item.note}`}</MorphText>
              </span>
            </span>
          </div>
          );
        })}
        <div className="group flex items-center gap-2 sm:gap-3 py-1 text-[15px] text-[var(--muted)]">
          <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-sm bg-[var(--primary-soft)] text-[10px] font-medium text-[var(--primary)] transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
            <Image src="/npm-logo.svg" alt="npm" width={20} height={20} className="h-full w-full object-contain" />
          </span>
          <span className="relative">
            <span className="font-medium text-sm sm:text-base text-[var(--foreground)]">npm packages</span>
            <span className="text-[var(--muted)]"> - </span>
            {npmPackages.map((pkg, pkgIndex) => (
              <span key={pkg.name}>
                <TextHoverCard
                  href={pkg.href}
                  title={pkg.name}
                  description={pkg.description}
                >
                  {pkg.name}
                </TextHoverCard>
                {pkgIndex < npmPackages.length - 1 && (
                  <span className="text-[var(--muted)]">, </span>
                )}
              </span>
            ))}
          </span>
        </div>
      </div>
      {workItems.length > VISIBLE_COUNT && (
        <div className="mt-1 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setExpanded((v) => !v);
              setHintDone(true);
            }}
            aria-expanded={expanded}
            aria-label={expanded ? "Show fewer projects" : "Show more projects"}
            className="inline-flex items-center justify-center p-1.5 text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            <ChevronsDown
              size={18}
              strokeWidth={2}
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300",
                expanded && "rotate-180",
                !expanded && !hintDone && "animate-expand-hint",
              )}
            />
          </button>
        </div>
      )}
    </section>
  );
}
