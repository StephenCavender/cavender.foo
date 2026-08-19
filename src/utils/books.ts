/**
 * Author websites, keyed by the exact display name used in book frontmatter.
 * Kept here instead of per-book frontmatter so repeat authors stay DRY.
 * Unmapped authors render as plain text.
 */
const AUTHOR_SITES: Record<string, string> = {
  "Andrew Hunt": "https://toolshed.com",
  "Brett McKay": "https://www.artofmanliness.com",
  "C.S. Lewis": "https://www.cslewis.com",
  "Christopher Paolini": "https://www.paolini.net",
  "David Thomas": "https://pragdave.me",
  "Derek Sivers": "https://sive.rs",
  "J.R.R. Tolkien": "https://www.tolkienestate.com",
  "James Clear": "https://jamesclear.com",
  "Jocko Willink": "https://echelonfront.com",
  "Kate McKay": "https://www.artofmanliness.com",
  "Kent Beck": "https://www.kentbeck.com",
  "Martin Fowler": "https://martinfowler.com",
  "Mitch Albom": "https://www.mitchalbom.com",
  "Noah Kagan": "https://noahkagan.com",
  "Robert C. Martin": "https://cleancoder.com",
  "Robert T. Kiyosaki": "https://www.richdad.com",
  "Suzanne Collins": "https://www.suzannecollinsbooks.com",
};

/** Website for an author, or undefined when unknown. */
const authorSite = (name: string): string | undefined => AUTHOR_SITES[name];

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char] ?? char
  );

/**
 * Byline markup, e.g. `<a ...><strong>Brett McKay</strong></a>, <strong>Kate McKay</strong>`.
 * Built as a string so the comma separators carry no stray whitespace.
 */
export const bylineHtml = (authors: string[]): string =>
  authors
    .map((name) => {
      const strong = `<strong>${escapeHtml(name)}</strong>`;
      const site = authorSite(name);
      return site
        ? `<a href="${escapeHtml(site)}" target="_blank" rel="noopener noreferrer">${strong}</a>`
        : strong;
    })
    .join(", ");
