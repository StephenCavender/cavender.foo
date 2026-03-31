import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

const SITE_URL = "https://cavender.foo";

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
  description: string;
}

export async function GET(context: APIContext) {
  const { title, description } = context.props as Props;
  const { AtkinsonRegular, AtkinsonBold } = await getFonts();

  const titleStr = String(title);
  const descStr = String(description);

  const markup = {
    type: "div",
    props: {
      style: {
        backgroundColor: "#282a36",
        fontFamily: "Atkinson",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              height: "12px",
              background: "linear-gradient(to right, #9333ea, #c084fc)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: "1",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "64px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "52px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    color: "#f8f8ff",
                    textAlign: "center",
                  },
                  children: titleStr,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "28px",
                    color: "#c084fc",
                    marginTop: "16px",
                    textAlign: "center",
                  },
                  children: descStr,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              height: "80px",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 48px",
            },
            children: {
              type: "div",
              props: {
                style: {
                  color: "#c084fc",
                  fontWeight: "700",
                  fontSize: "24px",
                },
                children: "cavender.foo",
              },
            },
          },
        },
      ],
    },
  };

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
      description: article.data.description,
    },
  }));
}
