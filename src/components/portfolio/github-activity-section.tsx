import { ArrowUpRight } from "lucide-react";
import { getGitHubActivity, GITHUB_USERNAME, type ContributionDay } from "@/lib/github";
import SectionHeading from "./section-heading";

const LEVEL_COLORS = [
  "var(--surface-soft)",
  "color-mix(in srgb, var(--foreground) 18%, transparent)",
  "color-mix(in srgb, var(--foreground) 38%, transparent)",
  "color-mix(in srgb, var(--foreground) 60%, transparent)",
  "color-mix(in srgb, var(--foreground) 82%, transparent)",
];

function buildWeeks(days: ContributionDay[]) {
  if (!days.length) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let week = Array<ContributionDay | null>(
    new Date(`${days[0].date}T00:00:00Z`).getUTCDay(),
  ).fill(null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function GithubActivitySection() {
  const activity = await getGitHubActivity();
  if (!activity) return null;

  const weeks = buildWeeks(activity.contributions);

  return (
    <section className="mt-6 sm:mt-10" aria-label="GitHub activity">
      <SectionHeading>GitHub activity</SectionHeading>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm sm:text-[15px] text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">
            {activity.totalContributions.toLocaleString("en-US")}
          </span>{" "}
          contributions in the last year
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-[13px] text-[var(--muted)] transition hover:text-[var(--primary)]"
        >
          @{GITHUB_USERNAME}
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
            className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <div className="mt-4 overflow-hidden">
        <div
          role="img"
          aria-label={`${activity.totalContributions.toLocaleString("en-US")} GitHub contributions in the last year`}
          className="grid grid-flow-col gap-[2px]"
          style={{
            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
            gridAutoColumns: "minmax(0, 1fr)",
          }}
        >
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <span
                key={`${weekIndex}-${dayIndex}`}
                title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}` : undefined}
                className="aspect-square rounded-[2px]"
                style={{ backgroundColor: day ? LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] : "transparent" }}
              />
            )),
          )}
        </div>
      </div>
    </section>
  );
}
