const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema({
  id: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true },
  images: [String],
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model("Favorites", favoritesSchema);
