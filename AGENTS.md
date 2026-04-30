# AGENTS.md

**Stack**: Astro 5.x · TypeScript · Bun

## Commands

- `bun run dev` / `build` / `preview`
- `bun run lint` / `lint:fix`
- `bun run format` / `format:check`

## Conventions

- Prettier (trailing comma: es5), ESLint (Astro recommended)
- TypeScript strict null checks, import aliases: `@components/*`, `@assets/*`, `@layouts/*`
- Astro components: `.astro`, content: `src/content/*.md`
- Write code for human understanding and maintainability
- Prefer functional programming patterns over imperative styles
- NEVER create/modify content (articles, books, etc.)
- Run lint/format before committing
