# Steve's Blog

A personal blog and digital garden built with [Astro](https://astro.build), featuring articles, projects, book reviews, game reviews, and more.

## 🚀 Features

### Content Collections

- **Articles** - Technical articles and tutorials with MDX support
- **Books** - Book reviews with ratings and reading status
- **Games** - Game reviews with platform and status tracking
- **Projects** - Project showcases with tech stack details
- **Now** - Personal status updates following [nownownow](https://nownownow.com) pattern
- **Uses** - Tools, hardware, and gear recommendations

### Content Management

- **Schema-based** content with Zod validation
- **Auto-generated** content creation scripts
- **Draft support** for private/unpublished content
- **Tag system** for content categorization
- **Type-safe** with TypeScript throughout

### Development Tools

- **Bun** package manager for fast development
- **ESLint** for code quality with TypeScript support
- **Prettier** for consistent code formatting
- **MDX support** for rich article content
- **Sitemap** generation for SEO

### User Experience

- **Dark mode** support throughout
- **Responsive design** for all devices
- **Fast builds** with Astro's static generation
- **RSS feeds** for content syndication
- **Clean typography** and minimal design

## 🛠️ Content Creation Scripts

Easy-to-use scripts for creating new content:

```bash
# Create new article
bun run new:article "Article Title"

# Create new book review
bun run new:book "Book Title" "Author Name"

# Create new game review
bun run new:game "Game Title"

# Create new project showcase
bun run new:project "Project Name"

# Create now entry (current date)
bun run new:now

# Create uses entry (current date)
bun run new:uses
```

See [CONTENT_SCRIPTS.md](./CONTENT_SCRIPTS.md) for detailed usage instructions.

## 📁 Project Structure

```
src/
├── components/           # Astro components
│   ├── Header/
│   ├── BaseHead.astro
│   ├── Footer.astro
│   ├── FormattedDate.astro
│   └── StoreLinks.astro
├── content/             # Content collections
│   ├── articles/         # Technical articles (.md)
│   ├── books/           # Book reviews (.md)
│   ├── games/           # Game reviews (.md)
│   ├── projects/         # Project showcases (.md)
│   ├── now/             # Personal updates (.md)
│   ├── uses/            # Tools & gear (.md)
│   └── config.ts         # Content schemas
├── layouts/             # Page layouts
│   ├── BaseLayout.astro
│   └── Article.astro
├── pages/               # Astro pages & routes
│   ├── articles/         # Article pages & tags
│   ├── books/           # Book pages & tags
│   ├── games/           # Game pages & tags
│   ├── now/             # Now pages
│   ├── projects/         # Project pages
│   ├── uses/            # Uses pages
│   └── *.astro/*.md     # Static pages
└── styles/              # Global styles
    └── global.css
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **Bun** package manager (recommended)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/username/cavender.foo.git
cd cavender.foo

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Available Scripts

```bash
# Development
bun run dev          # Start dev server
bun run build         # Build for production
bun run preview       # Preview build locally

# Content Management
bun run new:article   # Create new article
bun run new:book      # Create new book review
bun run new:game      # Create new game review
bun run new:project   # Create new project
bun run new:now       # Create now entry
bun run new:uses      # Create uses entry

# Code Quality
bun run lint          # Run ESLint
bun run lint:fix       # Auto-fix ESLint issues
bun run format        # Format with Prettier
bun run format:check   # Check formatting
```

## 📝️ Content Workflow

### 1. Create Content

```bash
# Example: Create a new article
bun run new:article "Getting Started with Astro"
```

### 2. Edit Content

Scripts generate files with comprehensive frontmatter and content templates:

- Edit frontmatter with your details
- Replace placeholder content
- Add images, links, and metadata

### 3. Preview Changes

```bash
bun run dev
# Visit http://localhost:4321 to preview
```

### 4. Quality Checks

```bash
bun run lint          # Check code quality
bun run format:check   # Verify formatting
```

### 5. Deploy

```bash
bun run build          # Generate static site
# Deploy dist/ folder to your hosting provider
```

## 🎨 Content Types

### Articles

- **Format**: MD (MDX for rich content)
- **Schema**: title, description, pubDate, updatedDate, tags, draft
- **Features**: Syntax highlighting, code blocks, embedded components

### Books

- **Schema**: title, author, ISBN, status, rating, links
- **Status**: read/unread/reading
- **Features**: Cover images, Goodreads/Amazon links

### Games

- **Schema**: title, status, platform, developer, publisher
- **Status**: played/playing/unplayed
- **Features**: Cover images, Steam links, ratings

### Projects

- **Schema**: name, description, techStack, status, links
- **Status**: active/archived/in-development
- **Features**: Demo URLs, GitHub links, logos

### Now/Uses

- **Schema**: pubDate, draft, title (uses only)
- **Features**: Versioning system, collapsible history
- **Pattern**: nownownow.com style updates

## 🔧 Configuration

### Content Schemas

All content types use Zod schemas for validation:

- Type-safe frontmatter
- Automatic date coercion
- Required field validation
- Default value support

### ESLint Configuration

- TypeScript support
- Astro recommended rules
- Prettier integration
- Strict null checks

### Astro Configuration

- MDX integration
- Sitemap generation
- Image passthrough
- URL redirects

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- Optimized typography
- Touch-friendly navigation
- Fast loading times

## 🌙 Dark Mode

- System preference detection
- Smooth theme transitions
- Consistent color scheme
- Accessibility compliant
- CSS custom properties

## 🔍 SEO Features

- **Sitemap**: Automatic XML sitemap generation
- **Meta tags**: Proper HTML meta descriptions
- **URL structure**: Clean, readable URLs
- **Content feeds**: RSS/XML feed generation
- **Semantic HTML**: Proper heading hierarchy

## 🚀 Deployment

The site builds to static HTML/CSS/JS files:

```bash
bun run build
# Outputs to ./dist folder
```

### Deployment Options

- **Vercel**: Recommended for Astro sites
- **Netlify**: Static site hosting with CI/CD
- **GitHub Pages**: Free static hosting
- **Cloudflare Pages**: Edge-optimized hosting
- **Any static host**: Upload dist/ folder

## 📊 Analytics & Monitoring

- **RSS feeds**: Generated automatically
- **Sitemap**: Included for search engines
- **Fast builds**: Optimized for development workflow
- **Type safety**: Full TypeScript coverage

## 🛠️ Development Standards

### Code Quality

- **ESLint**: Enforced coding standards
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety throughout
- **Git hooks**: Pre-commit quality checks

### Performance

- **Static generation**: No server-side rendering needed
- **Image optimization**: Passthrough for local images
- **Minimal dependencies**: Fast install and build times
- **Bundle analysis**: Optimized JavaScript delivery

### Accessibility

- **Semantic HTML**: Proper heading structure
- **Keyboard navigation**: All content accessible
- **Screen reader**: Proper ARIA labels
- **Color contrast**: WCAG compliant colors

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Contact

- **Website**: [https://cavender.foo](https://cavender.foo)
- **GitHub**: [Repository Issues](https://github.com/username/cavender.foo/issues)

---

## 🌟 Inspiration

This site was inspired by and draws concepts from several excellent digital gardens and blogs:

### Key Inspirations

- **[Joel Hooks](https://joelhooks.com)** - Digital garden pioneer with thoughtful article organization and personal knowledge management approach
- **[Herman](https://herman.bearblog.dev/blog)** - Clean, minimalist design philosophy and continuous learning documentation
- **[Harper Reed](https://harper.blog/)** - Modern approach to personal blogging with note-taking workflows and AI experimentation

### Design Philosophy

- **Digital Garden**: Content grows and evolves over time rather than traditional blog format
- **Now/Uses Pages**: Following [nownownow.com](https://nownownow.com) pattern for personal status updates
- **Content Collections**: Organized content types with schemas and validation
- **Clean Typography**: Minimal, readable design focused on content
- **Type Safety**: Full TypeScript implementation throughout

### Technical Inspiration

- **Astro Framework**: Modern static site generator with content collections
- **Bun Package Manager**: Fast, efficient development workflow
- **Content Schemas**: Zod validation for type-safe content management
- **MDX Support**: Rich content with embedded components

---

Built with ❤️ using [Astro](https://astro.build) and powered by [Bun](https://bun.sh).
