import express from 'express';
import path from 'path';
import { validateToken } from "../util/tokenValidator.js";

const homeRouter = express.Router();
const frontendSrc = '../frontend/src';

homeRouter.get(
    "/",
    (req, res) => {
        res.sendFile(path.join(__dirname, frontendSrc, '/index.html'));
    }
);

homeRouter.get(
    "/login",
    (req, res) => {
        res.sendFile(path.join(process.cwd(), frontendSrc, '/login.html'));
    }
);

homeRouter.get(
    "/register",
    (req, res) => {
        res.sendFile(path.join(process.cwd(), frontendSrc, '/register.html'));
    }
);


homeRouter.get(
    "/home",
    validateToken,
    (req, res) => {
        res.sendFile(path.join(process.cwd(), frontendSrc, '/home.html'));
    }
);

homeRouter.get(
    "/feed",
    validateToken,
    (req, res) => {
        res.sendFile(path.join(process.cwd(), frontendSrc, '/userFeed.html'));
    }
);
homeRouter.get("*", (req, res) => {
    res.status(404).sendFile(path.join(process.cwd(), frontendSrc, '/error.html'));
  });
  
export default homeRouter;
