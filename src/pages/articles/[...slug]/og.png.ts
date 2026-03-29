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
    style="background-color: #282a36; font-family: Atkinson; width: 100%; height: 100%; display: flex; flex-direction: column;"
  >
    <div
      style="display: flex; flex: 1; align-items: center; justify-content: center; padding: 64px;"
    >
      <div
        style="font-size: 48px; font-weight: 700; text-align: center; line-height: 1.2; color: #f8f8ff;"
      >
        ${title}
      </div>
    </div>
    <div
      style="height: 96px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; border-top: 4px solid #ff79c6;"
    >
      <div
        style="display: flex; align-items: center; color: #ff79c6; font-weight: 700; font-size: 24px;"
      >
        cavender.foo
      </div>
      <img
        src="${FAVICON_URL}"
        style="width: 48px; height: 48px; border: 3px solid #ff79c6; border-radius: 8px;"
        alt="favicon"
      />
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
