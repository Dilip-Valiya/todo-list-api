const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'todo_list',
    password: 'password',
    port: 5432,
});

class TaskStore {
    async getTasks() {
        try {
            const { rows } = await pool.query('SELECT id, title, description, user_id, createdAt, updatedAt FROM tasks');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async addTask(title, description, user_id) {
        try {
            if (!title || !user_id) {
                throw new Error('title and user_id are required fields');
            }

            try {
                await pool.query('SELECT id, name FROM users WHERE id = $1', [user_id]);
            } catch (error) {
                throw new Error('No user Found with given user_id');
            }

            const now = new Date();
            const { rows } = await pool.query(
                'INSERT INTO tasks (title, description, user_id, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $4) RETURNING id, title, description, user_id, createdAt, updatedAt',
                [title, description, user_id, now]
            );

            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TaskStore();
