#!/bin/bash

# Script to create a new "uses" entry with the current date
# Usage: ./scripts/create-uses-entry.sh

# Get current date in YYYY-MM-DD format
DATE=$(date +%Y-%m-%d)

# Define file path
FILE_PATH="src/content/uses/${DATE}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Create the file from template
cp "src/content/uses/_template.md" "$FILE_PATH"

# Replace the placeholder date with actual date
sed -i '' "s/YYYY-MM-DD/$DATE/g" "$FILE_PATH"

echo "Created new uses entry: $FILE_PATH"
echo "You can now edit the file and run 'bun run dev' to see the changes"