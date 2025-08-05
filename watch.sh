#!/bin/bash
#
# This script starts the file watcher server to automatically
# render markdown files with scratchblocks.
#

echo "Starting file watcher..."
npm start -- "$@"
