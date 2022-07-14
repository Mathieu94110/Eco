const express = require("express");

const Post = require("../models/posts");

const router = express.Router();

router.post("/postInfos", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    details: req.body.details,
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
