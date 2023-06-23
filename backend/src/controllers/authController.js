import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import bcrypt from 'bcrypt';
import asyncHandler from "express-async-handler"
import User from "../models/User.js";
import { createSecretToken } from '../util/secretToken.js';

import jwt from 'jsonwebtoken';

export const login = asyncHandler(async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.json({ message: 'All fields are required' })
        }

        // Find user by email
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "Username not found" });
        }
        console.log("user found");

        // Check password
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: 'Incorrect password or email' })
        }

        console.log("Matching password");

        // User matched
        // Create JWT Payload
        const payload = {
            id: user.id,
            name: user.name
        };

        // Sign token
        const token = createSecretToken(payload);

        console.log("created token");

        // set token and redirect to home page
        res.
            status(201)
            .cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
                maxAge: process.env.JWT_MAX_AGE * 1000
            })
            .json({ data: user });


    } catch (error) {
        console.log("Error during login");
        console.error(error);
    }
});

export const logout = asyncHandler(async (req, res, next) => {
    try {
      // Clear the token cookie
      res.clearCookie('token');

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.log("Error during logout");
      console.error(error);
    }
  });

export const isAuth = (req, res, next) => {
    // Create JWT payload
    const payload = {
        id: req.user.id,
        name: req.user.name
    };

    // Sign the token with an expired expiration time (0 seconds)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 0 // Set the expiration time to 0 to indicate an expired token
    });

    // Set the token as a cookie in the response
    res.cookie('token', token, {
        httpOnly: true,
    });

    next();
};



