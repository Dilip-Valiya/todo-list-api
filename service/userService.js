const userStore = require("../store/userStore");

class UserService {
  async getUsers() {
    try {
      const rows = await userStore.getUsers();
      return { data: rows, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
    }
  }

  async getUser(id) {
    try {
      if (!(Number(id) > 0)) {
        return { error: `Invalid id ${id}`, status: 400 };
      }
      const row = await userStore.getUser(id);
      if (!row) return { error: `No user found with id ${id}`, status: 404 };
      return { data: row, status: 200 };
    } catch (error) {
      return { error: error.message, status: 500 };
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
      if (!name || !email) {
        return { error: "name and email are required fields", status: 400 };
      }
      if (!(Number(id) > 0)) {
        return { error: `Invalid id ${id}`, status: 400 };
      }
      const now = new Date();
      const row = await userStore.editUser(name, email, id, now);
      if (!row) return { error: `No user found with id ${id}`, status: 404 };
      return { data: row, status: 200 };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
