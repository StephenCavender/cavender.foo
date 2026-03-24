import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

const SITE_URL = "https://cavender.foo";
const FAVICON_URL = `${SITE_URL}/favicon.png`;

const dimensions = {
  width: 1200,
  height: 630,
};

async function getFonts() {
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const projectRoot = join(process.cwd());
  const fontsDir = join(projectRoot, "public", "fonts");
  const AtkinsonRegular = readFileSync(join(fontsDir, "atkinson-regular.woff"));
  const AtkinsonBold = readFileSync(join(fontsDir, "atkinson-bold.woff"));
  return { AtkinsonRegular, AtkinsonBold };
}

interface Props {
  title: string;
}

export async function GET(context: APIContext) {
  const { title } = context.props as Props;
  const { AtkinsonRegular, AtkinsonBold } = await getFonts();

  const markup = html`<div
    tw="w-full h-full flex flex-col relative"
    style="background-color: #282a36; font-family: Atkinson;"
  >
    <div tw="flex-1 flex items-center justify-center p-16">
      <div
        tw="text-6xl font-bold text-center leading-tight"
        style="color: #f8f8ff;"
      >
        ${title}
      </div>
    </div>
    <div
      tw="w-full h-24 flex items-center justify-between px-12 border-t"
      style="border-color: #44475a;"
    >
      <div tw="flex items-center" style="color: #6272a4;">cavender.foo</div>
      <img src="${FAVICON_URL}" tw="w-12 h-12" alt="favicon" />
    </div>
  </div>`;

  const svg = await satori(markup, {
    fonts: [
      {
        name: "Atkinson",
        data: AtkinsonRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Atkinson",
        data: AtkinsonBold,
        weight: 700,
        style: "normal",
      },
    ],
    height: dimensions.height,
    width: dimensions.width,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: dimensions.width,
    },
  });

  const image = resvg.render();

  return new Response(image.asPng(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  const articles = await getCollection("articles", ({ data }) => {
    return data.draft !== true || import.meta.env.DEV;
  });

  return articles.map((article) => ({
    params: {
      slug: article.slug,
    },
    props: {
      title: article.data.title,
    },
  }));
}
