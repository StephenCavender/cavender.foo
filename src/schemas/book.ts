import { z } from "astro/zod";

export const bookSchema = z.object({
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
});
