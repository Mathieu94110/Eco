const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  email: { type: String, require: true },
  fistname: { type: String, require: true },
  lastname: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("Login", loginSchema);
