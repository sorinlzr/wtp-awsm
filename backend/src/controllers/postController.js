import Post from "../models/Post.js";

const postController = {};

const createPost = (req, res) => {
    console.log("req.body");
    console.log(req.body);
    // Create The Post
    // req.body.author = req.user._id;
    Post.create(req.body)
        .then(post => {
            res.status(201).send({ data: post });
        })
        .catch(err => {
            console.log("Some bullshit error happened: " + err);
            res.status(500).send({ error: "Internal server error" });
        });

    // Associate user to post
    // await User.findByIdAndUpdate(
    //   req.user._id,
    //   {
    //     $addToSet: { posts: post._id },
    //   },
    //   { new: true }
    // );

    // res.status(201).send({ data: post });
};

const allPosts = (req, res) => {
    // const post = await Post.find().populate("author");
    console.log("in the all posts function");
    console.log(req.body);
    Post.find()
        .then(posts => {
            res.status(200).json({ size: posts.length, data: posts });
        })
        .catch(err => {
            res.status(500).send({ error: "Internal server error" });
        });

    // const posts = post.filter((item) => {
    //     return !item.author.blocked.includes(req.user._id);
    // });
};

postController.createPost = createPost;
postController.allPosts = allPosts;

export default postController;
