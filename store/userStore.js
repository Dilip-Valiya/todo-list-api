const { Pool } = require("pg");

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "todo_list",
  password: "password",
  port: 5432,
});

class UserStore {
  async checkUserByEmail(email) {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const { rows } = await pool.query(
        "SELECT id, name, email, createdAt, updatedAt FROM users"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      const { rows } = await pool.query(
        "SELECT id, name, email, createdAt, updatedAt FROM users WHERE id=$1",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async addUser(name, email, now) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (name, email, createdAt, updatedAt) VALUES ($1, $2, $3, $3) RETURNING id, name, email, createdAt, updatedAt",
        [name, email, now]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async editUser(name, email, id) {
    try {
      if (!Number(id)) {
        throw new Error("Id is not valid");
      }

      if (!name || !email) {
        throw new Error("Name and email are required fields");
      }

      const now = new Date();
      const { rows } = await pool.query(
        "UPDATE users SET name = $1, email = $2, updatedAt = $3 WHERE id = $4 RETURNING id, name, email, createdAt, updatedAt",
        [name, email, now, id]
      );

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserStore();
