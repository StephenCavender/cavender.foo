import type { APIRoute } from "astro";
import { AUTHOR_NAME, SITE_TITLE, SITE_URL } from "../consts";
import { getContentIndex, type IndexEntry } from "../utils/content-index";

/**
 * Standalone pages that aren't content collections. Adding a page under
 * src/pages/ means adding it here too.
 */
const STATIC_PAGES: Array<{ path: string; label: string; note: string }> = [
  { path: "/about", label: "About", note: "who I am" },
  { path: "/work", label: "Work", note: "career history" },
  { path: "/now", label: "Now", note: "what I'm focused on currently" },
  { path: "/uses", label: "Uses", note: "hardware and software I use" },
  { path: "/ai", label: "AI", note: "notes on working with AI tooling" },
  { path: "/blogroll", label: "Blogroll", note: "sites I read" },
  { path: "/bookmarks", label: "Bookmarks", note: "saved links" },
  { path: "/if", label: "If", note: 'Rudyard Kipling, "If—"' },
];

const link = (entry: IndexEntry) =>
  entry.description
    ? `- [${entry.title}](${entry.url}): ${entry.description}`
    : `- [${entry.title}](${entry.url})`;

const latest = (entries: IndexEntry[]) => entries.at(0)?.id ?? "none yet";

export const GET: APIRoute = async () => {
  const index = await getContentIndex();

  const lines = [
    `# ${SITE_TITLE}`,
    "",
    `> Personal site and digital garden of ${AUTHOR_NAME}.`,
    "> Prose on this site is written by a human, not generated. Frontmatter and",
    "> catalog metadata are maintained with tooling; article bodies are not.",
    "",
    "## Pages",
    "",
    ...STATIC_PAGES.map(
      (page) => `- [${page.label}](${SITE_URL}${page.path}): ${page.note}`
    ),
    "",
    `## Articles (${index.articles.length})`,
    "",
    "Long-form writing, newest first. Append `.md` to any article URL to get",
    "its raw Markdown source with provenance metadata.",
    "",
    ...index.articles.map(link),
    "",
    `## Projects (${index.projects.length})`,
    "",
    ...index.projects.map(link),
    "",
    `## Bookshelf (${index.books.length} books)`,
    "",
    "A catalog of books with read status, series, and genre tags. Not",
    "enumerated here; browse the index or filter by tag.",
    "",
    `- Browse: ${SITE_URL}/books`,
    `- Tag index: ${SITE_URL}/books/tags`,
    "",
    `## Gameshelf (${index.games.length} games)`,
    "",
    "A catalog of games with play status, platform, and genre tags.",
    "",
    `- Browse: ${SITE_URL}/games`,
    `- Tag index: ${SITE_URL}/games/tags`,
    "",
    "## Dated snapshots",
    "",
    "Each of these keeps an archive of prior entries. The index page shows the",
    "most recent.",
    "",
    `- [Now](${SITE_URL}/now): ${index.now.length} entries, latest ${latest(index.now)}`,
    `- [Uses](${SITE_URL}/uses): ${index.uses.length} entries, latest ${latest(index.uses)}`,
    `- [AI](${SITE_URL}/ai): ${index.ai.length} entries, latest ${latest(index.ai)}`,
    "",
    "## Feeds",
    "",
    `- RSS: ${SITE_URL}/rss.xml`,
    `- Atom: ${SITE_URL}/atom.xml`,
    `- JSON: ${SITE_URL}/feed.json`,
    `- Articles only: ${SITE_URL}/articles/rss.xml`,
    `- Per-tag feeds: ${SITE_URL}/articles/tags/{tag}/rss.xml`,
    "",
    "## Sitemap",
    "",
    `- ${SITE_URL}/sitemap-index.xml`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
