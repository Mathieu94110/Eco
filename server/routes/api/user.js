const User = require("../../database/models/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../env/keys");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) {
    const user = new User({
      ...req.body,
      password: await bcrypt.hash(password, 8),
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400);
      }
    } else {
      res.status(400);
    }
  } catch (e) {
    console.log(e);
    res.status(400);
  }
});
router.get("/current", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      const currentUser = await User.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();
      if (currentUser) {
        return res.json(currentUser);
      } else {
        return res.json(null);
      }
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  } else {
    return res.json(null);
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
router.delete("/", async (req, res) => {
  res.clearCookie("token");
  res.end();
});
module.exports = router;
