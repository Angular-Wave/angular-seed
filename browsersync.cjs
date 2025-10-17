// require the module as normal
const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { bundle } = require("lightningcss");

const entryList = ["./app/index.css"];
const outputDir = "./dist";

// initial build
cleanBundle();
buildCssBundle();
buildJsBundle();

browserSync.init({
  files: ["./dist/**"],
  injectChanges: false, // Equivalent to --no-inject-changes
  cors: true,
  open: false, // Prevent auto-opening the browser (you can change this if needed)
});

browserSync.watch(["./app/**/*.js"], async (event) => {
  if (event === "change") {
    await buildJsBundle();
    await pretty();
  }
});

browserSync.watch(["./app/**/*.css"], async (event) => {
  if (event === "change") {
    // await buildCssBundle();
    await pretty();
  }
});

// Watch files for changes
const excludedFolders = ["node_modules"];
const sourceRoot = path.join(__dirname, "app");
browserSync.watch(
  ["./app/**/*.html", "./app/**/*.html.dt"],
  async (event, file) => {
    const shouldExclude = excludedFolders.some((folder) =>
      file.includes(path.join(path.sep, folder, path.sep)),
    );

    if (!shouldExclude && (event === "change" || event === "add")) {
      const relativePath = path.relative(sourceRoot, file);
      const destination = path.join(__dirname, outputDir, relativePath);

      try {
        await fs.promises.mkdir(path.dirname(destination), { recursive: true });
        await fs.promises.copyFile(file, destination);
        console.log(`File "${file}" copied successfully to "${destination}".`);
      } catch (error) {
        console.error(`Failed to copy file "${file}":`, error.message);
      }
    }
  },
);

async function buildJsBundle() {
  return new Promise((resolve, _) => {
    exec("npx rollup -c rollup.server.mjs", (err, _, stderr) => {
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

async function pretty() {
  return new Promise((resolve) => {
    exec(
      "npx prettier ./ --write --cache --log-level=silent",
      (err, _, stderr) => {
        if (err) {
          console.error("Error executing custom command:", stderr);
          resolve();
          return;
        }
        console.log("Pretty successfully");
        resolve();
      },
    );
  });
}

/**
 * @param {string} entry - The main CSS file path to bundle.
 * @param {string} output - The directory where the bundled file will be written.
 */
function bundleFileWithDependencies(entry, output) {
  try {
    const { code } = bundle({
      filename: entry,
      minify: true,
    });

    const outputFileName = path.basename(entry); // Extract the file name
    const outputPath = path.join(output, outputFileName);

    fs.writeFileSync(outputPath, code);
    console.log(`Successfully bundled: ${entry} -> ${outputPath}`);
  } catch (err) {
    console.error(`Error bundling file ${entry}:`, err);
  }
}

function buildCssBundle() {
  // entryList.forEach((entry) => {
  //   bundleFileWithDependencies(entry, outputDir);
  // });
  return new Promise((resolve) => {
    exec(
      "npx @tailwindcss/cli -i ./app/index.css -o ./dist/index.css --watch",
      (err, _, stderr) => {
        if (err) {
          console.error("Error executing custom command:", stderr);
          resolve();
          return;
        }
        console.log("Pretty successfully");
        resolve();
      },
    );
  });
}

function cleanBundle() {
  const files = fs.readdirSync(outputDir);

  files.forEach((file) => {
    const filePath = path.join(outputDir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      fs.unlinkSync(filePath);
    } else if (fileStat.isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    }
  });

  console.log(`Cleaned all files from directory: ${outputDir}`);
}
