# Branding Guide for Humans and LLMs

This document provides guidance for coding and contributing to the cavender.foo website to maintain consistent branding, design patterns, and development practices.

## 🎯 Project Overview

**cavender.foo** is Steve's personal blog and digital garden - a clean, minimalist, content-focused website built with Astro.

### Core Identity
- **Name**: Steve Cavender's Blog
- **Domain**: cavender.foo
- **Purpose**: Personal knowledge sharing, technical articles, and digital garden
- **Audience**: Technical professionals, developers, and personal network

## 🎨 Design Philosophy

### Principles
1. **Content First**: Design serves content, not the other way around
2. **Minimal & Clean**: Reduce cognitive load, focus on readability
3. **Type-Forward**: Leverage TypeScript for type safety throughout
4. **Performance-Minded**: Fast loading, efficient asset delivery
5. **Accessible**: WCAG compliance, keyboard navigation, screen reader support

### Visual Characteristics
- **Typography**: Clean, readable fonts with good contrast
- **Color Scheme**: Dark mode support with consistent theming
- **Layout**: Content-focused with minimal chrome
- **Animations**: Subtle, purposeful transitions only

## 🛠️ Development Standards

### Code Style
- **TypeScript**: All code should be type-safe
- **ESLint**: Follow existing configuration rules
- **Prettier**: Consistent formatting throughout
- **Functional Patterns**: Prefer pure functions and immutability
- **Error Handling**: Graceful degradation with user feedback

### File Organization
```
src/
├── components/     # Reusable UI components
├── content/        # Content collections with schemas
├── layouts/        # Page layouts and wrappers
├── pages/          # Astro pages and routes
└── styles/         # Global styles and themes
```

### Content Structure
- **Collections**: Use Astro content collections with Zod schemas
- **Frontmatter**: Type-safe metadata with validation
- **Draft Mode**: Support for unpublished content
- **Tag System**: Categorization and filtering

## 📝 Content Creation Patterns

### When Adding Articles
```bash
# Create new article with proper template
bun run new:article "Article Title"

# File structure: src/content/articles/article-title.mdx
---
title: "Article Title"
description: "Brief description"
pubDate: 2024-01-15
tags: ["tag1", "tag2"]
draft: false
---

# Article Content
Write in clear, accessible markdown with proper headings.
```

### When Adding Projects
```bash
# Create new project showcase
bun run new:project "Project Name"

# Include all relevant fields:
- name, description, url, logoUrl
- techStack, status, githubUrl
- startDate, endDate for timeline
```

### Content Guidelines
- **Headings**: Use proper H2, H3 hierarchy
- **Code Blocks**: Include language hints for syntax highlighting
- **Links**: Use descriptive link text, not "click here"
- **Images**: Include alt text, optimize for web
- **Length**: Be comprehensive but concise

## 🎨 UI Components

### Using Existing Components
- **Header/Nav**: Use existing navigation components
- **BaseLayout**: Wrap pages in consistent layout
- **FormattedDate**: Use for consistent date display
- **Footer**: Include standard site navigation

### Component Patterns
```astro
// Good pattern
import Component from '../../components/Component.astro';

// Avoid inline styles, use component
<Component prop={value} />

// Follow existing props interface
interface ComponentProps {
  prop: string;
}
```

## 🎨 Styling Guidelines

### CSS Architecture
- **Global Styles**: Use `src/styles/global.css`
- **Component Styles**: Use `<style>` blocks in Astro components
- **Custom Properties**: Use CSS custom properties for theming
- **Responsive**: Mobile-first media queries

### Theme Support
```css
/* Good pattern */
:root {
  --text-color: #333;
  --bg-color: #fff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff;
    --bg-color: #1a1a1a;
  }
}
```

### Typography
- **Font Families**: Use system fonts for performance
- **Line Height**: 1.5-1.6 for readability
- **Font Sizes**: Use rem units for scalability
- **Contrast**: Ensure WCAG AA compliance

## 🚀 Performance Guidelines

### Image Optimization
- **Formats**: Prefer WebP for modern browsers
- **Sizing**: Use appropriately sized images
- **Lazy Loading**: Implement for below-fold images
- **Compression**: Optimize before adding to site

