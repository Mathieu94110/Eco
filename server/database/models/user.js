const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: { type: String, required: true },
    pseudo: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String },
    phone: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    address: { type: String },
    zip: {
      type: String,
      match: /^[0-9]{5}$/,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
