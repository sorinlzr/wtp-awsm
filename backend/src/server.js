import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
import translationRouter from './routes/translationRouter.js';
import { readFile } from 'fs';
import { join } from 'path';
import { connectToDatabase } from './config/dbconnection.js';
import setupSwagger from './config/swagger.js';

dotenv.config({ path: '../.env' })
const port = `${process.env.APP_BACKEND_PORT}`;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/translate", translationRouter);

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

setupSwagger(app);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

async function main() {
    connectToDatabase();
}

main();
