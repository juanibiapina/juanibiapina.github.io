#!/usr/bin/env bash

# Get current date
DATE=$(date +%Y-%m-%d)

# Define file path
FILE="src/content/posts/${DATE}-post.md"

# Create directories if they don't exist
mkdir -p "$(dirname "$FILE")"

# Write content to the file
cat <<EOF > "$FILE"
---
title: "Title"
description: "Description"
pubDate: $DATE
---
EOF

echo "Created $FILE"
