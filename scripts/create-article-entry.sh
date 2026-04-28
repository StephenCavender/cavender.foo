#!/bin/bash

# Script to create a new article entry
# Usage: ./scripts/create-article-entry.sh "article-title"

# Check if title argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide an article title"
    echo "Usage: ./scripts/create-article-entry.sh \"article-title\""
    exit 1
fi

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Convert title to kebab-case
SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/ /g' | tr ' ' '-' | sed 's/-$//')

# Define file path
FILE_PATH="src/content/articles/${SLUG}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Generate frontmatter from schema
FRONTMATTER=$(bun scripts/generate-frontmatter.ts articles "$1")

# Create the file with frontmatter and template body
cat > "$FILE_PATH" << EOF
$FRONTMATTER
# $1

Write your article content here using Markdown syntax.

## Subheading

Your article content goes here...

---

**Example content:**

- Bullet points
- **Bold text** and _italic text_
- \`inline code\`
- [Links](https://example.com)

## Code Examples

\`\`\`javascript
// Example code block
function example() {
  console.log("Hello, world!");
}
\`\`\`

## Resources

- [Resource 1](https://example.com)
- [Resource 2](https://example.com)
EOF

echo "Created new article entry: $FILE_PATH"
echo "Title: $1"
echo "Slug: $SLUG"
echo "Published date: $DATE"
echo ""
echo "Next steps:"
echo "1. Update the frontmatter with your title, description, and tags"
echo "2. Write your article content"
echo "3. Run 'bun run dev' to preview"
