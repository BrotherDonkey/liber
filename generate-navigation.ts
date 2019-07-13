import fs from 'fs';

fs.readdir('./', (err, files) => {
    files.forEach(file => {
        console.log('file');
    });
});