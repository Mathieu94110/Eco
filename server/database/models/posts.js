const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const postSchema = mongoose.Schema({
  userFrom: {
    type: mongooseSchema.Types.ObjectId,
    ref: 'User',
  },
  image: { type: String, data: Buffer },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
