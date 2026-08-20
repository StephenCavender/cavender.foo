import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { createOgMarkup, renderOgImage } from "../../../utils/og-image";

export async function GET(context: APIContext) {
  const { title, description } = context.props as {
    title: string;
    description: string;
  };

  const markup = createOgMarkup({
    title: String(title),
    subtitle: String(description),
  });

  return renderOgImage(markup);
}

export async function getStaticPaths() {
  const articles = await getCollection("articles");

  return articles.map((article) => ({
    params: {
      slug: article.id,
    },
    props: {
      title: article.data.title,
      description: article.data.description,
    },
  }));
}
