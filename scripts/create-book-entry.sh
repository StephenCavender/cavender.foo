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

# Generate frontmatter from schema
FRONTMATTER=$(bun scripts/generate-frontmatter.ts books "$1")

# Create the file with frontmatter and template body
cat > "$FILE_PATH" << EOF
$FRONTMATTER
# $1

**Author**: $2

## My Review

Write your book review here...

## Key Takeaways

- Point 1
- Point 2
- Point 3

## Favorite Quotes

> "Quote from the book..."
> — Character, Chapter X

## Recommendations

I would recommend this book to people who enjoy...

**Rating: ★★★★★**
EOF

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
