import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; // Import the cookie-parser middleware
import homeRouter from './routes/homeRouter.js';
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
import { authRouter } from './routes/authRouter.js';
import translationRouter from './routes/translationRouter.js';
import textAnalysisRouter from './routes/textAnalysisRouter.js';
import { connectToDatabase } from './config/dbconnection.js';
import passport from './config/passport.js';
import setupSwagger from './config/swagger.js';


dotenv.config({ path: '../.env' })
const port = `${process.env.APP_BACKEND_PORT}`;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()); // Use cookie-parser middleware

app.use(express.static(path.join(process.cwd(), "../frontend/src/public")));

// Passport middleware
app.use(passport.initialize());

setupSwagger(app);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/translate", translationRouter);
app.use("/api/analyseText", textAnalysisRouter);
app.use("/", homeRouter);


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

async function main() {
    connectToDatabase();
}

main();
