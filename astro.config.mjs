import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://cavender.foo",
  integrations: [mdx(), sitemap()],
  redirects: {
    "/feed": "/rss.xml",
    "/rss": "/rss.xml",
    "/blog": "/articles",
    "/blog/[...slug]": "/articles/[...slug]",
    "/posts": "/articles",
    "/posts/[...slug]": "/articles/[...slug]",
  },
});
