const express = require("express");
const router = express.Router();
const userRoutes = require("./routes/user.routes");

const postRoutes = require("./routes/post.routes");

router.use("/user", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;
