// require the module as normal
const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { bundle } = require("lightningcss");

const entryList = ["./index.css"];

const outputDir = "./src/main/webapp";

// initial build
cleanBundle();
buildCssBundle();
buildJsBundle();

browserSync.init({
  files: "./src/main",
  injectChanges: false, // Equivalent to --no-inject-changes
  cors: true, // Enable CORS support
  open: false, // Prevent auto-opening the browser (you can change this if needed)
});

browserSync.watch(
  ["./index.js", "./apps/**/.js"],
  async function (event, file) {
    if (event === "change") {
      buildJsBundle();
    }
  },
);

browserSync.watch(
  ["./index.css", "./apps/**/.css"],
  async function (event, file) {
    if (event === "change") {
      buildCssBundle();
    }
  },
);

// Watch files for changes
const excludedFolders = ["node_modules"];

browserSync.watch(["./index.html"], async function (event, file) {
  const shouldExclude = excludedFolders.some((folder) =>
    file.includes(path.join(path.sep, folder, path.sep)),
  );
  if (!shouldExclude && (event === "change" || event === "add")) {
    const destination = path.join(__dirname, outputDir, path.basename(file)); // Adjust as needed
    try {
      await copyFile(file, destination);
      console.log(`File "${file}" copied successfully to "${destination}".`);
    } catch (error) {
      console.error(`Failed to copy file "${file}":`, error.message);
    }
  }
});

async function buildJsBundle() {
  return new Promise((resolve, _) => {
    exec("npx rollup -c rollup.server.js", (err, _, stderr) => {
      if (err) {
        console.error("Error executing custom command:", stderr);
        resolve();
        return;
      }
      console.log("bundled successfully");
      resolve();
    });
  });
}

/**
 * @param {string} entry - The main CSS file path to bundle.
 * @param {string} outputDir - The directory where the bundled file will be written.
 */
function bundleFileWithDependencies(entry, outputDir) {
  try {
    const { code } = bundle({
      filename: entry,
      minify: true,
    });

    const outputFileName = path.basename(entry); // Extract the file name
    const outputPath = path.join(outputDir, outputFileName);

    fs.writeFileSync(outputPath, code);
    console.log(`Successfully bundled: ${entry} -> ${outputPath}`);
  } catch (err) {
    console.error(`Error bundling file ${entry}:`, err);
  }
}

function buildCssBundle() {
  entryList.forEach((entry) => {
    bundleFileWithDependencies(entry, outputDir);
  });
}

function cleanBundle() {
  const files = fs.readdirSync(outputDir);

  files.forEach((file) => {
    const filePath = path.join(outputDir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if ([".css", ".html", ".js"].includes(ext)) {
        fs.unlinkSync(filePath);
      }
    } else if (fileStat.isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    }
  });

  console.log(`Cleaned all files from directory: ${outputDir}`);
}

/**
 * Copies a file from source to destination.
 * @param {string} source - The source file path.
 * @param {string} destination - The destination file path.
 * @returns {Promise<void>} - Resolves when the file is copied, rejects on error.
 */
function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    fs.copyFile(source, destination, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
