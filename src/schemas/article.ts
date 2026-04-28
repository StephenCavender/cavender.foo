import { z } from "astro/zod";

export const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()),
  draft: z.boolean().optional().default(false),
});
