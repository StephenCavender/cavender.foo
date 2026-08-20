/**
 * Shared utilities for faceted filtering pages (games, books).
 */

/**
 * Extract unique values from an array, filter out undefined/null, and sort alphabetically.
 */
export const uniqueSorted = (values: (string | undefined | null)[]): string[] =>
  [...new Set(values.filter((value): value is string => Boolean(value)))].sort(
    (a, b) => a.localeCompare(b)
  );

/**
 * Sort items by status priority, then alphabetically by title.
 * @param items - Array of items with data.status and data.title
 * @param statusOrder - Map of status values to sort priority (lower = first)
 * @param getTitleFn - Function to get the title for alphabetical sorting
 */
export function sortByStatus<T>(
  items: T[],
  statusOrder: Record<string, number>,
  getStatus: (item: T) => string,
  getTitle: (item: T) => string
): T[] {
  return [...items].sort((a, b) => {
    const aStatus = statusOrder[getStatus(a)] ?? 99;
    const bStatus = statusOrder[getStatus(b)] ?? 99;

    if (aStatus !== bStatus) {
      return aStatus - bStatus;
    }

    return getTitle(a).localeCompare(getTitle(b));
  });
}

/**
 * Sort items by status, with secondary sort by date for a specific status.
 * Used by books where "read" items are sorted by readDate.
 */
export function sortByStatusWithDateFallback<T>(
  items: T[],
  statusOrder: Record<string, number>,
  getStatus: (item: T) => string,
  getTitle: (item: T) => string,
  dateSortStatus: string,
  getDate: (item: T) => Date | undefined
): T[] {
  return [...items].sort((a, b) => {
    const aStatus = statusOrder[getStatus(a)] ?? 99;
    const bStatus = statusOrder[getStatus(b)] ?? 99;

    if (aStatus !== bStatus) {
      return aStatus - bStatus;
    }

    // Secondary sort by date for specific status
    if (getStatus(a) === dateSortStatus && getStatus(b) === dateSortStatus) {
      const aDate = getDate(a) || new Date(0);
      const bDate = getDate(b) || new Date(0);
      return bDate.valueOf() - aDate.valueOf();
    }

    return getTitle(a).localeCompare(getTitle(b));
  });
}

/**
 * Count items by status.
 */
export function countByStatus<T>(
  items: T[],
  statuses: string[],
  getStatus: (item: T) => string
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const status of statuses) {
    counts[status] = items.filter((item) => getStatus(item) === status).length;
  }
  return counts;
}
