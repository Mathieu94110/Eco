const mongoose = require("mongoose");
const { Schema } = mongoose;

const favoritesSchema = new Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: { type: Number, required: true },
  added: { type: Number, required: true },
  added_by_status: { type: Schema.Types.Mixed, required: true },
  background_image: { type: String, required: true },
  clip: { type: Schema.Types.Mixed },
  dominant_color: { type: String, required: true },
  esrb_rating: { type: Schema.Types.Mixed, required: true },
  genres: [{ type: Schema.Types.Mixed, required: true }],
  metacritic: { type: Number, required: true },
  name: { type: String, required: true },
  parent_platforms: [{ type: Schema.Types.Mixed, required: true }],
  platforms: [{ type: Schema.Types.Mixed, required: true }],
  playtime: { type: Number, required: true },
  rating: { type: Number, required: true },
  rating_top: { type: Number, required: true },
  ratings: [{ type: Schema.Types.Mixed, required: true }],
  ratings_count: { type: Number, required: true },
  released: { type: String, required: true },
  reviews_text_count: { type: Number, required: true },
  reviews_count: { type: Number, required: true },
  saturated_color: { type: String, required: true },
  short_screenshots: [{ type: Schema.Types.Mixed }],
  slug: { type: String, required: true },
  stores: [{ type: Schema.Types.Mixed, required: true }],
  suggestions_count: { type: Number, required: true },
  tags: [{ type: Schema.Types.Mixed, required: true }],
  tba: { type: Boolean, required: true },
  updated: { type: String, required: true },
  user_game: { type: Schema.Types.Mixed },
});

module.exports = mongoose.model("Favorites", favoritesSchema);
