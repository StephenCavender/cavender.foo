import { z } from "astro:content";
import type { SchemaContext } from "astro:content";

export const gameSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    status: z.enum(["played", "playing", "unplayed"]),
    platform: z.array(z.string()),
    rating: z.number().min(1).max(5).optional(),
    cover: image().optional(),
    coverUrl: z.string().url().optional(),
    tags: z.array(z.string()),
    playDate: z.coerce.date().optional(),
  });
