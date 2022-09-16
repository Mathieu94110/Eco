const express = require("express");
const path = require("path");
const port = process.env.PORT ?? "3000";
const { MongoClient } = require("mongodb");

const client = new MongoClient(
  "mongodb+srv://gt-one:nwKnkVsX0wzb8TAc@cluster0.1j8rd.mongodb.net/?retryWrites=true&w=majority"
);
client
  .connect()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.static("../app/ecommerce/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/ecommerce/dist/index.html"));
});

app.listen(port);
