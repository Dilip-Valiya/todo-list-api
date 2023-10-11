const userStore = require("../store/userStore");

class UserService {
  async getUsers() {
    try {
      return await userStore.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      return await userStore.getUser(id);
    } catch (error) {
      throw error;
    }
  }

  async addUser(name, email) {
    try {
      if (!name || !email) {
        return { error: "name and email are required fields", status: 400 };
      }

      const checkRows = await userStore.checkUserByEmail(email);

      if (checkRows.length) {
        return { error: `email ${email} already exists`, status: 409 };
      }

      const now = new Date();
      const rows = await userStore.addUser(name, email, now);

      return { data: rows[0], status: 201 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async editUser(name, email, id) {
    try {
      return await userStore.editUser(name, email, id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
