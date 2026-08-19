import { z } from "astro/zod";

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.url().optional(),
  githubUrl: z.url().optional(),
  /** Descriptor list. Projects have no tag routes, so this is the only one. */
  techStack: z.array(z.string()),
  status: z.enum(["active", "archived", "in-development"]).optional(),
});
