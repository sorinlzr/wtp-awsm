import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { getTextTopic } from "../service/textAnalysisService.js";


const postController = {};

const createPost = asyncHandler(async (req, res) => {
     // Generate labels for the post text
     const textToAnalyze = req.body.text;
     const topicData = await getTextTopic(textToAnalyze);
     const labels = topicData.topics.slice(0, 3).map((topic) => ({ label: topic.label }));

    // Create The Post
    const post = await Post.create({
        user: req.body.user,
        text: req.body.text,
        labels: labels,
    });

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
