const express = require("express");

const Favorites = require("../../database/models/favorites");

const router = express.Router();

router.get("/getFavoredAdds/:userInfos", (req, res) => {
  let { userInfos } = req.params;
  Favorites.find({ userFrom: userInfos }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/addToFavorites", (req, res) => {
  const favorite = new Favorites(req.body);
  favorite.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.delete("/removeFromFavorites", (req, res) => {
  Favorites.findOneAndDelete({
    id: req.body.id,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
