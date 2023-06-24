import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import jwt from 'jsonwebtoken';

// create a new jwt token
export const createSecretToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            // is the value is a string, it will be interpreted in milliseconds. If the value is a number, it will be interpreted in seconds
            expiresIn: process.env.JWT_MAX_AGE * 1
        }
    );
}
