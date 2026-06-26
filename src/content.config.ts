import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleSchema } from "./schemas/article";
import { bookSchema } from "./schemas/book";
import { gameSchema } from "./schemas/game";
import { projectSchema } from "./schemas/project";
import { nowSchema } from "./schemas/now";
import { usesSchema } from "./schemas/uses";
import { aiSchema } from "./schemas/ai";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: articleSchema,
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: bookSchema,
});

const games = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
  schema: gameSchema,
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: projectSchema,
});

const now = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/now" }),
  schema: nowSchema,
});

const uses = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/uses" }),
  schema: usesSchema,
});

const ai = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ai" }),
  schema: aiSchema,
});

export const collections = { articles, books, games, projects, now, uses, ai };
