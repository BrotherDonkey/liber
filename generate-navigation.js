//@ts-check
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const readddirAsync = promisify(fs.readdir);
const presentationStructure = {
    presentation: []
}
const htmlRegex = /\.html$/i;
const titleRegex = /\<title\>(.*)\<\/title\>/gi;

async function generateNavigation() {
    const files = await readddirAsync('./');
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
        let matches = [];
        let title = 'No title in html';
        while ((matches = titleRegex.exec(fileString)) !== null && matches.length < 1) {
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

    fs.writeFile('./presentation.json', JSON.stringify(presentationJSON), () => { });
}

generateNavigation()