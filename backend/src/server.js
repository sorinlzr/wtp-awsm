import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
import translationRouter from './routes/translationRouter.js';
import { connectToDatabase } from './config/dbconnection.js';
import setupSwagger from './config/swagger.js';

dotenv.config({ path: '../.env' })
const port = `${process.env.APP_BACKEND_PORT}`;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(process.cwd(), "../frontend/src")));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/translate", translationRouter);

setupSwagger(app);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

async function main() {
    connectToDatabase();
}

main();
