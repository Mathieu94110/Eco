const router = require('express').Router();
const userRoutes = require("./user");
const postsRoutes = require("./posts");
const favoritesRoutes = require("./favorites");


router.use("/user", userRoutes);
router.use("/posts", postsRoutes);
router.use("/favorites", favoritesRoutes);
module.exports = router;
