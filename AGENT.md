# AGENT.md

This file provides instructions for AI agents working with this codebase.

## About this project

This is a personal blog website built with [Astro](https://astro.build/). The content is written in MDX.

## Getting Started

To get the project running locally, follow these steps:

1.  Install dependencies:
    ```bash
    bun install
    ```
2.  Start the development server:
    ```bash
    bun run dev
    ```
    The site will be available at `http://localhost:4321`.

## Content Generation Policy

**IMPORTANT**: AI agents are explicitly forbidden from creating, writing, or modifying any content on this site. This includes blog posts, articles, book reviews, or any other user-facing text. Your role is to assist with code-related tasks, such as fixing bugs, implementing features, or improving tooling. You are not a content author for this project.

The content is located in `src/content/`. You may need to interact with these files for tasks like debugging frontmatter or fixing rendering issues, but you must not alter the substance of the content itself.

## Code Style & Linting

This project uses [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting.

-   To format all files, run:
    ```bash
    bun run format
    ```
-   To check for formatting issues, run:
    ```bash
    bun run format:check
    ```
-   To run the linter, run:
    ```bash
    bun run lint
    ```
-   To fix linting issues automatically, run:
    ```bash
    bun run lint:fix
    ```

## Building for production

To create a production build of the site, run:

```bash
bun run build
```

This will generate the static site in the `dist/` directory. The `postbuild` script also generates RSS feeds using `scripts/generateFeeds.js`.
