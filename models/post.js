const pool = require("../config/database/dbConfig");

class post {
  static async getbyUserId(user_id) {
    try {
      const query =
        "SELECT p.*,array_agg(t.Name) AS tags FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN post_tag pt ON p.id = pt.post_id LEFT JOIN tags t ON pt.id = t.id WHERE u.id = $1 GROUP BY p.id, p.title;";
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

  static async getByTitle(user_id, title) {
    try {
      const query =
        "SELECT p.*,array_agg(t.Name) AS tags FROM users u INNER JOIN posts p ON u.id = p.user_id LEFT JOIN post_tag pt ON p.id = pt.post_id LEFT JOIN tags t ON pt.id = t.id WHERE u.id = $1 AND p.title LIKE '%' || $2 || '%' GROUP BY p.id, p.title;";
      const values = [user_id, title];
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        return null; // Post not found
      }
      return rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async getByTag(user_id, tag) {
    try {
      console.log(user_id, tag);
      const query =
        "SELECT p.*, array_agg(t.Name) AS tags FROM users u INNER JOIN posts p ON u.id = p.user_id INNER JOIN post_tag pt ON p.id = pt.post_id INNER JOIN tags t ON pt.tag_id = t.id WHERE u.id = $1 AND p.id IN ( SELECT p.id FROM posts p INNER JOIN post_tag pt ON p.id = pt.post_id INNER JOIN tags t ON pt.tag_id = t.id WHERE t.Name = $2 ) GROUP BY p.id, p.title;";
      const values = [user_id, tag];
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        return null; // Post not found
      }
      return rows;
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
