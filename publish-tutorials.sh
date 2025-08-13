#!/bin/bash
set -e

# This script copies the generated tutorial files from the examples directory
# to the public web directory so they can be served.

if ! command -v rsync &> /dev/null; then
    echo "rsync command not found. Please install it first (e.g., 'sudo apt-get install rsync')."
    exit 1
fi

SOURCE_DIR="examples/generated"
DEST_DIR="public/tutorials"

if [ ! -d "$SOURCE_DIR" ]; then
    echo "Source directory $SOURCE_DIR does not exist."
    echo "Have you run the generation script to create the tutorials?"
    exit 1
fi

# Ensure destination directory exists
mkdir -p "$DEST_DIR"

echo "Continuously syncing tutorial HTML files from $SOURCE_DIR to $DEST_DIR..."
echo "Press Ctrl+C to stop."

# Use rsync to copy files. It's efficient and handles updates well.
# -a: archive mode (preserves permissions, timestamps, etc.)
# -v: verbose
# --delete: remove files from destination that are not in source
# --include='*/' --include='*.html' --exclude='*': only copy html files, preserving directory structure
# The trailing slash on SOURCE_DIR is important: it copies the *contents*
# of the source directory, not the directory itself.
while true; do
    rsync -av --delete --include='*/' --include='*.html' --exclude='*' "$SOURCE_DIR/" "$DEST_DIR/"
    sleep 2
done
