import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

const isDev = import.meta.env.DEV;

// https://astro.build/config
export default defineConfig({
	site: 'https://stephencavender.github.io',
	base: isDev ? undefined : '/garden',
	integrations: [mdx(), sitemap()],
	image: {
		service: passthroughImageService(),
	}
});
