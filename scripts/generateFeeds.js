import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "../src/consts.js";
import { Feed } from "feed";
import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";

const getFeed = ({
  desc = SITE_DESCRIPTION,
  year,
  articles,
  feedLink = SITE_URL,
}) => {
  const feed = new Feed({
    title: SITE_TITLE,
    description: desc,
    id: `${SITE_URL}/`,
    link: SITE_URL,
    image: `${SITE_URL}/favicon.svg`,
    favicon: `${SITE_URL}/favicon.svg`,
    copyright: `copyright ${year} Stephen Cavender all rights reserved`,
    feedLinks: {
      json: `${feedLink}/json`,
      atom: `${feedLink}/atom.xml`,
      rss: `${feedLink}/rss.xml`,
    },
    author: {
      name: "Stephen Cavender",
      email: "steve@cavender.io",
      link: SITE_URL,
    },
  });

  articles.forEach((article) => feed.addItem(article));

  return feed;
};

(async () => {
  const start = Date.now();

  console.log("generating feeds");

  const year = new Date().getFullYear();

  const files = await fg("src/content/articles/*.mdx");
  const articles = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(file, "utf-8");
      const { data } = matter(source);

      const slug = data.title
        .trim()
        .replace(/[^A-Za-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

      return {
        ...data,
        date: new Date(data.pubDate),
        id: `${SITE_URL}/blog/${slug}`,
        link: `${SITE_URL}/blog/${slug}`,
        description: data.description,
      };
    })
  );

  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const rootFeed = getFeed({ year, articles });

  const output = "./dist";
  await fs.access(output);
  fs.w;

  const promises = [
    fs.writeFile(`${output}/rss.xml`, rootFeed.rss2(), "utf-8"),
    fs.writeFile(`${output}/atom.xml`, rootFeed.atom1(), "utf-8"),
    fs.writeFile(`${output}/feed.json`, rootFeed.json1(), "utf-8"),
  ];

  const tags = [...new Set(articles.map((article) => article.tags).flat())];

  tags.forEach((tag) => {
    const filteredArticles = articles.filter((article) =>
      article.tags.includes(tag)
    );
    const tagFeed = getFeed({
      desc: `${tag} articles by Steve`,
      articles: filteredArticles,
      feedLink: `${SITE_URL}/tags/${tag}`,
      year,
    });

    promises.concat([
      fs.writeFile(`${output}/tags/${tag}/rss.xml`, tagFeed.rss2(), "utf-8"),
      fs.writeFile(`${output}/tags/${tag}/atom.xml`, tagFeed.atom1(), "utf-8"),
      fs.writeFile(`${output}/tags/${tag}/feed.json`, tagFeed.json1(), "utf-8"),
    ]);
  });

  Promise.all(promises);

  const end = Date.now();
  console.log(`completed in ${end - start}ms`);
})();
