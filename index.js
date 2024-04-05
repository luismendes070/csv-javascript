// ChatGPT
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
const filename = 'teste.csv';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Erro ao ler o arquivo CSV');
                return;
            }

            const lines = data.trim().split('\n');
            let row = 1;
            let responseBody = '';

            lines.forEach(line => {
                const fields = line.split(',');
                const num = fields.length;

                responseBody += `<p>${num} campos na linha ${row}:</p>`;

                fields.forEach(field => {
                    responseBody += `${field}<br>`;
                });

                row++;
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Leitor CSV</title>
                </head>
                <body>
                    <h1>Leitor de Arquivo CSV</h1>
                    <div id="output">
                        ${responseBody}
                    </div>
                </body>
                </html>
            `);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Página não encontrada');
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
