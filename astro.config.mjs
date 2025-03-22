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
    "/resume": "/cv",
    "/blog": "/posts",
    "/blog/[...slug]": "/posts/[...slug]",
  },
});
