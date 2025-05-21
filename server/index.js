const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");

app.use(cookie());
app.use(express.json());

app.use(cors());

const connectDB = require("./database");
connectDB();
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json("Bonjour toi !");
});
app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});
app.listen(3000);

module.exports = app;
