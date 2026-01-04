#!/bin/bash

# Script to create a new game entry
# Usage: ./scripts/create-game-entry.sh "Game Title"

# Check if title argument is provided
if [ -z "$1" ]; then
    echo "Error: Please provide a game title"
    echo "Usage: ./scripts/create-game-entry.sh \"Game Title\""
    exit 1
fi

# Convert title to kebab-case for filename
SLUG=$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/ /g' | tr ' ' '-' | sed 's/-$//')

# Define file path
FILE_PATH="src/content/games/${SLUG}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Create file from template
cp "src/content/games/_template.md" "$FILE_PATH"

# Replace placeholders with actual values
sed -i '' "s/Game Title/$1/g" "$FILE_PATH"

echo "Created new game entry: $FILE_PATH"
echo "Title: $1"
echo "Slug: $SLUG"
echo ""
echo "Next steps:"
echo "1. Update frontmatter with game details (developer, publisher, platform, etc.)"
echo "2. Add cover image URL if available"
echo "3. Set status (unplayed/playing/played)"
echo "4. Add tags and links"
echo "5. Write your review and thoughts"
echo "6. Run 'bun run dev' to preview"