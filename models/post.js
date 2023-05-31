const pool = require("../config/database/dbConfig");

class post {
  constructor(id, title, content, userId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
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

  static async getById(id) {
    try {
      const query = "SELECT * FROM posts WHERE id = $1";
      const values = [id];
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
}
