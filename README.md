# Scratchblocks Renderer

This project provides a script to automatically convert markdown files containing `scratchblocks` code into rendered markdown files with generated images and corresponding PDFs.

## Features

-   Renders `scratchblocks` code snippets into PNG images.
-   Watches a directory for changes to `.md` files and automatically re-renders them.
-   Generates a clean markdown file with image links.
-   Generates a corresponding PDF document with images embedded and scaled.
-   Generated files are placed in a `generated` subdirectory.

## Prerequisites

-   [Node.js](https://nodejs.org/) and npm

## Installation

1.  Clone the repository.
2.  Install the required dependencies:

    ```sh
    npm install
    ```

## Usage

To start the file watcher, run the `watch.sh` script. By default, it watches the `examples/` directory.

```sh
./watch.sh
```

You can also specify a different directory to watch by passing it as an argument:

```sh
./watch.sh my_markdown_folder/
```

The script will now run in the background. Any time you add or modify a `.md` file in the target directory (that is not in a `generated` sub-folder), the script will automatically:
1.  Create a `generated` subdirectory if one doesn't exist.
2.  Generate PNG images for each `scratchblocks` code block.
3.  Create a `_rendered.md` file with the images.
4.  Create a `.pdf` file with the images embedded and scaled to 50%.

To stop the watcher, press `Ctrl+C` in the terminal where it is running.

## How It Works

-   `generate-images.js`: The main Node.js script that contains all the logic for file watching, parsing markdown, generating images with Puppeteer, and creating the final markdown and PDF files.
-   `render.html`: A simple HTML file used by Puppeteer as a canvas to render the scratchblocks.
-   `watch.sh`: A convenience script for launching the watcher.
-   `package.json`: Defines the project dependencies and scripts.
-   `scratchblocks-3.6.4/tests/all-blocks.txt`: A comprehensive list of example scratchblocks syntax, useful for reference.
