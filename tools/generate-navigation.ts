//@ts-check
import * as fs from 'fs';
import { mkdir } from 'shelljs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const readddirAsync = promisify(fs.readdir);
const presentationStructure = {
    presentation: []
}
const htmlRegex = /\.html$/i;
const titleRegex = /\<title\>(.*)\<\/title\>/gi;

async function generateNavigation() {
    const files = await readddirAsync('./slides');
    const htmlfiles = []

    for (const file of files) {
        if (htmlRegex.test(file)) {
            htmlfiles.push(file);
        }
    }

    const sortedHtmlFiles = htmlfiles.sort();

    const jsonStructure = await Promise.all(sortedHtmlFiles.map(async (file, i) => {
        const fileContents = await readFileAsync(file);
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
        }
    }));

    const presentationJSON = {
        slides: jsonStructure
    };

    ensureDist();

    fs.writeFile('./slides/presentation.json', JSON.stringify(presentationJSON), () => { });
    fs.writeFile('./dist/presentation.json', JSON.stringify(presentationJSON), () => { });
}

function ensureDist() {
    fs.exists('./dist', exists => {
        if (exists) {
            return;
        }
        mkdir('./dist');
    })
}

generateNavigation()