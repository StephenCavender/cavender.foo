#!/bin/bash

# Script to create a new book entry
# Usage: ./scripts/create-book-entry.sh "Book Title" "Author Name"

# Check if title argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a book title"
    echo "Usage: ./scripts/create-book-entry.sh \"Book Title\" \"Author Name\""
    exit 1
fi

# Check if author argument is provided
if [ -z "$2" ]; then
    echo "Error: Please provide an author name"
    echo "Usage: ./scripts/create-book-entry.sh \"Book Title\" \"Author Name\""
    exit 1
fi

# Convert title to kebab-case for filename
SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/ /g' | tr ' ' '-' | sed 's/-$//')

# Define file path
FILE_PATH="src/content/books/${SLUG}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Create file from template
cp "src/content/books/_template.md" "$FILE_PATH"

# Replace placeholders with actual values
sed -i '' "s/Book Title/$1/g" "$FILE_PATH"
sed -i '' "s/Author Name/$2/g" "$FILE_PATH"

echo "Created new book entry: $FILE_PATH"
echo "Title: $1"
echo "Author: $2"
echo "Slug: $SLUG"
echo ""
echo "Next steps:"
echo "1. Update frontmatter with ISBN, status, and other details"
echo "2. Update cover image URL if available"
echo "3. Add tags and links"
echo "4. Write your review and thoughts"
echo "5. Run 'bun run dev' to preview"