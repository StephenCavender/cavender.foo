import { z } from "astro/zod";

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.url().optional(),
  logoUrl: z.url().optional(),
  tags: z.array(z.string()),
  techStack: z.array(z.string()),
  status: z.enum(["active", "archived", "in-development"]).optional(),
  githubUrl: z.url().optional(),
});
