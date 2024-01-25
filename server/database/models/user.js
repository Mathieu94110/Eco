const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pseudo: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    image: { type: String, data: Buffer },
    phone: { type: Number },
    address: { type: String },
    zip: { type: Number },
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
