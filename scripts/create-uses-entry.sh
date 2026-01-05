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

# Find the latest uses entry (excluding template)
LATEST_ENTRY=$(find src/content/uses -name "*.md" ! -name "_template.md" | sort -r | head -1)

# Check if there's a latest entry to copy from
if [ -z "$LATEST_ENTRY" ]; then
    echo "Error: No existing uses entries found to copy from!"
    echo "Please create an initial entry manually."
    exit 1
fi

# Create the file from latest entry
cp "$LATEST_ENTRY" "$FILE_PATH"

# Replace the date in frontmatter with the new date
sed -i '' "s/^pubDate: .*/pubDate: $DATE/g" "$FILE_PATH"

echo "Created new uses entry: $FILE_PATH"
echo "Date: $DATE"
echo "Copied from: $LATEST_ENTRY"
echo ""
echo "Next steps:"
echo "1. Update the content with your current setup"
echo "2. Run 'bun run dev' to preview"