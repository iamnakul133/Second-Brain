const pool = require("../config/database/dbConfig");

class post {
  constructor(id, title, content, discription, user_id) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.discription = discription;
    this.user_id = user_id;
  }

  static async getAll() {
    try {
      const query = "SELECT * FROM posts";
      const { rows } = await pool.query(query);

      return rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async getbyUserId(user_id) {
    try {
      const query = "SELECT * FROM posts where user_id = $1";
      const values = [user_id];
      const { rows } = await pool.query(query, values);
      if (rows.length === 0) {
        return null; // post not found
      }
      return rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async getByTitle(title) {
    try {
      const query = "SELECT * FROM posts WHERE title = $1";
      const values = [title];
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        return null; // Post not found
      }
      return row[0];
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async create(title, content, description, user_id) {
    try {
      const query =
        "INSERT INTO posts (title, content, description, user_id) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [title, content, description, user_id];
      const { rows } = await pool.query(query, values);

      return new post(
        rows[0].title,
        rows[0].content,
        rows[0].description,
        rows[0].user_id
      );
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }
}

module.exports = post;
