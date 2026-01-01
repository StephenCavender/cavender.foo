#!/bin/bash

# Usage: ./scripts/create-now-entry.sh YYYY-MM-DD
# Creates a new now entry with proper frontmatter

if [ $# -eq 0 ]; then
  echo "Usage: $0 YYYY-MM-DD"
  exit 1
fi

DATE=$1
FILE_PATH="src/content/now/$DATE.md"

if [ -f "$FILE_PATH" ]; then
  echo "❌ Entry for $DATE already exists"
  exit 1
fi

cat > "$FILE_PATH" << EOF
---
pubDate: $DATE
draft: false
---

EOF

echo "✅ Created now entry: $FILE_PATH"
