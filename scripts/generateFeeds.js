import {
  AUTHOR_EMAIL,
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "../src/consts.js";
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
    copyright: `copyright ${year} ${AUTHOR_NAME} all rights reserved`,
    feedLinks: {
      json: `${feedLink}/feed.json`,
      atom: `${feedLink}/atom.xml`,
      rss: `${feedLink}/rss.xml`,
    },
    author: {
      name: AUTHOR_NAME,
      email: AUTHOR_EMAIL,
      link: AUTHOR_URL,
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
  } catch (err) {
    console.error("Error creating directories:", err);
  }

  // Process articles
  const articleFiles = await fg("src/content/articles/*.{md,mdx}");
  const articles = (
    await Promise.all(
      articleFiles.map(async (file) => {
        const source = await fs.readFile(file, "utf-8");
        const { data } = matter(source);
        const filename = path.basename(file);

        const slug = filename.split(".")[0].trim().toLowerCase();
        const date = new Date(data.pubDate);

        return {
          ...data,
          date,
          published: date,
          id: `${SITE_URL}/articles/${slug}`,
          link: `${SITE_URL}/articles/${slug}`,
          description: data.description,
        };
      })
    )
  ).filter(Boolean);

  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Root feed. Articles only. Books, games, and the dated collections are
  // catalogued on the site but deliberately not syndicated.
  const rootFeed = getFeed({ year, items: articles });

  const promises = [
    fs.writeFile(`${output}/rss.xml`, rootFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/atom.xml`, rootFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/feed.json`, rootFeed.json1(), "utf-8"),
  ];

  // Article-specific feed
  const articleFeed = getFeed({
    year,
    items: articles,
    desc: `Articles by ${AUTHOR_NAME}`,
    title: `${SITE_TITLE} - Articles`,
    feedLink: `${SITE_URL}/articles`,
  });

  promises.push(
    fs.writeFile(`${output}/articles/rss.xml`, articleFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/articles/atom.xml`, articleFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/articles/feed.json`, articleFeed.json1(), "utf-8")
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
        desc: `Articles tagged with "${tag}" by ${AUTHOR_NAME}`,
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

  await Promise.all(promises);

  const end = Date.now();
  console.log(`completed in ${end - start}ms`);
})();
