export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
      {children}
    </h2>
  );
}
