export const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const sortByPubDate = <T extends { data: { pubDate: Date } }>(
  entries: T[]
): T[] =>
  [...entries].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
