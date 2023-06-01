const { Pool } = require("pg");

// Create a new pool instance using your database credentials
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "secondBrain",
  password: "Trivedi@2242000",
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
