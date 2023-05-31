const pool = require("../config/database/dbConfig");

class User {
  static async getById(id) {
    //fetch user by id
    try {
      const query = "SELECT * FROM users WHERE id =$1";
      const values = [id];
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) {
        return null; // User not found
      }

      return rows[0];
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async getByUsername(username) {
    // Implementation for fetching a user by their username
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const values = [username];
      const { rows } = await pool.query(query, values);

      return rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async create(username, password) {
    // Implementation for creating a new user
    try {
      const query =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";
      const values = [username, password];
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }
}

// Other methods as per your requirements

module.exports = User;
