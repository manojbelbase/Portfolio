type NpmPointResponse = {
  downloads?: number;
};

export type NpmDownloads = Record<string, number>;

/**
 * Monthly download counts from the public npm API.
 * Failures are skipped so a missing package never breaks the page.
 */
export async function getNpmDownloads(packages: readonly string[]): Promise<NpmDownloads> {
  const results = await Promise.all(
    packages.map(async (name) => {
      try {
        const response = await fetch(
          `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(name)}`,
          {
            next: { revalidate: 60 * 60 * 6 },
            signal: AbortSignal.timeout(2500),
          },
        );

        if (!response.ok) return null;

        const data = (await response.json()) as NpmPointResponse;
        return typeof data.downloads === "number"
          ? ([name, data.downloads] as const)
          : null;
      } catch {
        return null;
      }
    }),
  );

  return Object.fromEntries(
    results.filter((result): result is readonly [string, number] => result !== null),
  );
}
