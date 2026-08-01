/**
 * `series` values are stored as slugs because they never had a display form in the
 * source data. Derive a readable label for UI without inventing content in frontmatter.
 *
 * Naive by design: "assassins-creed" renders as "Assassins Creed", not "Assassin's
 * Creed". If exact punctuation matters, add a display-name field to the schema rather
 * than special-casing here.
 */
export const titleCaseSlug = (slug: string): string =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
