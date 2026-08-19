import { z } from "astro/zod";
import type { SchemaContext } from "astro:content";

/** Closed vocabulary. Adding a platform is a deliberate edit here, not a typo in content. */
export const PLATFORMS = [
  "PC",
  "Xbox",
  "Switch",
  "Wii U",
  "Wii",
  "GameCube",
  "Nintendo 64",
  "Nintendo 3DS",
  "NES",
  "SNES",
  "Game Boy",
  "Game Boy Color",
] as const;

export const gameSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    status: z.enum(["played", "playing", "unplayed"]),
    platform: z.array(z.enum(PLATFORMS)),
    /** Display name, e.g. "FromSoftware". Slugify for URLs. */
    developer: z.string().optional(),
    /** Display name, e.g. "Bandai Namco". Slugify for URLs. */
    publisher: z.string().optional(),
    /** Slug, e.g. "dark-souls". These never had a display form. */
    series: z.string().optional(),
    favorite: z.boolean().default(false),
    rating: z.number().min(1).max(5).optional(),
    cover: image().optional(),
    coverUrl: z.url().optional(),
    /** Genre and descriptors only. Series/developer/publisher are fields above. */
    tags: z.array(z.string()),
    playDate: z.coerce.date().optional(),
  });
