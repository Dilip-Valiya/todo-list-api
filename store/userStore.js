const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'todo_list',
  password: 'password',
  port: 5432,
});

class UserStore {
  async getUsers() {
    try {
      const { rows } = await pool.query('SELECT id, name, email, createdAt, updatedAt FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addUser(name, email) {
    try {
      if (!name || !email) {
        throw new Error('Name and email are required fields');
      }

      const now = new Date();
      const { rows } = await pool.query(
        'INSERT INTO users (name, email, createdAt, updatedAt) VALUES ($1, $2, $3, $3) RETURNING id, name, email, createdAt, updatedAt',
        [name, email, now]
      );

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserStore();
