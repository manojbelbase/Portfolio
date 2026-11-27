"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionHeading from "./section-heading";

const EMAIL = "manojbelbase56@gmail.com";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/ManojBelbase",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manojbelbasay/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/manojbelbasay/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/manojbelbasay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Medium",
    href: "https://medium.com/@manojbelbase",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <circle cx="6.5" cy="12" r="5.5" />
        <ellipse cx="16.2" cy="12" rx="2.8" ry="5.1" />
        <ellipse cx="21.5" cy="12" rx="1.2" ry="4.5" />
      </svg>
    ),
  },
  {
    label: "npm",
    href: "https://www.npmjs.com/~manojbelbase",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0" aria-hidden="true">
        <path d="M0 0h24v24H0V0zm4 4v16h8V8h4v12h4V4H4z" />
      </svg>
    ),
  },
] as const;

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const area = document.createElement("textarea");
      area.value = EMAIL;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <footer
      id="contact"
      className="mt-6 sm:mt-10 scroll-mt-6 border-t border-[var(--border)] pt-6 text-[14px] text-[var(--muted)]"
    >
      <SectionHeading>Contact</SectionHeading>
      <p className="text-sm sm:text-[15px] leading-6 text-[var(--muted)]">
        Have an idea or want to collaborate? Reach out directly at{" "}
        <span className="inline-flex items-center gap-1 align-baseline">
          <a
            href={`mailto:${EMAIL}`}
            className="text-[var(--foreground)] transition hover:text-[var(--primary)]"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-live="polite"
            title="Copy email address"
            aria-label={copied ? "Email copied" : "Copy email address"}
            className={cn(
              "inline-flex cursor-pointer items-center p-0.5 transition-colors duration-200",
              copied ? "text-[var(--primary)]" : "text-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            {copied ? (
              <Check size={13} strokeWidth={2.6} aria-hidden="true" />
            ) : (
              <Copy size={13} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </span>
        .
      </p>
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            {icon}
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-[var(--border)] pt-4">
        <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-sm text-[var(--muted)]">
          <span>Designed &amp; developed by</span>
          <a
            href="#top"
            rel="noreferrer"
            className="group inline-flex hover:underline items-center gap-1 text-[13px] font-medium text-[var(--foreground)] transition-colors  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
          >
            Manoj Belbase
          </a>
        </p>
        <span
          suppressHydrationWarning
          className="text-[12px] text-[var(--muted)]"
        >
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
