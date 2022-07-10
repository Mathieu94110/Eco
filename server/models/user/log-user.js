const mongoose = require("mongoose");

const userLoginSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UserLogin", userLoginSchema);