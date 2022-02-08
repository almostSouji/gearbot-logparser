const { unlink, writeFile } = require('node:fs');

const cb = () => { }

const files = ["chunks", "parse", "roleremove", "rename", "join"]

for (const file of files) {
	unlink(`./files/${file}.txt`, cb);
}

writeFile('./files/parse.txt', '', undefined, cb);