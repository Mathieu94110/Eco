const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user.js");
const router = express.Router();
const { key, keyPub } = require("../../env/keys");

router.post("/signup", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email }).exec();
  if (!user) {
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(body.password, 8),
    });
    try {
      await user.save();
      res.json({
        status: 201,
      });
    } catch (err) {
      res.status(400).json("Erreur lors de l'inscription");
    }
  } else {
    res.json({ error: "Adresse mail déjà utilisée" });
  }
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email }).exec();
  if (user) {
    if (bcrypt.compareSync(body.password, user.password)) {
      const token = jwt.sign({}, key, {
        subject: user._id.toString(),
        expiresIn: 60 * 60 * 24 * 30 * 6,
        algorithm: "RS256",
      });
      res.cookie("token", token);
      res.json(user);
    } else {
      res.status(400).json({ message: "Email or password is invalid" });
    }
  } else {
    res.status(400).json({ message: "Email or password is invalid" });
  }
});

router.get("/current", async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const user = await UserModel.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();
      if (user) {
        res.json(user);
      } else {
        res.json(null);
      }
    } catch (e) {
      res.json(null);
    }
  } else {
    res.json(null);
  }
});

router.get("/:id", (req, res) => {
  return User.findById(req.params.id)
    .then((result) => {
      res.status(201).json({
        message: "User infos!",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.put("/:id", (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body).then((result) => {
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  });
});

router.delete("/", async (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
