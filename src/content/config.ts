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

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    isbn: z.string().optional(),
    status: z.enum(["read", "unread", "reading"]),
    coverImageUrl: z.string().url().optional(),
    tags: z.array(z.string()),
    readDate: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    goodreadsLink: z.string().url().optional(),
    amazonLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const games = defineCollection({
  schema: z.object({
    title: z.string(),
    status: z.enum(["played", "playing", "unplayed"]),
    coverImageUrl: z.string().url().optional(),
    tags: z.array(z.string()),
    platform: z.array(z.string()).optional(),
    developer: z.string().optional(),
    publisher: z.string().optional(),
    releaseDate: z.coerce.date().optional(),
    playDate: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    steamLink: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    logoUrl: z.string().url().optional(),
    tags: z.array(z.string()),
    techStack: z.array(z.string()),
    status: z.enum(["active", "archived", "in-development"]).optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    githubUrl: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const now = defineCollection({
  schema: z.object({
    pubDate: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const uses = defineCollection({
  schema: z.object({
    pubDate: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { articles, books, games, projects, now, uses };
