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

## Creating a new article

To create a new blog post, follow these steps:

1.  Create a new `.mdx` file in `src/content/articles/`. You can use `src/content/articles/_template.mdx` as a starting point.
2.  The filename will be used as the URL slug. For example, `my-new-post.mdx` will be available at `/articles/my-new-post`.
3.  Add content to the file using Markdown and MDX.

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