### Build Optimization
- **Bundle Analysis**: Monitor JavaScript bundle size
- **Static Generation**: Leverage Astro's static builds
- **Caching**: Use appropriate cache headers
- **Core Web Vitals**: Monitor LCP, FID, CLS

## 🔍 SEO Best Practices

### Meta Tags
```astro
---
title: "Descriptive Page Title"
description: "Compelling description under 160 characters"
tags: ["relevant", "keywords"]
draft: false
---
```

### URL Structure
- **Clean URLs**: Use kebab-case, avoid underscores
- **Hierarchical**: Logical folder structure
- **Descriptive**: URL reflects content type
- **Consistent**: Follow established patterns

### Sitemap
- **Auto-generated**: Leverage Astro's sitemap integration
- **Regular Updates**: Included in build process
- **Coverage**: Include all important pages

## 🧪 Testing Guidelines

### Content Testing
- **Preview**: Use `bun run dev` for local preview
- **Build Test**: Run `bun run build` before deploying
- **Link Check**: Verify internal links work
- **Mobile Test**: Check responsive behavior

### Code Quality
- **Linting**: Run `bun run lint` before commits
- **Formatting**: Use `bun run format:check` to verify
- **Type Checking**: Leverage TypeScript compilation
- **Build Verification**: Ensure successful builds

## 🔐 Security Considerations

### Content Security
- **Input Validation**: Trust but validate user inputs
- **XSS Prevention**: Use Astro's auto-escaping
- **Dependencies**: Regular updates and security scanning
- **HTTPS**: Deploy with SSL certificates

### Best Practices
- **No Client Secrets**: Keep API keys server-side
- **Content Security Policy**: Implement appropriate CSP headers
- **Regular Updates**: Keep dependencies current

## 📱 Accessibility Standards

### WCAG Compliance
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio
- **Focus Indicators**: Visible focus states for interactive elements

### Semantic HTML
```astro
<!-- Good pattern -->
<main>
  <article>
    <header>
      <h1>Article Title</h1>
    </header>
    <section>Content here</section>
  </article>
</main>

<!-- Use semantic elements properly -->
<nav>Navigation</nav>
<aside>Related content</aside>
<footer>Site footer</footer>
```

## 📱 Development Workflow

### Before Coding
1. **Understand Requirements**: Clarify what needs to be built
2. **Review Existing Patterns**: Check similar implementations in codebase
3. **Plan Architecture**: Consider component reuse and data flow
4. **Create Issue**: Document the work and track progress

### During Development
1. **Use Content Scripts**: Leverage `bun run new:*` scripts
2. **Iterative Development**: Small commits, regular testing
3. **Preview Changes**: Use `bun run dev` continuously
4. **Quality Checks**: Regular linting and formatting

### Before Committing
```bash
# Quality checklist
bun run lint          # Must pass
bun run format:check   # Must pass
bun run build          # Must succeed

# Then commit
git add .
git commit -m "Clear, descriptive commit message"
```

## 📊 Monitoring & Analytics

### Performance Monitoring
- **Core Web Vitals**: Track LCP, FID, CLS
- **Bundle Size**: Monitor JavaScript bundle growth
- **Page Load Times**: Track performance regression
- **Error Tracking**: Monitor JavaScript errors

### Content Analytics
- **Page Views**: Track popular content
- **User Engagement**: Time on page, scroll depth
- **Search Queries**: Understand user intent
- **Conversion Goals**: Track desired user actions

## 🚀 Deployment Guidelines

### Pre-Deployment Checklist
```bash
# 1. Quality checks
bun run lint
bun run format:check
bun run build

# 2. Content review
Check for placeholder content
Verify all links work
Test responsive behavior

# 3. Performance check
Test build locally with preview
Check bundle sizes
Verify asset optimization
```

### Production Considerations
- **Environment Variables**: No sensitive data in client code
- **Error Handling**: Graceful degradation for users
- **Monitoring**: Implement error tracking
- **Rollback Strategy**: Ability to quickly revert changes

## 🤝 Contributing Standards

