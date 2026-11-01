"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { TextMorph } from "torph/react";
import { cn } from "@/lib/utils";

/**
 * One pill option. The mark is either an inline Simple Icons path
 * (`iconPath`, 24x24 viewBox) or a local logo file (`logoSrc`, e.g. `/next.svg`).
 * Colours live in `badgeClassName` (the disc) and `glyphClassName` / `logoClassName`.
 */
export type IconTextMorphItem = {
  label: string;
  iconPath?: string;
  logoSrc?: string;
  logoClassName?: string;
  badgeClassName?: string;
  glyphClassName?: string;
};

type IconTextMorphProps = {
  items: readonly IconTextMorphItem[];
  /** How long each word stays on screen. */
  interval?: number;
  /** Morph duration handed to torph. */
  duration?: number;
  className?: string;
  pillClassName?: string;
  /** Shared badge classes, merged with each item's own. */
  badgeClassName?: string;
  /** Shared glyph classes, merged with each item's own. */
  glyphClassName?: string;
  /** Rendered right after the pill — e.g. a comma that rides the morphing edge. */
  suffix?: ReactNode;
};

const TELEGRAM_PATH =
  "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z";

const DISCORD_PATH =
  "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z";

const WHATSAPP_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

/** Ready-made Discord / Telegram / WhatsApp set matching the screenshot. */
export const COMMUNITY_CHANNELS: readonly IconTextMorphItem[] = [
  {
    label: "Discord",
    iconPath: DISCORD_PATH,
    badgeClassName: "bg-[#5865F2] text-white",
  },
  {
    label: "Telegram",
    iconPath: TELEGRAM_PATH,
    badgeClassName: "bg-white text-[#229ED9] ring-1 ring-black/5",
  },
  {
    label: "WhatsApp",
    iconPath: WHATSAPP_PATH,
    badgeClassName: "bg-[#25D366] text-white",
  },
];

const TECH_BADGE = "bg-white ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/15";

/** The tech marks already shipped in `public/`, same set the hero cycles through. */
export const TECH_LOGOS: readonly IconTextMorphItem[] = [
  { label: "React.js", logoSrc: "/react-logo.svg", badgeClassName: TECH_BADGE },
  { label: "Next.js", logoSrc: "/nextjs-favicon.png", badgeClassName: TECH_BADGE },
  {
    label: "TypeScript",
    logoSrc: "/typescript-logo.svg",
    badgeClassName: TECH_BADGE,
  },
  {
    label: "Tailwind CSS",
    logoSrc: "/tailwindcss-logo.svg",
    badgeClassName: TECH_BADGE,
  },
  {
    label: "shadcn/ui",
    logoSrc: "/shadcn-logo.svg",
    logoClassName: "dark:invert",
    badgeClassName: TECH_BADGE,
  },
];

export function IconTextMorph({
  items,
  interval = 2600,
  duration = 420,
  className,
  pillClassName,
  badgeClassName,
  glyphClassName,
  suffix,
}: IconTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, items.length, paused]);

  return (
    <span
      className={cn("inline-flex items-center gap-[0.2em] align-middle", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{items.map((item) => item.label).join(", ")}</span>

      <span
        aria-hidden="true"
        className={cn(
          // All spacing is em-based, so the pill scales with whatever text size the parent sets.
          "inline-flex items-center gap-[0.3em] rounded-full border border-black/10 bg-white py-[0.06em] pr-[0.5em] pl-[0.1em] shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
          "dark:border-white/15 dark:bg-white/[0.04] dark:shadow-none",
          pillClassName,
        )}
      >
        <span
          className={cn(
            "relative grid size-[1.15em] shrink-0 place-items-center rounded-full",
            badgeClassName,
          )}
        >
          {items.map((item, i) => {
            const active = i === index;

            return (
              <span
                key={item.label}
                className={cn(
                  "absolute inset-0 grid place-items-center rounded-full transition-[opacity,transform] duration-300 ease-out",
                  item.badgeClassName,
                  active ? "scale-100 opacity-100" : "scale-75 opacity-0",
                )}
              >
                {item.logoSrc ? (
                  <Image
                    src={item.logoSrc}
                    alt=""
                    width={24}
                    height={24}
                    className={cn("size-[0.62em] object-contain", item.logoClassName, glyphClassName)}
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className={cn("size-[0.62em]", item.glyphClassName, glyphClassName)}
                    fill="currentColor"
                  >
                    <path d={item.iconPath} />
                  </svg>
                )}
              </span>
            );
          })}
        </span>

        <TextMorph
          duration={duration}
          respectReducedMotion
          className="font-semibold leading-[1.15] tracking-tight whitespace-nowrap"
        >
          {items[index].label}
        </TextMorph>
      </span>

      {suffix}
    </span>
  );
}
