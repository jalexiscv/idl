/**
 * Builds dist/idl.js by concatenating prelude + classes in dependency order + postlude.
 * Run: node build.js
 */
const fs = require('fs');
const path = require('path');

// Read class order (from original file)
const order = fs.readFileSync(path.join(__dirname, 'src', '_class_order.txt'), 'utf8')
  .trim()
  .split('\n')
  .filter(Boolean);

// Read class-to-directory mapping
const classMap = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src', '_classes.json'), 'utf8')
);

// Read prelude (IIFE start + Debug + utilities setup)
const prelude = fs.readFileSync(path.join(__dirname, 'src', '_prelude.js'), 'utf8');

// Read postlude (export/initialization code)
const postlude = fs.readFileSync(path.join(__dirname, 'src', '_postlude.js'), 'utf8');

// Build the concatenated source
const parts = [prelude];

let found = 0;
let missing = 0;

for (const className of order) {
  const dir = classMap[className];
  if (!dir) {
    console.warn(`  [MISSING] ${className} - no directory mapping`);
    missing++;
    continue;
  }

  const filePath = path.join(__dirname, 'src', dir, `${className}.js`);
  if (!fs.existsSync(filePath)) {
    console.warn(`  [MISSING] ${className} - file not found: ${filePath}`);
    missing++;
    continue;
  }

  // Read the class file and extract just the class definition (skip comments)
  const content = fs.readFileSync(filePath, 'utf8');
  // Extract everything from "class ClassName" onwards
  const classMatch = content.match(/class\s+\w+[\s\S]*/);
  if (classMatch) {
    parts.push(classMatch[0]);
  } else {
    parts.push(content);
  }

  found++;
}

// Add postlude
parts.push(postlude);

// Ensure dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write output
const output = parts.join('');
fs.writeFileSync(path.join(distDir, 'idl.js'), output);

console.log(`Build complete: dist/idl.js (${(output.length / 1024).toFixed(1)} KB)`);
console.log(`  Classes included: ${found}`);
if (missing > 0) {
  console.log(`  Missing: ${missing}`);
}

// Also create an index.js that exports the same way
// This is for Node.js require() support
const indexContent = `/**
 * Interactive Diagrams Library
 * Entry point - loads the bundled library
 */
module.exports = require('./dist/idl');
`;
fs.writeFileSync(path.join(__dirname, 'index.js'), indexContent);
console.log('  index.js created');
