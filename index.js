// ChatGPT
const fs = require('fs');

const filename = 'teste.csv';

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        console.error(`Erro ao ler o arquivo ${filename}: ${err}`);
        return;
    }

    const lines = data.trim().split('\n');
    let row = 1;

    lines.forEach(line => {
        const fields = line.split(',');
        const num = fields.length;

        console.log(`<p>${num} campos na linha ${row}:</p>`);
        
        fields.forEach(field => {
            console.log(`${field}<br />`);
        });

        row++;
    });
});
