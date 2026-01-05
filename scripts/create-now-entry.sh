#!/bin/bash

# Script to create a new now entry
# Usage: ./scripts/create-now-entry.sh [YYYY-MM-DD]

# Get current date if no argument provided
if [ -z "$1" ]; then
    DATE=$(date +%Y-%m-%d)
else
    DATE=$1
fi

# Validate date format using a simpler approach
if ! date -j -f "%Y-%m-%d" "$DATE" >/dev/null 2>&1; then
    echo "Error: Invalid date format. Please use YYYY-MM-DD format"
    echo "Usage: ./scripts/create-now-entry.sh [YYYY-MM-DD]"
    echo "If no date is provided, today's date will be used."
    exit 1
fi

# Define file path
FILE_PATH="src/content/now/${DATE}.md"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH already exists!"
    exit 1
fi

# Find the latest now entry (excluding template)
LATEST_ENTRY=$(find src/content/now -name "*.md" ! -name "_template.md" | sort -r | head -1)

# Check if there's a latest entry to copy from
if [ -z "$LATEST_ENTRY" ]; then
    echo "Error: No existing now entries found to copy from!"
    echo "Please create an initial entry manually."
    exit 1
fi

# Create file from latest entry
cp "$LATEST_ENTRY" "$FILE_PATH"

# Replace the date in frontmatter with the new date
sed -i '' "s/^pubDate: .*/pubDate: $DATE/g" "$FILE_PATH"

echo "Created new now entry: $FILE_PATH"
echo "Date: $DATE"
echo "Copied from: $LATEST_ENTRY"
echo ""
echo "Next steps:"
echo "1. Update the content with your current activities"
echo "2. Run 'bun run dev' to preview"