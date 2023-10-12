const taskStore = require("../store/taskStore");
const userStore = require("../store/userStore");

class TaskService {
  async getTasks() {
    try {
      const rows = await taskStore.getTasks();
      return { data: rows, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async getTask(id) {
    try {
      if (!(Number(id) > 0)) {
        return { error: `Invalid id ${id}`, status: 400 };
      }
      const row = await taskStore.getTask(id);
      if (!row) return { error: `No task found with id ${id}`, status: 404 };
      return { data: row, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async addTask(title, description, user_id) {
    try {
      if (!title || !description) {
        return {
          error: "title and description are required fields",
          status: 400,
        };
      }
      if (!(Number(user_id) > 0)) {
        return { error: `Invalid user id ${user_id}`, status: 400 };
      }
      const user = userStore.getUser(user_id);
      if (!user) {
        return { error: `user with user_id ${user_id} not fount`, status: 404 };
      }
      const now = new Date();
      const row = await taskStore.addTask(title, description, user_id, now);
      return { data: row, status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async editTask(title, description, id) {
    try {
      if (!title || !description) {
        return {
          error: "title and description are required fields",
          status: 400,
        };
      }
      if (!(Number(id) > 0)) {
        return { error: `Invalid id ${user_id}`, status: 400 };
      }
      const now = new Date();
      const row = await taskStore.editTask(title, description, id, now);
      if (!row) return { error: `No task found with id ${id}`, status: 404 };
      return { data: row, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }
}

module.exports = new TaskService();
