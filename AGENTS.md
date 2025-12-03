# AGENTS.md

## Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production (runs feed generation post-build)
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Auto-fix linting issues
- `bun run format` - Format with Prettier
- `bun run format:check` - Check formatting

## Code Style

- Use Prettier with trailing comma: es5
- ESLint with Astro recommended config
- TypeScript with strict null checks
- Import aliases: `@components/*`, `@assets/*`, `@layouts/*`
- Astro components use `.astro` extension
- Content in plain MD under `src/content/`

## Important Rules

- NEVER create/modify content (articles, reviews, etc.)
- Use path aliases for imports
- Follow existing component patterns
- Run lint/format before committing
