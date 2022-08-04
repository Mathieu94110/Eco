const express = require("express");

const Post = require("../models/posts");

const router = express.Router();

router.post("/postInfos", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    date: new Date(),
  });

  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

module.exports = router;
