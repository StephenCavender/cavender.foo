import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./src/consts";
import { Feed } from "feed";
import fs from "fs/promises";
import fg from "fast-glob";
import matter from "gray-matter";

(async () => {
  const year = new Date().getFullYear();

  const feed = new Feed({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    image: `${SITE_URL}/favicon.svg`,
    favicon: `${SITE_URL}/favicon.svg`,
    copyright: `copyright ${year} Stephen Cavender all rights reserved`,
    feedLinks: {
      json: `${SITE_URL}/json`,
      atom: `${SITE_URL}/atom.xml`,
      rss: `${SITE_URL}/rss.xml`,
    },
    author: {
      name: "Stephen Cavender",
      email: "steve@cavender.io",
      link: SITE_URL,
    },
  });

  const files = await fg("src/content/articles/*.mdx");
  const articles = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(file, "utf-8");
      const { data, content } = matter(source);

      const slug = data.title
        .trim()
        .replace(/[^A-Za-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase();

      return {
        ...data,
        date: new Date(data.pubDate),
        id: slug,
        link: `${SITE_URL}/blog/${slug}`,
        description: data.description,
      };
    }),
  );

  articles.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  articles.forEach((item) => feed.addItem(item));

  const output = "./dist";
  await fs.access(output);
  await fs.writeFile(`${output}/rss.xml`, feed.rss2(), "utf-8");
  await fs.writeFile(`${output}/atom.xml`, feed.atom1(), "utf-8");
  await fs.writeFile(`${output}/feed.json`, feed.json1(), "utf-8");
})();
