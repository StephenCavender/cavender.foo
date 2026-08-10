import { z } from "astro:content";
import type { SchemaContext } from "astro:content";

export const bookSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    /** Display names, e.g. ["Brett McKay", "Kate McKay"]. Websites live in utils/books.ts. */
    authors: z.array(z.string()).min(1),
    /** Link to the book itself, e.g. its Open Library or publisher page. */
    url: z.string().url().optional(),
    isbn: z.string().optional(),
    status: z.enum(["read", "unread", "reading"]),
    /** Slug, e.g. "torments". These never had a display form. */
    series: z.string().optional(),
    favorite: z.boolean().default(false),
    cover: image().optional(),
    /** Genre and descriptors only. Authors live in the `authors` field. */
    tags: z.array(z.string()),
    readDate: z.coerce.date().optional(),
  });
