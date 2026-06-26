import { z } from "astro/zod";

export const aiSchema = z.object({
  pubDate: z.coerce.date(),
});
