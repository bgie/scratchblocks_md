const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const crypto = require("crypto");
const chokidar = require("chokidar");

const watchDir = process.argv[2] || "examples";
const renderedSuffix = "_rendered.md";

async function renderFile(filePath, page) {
  console.log(`Processing ${filePath}...`);

  const sourceDir = path.dirname(filePath);
  const generatedDir = path.join(sourceDir, "generated");
  const baseName = path.basename(filePath, ".md");
  const outputFile = path.join(generatedDir, `${baseName}${renderedSuffix}`);

  try {
    await fs.ensureDir(generatedDir);
    const markdown = await fs.readFile(filePath, "utf8");
    const scratchBlocks = [...markdown.matchAll(/```scratchblocks\n([\s\S]*?)```/g)];

    let modified = markdown;

    for (let i = 0; i < scratchBlocks.length; i++) {
      const block = scratchBlocks[i][1].trim();
      const hash = crypto.createHash("md5").update(block).digest("hex").slice(0, 8);
      const imagePath = path.join(generatedDir, `block-${hash}.png`);

      if (!await fs.pathExists(imagePath)) {
        await page.evaluate((code) => {
          document.getElementById("container").innerHTML = "";
          window.renderScratchBlocks(code);
        }, block);

        await page.waitForSelector(".scratch-block svg");
        const element = await page.$(".scratch-block svg");
        const clip = await element.boundingBox();
        if (clip) {
          await page.screenshot({ path: imagePath, clip });
        }
      }

      const relativeImagePath = path.relative(generatedDir, imagePath).replace(/\\/g, "/");
      const imageTag = `![Scratch Block](${relativeImagePath})`;
      modified = modified.replace(scratchBlocks[i][0], imageTag);
    }

    await fs.writeFile(outputFile, modified);
    console.log(`Successfully rendered ${filePath} to ${outputFile}`);
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error);
  }
}

(async () => {
  await fs.ensureDir(watchDir);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.resolve("render.html"));

  const watcher = chokidar.watch(`${watchDir}/**/*.md`, {
    ignored: `**/generated/**`,
    persistent: true,
  });

  watcher
    .on("add", (filePath) => renderFile(filePath, page))
    .on("change", (filePath) => renderFile(filePath, page))
    .on("ready", () => console.log(`Initial scan complete. Ready for changes in ./${watchDir}`));

  const closeBrowser = async () => {
    console.log("\nClosing browser...");
    await browser.close();
    process.exit(0);
  };

  process.on("SIGINT", closeBrowser);
  process.on("SIGTERM", closeBrowser);
})();
