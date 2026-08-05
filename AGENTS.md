# AGENTS.md

**Stack**: Astro 5.x · TypeScript · Bun

## Rules

- NEVER create/modify content (articles, books, etc.) — this is a personal site, not agent-generated content farm
- Import aliases: `@components/*`, `@assets/*`, `@layouts/*` — enforce in tsconfig.json
- Astro components: `.astro` extension required
- Content lives in `src/content/*.md` — never touch without explicit instruction

## Workflow

- Commands: `bun run dev|build|preview|lint|format`
- Run `bun run lint` + `bun run format:check` before declaring work complete
