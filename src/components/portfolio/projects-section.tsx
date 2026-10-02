"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { workItems } from "@/data/portfolio-data";
import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

const VISIBLE_COUNT = 3;

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const [hintDone, setHintDone] = useState(false);
  const visibleItems = expanded ? workItems : workItems.slice(0, VISIBLE_COUNT);

  return (
    <section id="work" className="mt-6 sm:mt-10 scroll-mt-6">
      <SectionHeading>Projects</SectionHeading>
      <div className="space-y-2" key={expanded ? "all" : "top"}>
        {visibleItems.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "group flex items-center gap-2 sm:gap-3 py-1 text-[15px] text-[var(--muted)]",
              expanded && i >= VISIBLE_COUNT && "animate-fade-slide-in",
            )}
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
                    {item.title}
                  </LinkPreview>
                ) : (
                  <LinkPreview
                    url={item.href}
                    width={280}
                    height={160}
                    className="font-medium text-sm sm:text-base text-[var(--foreground)]  decoration-[var(--primary)] decoration-1 underline-offset-4 transition hover:text-[var(--primary)]"
                  >
                    {item.title}
                  </LinkPreview>
                )
              ) : (
                <span className="font-medium text-[var(--foreground)]">{item.title}</span>
              )}
              <span className="text-[var(--muted)]"> - {item.note}</span>
            </span>
          </div>
        ))}
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
