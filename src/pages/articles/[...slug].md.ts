import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { AUTHOR_NAME, SITE_URL } from "../../consts";

interface Props {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  body: string;
}

export async function getStaticPaths() {
  const articles = await getCollection("articles");

  return articles.map((article) => ({
    params: {
      slug: article.id,
    },
    props: {
      slug: article.id,
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      updatedDate: article.data.updatedDate,
      tags: article.data.tags,
      body: article.body ?? "",
    },
  }));
}

/**
 * Raw Markdown source of an article, prefixed with provenance metadata so a
 * reader that arrives here without the HTML page still knows where it came
 * from, who wrote it, and when.
 */
export const GET: APIRoute = (context) => {
  const { slug, title, description, pubDate, updatedDate, tags, body } =
    context.props as Props;

  const preamble = [
    `# ${title}`,
    "",
    `> ${description}`,
    "",
    `Source: ${SITE_URL}/articles/${slug}`,
    `Author: ${AUTHOR_NAME}`,
    `Published: ${pubDate.toISOString()}`,
  ];

  if (updatedDate) {
    preamble.push(`Updated: ${updatedDate.toISOString()}`);
  }

  if (tags.length) {
    preamble.push(`Tags: ${tags.join(", ")}`);
  }

  preamble.push("", "---", "");

  return new Response(`${preamble.join("\n")}\n${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
