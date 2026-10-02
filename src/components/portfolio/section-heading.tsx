export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
      {children}
    </p>
  );
}
