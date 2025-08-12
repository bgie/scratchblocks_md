#!/bin/bash
set -e

# This script sets up a python virtual environment and runs the web application.

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating python virtual environment in venv/"
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

echo "Installing dependencies from web/requirements.txt..."
pip install -r web/requirements.txt

HOST=${HOST:-0.0.0.0}
PORT=${PORT:-8080}

echo "Starting server with gunicorn on $HOST:$PORT..."
# Gunicorn will serve the app. It's configured for 4 workers.
# It will listen on HOST:PORT, which can be configured via environment variables.
# By default it listens on http://127.0.0.1:8000
gunicorn --chdir web -w 4 -b $HOST:$PORT app:app
