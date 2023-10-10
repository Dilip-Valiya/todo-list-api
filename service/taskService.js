const taskStore = require('../store/taskStore');

class TaskService {
  async getTasks() {
    try {
      return await taskStore.getTasks();
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
}

module.exports = new TaskService();
