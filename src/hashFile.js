const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node hashFile.js <file>");
  process.exit(1);
}

const absolutePath = path.resolve(filePath);

// read raw bytes
const data = fs.readFileSync(absolutePath);

// create SHA-256 hash
const hash = crypto
  .createHash("sha256")
  .update(data)
  .digest("hex");

console.log("File:", absolutePath);
console.log("SHA-256:", hash);

const baselinePath = path.resolve("baseline.json");

let baseline = {};
if (fs.existsSync(baselinePath)) {
  baseline = JSON.parse(fs.readFileSync(baselinePath));
}

baseline[absolutePath] = hash;

fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2));

console.log("Baseline updated.");
