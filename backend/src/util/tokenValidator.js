import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
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