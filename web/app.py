import os
from flask import Flask, send_from_directory

app = Flask(__name__)

# Path for our static assets. The 'public' directory is expected
# to be at the root of the repository.
PUBLIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))

@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    """Serves a file from the public directory."""
    return send_from_directory(PUBLIC_DIR, path)

if __name__ == '__main__':
    # For local development (not used by gunicorn)
    app.run(debug=True)
