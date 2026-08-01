import { z } from "astro:content";
import type { SchemaContext } from "astro:content";

export const bookSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    author: z.string(),
    isbn: z.string().optional(),
    status: z.enum(["read", "unread", "reading"]),
    /** Slug, e.g. "torments". These never had a display form. */
    series: z.string().optional(),
    favorite: z.boolean().default(false),
    cover: image().optional(),
    /** Genre and descriptors only. Author lives in the `author` field. */
    tags: z.array(z.string()),
    readDate: z.coerce.date().optional(),
  });
