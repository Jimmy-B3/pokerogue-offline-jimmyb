#!/usr/bin/env node
/**
 * Patch: inject-assets.js
 *
 * Copies every file under injection/ into pokerogue-src/assets/,
 * preserving relative paths, e.g. injection/pokemon/1.json ->
 * pokerogue-src/assets/pokemon/1.json. Runs before the build so the
 * copied files are picked up as regular game assets.
 *
 * Targets: pokerogue-src/assets/
 */

const fs = require("fs");
const path = require("path");

const SOURCE = path.join("injection");
const TARGET = path.join("pokerogue-src", "assets");

if (!fs.existsSync(SOURCE)) {
  console.log(`No ${SOURCE} directory found, skipping.`);
  process.exit(0);
}

if (!fs.existsSync(TARGET)) {
  console.error(`ERROR: Could not find target directory: ${TARGET}`);
  process.exit(1);
}

fs.cpSync(SOURCE, TARGET, { recursive: true, filter: (src) => path.basename(src) !== ".gitkeep" });
console.log(`Copied ${SOURCE} into ${TARGET}`);
