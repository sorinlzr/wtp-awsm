import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from 'express';
import { login, logout } from '../controllers/authController.js';

export const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
