const taskStore = require('../store/taskStore');

class TaskService {
  async getTasks() {
    try {
      return await taskStore.getTasks();
    } catch (error) {
      throw error;
    }
  }

  async getTask(id) {
    try {
      return await taskStore.getTask(id);
    } catch (error) {
      throw error;
    }
  }

  async addTask(title, description, user_id) {
    try {
      return await taskStore.addTask(title, description, user_id);
    } catch (error) {
      throw error;
    }
  }

  async editTask(title, description, id) {
    try {
      return await taskStore.editTask(title, description, id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TaskService();
