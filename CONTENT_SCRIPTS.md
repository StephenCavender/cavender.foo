# Content Creation Scripts

This document lists all available npm scripts for creating new content entries in your Astro site.

## Available Scripts

### Articles

```bash
bun run new:article "Article Title"
```

Creates a new article with:

- Required: Title (automatically converted to kebab-case slug)
- Auto-generated: Publication date (current date)
- Includes: Description, tags, update date, and frontmatter structure

### Books

```bash
bun run new:book "Book Title" "Author Name"
```

Creates a new book entry with:

- Required: Title and Author
- Auto-generated: Kebab-case slug
- Includes: ISBN, status, cover image, tags, read date, rating, and links

### Games

```bash
bun run new:game "Game Title"
```

Creates a new game entry with:

- Required: Title (automatically converted to kebab-case slug)
- Includes: Status, cover image, tags, platform, developer, publisher, and metadata

### Now Entries

```bash
bun run new:now [YYYY-MM-DD]
```

Creates a new "now" entry with:

- Optional: Custom date (auto-generated if not provided)
- Auto-generated: Kebab-case filename from date
- Includes: Comprehensive life sections (Projects, Work, Learning, Fitness, Reading, Watching, Playing, Listening, Travel, Misc)
- Features: Date validation and helpful guidance

### Projects

```bash
bun run new:project "Project Name"
```

Creates a new project entry with:

- Required: Project name (automatically converted to kebab-case slug)
- Includes: Description, URL, logo, tags, tech stack, status, and GitHub link

### Uses Entries

```bash
bun run new:uses
```

Creates a new "uses" entry with:

- Auto-generated: Current date as filename and publication date
- Includes: Title and draft settings

## File Locations

All templates are located in their respective content directories:

- `src/content/articles/_template.md`
- `src/content/books/_template.md`
- `src/content/games/_template.md`
- `src/content/projects/_template.md`
- `src/content/uses/_template.md`

## Usage Examples

```bash
# Create a new article
bun run new:article "Getting Started with React"

# Create a new book review
bun run new:book "The Pragmatic Programmer" "Andy Hunt"

# Create a new game review
bun run new:game "The Legend of Zelda: Tears of the Kingdom"

# Create a new project entry
bun run new:project "My Awesome Web App"

# Create a now entry (current date)
bun run new:now

# Create a now entry with specific date
bun run new:now 2024-12-25

# Create a uses entry (current date)
bun run new:uses
```

## Next Steps After Creation

After running any script:

1. **Update Frontmatter**: Fill in all relevant fields (description, tags, URLs, etc.)
2. **Write Content**: Replace placeholder content with your actual content
3. **Add Media**: Update image URLs, logos, cover images as needed
4. **Test Locally**: Run `bun run dev` to preview your changes
5. **Set Draft Status**: Set `draft: true` if not ready to publish, or `draft: false` to publish

## Naming Conventions

- **Files**: Automatically converted to kebab-case (lowercase, hyphens instead of spaces)
- **Dates**: Use YYYY-MM-DD format for all date fields
- **URLs**: Include full URL with protocol (https://)

## Quality Assurance

All scripts automatically:

- Check for duplicate files
- Provide clear error messages
- Generate appropriate file extensions (.md)
- Provide helpful next steps guidance
