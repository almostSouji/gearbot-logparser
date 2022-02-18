const { readFileSync, appendFile } = require('node:fs');

const PREFIX = '!'
const COMMAND = `${PREFIX}mban`
const save = new Set(['545364944258990091'])

const file = readFileSync('./files/parse.txt').toString();

const regex = /\d{17,20}/gi
let match;

const results = [];
const reason = process.argv.slice(2).join(' ');
while ((match = regex.exec(file)) !== null) {
	results.push(match[0])
}

const unique = [...new Set(results)]
const chunks = [];
const chunk = [];

for (const id of unique) {
	if (save.has(id)) {
		continue;
	}

	const newLength = COMMAND.length + (chunk.length * 21) + reason.length
	if (newLength > 4000) {
		chunks.push([...chunk]);
		chunk.length = 0;
	}
	chunk.push(id)
}
if (chunk.length) {
	chunks.push(chunk);
}

for (const chunk of chunks) {
	const chunkFinal = `${COMMAND} ${chunk.join(' ')} ${reason}\r\n`
	appendFile('./files/chunks.txt', chunkFinal, err => { });
}

console.log('Done!')
