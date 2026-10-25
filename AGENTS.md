# AGENTS.md

Steve's personal blog / digital garden, built with Astro + TypeScript.

- Package manager: Bun (`bun run dev|build|preview`). `build` also generates feeds via `postbuild`.
- Before declaring done: `bun run lint && bun run format:check && bun run typecheck`.
- Husky hooks: pre-commit auto-fixes staged files (eslint + prettier) and runs `typecheck`; pre-push runs `knip` and `build`. Don't bypass with `--no-verify`; fix the failure.
- `src/content/**` body prose is human-written only. Read [docs/agents/content.md](docs/agents/content.md) before touching any content file.
