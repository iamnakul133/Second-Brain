const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");

// Google authentication routes
router.get("/auth/google", authController.googleAuth);
router.get("/auth/google/callback", authController.googleAuthCallback);

// Sign-up route
router.post("/signup", authController.localSignup);

// Sign-in route
router.post("/signin", authController.localSignin);

module.exports = router;
