const express = require("express");
const Post = require("../../database/models/posts");
const router = express.Router();

router.post("/postInfos", (req, res) => {
  const post = new Post({
    ...req.body,
    created_at: new Date(),
  });

  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.post("", (req, res) => {
  Post.find({ userFrom: req.body.userFrom }).exec((err, posts) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts,
    });
  });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/removeAd", (req, res) => {
  Post.findOneAndDelete({
    _id: req.body._id,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

router.put("/:id", (req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
