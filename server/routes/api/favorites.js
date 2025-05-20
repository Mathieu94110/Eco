const express = require("express");
const Favorites = require("../../database/models/favorites");

const router = express.Router();

router.get("/getFavoredAds/:userId", async (req, res) => {
  try {
    const favorites = await Favorites.find({ userFrom: req.params.userId }).exec();
    res.status(200).json({ success: true, favorites });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.post("/addToFavorites", async (req, res) => {
  try {
    const favorite = new Favorites(req.body);
    await favorite.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.delete("/removeFromFavorites", async (req, res) => {
  try {
    const deleted = await Favorites.findOneAndDelete({
      id: req.body.id,
      userFrom: req.body.userFrom,
    }).exec();

    if (!deleted) {
      return res.status(404).json({ success: false, error: "Favorite not found" });
    }

    res.status(200).json({ success: true, doc: deleted });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;