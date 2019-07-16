import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { htmlRegex } from './generate-navigation';

const readdirAsync = promisify(fs.readdir);

async function createFilesFromTemplate() {

    const files = await readdirAsync(path.join(__dirname + '/../slides'));
    const htmlfiles = []
    for (const file of files) {
        if (htmlRegex.test(file)) {
            htmlfiles.push(file);
        }
    }
    const numberOfCurrentFiles = htmlfiles.length;

    const [, , fileType, amount] = process.argv;

    let parsedAmount = 1;
    try {
        if (amount) {
            parsedAmount = parseInt(amount);
        }
    } catch (e) {
        console.log('Problem conversing your second argument into a number, creating only one file');
    }

    const filesI = numberOfCurrentFiles + 1;
    const srcDir = path.join(__dirname, `../templates/${fileType}.html`);
    const destTemplate = (i: number, templateType: string) => path.join(__dirname, `../slides/${filesI + i}.html`);


    if (fileType !== 'code' && fileType !== 'headline' && fileType !== 'image') {
        console.warn(`Your first argument does not match any known file types. Modify new-slide.ts and add a new template type to remove this warning.`)
        console.log('No files created');
    } else {
        for (let i = 0; i < parsedAmount; i++) {
            fs.copyFile(srcDir, destTemplate(i, fileType), (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Created file: slides/${i + filesI}.html (${fileType})`);
            });
        }
    }

}

createFilesFromTemplate();