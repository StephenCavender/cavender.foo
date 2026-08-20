import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

export const OG_DIMENSIONS = {
  width: 1200,
  height: 630,
} as const;

export const OG_COLORS = {
  background: "#282a36",
  gradientStart: "#9333ea",
  gradientEnd: "#c084fc",
  textPrimary: "#f8f8ff",
  textSecondary: "#c084fc",
} as const;

export const OG_FONTS = {
  titleSize: "52px",
  subtitleSize: "28px",
  footerSize: "24px",
} as const;

export async function getFonts() {
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const projectRoot = join(process.cwd());
  const fontsDir = join(projectRoot, "public", "fonts");
  const AtkinsonRegular = readFileSync(join(fontsDir, "atkinson-regular.woff"));
  const AtkinsonBold = readFileSync(join(fontsDir, "atkinson-bold.woff"));
  return { AtkinsonRegular, AtkinsonBold };
}

interface OgMarkupOptions {
  title: string;
  subtitle: string;
}

export function createOgMarkup({ title, subtitle }: OgMarkupOptions) {
  return {
    type: "div",
    props: {
      style: {
        backgroundColor: OG_COLORS.background,
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
              background: `linear-gradient(to right, ${OG_COLORS.gradientStart}, ${OG_COLORS.gradientEnd})`,
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
                    fontSize: OG_FONTS.titleSize,
                    fontWeight: "700",
                    lineHeight: "1.1",
                    color: OG_COLORS.textPrimary,
                    textAlign: "center",
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: OG_FONTS.subtitleSize,
                    color: OG_COLORS.textSecondary,
                    marginTop: "16px",
                    textAlign: "center",
                  },
                  children: subtitle,
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
                  color: OG_COLORS.textSecondary,
                  fontWeight: "700",
                  fontSize: OG_FONTS.footerSize,
                },
                children: "cavender.foo",
              },
            },
          },
        },
      ],
    },
  };
}

export async function renderOgImage(markup: ReturnType<typeof createOgMarkup>) {
  const { AtkinsonRegular, AtkinsonBold } = await getFonts();

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
    height: OG_DIMENSIONS.height,
    width: OG_DIMENSIONS.width,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: OG_DIMENSIONS.width,
    },
  });

  const image = resvg.render();

  return new Response(new Uint8Array(image.asPng()), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
