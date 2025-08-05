#!/bin/bash
#
# This script starts the file watcher server to automatically
# render markdown files with scratchblocks.
#

DIR=${1:-examples}
if [ -d "$DIR" ]; then
  echo "Clearing 'generated' directories in '$DIR'..."
  find "$DIR" -type d -name "generated" -exec rm -rf {} +
fi

echo "Starting file watcher..."
npm start -- "$@"
