"use client";

import { useState } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type TextHoverCardProps = {
  href: string;
  title: string;
  description: string;
  children: React.ReactNode;
  triggerClassName?: string;
};

export function TextHoverCard({
  href,
  title,
  description,
  children,
  triggerClassName,
}: TextHoverCardProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <HoverCardPrimitive.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
      <HoverCardPrimitive.Trigger
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${title}: ${description}`}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "font-medium text-[var(--muted)] underline decoration-dotted decoration-[var(--muted)]/60 underline-offset-4 transition hover:text-[var(--primary)] hover:decoration-[var(--primary)]",
          triggerClassName,
        )}
      >
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="w-52 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 text-left text-xs font-normal leading-5 text-[var(--muted)]"
            >
              <span className="mb-0.5 block font-medium text-[var(--foreground)]">{title}</span>
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
}
