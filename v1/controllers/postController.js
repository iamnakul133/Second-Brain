const User = require("../../models/user");
const Post = require("../../models/post");
const pool = require("../../config/database/dbConfig");

exports.getUserPosts = async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    // Check if the user exists
    const user = await User.getById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Retrieve posts for the user
    const posts = await Post.getbyUserId(user_id);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.searchbytitle = async (req, res, next) => {
  try {
    const { user_id, title } = req.query;
    console.log(user_id, title);

    const user = await User.getById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not fount" });
    }

    const posts = await Post.getByTitle(user_id, title);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.searchbytag = async (req, res, next) => {
  try {
    const { user_id, tag } = req.query;

    const user = await User.getById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not fount" });
    }

    const posts = await Post.getByTag(user_id, tag);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
