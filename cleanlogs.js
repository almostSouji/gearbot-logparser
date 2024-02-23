const { readFileSync, appendFile } = require("node:fs");

const FORMAT = "{author.tag}: {content}";

const file = readFileSync("./files/parse.txt").toString();
const messages = file.split(" | \n");
const out = [];

for (const message of messages) {
  if (!message.length) continue;
  const parts = message.split(" | ");
  const [header, author, content, replyparts] = parts;
  const [tag, id] = author.split(/ \(|\)/);
  const reply = replyparts?.split("reply to ")?.[1];
  const [head, channelId, messageId] = header.split(" - ");
  const [time, guildId] = head.split(" ");

  out.push(
    FORMAT.replaceAll("{time}", time)
      .replaceAll("{guild}", guildId)
      .replaceAll("{channel}", channelId)
      .replaceAll("{message}", messageId)
      .replaceAll("{author}", author)
      .replaceAll("{author.tag}", tag)
      .replaceAll("{author.id}", id)
      .replaceAll("{content}", content)
      .replaceAll("{reply}", reply)
  );
}

for (const message of out.map((line) => `${line}\r\n`)) {
  appendFile("./files/cleanlog.txt", message, () => {});
}

console.log(
  `Formatted messages can be found in ./files/cleanlogs.txt.\nUsed format: ${FORMAT}`
);
