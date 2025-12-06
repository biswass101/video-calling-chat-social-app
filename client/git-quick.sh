#!/bin/bash

# Usage:
# ./git-quick.sh "your commit message" branch-name

COMMIT_MSG=$1
BRANCH=$2

# If missing parameters, show help
if [ -z "$COMMIT_MSG" ] || [ -z "$BRANCH" ]; then
  echo "❌ Usage: ./git-quick.sh \"commit message\" branch-name"
  exit 1
fi

echo "🔄 Adding files..."
git add .

echo "💬 Committing..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to $BRANCH..."
git push origin "$BRANCH"

echo "✅ Done!"

