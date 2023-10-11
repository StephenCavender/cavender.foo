import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.object({
			url: z.string(),
			credit: z.object({
				name: z.string(),
				url: z.string(),
			})
		}).optional(),
	})
});

const projects = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		heroImage: z.string().optional()
	})
});

export const collections = { articles, projects };
