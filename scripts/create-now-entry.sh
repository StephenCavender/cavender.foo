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

# Create file from template
cp "src/content/now/_template.md" "$FILE_PATH"

# Replace placeholder with actual date
sed -i '' "s/YYYY-MM-DD/$DATE/g" "$FILE_PATH"

echo "Created new now entry: $FILE_PATH"
echo "Date: $DATE"
echo ""
echo "Next steps:"
echo "1. Update the sections with your current activities"
echo "2. Add or remove sections as needed"
echo "3. Remove this instruction text"
echo "4. Run 'bun run dev' to preview"