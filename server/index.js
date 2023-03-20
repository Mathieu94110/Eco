const express = require("express");
const cookie = require("cookie-parser");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();

require("./database");

app.use(cookie());
app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});

const port = process.env.PORT || "80";
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
