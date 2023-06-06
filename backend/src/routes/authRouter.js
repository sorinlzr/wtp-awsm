import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import User from "../models/User.js";

export const authRouter = express.Router();

authRouter.post("/", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    // Find user by email
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        console.log("user found");
        console.log(user);
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 86400 // 1 day in seconds
                    },
                    (err, token) => {
                        res.cookie("token", token, { httpOnly: true });
                        // Redirect the user to home.html
                        res.redirect("/home.html");
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});
