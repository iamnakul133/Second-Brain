const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

router.get("/all", postController.getUserPosts);
router.get("/search/title", postController.searchbytitle);
router.get("/search/tags", postController.searchbytag);
module.exports = router;
