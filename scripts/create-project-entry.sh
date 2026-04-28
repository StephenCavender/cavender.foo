#!/bin/bash

# Script to create a new project entry
# Usage: ./scripts/create-project-entry.sh "Project Name"

# Check if project name argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a project name"
    echo "Usage: ./scripts/create-project-entry.sh \"Project Name\""
    exit 1
fi

# Convert project name to kebab-case for filename
SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/ /g' | tr ' ' '-' | sed 's/-$//')

# Define file path
FILE_PATH="src/content/projects/${SLUG}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Generate frontmatter from schema
FRONTMATTER=$(bun scripts/generate-frontmatter.ts projects "$1")

# Create the file with frontmatter and template body
cat > "$FILE_PATH" << EOF
$FRONTMATTER
# $1

**Description**: TODO: A brief description of what this project does

## Overview

Write an overview of your project...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technology Stack

- **Frontend**: TODO: React, TypeScript, Tailwind CSS
- **Backend**: TODO: Node.js, Express, PostgreSQL
- **DevOps**: TODO: Docker, GitHub Actions
- **Testing**: TODO: Jest, Cypress

## Challenges & Solutions

### Challenge 1

**Problem**: Describe the challenge...
**Solution**: How you solved it...

### Challenge 2

**Problem**: Describe the challenge...
**Solution**: How you solved it...

## Future Plans

- [ ] Feature to add
- [ ] Improvement to make
- [ ] Technology to upgrade

## Links

- **Live Site**: [Project URL](https://example.com)
- **GitHub**: [Source Code](https://github.com/username/project-name)
EOF

echo "Created new project entry: $FILE_PATH"
echo "Project: $1"
echo "Slug: $SLUG"
echo ""
echo "Next steps:"
echo "1. Update frontmatter with project details (URL, logo, status, etc.)"
echo "2. Add logo URL if available"
echo "3. Set status (active/archived/in-development)"
echo "4. Add tags and tech stack"
echo "5. Write project description and details"
echo "6. Run 'bun run dev' to preview"
