const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const favoritesSchema = mongoose.Schema({
  userFrom: {
    type: mongooseSchema.Types.ObjectId,
    ref: "User",
  },
  id: { type: Number, required: true },
  added: { type: Number, required: true },
  added_by_status: { type: Object, required: true },
  background_image: { type: String, required: true },
  clip: { type: String | Array, required: false },
  dominant_color: { type: String, required: true },
  esrb_rating: { type: Object, required: true },
  genres: { type: Array, required: true },
  metacritic: { type: Number, required: true },
  name: { type: String, required: true },
  parent_platforms: { type: Array, required: true },
  platforms: { type: Array, required: true },
  playtime: { type: Number, required: true },
  rating: { type: Number, required: true },
  rating_top: { type: Number, required: true },
  ratings: { type: Array, required: true },
  ratings_count: { type: Number, required: true },
  released: { type: String, required: true },
  reviews_text_count: { type: Number, required: true },
  reviews_count: { type: Number, required: true },
  saturated_color: { type: String, required: true },
  short_screenshots: { type: Array, required: false },
  slug: { type: String, required: true },
  stores: { type: Array, required: true },
  suggestions_count: { type: Number, required: true },
  tags: { type: Array, required: true },
  tba: { type: Boolean, required: true },
  updated: { type: String, required: true },
  user_game: { type: String | Array, required: false },
});

module.exports = mongoose.model("Favorites", favoritesSchema);
