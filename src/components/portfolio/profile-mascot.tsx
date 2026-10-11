"use client";

import { Mascot } from "page-mascot";
import { useLayoutEffect, useRef } from "react";

export function ProfileMascot() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const handRef = useRef<HTMLSpanElement>(null);
  const walkingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const mascot = mascotRef.current;
    if (!anchor || !mascot) return;
    const hand = handRef.current;
    const walking = walkingRef.current;
    const photo = anchor.closest("section")?.querySelector<HTMLElement>("[data-profile-photo]");
    const originalPhotoOpacity = photo?.style.opacity ?? "";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const directionLayer = mascot.querySelector<HTMLElement>("button > span > span");
    if (directionLayer && !reducedMotion.matches) {
      directionLayer.style.backgroundPosition = "100% 0%";
    }
    const greetingTimer = window.setTimeout(() => {
      if (directionLayer) directionLayer.style.backgroundPosition = "50% 50%";
      if (!manualPosition && !drag) {
        mascot.querySelector<HTMLButtonElement>("button")?.click();
        if (greetingRef.current) greetingRef.current.style.opacity = "1";
        if (!reducedMotion.matches) {
          hand?.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(22deg)" },
              { transform: "rotate(-15deg)" },
              { transform: "rotate(22deg)" },
              { transform: "rotate(0deg)" },
            ],
            { duration: 650, iterations: 3, easing: "ease-in-out" },
          );
        }
      }
    }, 1500);
    const hideGreetingTimer = window.setTimeout(() => {
      if (greetingRef.current) greetingRef.current.style.opacity = "0";
    }, 3700);
    let frame = 0;
    let manualPosition: { x: number; y: number } | null = null;
    let drag: { id: number; x: number; y: number; left: number; top: number } | null = null;
    let suppressClick = false;
    const place = (x: number, y: number) => {
      const box = mascot.getBoundingClientRect();
      const left = Math.max(0, Math.min(x, document.documentElement.clientWidth - box.width));
      const top = Math.max(0, Math.min(y, window.innerHeight - box.height));
      mascot.style.position = "fixed";
      mascot.style.left = `${left}px`;
      mascot.style.top = `${top}px`;
      return { x: left, y: top };
    };
    const position = () => {
      frame = 0;
      if (walking) walking.style.transform = "";
      if (photo) photo.style.opacity = "1";
      if (manualPosition) {
        manualPosition = place(manualPosition.x, manualPosition.y);
        return;
      }
      if (reducedMotion.matches) {
        mascot.style.width = "";
        mascot.style.height = "";
        mascot.style.position = "relative";
        mascot.style.left = "";
        mascot.style.top = "";
        return;
      }

      const box = anchor.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, window.scrollY / 120));
      const eased = progress * progress * (3 - 2 * progress);
      const initialSize = box.width + 24;
      const size = initialSize + (box.width - initialSize) * eased;
      mascot.style.width = `${size}px`;
      mascot.style.height = `${size}px`;
      const startY = box.top + window.scrollY;
      const bottom = Math.max(12, window.innerHeight - size - 16);
      // Follow the reader gradually, staying inside the viewport.
      const top = Math.min(bottom, Math.max(12, startY + window.scrollY * 0.12));
      // Keep the mascot aligned with its original position beside the name.
      const left = Math.max(12, Math.min(box.left, document.documentElement.clientWidth - box.width - 12));
      if (photo && window.scrollY < 120) {
        const photoBox = photo.getBoundingClientRect();
        const startLeft = photoBox.left + (photoBox.width - size) / 2;
        const startTop = photoBox.top + (photoBox.height - size) / 2;
        photo.style.opacity = `${eased}`;
        // Three small steps, fading out at both ends of the scroll path.
        const stride = progress * Math.PI * 6;
        const envelope = Math.sin(progress * Math.PI);
        const bounce = -Math.abs(Math.sin(stride)) * 7 * envelope;
        const tilt = Math.sin(stride) * 4 * envelope;
        if (walking) walking.style.transform = `translateY(${bounce}px) rotate(${tilt}deg)`;
        place(startLeft + (left - startLeft) * eased, startTop + (top - startTop) * eased);
        return;
      }
      mascot.style.position = "fixed";
      mascot.style.left = `${left}px`;
      mascot.style.top = `${top}px`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(position);
    };
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || drag) return;
      const box = mascot.getBoundingClientRect();
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: box.left, top: box.top };
      suppressClick = false;
      if (walking) walking.style.transform = "";
      // Capture on the button so an ordinary tap still reaches its reaction handler.
      mascot.querySelector("button")?.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!suppressClick && Math.hypot(dx, dy) < 6) return;
      suppressClick = true;
      mascot.style.cursor = "grabbing";
      manualPosition = place(drag.left + dx, drag.top + dy);
      if (photo) photo.style.opacity = "1";
    };
    const onEnd = (event: PointerEvent) => {
      if (event.pointerId !== drag?.id) return;
      drag = null;
      mascot.style.cursor = "";
    };
    const onClick = (event: MouseEvent) => {
      if (!suppressClick || event.detail === 0) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Home") {
        event.preventDefault();
        manualPosition = null;
        position();
        return;
      }
      const step = event.shiftKey ? 32 : 16;
      const offsets: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0], ArrowRight: [step, 0],
        ArrowUp: [0, -step], ArrowDown: [0, step],
      };
      const offset = offsets[event.key];
      if (!offset) return;
      event.preventDefault();
      const box = mascot.getBoundingClientRect();
      manualPosition = place(box.left + offset[0], box.top + offset[1]);
      if (walking) walking.style.transform = "";
      if (photo) photo.style.opacity = "1";
    };
    mascot.addEventListener("pointerdown", onDown);
    mascot.addEventListener("pointermove", onMove);
    mascot.addEventListener("pointerup", onEnd);
    mascot.addEventListener("pointercancel", onEnd);
    mascot.addEventListener("lostpointercapture", onEnd);
    mascot.addEventListener("click", onClick, true);
    mascot.addEventListener("keydown", onKeyDown);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    position();

    return () => {
      window.clearTimeout(greetingTimer);
      window.clearTimeout(hideGreetingTimer);
      hand?.getAnimations().forEach((animation) => animation.cancel());
      if (photo) photo.style.opacity = originalPhotoOpacity;
      mascot.removeEventListener("pointerdown", onDown);
      mascot.removeEventListener("pointermove", onMove);
      mascot.removeEventListener("pointerup", onEnd);
      mascot.removeEventListener("pointercancel", onEnd);
      mascot.removeEventListener("lostpointercapture", onEnd);
      mascot.removeEventListener("click", onClick, true);
      mascot.removeEventListener("keydown", onKeyDown);
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={anchorRef} className="size-12 shrink-0 sm:size-[72px]">
      <div
        ref={mascotRef}
        title="Drag to move · Arrow keys move · Home resets position"
        className="relative z-40 size-12 touch-none select-none sm:size-[72px]"
      >
        <div ref={walkingRef} className="size-full origin-bottom">
        <span
          ref={greetingRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-7 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs font-medium text-[var(--foreground)] opacity-0 shadow-sm"
        >
          Hi!
          <span ref={handRef} className="inline-block origin-bottom text-base leading-none">👋</span>
        </span>
        <Mascot
          directions="/mascots/manoj-directions.webp"
          reactions="/mascots/manoj-reactions.webp"
          size={72}
          label="Manoj mascot"
          className="h-full! w-full! cursor-grab! active:cursor-grabbing! rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        />
        </div>
      </div>
    </div>
  );
}
