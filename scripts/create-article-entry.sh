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
FILE_PATH="src/content/articles/${SLUG}.mdx"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Create the file from template
cp "src/content/articles/_template.mdx" "$FILE_PATH"

# Replace placeholders with actual values
sed -i '' "s/Article Title/$1/g" "$FILE_PATH"
sed -i '' "s/YYYY-MM-DD/$DATE/g" "$FILE_PATH"
sed -i '' "s/A brief description of what this article is about/TODO: Add description/g" "$FILE_PATH"

echo "Created new article entry: $FILE_PATH"
echo "Title: $1"
echo "Slug: $SLUG"
echo "Published date: $DATE"
echo ""
echo "Next steps:"
echo "1. Update the frontmatter with your title, description, and tags"
echo "2. Write your article content"
echo "3. Run 'bun run dev' to preview"