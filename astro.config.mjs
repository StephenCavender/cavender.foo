import mdx from "@astrojs/mdx";
import { defineConfig, passthroughImageService } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://cavender.foo",
  integrations: [mdx(), sitemap()],
  image: {
    service: passthroughImageService(),
  },
  redirects: {
    "/feed": "/rss.xml",
    "/rss": "/rss.xml",
    "/cv": "/resume",
    "/blog": "/articles",
    "/blog/[...slug]": "/articles/[...slug]",
    "/posts": "/articles",
    "/posts/[...slug]": "/articles/[...slug]",
  },
});
