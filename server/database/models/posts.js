const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
