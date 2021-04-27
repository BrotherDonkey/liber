//@ts-check
import * as fs from 'fs';
import * as path from 'path';
import { mkdir } from 'shelljs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const readddirAsync = promisify(fs.readdir);
const presentationStructure = {
	presentation: []
};

export const htmlRegex = /\.html$/i;
const titleRegex = /\<title\>(.*)\<\/title\>/gi;

async function generateNavigation() {
	try {
		const files = await readddirAsync(path.join(__dirname + '/../slides'));

		const htmlfiles = [];
		for (const file of files) {
			if (htmlRegex.test(file)) {
				htmlfiles.push(file);
			}
		}
		const sortedHtmlFiles = htmlfiles.sort((a, b) => {
			return parseInt(a.split('.')[0]) > parseInt(b.split('.')[0]) ? 1 : -1;
		});
		const jsonStructure = await Promise.all(
			sortedHtmlFiles.map(async (file, i) => {
				const fileContents = await readFileAsync(path.join(__dirname, `../slides/${file}`));
				const fileString = fileContents.toString();
				let matches: RegExpExecArray | null;
				let title = 'No title in html';
				while ((matches = titleRegex.exec(fileString)) !== null) {
					title = matches[1];
				}
				return {
					title,
					file,
					index: i
				};
			})
		);

		const presentationJSON = {
			slides: jsonStructure.sort((a, b) => {
				return a.file > b.file ? 1 : -1;
			})
		};

		ensureDist();

		fs.writeFile(
			path.join(__dirname + '/../dist/presentation.json'),
			JSON.stringify(presentationJSON),
			() => {}
		);
		fs.writeFile(
			path.join(__dirname + '/../docs/presentation.json'),
			JSON.stringify(presentationJSON),
			() => {}
		);
	} catch (e) {
		throw new Error(e);
	}
}

export function ensureDist() {
	fs.exists(path.join(__dirname, '/../dist'), exists => {
		if (exists) {
			return;
		}
		mkdir(path.join(__dirname, '/../dist'));
	});
	fs.exists(path.join(__dirname, '/../docs'), exists => {
		if (exists) {
			return;
		}
		mkdir(path.join(__dirname, '/../docs'));
	});
}

generateNavigation();
