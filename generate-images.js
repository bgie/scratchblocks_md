const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const crypto = require("crypto");
const chokidar = require("chokidar");
const sizeOf = require("image-size");

const watchDir = process.argv[2] || "examples";
const renderedSuffix = "_rendered.md";

async function renderFile(filePath, browser) {
  console.log(`Processing ${filePath}...`);

  const sourceDir = path.dirname(filePath);
  const generatedDir = path.join(sourceDir, "generated");
  const baseName = path.basename(filePath, ".md");
  const outputFile = path.join(generatedDir, `${baseName}${renderedSuffix}`);

  let page;
  try {
    page = await browser.newPage();
    await page.goto("file://" + path.resolve("render.html"));

    await fs.ensureDir(generatedDir);
    const markdown = await fs.readFile(filePath, "utf8");
    const scratchBlocks = [...markdown.matchAll(/```scratchblocks(?::(\w+))?\n([\s\S]*?)```/g)];

    let modified = markdown;

    for (let i = 0; i < scratchBlocks.length; i++) {
      const lang = scratchBlocks[i][1] || 'en';
      const block = scratchBlocks[i][2].trim();
      const hash = crypto.createHash("md5").update(block).digest("hex").slice(0, 8);
      const imagePath = path.join(generatedDir, `block-${hash}.png`);

      if (!await fs.pathExists(imagePath)) {
        await page.evaluate((code, lang) => {
          document.getElementById("container").innerHTML = "";
          window.renderScratchBlocks(code, lang);
        }, block, lang);

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

    const pdfOutputFile = path.join(generatedDir, `${baseName}.pdf`);

    // For PDF generation, embed images as data URIs to avoid file access issues.
    const md_pdf = require("markdown-it")();
    const defaultImageRule = md_pdf.renderer.rules.image;
    md_pdf.renderer.rules.image = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const src = token.attrGet("src");
      const imagePath = path.resolve(generatedDir, src);
      try {
        if (fs.existsSync(imagePath)) {
          const dimensions = sizeOf(imagePath);
          token.attrSet("width", `${dimensions.width * 0.5}`);
          token.attrSet("height", `${dimensions.height * 0.5}`);

          const imageBuffer = fs.readFileSync(imagePath);
          token.attrSet("src", `data:image/png;base64,${imageBuffer.toString("base64")}`);
        }
      } catch (e) {
        console.error(`Error reading image for PDF embedding: ${imagePath}`, e);
      }
      return defaultImageRule(tokens, idx, options, env, self);
    };
    const html = md_pdf.render(modified);

    const htmlOutputFile = path.join(generatedDir, `${baseName}.html`);
    await fs.writeFile(htmlOutputFile, html);
    console.log(`Successfully generated HTML: ${htmlOutputFile}`);

    const pdfPage = await browser.newPage();
    await pdfPage.setContent(html, { waitUntil: "domcontentloaded" });
    await pdfPage.pdf({ path: pdfOutputFile, format: "A4" });
    await pdfPage.close();
    console.log(`Successfully generated PDF: ${pdfOutputFile}`);
  } catch (error) {
    console.error(`Failed to process ${filePath}:`, error);
  } finally {
    if (page) await page.close();
  }
}

(async () => {
  await fs.ensureDir(watchDir);

  const browser = await puppeteer.launch();

  const watcher = chokidar.watch(`${watchDir}/**/*.md`, {
    ignored: `**/generated/**`,
    persistent: true,
  });

  watcher
    .on("add", (filePath) => renderFile(filePath, browser))
    .on("change", (filePath) => renderFile(filePath, browser))
    .on("ready", () => console.log(`Initial scan complete. Ready for changes in ./${watchDir}`));

  const closeBrowser = async () => {
    console.log("\nClosing browser...");
    await browser.close();
    process.exit(0);
  };

  process.on("SIGINT", closeBrowser);
  process.on("SIGTERM", closeBrowser);
})();
