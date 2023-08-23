const { readFileSync, appendFile } = require("node:fs");

const PREFIX = ".";
const COMMAND = `${PREFIX}mban`;
const safe = new Set(["545364944258990091", "840710376831057920"]);

const file = readFileSync("./files/parse.txt").toString();

const regex = /\d{17,20}/gi;
let match;

const results = [];
const reason = process.argv.slice(2).join(" ");
while ((match = regex.exec(file)) !== null) {
  results.push(match[0]);
}

const unique = [...new Set(results)];
const chunks = [];
const chunk = [];

for (const id of unique) {
  if (safe.has(id)) {
    continue;
  }

  const newLength = COMMAND.length + chunk.length * 21 + reason.length;
  if (newLength > 4000) {
    chunks.push([...chunk]);
    chunk.length = 0;
  }
  chunk.push(id);
}
if (chunk.length) {
  chunks.push(chunk);
}

for (const chunk of chunks) {
  const chunkFinal = `${COMMAND} ${chunk.join(" ")} ${reason}\r\n`;
  appendFile("./files/chunks.txt", chunkFinal, (err) => {});
  appendFile("./files/ids.txt", chunk.join("\r\n"), () => {});
}

console.log(
  `Parsed ${unique.length} unique id${unique.length === 1 ? "" : "s"} into ${
    chunks.length
  } ban command chunk${chunks.length === 1 ? "" : "s"}`
);
console.log(
  `Chunk${chunks.length === 1 ? "" : "s"} can be found in ./files/chunks.txt`
);
