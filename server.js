// ------------------------------------------------
// node
// ------------------------------------------------

/*
const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        const htmlFile = 'index.html';
        fs.stat(`./${htmlFile}`, (err, stats) => {
            if(stats) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(htmlFile).pipe(res);
            }
        });
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


*/


// ------------------------------------------------
// express
// ------------------------------------------------

const express = require('express');
const app = express();
const port = 5000;

app.get('/', function (req, res) {
    res.sendFile('src/html/index.html', {root: __dirname});
  })

  app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
}); 


