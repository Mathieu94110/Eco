const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  author: { type: String, required: true },
  image: { type: String, data: Buffer },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
