export const GITHUB_USERNAME = "manojbelbase";

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GitHubActivity {
  contributions: ContributionDay[];
  totalContributions: number;
}

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

const GRAPHQL_LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      } | null;
    } | null;
  };
  errors?: { message: string }[];
};

async function getGitHubActivityFromGraphQL(token: string): Promise<GitHubActivity | null> {
  const to = new Date();
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          login: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      cache: "force-cache",
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) return null;

    const json = (await response.json()) as GraphQLResponse;
    const collection = json.data?.user?.contributionsCollection;
    if (!collection) return null;

    const contributions = collection.contributionCalendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: GRAPHQL_LEVELS[day.contributionLevel] ?? 0,
      })),
    );

    if (!contributions.length) return null;

    return {
      contributions,
      totalContributions: collection.contributionCalendar.totalContributions,
    };
  } catch {
    return null;
  }
}

async function getGitHubActivityFromPublicApi(): Promise<GitHubActivity | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 60 * 60 },
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as ContributionsResponse;
    if (!data.contributions?.length) return null;

    return {
      contributions: data.contributions,
      totalContributions:
        data.total?.lastYear ?? data.contributions.reduce((sum, day) => sum + day.count, 0),
    };
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    const activity = await getGitHubActivityFromGraphQL(token);
    if (activity) return activity;
  }

  return getGitHubActivityFromPublicApi();
}
