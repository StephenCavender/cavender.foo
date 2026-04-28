import { z } from "astro/zod";

export const nowSchema = z.object({
  pubDate: z.coerce.date(),
  draft: z.boolean().optional().default(false),
});
