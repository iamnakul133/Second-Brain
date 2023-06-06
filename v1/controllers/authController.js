const User = require("../../models/user");
const passportConfig = require("../../services/auth/passport.config");
const passport = require("passport");
const CatchAsync = require("../../utils/CatchAsync");

// Handle local sign-up
exports.localSignup = (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.json({ success: true, user });
    });
  })(req, res, next);
};

// Handle local sign-in
exports.localSignin = (req, res, next) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.json({ success: true, user });
    });
  })(req, res, next);
};

//Handle Google authentication
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Handle Google authentication callback
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.json({ success: true, user, redirectUrl: "/dashboard" });
    });
  })(req, res, next);
};
