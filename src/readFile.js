const fs = require("fs");
const path = require("path");

// get file path from command line
const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node readFile.js <file>");
  process.exit(1);
}

const absolutePath = path.resolve(filePath);

// read as raw buffer
const data = fs.readFileSync(absolutePath);

console.log("File:", absolutePath);
console.log("Type:", typeof data);
console.log("Is Buffer:", Buffer.isBuffer(data));
console.log("Size (bytes):", data.length);
console.log("First 20 bytes:", data.slice(0, 20));
console.log("Hex preview:", data.slice(0, 20).toString("hex"));

const stats = fs.statSync(absolutePath);

console.log("Created:", stats.birthtime);
console.log("Modified:", stats.mtime);
console.log("Permissions:", stats.mode.toString(8));

