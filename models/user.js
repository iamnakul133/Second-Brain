const express = require("express");
const pool = require("../config/database/dbConfig");
const { v4: uuidv4 } = require("uuid");

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

  static async getByemail(email) {
    // Implementation for fetching a user by their email address
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const { rows } = await pool.query(query, values);

      return rows;
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async create(email, password) {
    // Implementation for creating a new user
    try {
      const id = uuidv4();
      const query =
        "INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *";
      const values = [id, email, password];
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }

  static async creategoogle(id, email, password, displayName, profile_photo) {
    // Implementation for creating a new user
    try {
      const query =
        "INSERT INTO users (id, email, password, displayName, profile_photo) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [id, email, password, displayName, profile_photo];
      const { rows } = await pool.query(query, values);

      return rows[0];
    } catch (error) {
      console.error("Error executing query", error);
      throw error;
    }
  }
}

module.exports = User;
