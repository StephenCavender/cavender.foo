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

# Create file from template
cp "src/content/projects/_template.md" "$FILE_PATH"

# Replace placeholders with actual values
sed -i '' "s/Project Name/$1/g" "$FILE_PATH"

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