import express from 'express';
import { readFile } from 'fs';
import { join } from 'path';
import { connectToDatabase } from './dbconnection.js';

const app = express();
const port = 5000;

app.get('/', function (req, res) {

    const filePath = join(__dirname, 'json/greeting.json');
    readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(JSON.parse(data));
        }
    });

})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

connectToDatabase();
