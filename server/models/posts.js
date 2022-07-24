const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  image: { type: String, data: Buffer },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Post", postSchema);
