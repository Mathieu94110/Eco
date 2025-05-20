const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { key, keyPub } = require("../../env/keys");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(409).json({ success: false, error: "Adresse mail déjà utilisée" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, error: "Erreur lors de l'inscription" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, error: "Identifiants incorrects" });
    }

    const token = jwt.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: "180d",
      algorithm: "RS256",
    });

    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Erreur serveur lors de la connexion" });
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, error: "Non authentifié" });
  }

  try {
    const decoded = jwt.verify(token, keyPub);
    const currentUser = await User.findById(decoded.sub).select("-password -__v").exec();

    res.status(200).json({ success: true, user: currentUser || null });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ success: false, error: "Token invalide" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v").exec();
    if (!user) {
      return res.status(404).json({ success: false, error: "Utilisateur non trouvé" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true });
});

module.exports = router;
