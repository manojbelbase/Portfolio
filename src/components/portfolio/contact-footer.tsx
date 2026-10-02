"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = "manojbelbase56@gmail.com";

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
      className="mt-6 scroll-mt-6 border-t border-[var(--border)] pt-6 text-[14px] text-[var(--muted)]"
    >
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <a href="mailto:manojbelbase56@gmail.com" className="transition hover:text-[var(--primary)]">
          Email
        </a>
        <a
          href="https://github.com/ManojBelbase"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-[var(--primary)]"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/manojbelbasay/"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-[var(--primary)]"
        >
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/manojbelbasay/"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-[var(--primary)]"
        >
          Instagram
        </a>
      </div>
      <p className="mt-4 leading-6">
        Follow my work on GitHub, read what I write on Medium, connect on LinkedIn, or email me at{" "}
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
              "inline-flex items-center p-0.5 transition-colors duration-200",
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
      <p className="mt-5 text-sm">Designed and Developed by  <span className="text-[var(--foreground)]">Manoj Belbase</span></p>
    </footer>
  );
}
