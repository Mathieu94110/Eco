const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    pseudo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, data: Buffer },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    zip: { type: Number, required: true },
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
