import { getCollection } from "astro:content";
import { SITE_URL } from "../consts";

/**
 * Normalized view of one content entry, flattened across the seven collections
 * so consumers don't have to know each schema's field names.
 */
export interface IndexEntry {
  collection: string;
  id: string;
  url: string;
  title: string;
  description?: string;
  date?: Date;
}

export interface ContentIndex {
  articles: IndexEntry[];
  projects: IndexEntry[];
  books: IndexEntry[];
  games: IndexEntry[];
  now: IndexEntry[];
  uses: IndexEntry[];
  ai: IndexEntry[];
}

const entryUrl = (collection: string, id: string) =>
  `${SITE_URL}/${collection}/${id}`;

const byDateDesc = (a: IndexEntry, b: IndexEntry) =>
  (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0);

const byTitle = (a: IndexEntry, b: IndexEntry) =>
  a.title.localeCompare(b.title);

/**
 * Every publishable entry on the site, normalized and sorted.
 *
 * Prose collections sort newest first. Catalog collections sort by title.
 * `now`, `uses`, and `ai` are dated snapshots whose id *is* the date, so the
 * id doubles as the title.
 */
export async function getContentIndex(): Promise<ContentIndex> {
  const [articles, projects, books, games, now, uses, ai] = await Promise.all([
    getCollection("articles"),
    getCollection("projects"),
    getCollection("books"),
    getCollection("games"),
    getCollection("now"),
    getCollection("uses"),
    getCollection("ai"),
  ]);

  return {
    articles: articles
      .map((entry) => ({
        collection: "articles",
        id: entry.id,
        url: entryUrl("articles", entry.id),
        title: entry.data.title,
        description: entry.data.description,
        date: entry.data.pubDate,
      }))
      .sort(byDateDesc),

    projects: projects
      .map((entry) => ({
        collection: "projects",
        id: entry.id,
        url: entryUrl("projects", entry.id),
        title: entry.data.name,
        description: entry.data.description,
      }))
      .sort(byTitle),

    books: books
      .map((entry) => ({
        collection: "books",
        id: entry.id,
        url: entryUrl("books", entry.id),
        title: entry.data.title,
        description: entry.data.authors.join(", "),
        date: entry.data.readDate,
      }))
      .sort(byTitle),

    games: games
      .map((entry) => ({
        collection: "games",
        id: entry.id,
        url: entryUrl("games", entry.id),
        title: entry.data.title,
        description: entry.data.platform.join(", "),
        date: entry.data.playDate,
      }))
      .sort(byTitle),

    now: now
      .map((entry) => ({
        collection: "now",
        id: entry.id,
        url: entryUrl("now", entry.id),
        title: entry.id,
        date: entry.data.pubDate,
      }))
      .sort(byDateDesc),

    uses: uses
      .map((entry) => ({
        collection: "uses",
        id: entry.id,
        url: entryUrl("uses", entry.id),
        title: entry.id,
        date: entry.data.pubDate,
      }))
      .sort(byDateDesc),

    ai: ai
      .map((entry) => ({
        collection: "ai",
        id: entry.id,
        url: entryUrl("ai", entry.id),
        title: entry.id,
        date: entry.data.pubDate,
      }))
      .sort(byDateDesc),
  };
}
