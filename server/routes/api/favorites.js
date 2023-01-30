const express = require("express");

const Favorites = require("../../database/models/favorites");

const router = express.Router();

router.post("/favoritesInfos", (req, res) => {
  const post = new Favorites(req.body);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.post("", (req, res) => {
  Favorites.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: favorites,
    });
  });
});

router.post('/removeFromFavorites', (req, res) => {
  Favorites.findOneAndDelete({
    id: req.body.id,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;