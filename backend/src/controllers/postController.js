import Post from "../models/Post.js";

const postController = {};

const createPost = (req, res) => {
    Post.create(req.body)
        .then(post => {
            res.status(201).send({ data: post });
        })
        .catch(err => {
            console.log("Some bullshit error happened: " + err);
            res.status(500).send({ error: "Internal server error" });
        });
};

const allPosts = (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json({ size: posts.length, data: posts });
        })
        .catch(err => {
            res.status(500).send({ error: "Internal server error" });
        });
};

postController.createPost = createPost;
postController.allPosts = allPosts;

export default postController;
