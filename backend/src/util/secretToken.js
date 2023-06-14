import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import jwt from 'jsonwebtoken';

// create a new jwt token
export const createSecretToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: 24 * 60 * 60, // 1 day in seconds
        }
    );
}