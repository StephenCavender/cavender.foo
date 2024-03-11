#!/bin/bash

echo "Article title:"
read TITLE

echo "Article slug:"
read SLUG

cat > src/content/articles/$SLUG.mdx <<EOL
---
title: $TITLE
description: foo
pubDate: 9999-12-31
updatedDate: 9999-12-31
tags: []
---
EOL