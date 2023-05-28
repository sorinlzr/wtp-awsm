import express from 'express';
import postController from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post(
    "/",
    postController.createPost
);

postRouter.get(
    "/",
    postController.allPosts
);

export default postRouter;
