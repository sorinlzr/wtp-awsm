import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './routes/postRoute.js';
import { readFile } from 'fs';
import { join } from 'path';
import { connectToDatabase } from './config/dbconnection.js';

dotenv.config({ path: '../.env' })
const port = `${process.env.APP_BACKEND_PORT}`;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use("/api/posts", postRouter);

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

async function main() {
    connectToDatabase();
}

main();
