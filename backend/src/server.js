import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import express from 'express';
import { readFile } from 'fs';
import { join } from 'path';
import { connectToDatabase } from './dbconnection.js';

const app = express();
const port = `${process.env.APP_BACKEND_PORT}`;

app.get('/', function (req, res) {

    const filePath = join(process.cwd(), 'src/json/greeting.json');
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
