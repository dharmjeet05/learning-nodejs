const fs = require("node:fs");

const contents = fs.readFileSync('notes.txt', 'utf-8');

fs.writeFileSync('copy.txt', contents, 'utf-8');

console.log(contents);