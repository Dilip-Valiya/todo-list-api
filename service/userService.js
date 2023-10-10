const userStore = require('../store/userStore');

class UserService {
  async getUsers() {
    try {
      return await userStore.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async addUser(name, email) {
    try {
      return await userStore.addUser(name, email);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
