import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler"

const postController = {};

const createPost = asyncHandler(async (req, res) => {
    // Create The Post
    // TODO uncomment the following line after implementing session management to retrieve the user data
    // req.body.user = req.user._id;
    const post = await Post.create(req.body);

    // Associate user to post
    await User.findByIdAndUpdate(
        req.body.user,
        {
            $addToSet: { posts: post._id },
        },
        { new: true }
    );

    res.status(201).send({ data: post });
});

const allPosts = asyncHandler(async (req, res) => {
    const post = await Post.find().populate("author");

    const posts = post.filter((item) => {
        return !item.author.blocked.includes(req.user._id);
    });

    res.status(200).json({ size: posts.length, data: posts });
});

postController.createPost = createPost;
postController.allPosts = allPosts;

export default postController;
