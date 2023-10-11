const userStore = require('../store/userStore');

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
            return await userStore.addUser(name, email);
        } catch (error) {
            throw error;
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
