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

echo "Syncing tutorial files from $SOURCE_DIR to $DEST_DIR..."

# Use rsync to copy files. It's efficient and handles updates well.
# -a: archive mode (preserves permissions, timestamps, etc.)
# -v: verbose
# --delete: remove files from destination that are not in source
# The trailing slash on SOURCE_DIR is important: it copies the *contents*
# of the source directory, not the directory itself.
rsync -av --delete "$SOURCE_DIR/" "$DEST_DIR/"

echo "Tutorials published successfully."
