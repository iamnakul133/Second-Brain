const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/constants/corsOpt");
const session = require("express-session");
const helmet = require("helmet");
const routeMap = require("./v1/route.map");
const app = express();
const passport = require("passport");
const passportConfig = require("./services/auth/passport.config");

// setup middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// session middleware setup
app.use(
  session({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false,
  })
);
passportConfig(passport);
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use("/v1", routeMap);

module.exports = app;
