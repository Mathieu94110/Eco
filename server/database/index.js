const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://gt-one:nwKnkVsX0wzb8TAc@cluster0.1j8rd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });