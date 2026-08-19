import type { CollectionEntry } from "astro:content";

/**
 * `now`, `uses`, and `ai` are the same thing three times: a dated snapshot with
 * a prose body, where the newest entry is the page and older ones are archive.
 * They share one schema, so they share one entry type and one pair of
 * components (SnapshotIndex, SnapshotEntry).
 */
export type SnapshotEntry =
  | CollectionEntry<"now">
  | CollectionEntry<"uses">
  | CollectionEntry<"ai">;
