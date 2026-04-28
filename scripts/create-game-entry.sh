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

# Generate frontmatter from schema
FRONTMATTER=$(bun scripts/generate-frontmatter.ts games "$1")

# Create the file with frontmatter and template body
cat > "$FILE_PATH" << EOF
$FRONTMATTER
# $1

**Developer**: TODO: Game Developer
**Publisher**: TODO: Game Publisher
**Released**: TODO: YYYY-MM-DD
**Platform**: TODO: PC, PlayStation 5, Nintendo Switch, Xbox Series X

## My Experience

Write about your experience with this game...

## Gameplay

Describe the gameplay mechanics...

## Graphics & Sound

Talk about the visual and audio experience...

## Pros & Cons

### Pros

- Pro 1
- Pro 2
- Pro 3

### Cons

- Con 1
- Con 2
- Con 3

## Recommendation

**Rating: ★★★★★**

I would recommend this game to players who enjoy...
EOF

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
