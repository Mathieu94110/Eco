const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.am1ljpg.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
