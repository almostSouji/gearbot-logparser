const { readFileSync, appendFile } = require("node:fs");

const regexes = [
  {
    reg: /was removed from (.*?#\d{4}) \((\d{17,22})\)/gi,
    file: "roleremove.txt",
    parse: (match) => `${match[1]} (${match[2]})`,
  },
  {
    reg: /\((\d{17,22})\) has changed username from \u200b*(.*?#\d{4})\u200b* to \u200b*(.*?#\d{4})\u200b*/gi,
    file: "rename.txt",
    parse: (match) => `${match[2]} -> ${match[3]} (${match[1]})`,
  },
  {
    reg: /: (.*?#\d{4}) \((\d{17,20})\) has joined/gi,
    file: "join.txt",
    parse: (match) => `${match[1]} (${match[2]})`,
  },
];

const file = readFileSync("./files/parse.txt").toString();
for (const entry of regexes) {
  let match;

  const results = [];
  while ((match = entry.reg.exec(file)) !== null) {
    results.push(entry.parse(match));
  }

  appendFile(`./files/${entry.file}`, results.join("\r\n"), (err) => {});
}

console.log("Overview compiled in ./files/");
