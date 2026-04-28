import { z } from "astro/zod";

export const usesSchema = z.object({
  pubDate: z.coerce.date(),
  draft: z.boolean().optional().default(false),
});
