"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SliceRevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  slices?: number;
  maxShift?: number;
};

export function SliceRevealImage({
  src,
  alt,
  className,
  slices = 14,
  maxShift = 18,
}: SliceRevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const rafRef = useRef(0);
  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const progress = useRef({ v: 0, target: 0 });
  const burst = useRef({ active: false, until: 0, values: [] as number[] });
  const [hovered, setHovered] = useState(false);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced) return;
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.current.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      pointer.current.ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      progress.current.target = 1;
      setHovered(true);
    };
    const onLeave = () => {
      pointer.current.tx = 0.5;
      pointer.current.ty = 0.5;
      progress.current.target = 0;
      setHovered(false);
    };

    let lastBurst = performance.now() + 800;

    const tick = (now: number) => {
      const p = pointer.current;
      const pr = progress.current;
      // smooth pointer + progress
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      pr.v += (pr.target - pr.v) * 0.12;

      // random glitch burst every ~1.4-2.8s while hovered
      if (pr.target === 1 && now - lastBurst > 1400 + Math.random() * 1400) {
        lastBurst = now;
        burst.current = {
          active: true,
          until: now + 140 + Math.random() * 160,
          values: Array.from({ length: slices }, () =>
            Math.random() < 0.35 ? (Math.random() - 0.5) * 2 : 0,
          ),
        };
      }
      if (now > burst.current.until) burst.current.active = false;

      const dir = p.x - 0.5; // -0.5..0.5
      const strength = pr.v * (burst.current.active ? 2.2 : 1);

      for (let i = 0; i < slices; i++) {
        const el = layerRefs.current[i];
        if (!el) continue;
        // alternate + wave pattern so it feels sliced, not uniform
        const wave = Math.sin(i * 1.7 + p.y * 6.28) * 0.5 + Math.sin(i * 0.6 - p.x * 4) * 0.5;
        const jitter = burst.current.active ? burst.current.values[i] ?? 0 : 0;
        const parity = i % 2 === 0 ? 1 : -1;
        const offset =
          (dir * maxShift * (0.35 + Math.abs(wave) * 0.65) * parity + jitter * maxShift * 1.6) *
          strength;
        el.style.transform = `translateX(${offset.toFixed(2)}px) scale(1.04)`;
        el.style.opacity = pr.v > 0.02 ? "1" : "0";
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerenter", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerenter", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, slices, maxShift]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative isolate cursor-crosshair overflow-hidden bg-neutral-100 transition-shadow duration-500 dark:bg-neutral-900",
        hovered && !reduced && "shadow-2xl ring-1 ring-white/20",
        className,
      )}
    >
      {/* base image */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn(
          "absolute inset-0 size-full object-cover transition-transform duration-700 ease-out",
          hovered && !reduced ? "scale-[1.04]" : "scale-100",
        )}
      />

      {/* slice layers — each clipped to its own horizontal band */}
      {!reduced &&
        Array.from({ length: slices }).map((_, i) => {
          const top = (i / slices) * 100;
          const bottom = 100 - ((i + 1) / slices) * 100;
          const isEdge = i % 3 === 0;
          return (
            <img
              key={i}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              src={src}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 size-full object-cover opacity-0 will-change-transform"
              style={{
                clipPath: `inset(${top}% -20px ${bottom}% -20px)`,
                filter: isEdge
                  ? "drop-shadow(-2px 0 0 rgba(255,0,80,.65)) drop-shadow(2px 0 0 rgba(0,255,255,.65)) saturate(1.25) contrast(1.08)"
                  : "saturate(1.15) contrast(1.05)",
              }}
            />
          );
        })}

      {/* scanlines + grain that fade in on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
          hovered && !reduced && "opacity-100",
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.09) 0 1px, transparent 1px 4px)",
          mixBlendMode: "overlay",
        }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
          hovered && !reduced && "opacity-100",
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.35) 100%)",
        }}
      />

      {/* hover hint tag */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-3 top-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur transition-all duration-500",
          hovered && !reduced
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0",
        )}
      >
        ◉ signal // glitch
      </span>

      {/* bottom glitch bar */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-rose-500 via-white to-cyan-400 transition-transform duration-500",
          hovered && !reduced && "scale-x-100",
        )}
      />
    </div>
  );
}
