import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		publishedDate: z.coerce.date(),
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

export const collections = { articles };
