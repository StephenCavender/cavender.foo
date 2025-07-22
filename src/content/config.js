import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
  }),
});

const bookReviews = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Book specific fields
    author: z.string(),
    coverImage: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    genre: z.array(z.string()).optional(),
    isbn: z.string().optional(),
    amazonLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles, bookReviews };
