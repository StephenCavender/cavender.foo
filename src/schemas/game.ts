import { z } from "astro/zod";

export const gameSchema = z.object({
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
});