### Pull Request Guidelines
1. **Descriptive Title**: Clear summary of changes
2. **Detailed Description**: Context and implementation approach
3. **Testing**: Include testing notes and results
4. **Breaking Changes**: Clearly document any breaking changes
5. **Follow Patterns**: Align with existing code style

### Code Review Process
- **Functionality**: Does it work as intended?
- **Performance**: Any impact on site performance?
- **Accessibility**: ARIA labels, keyboard navigation
- **Maintainability**: Is code clear and documented?
- **Type Safety**: Proper TypeScript usage?

## 📚 Documentation Standards

### Code Documentation
- **Inline Comments**: For complex logic only
- **README Updates**: Document new features and changes
- **API Documentation**: For reusable components
- **Deployment Docs**: Update when deployment process changes

### Content Documentation
- **Clear Titles**: Descriptive and SEO-friendly
- **Proper Structure**: Use consistent heading hierarchy
- **Link Context**: Descriptive link text
- **Meta Information**: Complete frontmatter for all content

## 🧰 Tooling Standards

### Development Tools
- **IDE**: Use project's preferred editor (Zed/VSCode)
- **Package Manager**: Bun for consistency
- **Version Control**: Git with conventional commits
- **Testing**: Preview builds and manual testing

### Code Quality Tools
- **ESLint**: Follow project configuration
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Build Tools**: Astro's built-in optimization

## 🎨 Common Pitfalls to Avoid

### Design Pitfalls
- **Over-designing**: Content should drive design
- **Breaking Patterns**: Follow existing component patterns
- **Inconsistent Spacing**: Use design tokens/variables
- **Ignoring Mobile**: Mobile-first development approach

### Development Pitfalls
- **Skipping Type Safety**: Always use TypeScript properly
- **Hardcoding Values**: Use configuration and environment variables
- **Ignoring Performance**: Monitor bundle size and loading times
- **Accessibility Oversights**: Regular keyboard and screen reader testing

### Content Pitfalls
- **Missing Alt Text**: Always include descriptive alt text
- **Broken Links**: Test all links before deploying
- **Poor SEO**: Missing meta descriptions, poor titles
- **Inconsistent Formatting**: Follow established content patterns

## ✅ Quality Checklist

### Before Submitting Changes
- [ ] Code follows existing patterns
- [ ] TypeScript types are correct
- [ ] Components are reusable where appropriate
- [ ] Mobile responsiveness tested
- [ ] Accessibility features implemented
- [ ] Performance impact considered
- [ ] Links are functional
- [ ] SEO best practices followed
- [ ] Documentation updated if needed

### Pre-Deployment
- [ ] All linting checks pass
- [ ] Code formatting is correct
- [ ] Build process succeeds
- [ ] Content previewed and tested
- [ ] Performance metrics acceptable
- [ ] Security considerations addressed
- [ ] Documentation is updated

## 🔧 Tooling Standards

### Development Tools
- **IDE**: Use project's preferred editor (Zed/VSCode)
- **Package Manager**: Bun for consistency
- **Version Control**: Git with conventional commits
- **Testing**: Preview builds and manual testing

### Code Quality Tools
- **ESLint**: Follow project configuration
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Build Tools**: Astro's built-in optimization

## 🎨 Common Pitfalls to Avoid

### Design Pitfalls
- **Over-designing**: Content should drive design
- **Breaking Patterns**: Follow existing component patterns
- **Inconsistent Spacing**: Use design tokens/variables
- **Ignoring Mobile**: Mobile-first development approach

### Development Pitfalls
- **Skipping Type Safety**: Always use TypeScript properly
- **Hardcoding Values**: Use configuration and environment variables
- **Ignoring Performance**: Monitor bundle size and loading times
- **Accessibility Oversights**: Regular keyboard and screen reader testing

### Content Pitfalls
- **Missing Alt Text**: Always include descriptive alt text
- **Broken Links**: Test all links before deploying
- **Poor SEO**: Missing meta descriptions, poor titles
- **Inconsistent Formatting**: Follow established content patterns

---

**Remember**: This site represents Steve's professional presence. Quality, consistency, and attention to detail reflect on both the code and the person behind it.

When in doubt, prioritize user experience and long-term maintainability over short-term convenience.