import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { getTextTopic } from "../service/textAnalysisService.js";
import { getOne, getAll, deleteOne, updateOne } from "./handlersFactory.js"


const postController = {};

const createPost = asyncHandler(async (req, res) => {
     // Generate labels for the post text
     const textToAnalyze = req.body.text;
     const topicData = await getTextTopic(textToAnalyze);
     let labels = {};
     let post = {};

     if (topicData.topics && topicData.topics.length >= 3) {
        labels = topicData.topics.slice(0, 3).map((topic) => ({ label: topic.label }));

        post = await Post.create({
            user: req.body.user,
            text: req.body.text,
            labels: labels,
        });
     } else {
        post = await Post.create({
            user: req.body.user,
            text: req.body.text
        });
     }

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

const allPosts = getAll(Post);
const getOnePost = getOne(Post);
const deleteOnePost = deleteOne(Post);
const updateOnePost = updateOne(Post);


postController.createPost = createPost;
postController.allPosts = allPosts;
postController.getOnePost = getOnePost;
postController.deleteOnePost = deleteOnePost;
postController.updateOnePost = updateOnePost;

export default postController;
