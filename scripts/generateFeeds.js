import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../src/consts.js";
import { Feed } from "feed";
import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";
import path from "path";

const getFeed = ({
  desc = SITE_DESCRIPTION,
  year,
  items,
  feedLink = SITE_URL,
  title = SITE_TITLE,
}) => {
  const feed = new Feed({
    title: title,
    description: desc,
    id: `${SITE_URL}/`,
    link: SITE_URL,
    image: `${SITE_URL}/favicon.svg`,
    favicon: `${SITE_URL}/favicon.svg`,
    copyright: `copyright ${year} Stephen Cavender all rights reserved`,
    feedLinks: {
      json: `${feedLink}/feed.json`,
      atom: `${feedLink}/atom.xml`,
      rss: `${feedLink}/rss.xml`,
    },
    author: {
      name: "Stephen Cavender",
      email: "s@cavender.foo",
      link: SITE_URL,
    },
  });

  items.forEach((item) => feed.addItem(item));

  return feed;
};

(async () => {
  const start = Date.now();

  console.log("generating feeds");

  const year = new Date().getFullYear();

  // Create necessary directories
  const output = "./dist";
  await fs.access(output);

  try {
    await fs.mkdir(`${output}/articles/tags`, { recursive: true });
    await fs.mkdir(`${output}/books/tags`, { recursive: true });
  } catch (err) {
    console.error("Error creating directories:", err);
  }

  // Process articles
  const articleFiles = await fg("src/content/articles/*.md");
  const articles = (
    await Promise.all(
      articleFiles.map(async (file) => {
        const source = await fs.readFile(file, "utf-8");
        const { data } = matter(source);
        const filename = path.basename(file);

        // Skip template files and drafts
        if (filename.startsWith("_template") || data.draft) {
          return null;
        }

        const slug = filename.split(".")[0].trim().toLowerCase();

        return {
          ...data,
          date: new Date(data.pubDate),
          id: `${SITE_URL}/articles/${slug}`,
          link: `${SITE_URL}/articles/${slug}`,
          description: data.description,
        };
      })
    )
  ).filter(Boolean); // Remove null items (templates/drafts)

  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Process book reviews
  const bookFiles = await fg("src/content/bookReviews/*.md");
  const bookReviews = (
    await Promise.all(
      bookFiles.map(async (file) => {
        const source = await fs.readFile(file, "utf-8");
        const { data } = matter(source);
        const filename = path.basename(file);

        // Skip template files and drafts
        if (filename.startsWith("_template") || data.draft) {
          return null;
        }

        const slug = filename.split(".")[0].trim().toLowerCase();

        return {
          ...data,
          date: new Date(data.pubDate),
          id: `${SITE_URL}/books/${slug}`,
          link: `${SITE_URL}/books/${slug}`,
          description: data.description,
        };
      })
    )
  ).filter(Boolean); // Remove null items (templates/drafts)

  bookReviews.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // All content feed (articles + book reviews)
  const allContent = [...articles, ...bookReviews].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );
  const rootFeed = getFeed({ year, items: allContent });

  const promises = [
    fs.writeFile(`${output}/rss.xml`, rootFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/atom.xml`, rootFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/feed.json`, rootFeed.json1(), "utf-8"),
  ];

  // Article-specific feed
  const articleFeed = getFeed({
    year,
    items: articles,
    desc: "Articles by Stephen Cavender",
    title: `${SITE_TITLE} - Articles`,
    feedLink: `${SITE_URL}/articles`,
  });

  promises.push(
    fs.writeFile(`${output}/articles/rss.xml`, articleFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/articles/atom.xml`, articleFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/articles/feed.json`, articleFeed.json1(), "utf-8")
  );

  // Book review-specific feed
  const bookFeed = getFeed({
    year,
    items: bookReviews,
    desc: "Book Reviews by Stephen Cavender",
    title: `${SITE_TITLE} - Book Reviews`,
    feedLink: `${SITE_URL}/books`,
  });

  promises.push(
    fs.writeFile(`${output}/books/rss.xml`, bookFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/books/atom.xml`, bookFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/books/feed.json`, bookFeed.json1(), "utf-8")
  );

  // Article tags feeds
  const articleTags = [
    ...new Set(articles.map((article) => article.tags || []).flat()),
  ];

  for (const tag of articleTags) {
    try {
      await fs.mkdir(`${output}/articles/tags/${tag}`, { recursive: true });

      const filteredArticles = articles.filter(
        (article) => article.tags && article.tags.includes(tag)
      );

      const tagFeed = getFeed({
        desc: `Articles tagged with "${tag}" by Stephen Cavender`,
        items: filteredArticles,
        feedLink: `${SITE_URL}/articles/tags/${tag}`,
        title: `${SITE_TITLE} - Articles tagged "${tag}"`,
        year,
      });

      promises.push(
        fs.writeFile(
          `${output}/articles/tags/${tag}/rss.xml`,
          tagFeed.rss2(),
          "utf-8"
        ),
        fs.writeFile(
          `${output}/articles/tags/${tag}/atom.xml`,
          tagFeed.atom1(),
          "utf-8"
        ),
        fs.writeFile(
          `${output}/articles/tags/${tag}/feed.json`,
          tagFeed.json1(),
          "utf-8"
        )
      );
    } catch (err) {
      console.error(`Error processing article tag ${tag}:`, err);
    }
  }

  // Book review tags feeds
  const bookTags = [
    ...new Set(bookReviews.map((book) => book.tags || []).flat()),
  ];

  for (const tag of bookTags) {
    try {
      await fs.mkdir(`${output}/books/tags/${tag}`, { recursive: true });

      const filteredBooks = bookReviews.filter(
        (book) => book.tags && book.tags.includes(tag)
      );

      const tagFeed = getFeed({
        desc: `Book reviews tagged with "${tag}" by Stephen Cavender`,
        items: filteredBooks,
        feedLink: `${SITE_URL}/books/tags/${tag}`,
        title: `${SITE_TITLE} - Book reviews tagged "${tag}"`,
        year,
      });

      promises.push(
        fs.writeFile(
          `${output}/books/tags/${tag}/rss.xml`,
          tagFeed.rss2(),
          "utf-8"
        ),
        fs.writeFile(
          `${output}/books/tags/${tag}/atom.xml`,
          tagFeed.atom1(),
          "utf-8"
        ),
        fs.writeFile(
          `${output}/books/tags/${tag}/feed.json`,
          tagFeed.json1(),
          "utf-8"
        )
      );
    } catch (err) {
      console.error(`Error processing book tag ${tag}:`, err);
    }
  }

  await Promise.all(promises);

  const end = Date.now();
  console.log(`completed in ${end - start}ms`);
})();
