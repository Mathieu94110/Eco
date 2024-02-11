const router = require("express").Router();
const userRoutes = require("./user");
const favoritesRoutes = require("./favorites");

router.use("/user", userRoutes);
router.use("/favorites", favoritesRoutes);
module.exports = router;
