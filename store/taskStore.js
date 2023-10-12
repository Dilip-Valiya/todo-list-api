const { Pool } = require("pg");

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "todo_list",
  password: "password",
  port: 5432,
});

class TaskStore {
  async getTasks() {
    try {
      const { rows } = await pool.query(
        "SELECT id, title, description, user_id, createdAt, updatedAt FROM tasks"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getTask(id) {
    try {
      const { rows } = await pool.query(
        "SELECT id, title, description, user_id, createdAt, updatedAt FROM tasks WHERE id=$1",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async addTask(title, description, user_id, now) {
    try {
      const { rows } = await pool.query(
        "INSERT INTO tasks (title, description, user_id, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $4) RETURNING id, title, description, user_id, createdAt, updatedAt",
        [title, description, user_id, now]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  async editTask(title, description, id, now) {
    try {
      const { rows } = await pool.query(
        "UPDATE tasks SET title = $1, description = $2, updatedAt = $3 WHERE id = $4 RETURNING id, title, description, user_id, createdAt, updatedAt",
        [title, description, now, id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TaskStore();
