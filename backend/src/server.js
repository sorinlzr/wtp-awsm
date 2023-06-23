import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; // Import the cookie-parser middleware
import postRouter from './routes/postRoute.js';
import userRouter from './routes/userRoute.js';
import { authRouter } from './routes/authRouter.js';
import translationRouter from './routes/translationRouter.js';
import { connectToDatabase } from './config/dbconnection.js';
import passport from './config/passport.js';
import setupSwagger from './config/swagger.js';
import jwt from 'jsonwebtoken';


dotenv.config({ path: '../.env' })
const port = `${process.env.APP_BACKEND_PORT}`;

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser()); // Use cookie-parser middleware

// Middleware function to validate JWT token
const validateToken = (req, res, next) => {
    // Get the token from the request cookie
    const token = req.cookies.token;

    if (!token) {
        // Token is missing, return unauthorized
        return res.status(401).send('Unauthorized');
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token is invalid or expired
            return res.status(401).send('Unauthorized');
        }

        // Token is valid, proceed to the next middleware
        next();
    });
};

// Apply the validateToken middleware to the home.html route
app.get('/home.html', validateToken, (req, res) => {
    // Set cache control headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    // Serve the home.html file
    res.sendFile(path.join(process.cwd(), '../frontend/src/home.html'));
}); 

app.use(express.static(path.join(process.cwd(), "../frontend/src")));

// Passport middleware
app.use(passport.initialize());

app.use("/api/auth", authRouter);
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
