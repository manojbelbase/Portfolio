import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroKeywordProps = {
  icon: LucideIcon;
  label: string;
  tip: string;
  children?: ReactNode;
};


export function HeroMotionWord({ label }: { label: string }) {
  return (
    <span
      tabIndex={0}
      aria-label={label}
      className="group/motion inline rounded-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
    >
      <span
        aria-hidden="true"
        style={{ backgroundPosition: "120% 0" }}
        className={cn(
          "bg-[linear-gradient(110deg,var(--foreground)_38%,var(--primary)_50%,var(--foreground)_62%)] bg-[length:220%_100%] bg-clip-text text-transparent",
          "group-hover/motion:animate-[sheen_1.6s_linear_infinite] group-focus-visible/motion:animate-[sheen_1.6s_linear_infinite] group-active/motion:animate-[sheen_1.6s_linear_infinite]",
          "motion-reduce:animate-none",
        )}
      >
        {label}
      </span>
    </span>
  );
}

export function HeroKeyword({ icon: Icon, label, tip, children }: HeroKeywordProps) {
  return (
    <span
      tabIndex={0}
      role="button"
      aria-label={`${label}: ${tip}`}
      className={cn(
        "group/keyword relative inline cursor-default",
        "rounded-sm underline decoration-dotted decoration-[var(--muted)]/60 underline-offset-4",
        "transition-colors duration-300 hover:text-[var(--foreground)] hover:decoration-[var(--primary)]",
        "focus-visible:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]",
      )}
    >
      <span className="font-medium text-[var(--foreground)]">{children ?? label}</span>

      {/* tooltip card */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2",
          "rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 text-left",
          "text-xs font-normal leading-5 text-[var(--muted)] shadow-xl",
          "translate-y-1 opacity-0 scale-[0.97]",
          "transition-all duration-200 ease-out",
          "group-hover/keyword:translate-y-0 group-hover/keyword:opacity-100 group-hover/keyword:scale-100",
          "group-focus-visible/keyword:translate-y-0 group-focus-visible/keyword:opacity-100 group-focus-visible/keyword:scale-100",
          "group-active/keyword:translate-y-0 group-active/keyword:opacity-100 group-active/keyword:scale-100",
        )}
      >
        <span className="mb-0.5 flex items-center gap-1.5 font-medium text-[var(--foreground)]">
          <Icon className="size-3.5 text-[var(--primary)]" strokeWidth={2.2} />
          {label}
        </span>
        {tip}
        {/* little arrow */}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-8 border-transparent border-t-[var(--surface)]" />
      </span>
    </span>
  );
}

/**
 * Minimal inline variant — no underline, no popup.
 * Just a small icon or emoji that fades in on the same line on hover.
 */
export function HeroInlineIcon({
  icon: Icon,
  emoji,
  label,
}: {
  icon?: LucideIcon;
  emoji?: string;
  label: string;
}) {
  return (
    <span
      tabIndex={0}
      aria-label={emoji ? `${label} ${emoji}` : label}
      className="group/inline inline-flex cursor-default items-center gap-1 rounded-sm font-medium text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-0 items-center justify-center overflow-hidden opacity-0",
          "transition-all duration-300 ease-out",
          "group-hover/inline:size-4 group-hover/inline:opacity-100",
          "group-focus-visible/inline:size-4 group-focus-visible/inline:opacity-100",
          "group-active/inline:size-4 group-active/inline:opacity-100",
        )}
      >
        {emoji ? (
          <span className="text-sm leading-none">{emoji}</span>
        ) : (
          Icon && <Icon className="size-3.5 text-[var(--primary)]" strokeWidth={2.2} />
        )}
      </span>
    </span>
  );
}

/**
 * Khukuri hover for "Frontend Developer".
 * A sharp blade-glint sweeps left-to-right across the words.
 */
export function HeroKhukuri({ label }: { label: string }) {
  return (
    <span
      tabIndex={0}
      aria-label={label}
      className="group/khukuri inline rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
    >
      <strong
        aria-hidden="true"
        style={{ backgroundPosition: "120% 0" }}
        className={cn(
          "bg-[linear-gradient(105deg,var(--foreground)_44%,#ffffff_50%,var(--foreground)_56%)] bg-[length:220%_100%] bg-clip-text text-transparent",
          "group-hover/khukuri:animate-[sheen_0.9s_linear_infinite] group-focus-visible/khukuri:animate-[sheen_0.9s_linear_infinite] group-active/khukuri:animate-[sheen_0.9s_linear_infinite]",
          "motion-reduce:animate-none",
        )}
      >
        {label}
      </strong>
    </span>
  );
}
