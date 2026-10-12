"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type MotionPermissionAPI = {
  requestPermission?: () => Promise<"granted" | "denied">;
};

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
  const lensRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const [motionStatus, setMotionStatus] = useState("idle");
  const enableMotionRef = useRef<(() => Promise<void>) | null>(null);
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
    const lens = lensRef.current;
    if (!container || !inner || !glare || !lens) return;

    const target = { x: 0.5, y: 0.5, active: 0 };
    const current = { x: 0.5, y: 0.5, active: 0 };
    let raf = 0;
    let motionEnabled = false;
    let baseline: { beta: number; gamma: number } | null = null;
    let shakeUntil = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const reset = () => {
      target.x = 0.5;
      target.y = 0.5;
      target.active = 0;
      setHovered(false);
    };
    const screenVector = (x: number, y: number) => {
      const angle = (window.screen.orientation?.angle ?? 0) * Math.PI / 180;
      return { x: x * Math.cos(angle) + y * Math.sin(angle), y: y * Math.cos(angle) - x * Math.sin(angle) };
    };
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (document.hidden || event.beta === null || event.gamma === null) return;
      baseline ??= { beta: event.beta, gamma: event.gamma };
      if (performance.now() < shakeUntil) return;
      const delta = (value: number, origin: number) => ((value - origin + 540) % 360) - 180;
      const position = screenVector(delta(event.gamma, baseline.gamma), delta(event.beta, baseline.beta));
      target.x = clamp(0.5 + position.x / 60);
      target.y = clamp(0.5 + position.y / 60);
      target.active = 1;
      setHovered(true);
    };
    const onMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.acceleration;
      if (document.hidden || acceleration?.x == null || acceleration.y == null) return;
      if (Math.hypot(acceleration.x, acceleration.y, acceleration.z ?? 0) < 3) return;
      const position = screenVector(acceleration.x, acceleration.y);
      target.x = clamp(0.5 + position.x / 20);
      target.y = clamp(0.5 + position.y / 20);
      target.active = 1;
      setHovered(true);
      shakeUntil = performance.now() + 250;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(reset, 350);
    };
    const recalibrate = () => {
      baseline = null;
      clearTimeout(resetTimer);
      reset();
    };
    const attachMotion = () => {
      if (motionEnabled || disposed) return;
      motionEnabled = true;
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
      window.addEventListener("devicemotion", onMotion, { passive: true });
      window.addEventListener("orientationchange", recalibrate);
      document.addEventListener("visibilitychange", recalibrate);
    };
    const orientationAPI = window.DeviceOrientationEvent as typeof DeviceOrientationEvent & MotionPermissionAPI;
    const motionAPI = window.DeviceMotionEvent as typeof DeviceMotionEvent & MotionPermissionAPI;
    enableMotionRef.current = async () => {
      if (!window.isSecureContext || (!orientationAPI && !motionAPI)) {
        setMotionStatus("unavailable");
        return;
      }
      setMotionStatus("pending");
      try {
        const permissions = await Promise.all([
          orientationAPI?.requestPermission?.(),
          motionAPI?.requestPermission?.(),
        ]);
        if (disposed) return;
        if (permissions.some((permission) => permission === "denied")) {
          setMotionStatus("denied");
          return;
        }
        attachMotion();
        setMotionStatus("enabled");
      } catch {
        if (!disposed) setMotionStatus("denied");
      }
    };
    if (window.isSecureContext && window.matchMedia("(pointer: coarse)").matches &&
      (orientationAPI || motionAPI) && !orientationAPI?.requestPermission && !motionAPI?.requestPermission) {
      attachMotion();
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.active += (target.active - current.active) * 0.14;

      const rx = (0.5 - current.y) * maxTilt * 2 * current.active;
      const ry = (current.x - 0.5) * maxTilt * 2 * current.active;
      inner.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
        2,
      )}deg) scale(${(1 + current.active * 0.1).toFixed(3)})`;

      glare.style.opacity = current.active.toFixed(2);
      const lightPosition = `${(current.x * 100).toFixed(1)}% ${(current.y * 100).toFixed(1)}%`;
      // A diffuse halo with a soft ripple edge, eased behind the pointer.
      glare.style.background = `radial-gradient(circle 110px at ${lightPosition}, rgba(255,255,255,.15) 0%, rgba(190,220,255,.07) 38%, transparent 75%), radial-gradient(circle 80px at ${lightPosition}, transparent 42%, rgba(215,235,255,.01) 58%, rgba(215,235,255,.035) 72%, rgba(215,235,255,.01) 88%, transparent 100%)`;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const x = current.x * width;
      const y = current.y * height;
      const radius = 72;
      const zoom = 1.4;
      // Match object-cover before magnifying, preserving the image's aspect ratio.
      const img = inner.querySelector("img");
      if (img?.naturalWidth && img.naturalHeight) {
        const cover = Math.max(width / img.naturalWidth, height / img.naturalHeight);
        const imageWidth = img.naturalWidth * cover;
        const imageHeight = img.naturalHeight * cover;
        lens.style.backgroundSize = `${imageWidth * zoom}px ${imageHeight * zoom}px`;
        lens.style.backgroundPosition = `${radius - (x + (imageWidth - width) / 2) * zoom}px ${radius - (y + (imageHeight - height) / 2) * zoom}px`;
      }
      lens.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
      lens.style.opacity = current.active.toFixed(2);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = container.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      target.active = 1;
      setHovered(true);
    };
    const onLeave = () => {
      if (!motionEnabled) reset();
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerenter", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      disposed = true;
      enableMotionRef.current = null;
      clearTimeout(resetTimer);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("devicemotion", onMotion);
      window.removeEventListener("orientationchange", recalibrate);
      document.removeEventListener("visibilitychange", recalibrate);
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 760px) 100vw, 712px"
          priority
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

      {/* softly feathered magnifying bubble */}
      <span
        ref={lensRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 size-36 rounded-full bg-no-repeat opacity-0 [mask-image:radial-gradient(circle,black_55%,transparent_72%)]"
        style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
      />

      {/* soft cursor-following light ripple */}
      <span
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      />

      {!reduced && motionStatus !== "enabled" && (
        <button
          type="button"
          disabled={motionStatus === "pending" || motionStatus === "unavailable"}
          onClick={() => void enableMotionRef.current?.()}
          className="absolute right-3 bottom-3 z-10 hidden rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70 [@media(pointer:coarse)]:block"
          aria-live="polite"
        >
          {motionStatus === "pending" ? "Enabling…" : motionStatus === "denied" ? "Motion blocked · Retry" : motionStatus === "unavailable" ? "Motion unavailable" : "Enable motion"}
        </button>
      )}


    </div>
  );
}
