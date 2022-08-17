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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.put("/:id", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, req.body).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
