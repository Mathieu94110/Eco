const express = require("express");

const Favorites = require("../models/favorites");

const router = express.Router();

router.post("/favoritesInfos", (req, res, next) => {
  const post = new Favorites({
    id: req.body.id,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    discountPercentage: req.body.discountPercentage,
    images: req.body.images,
    price: req.body.price,
    rating: req.body.rating,
    stock: req.body.stock,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
  });

  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.get("", (req, res, next) => {
  Favorites.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Favorites.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.n > 0) {
      res.status(200).json({ message: "Deletion successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

module.exports = router;
