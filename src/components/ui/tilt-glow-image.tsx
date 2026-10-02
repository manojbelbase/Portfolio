"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TiltGlowImageProps = {
  src: string;
  alt: string;
  className?: string;
  maxTilt?: number;
};

export function TiltGlowImage({ src, alt, className, maxTilt = 7 }: TiltGlowImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (!container || !inner || !glare) return;

    const target = { x: 0.5, y: 0.5, active: 0 };
    const current = { x: 0.5, y: 0.5, active: 0 };
    let raf = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.active += (target.active - current.active) * 0.14;

      const rx = (0.5 - current.y) * maxTilt * 2 * current.active;
      const ry = (current.x - 0.5) * maxTilt * 2 * current.active;
      inner.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
        2,
      )}deg) scale(${(1 + current.active * 0.035).toFixed(3)})`;

      glare.style.opacity = `${(current.active * 0.9).toFixed(2)}`;
      glare.style.background = `radial-gradient(circle at ${(
        current.x * 100
      ).toFixed(1)}% ${(current.y * 100).toFixed(
        1,
      )}%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.12) 22%, transparent 55%)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      target.active = 1;
      setHovered(true);
    };
    const onLeave = () => {
      target.x = 0.5;
      target.y = 0.5;
      target.active = 0;
      setHovered(false);
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerenter", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerenter", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, maxTilt]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative isolate overflow-hidden bg-neutral-100 transition-shadow duration-500 dark:bg-neutral-900",
        hovered && !reduced && "shadow-[0_20px_70px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/25",
        className,
      )}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="size-full object-cover"
        />
        {/* soft color-grade that lifts on hover */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-transparent to-amber-200/0 transition-all duration-700",
            hovered && !reduced && "from-indigo-500/15 to-amber-200/15",
          )}
        />
      </div>

      {/* cursor-following glare */}
      <span
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      />

      {/* slow shine sweep */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-[-20%] left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-[1200ms] ease-out",
          hovered && !reduced
            ? "translate-x-[500%] opacity-100"
            : "-translate-x-[200%] opacity-0",
        )}
      />

      {/* bottom glow line */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-8 bottom-3 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 blur-[0.5px] transition-opacity duration-700",
          hovered && !reduced && "opacity-100",
        )}
      />
    </div>
  );
}
