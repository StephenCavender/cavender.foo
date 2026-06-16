import { z } from "astro:content";
import type { SchemaContext } from "astro:content";

export const bookSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    author: z.string(),
    isbn: z.string().optional(),
    status: z.enum(["read", "unread", "reading"]),
    cover: image().optional(),
    tags: z.array(z.string()),
    readDate: z.coerce.date().optional(),
  });
