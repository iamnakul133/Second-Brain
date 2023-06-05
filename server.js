const path = require("path");
const app = require("./index");
const pool = require("./config/database/dbConfig");
const User = require("./models/user");
const Post = require("./models/post");
const port = process.env.PORT;

pool.query("SELECT * FROM users", (error, results) => {
  if (error) {
    console.error("Error executing query", error);
    return;
  }

  console.log("Query results:", results.rows);
});

pool.query("SELECT * from posts", (err, results) => {
  if (err) {
    console.error("Error executing query", err);
    return;
  }
  console.log("Query results:", results.rows);
});

app.listen(port, () => {
  console.log("listening on port " + 2000);
});
