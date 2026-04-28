import { z } from "astro/zod";

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  tags: z.array(z.string()),
  techStack: z.array(z.string()),
  status: z.enum(["active", "archived", "in-development"]).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  githubUrl: z.string().url().optional(),
  draft: z.boolean().optional().default(false),
});
