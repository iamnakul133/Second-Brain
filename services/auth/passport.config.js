const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../../config/database/dbConfig");
const User = require("../../models/user");
const { encryptPassword, comparePassword } = require("./encryption"); // File containing encryption logic
require("dotenv").config();

// Local strategy for sign-in
passport.use(
  "local-signin",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const query = {
          text: "SELECT * FROM users WHERE email = $1",
          values: [email],
        };

        const result = await pool.query(query);
        const user = result.rows[0];

        // If user not found or password does not match, return error
        if (!user || !(await comparePassword(password, user.password))) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Return the user object if authentication succeeds
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Local strategy for sign-up
passport.use(
  "local-signup",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Check if the email is already registered
        const query = {
          text: "SELECT * FROM users WHERE email = $1",
          values: [email],
        };

        const result = await pool.query(query);
        const existingUser = result.rows[0];

        if (existingUser) {
          return done(null, false, { message: "Email is already registered" });
        }

        const hashedPassword = await encryptPassword(password); // Encrypt the password

        // Create a new user

        const newUser = await User.create(null, email, hashedPassword);

        // Return the newly created user
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google strategy for sign-in and sign-up
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const user = await User.findOne({ id: profile.id });

        // If the user exists, return the user
        if (user) {
          return done(null, user);
        }

        // Create a new user
        const newUser = await User.create(
          profile.id,
          profile.emails[0].value,
          profile.password,
          profile.displayName,
          profile.photos[0].value
        );

        // Return the newly created user
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
