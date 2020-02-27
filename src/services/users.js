class UsersService {
  async getUsers() {
    const users = await Promise.resolve([]);
    return users || [];
  }

  async getUser() {
    const user = await Promise.resolve({});
    return user || {};
  }

  async createUser() {
    const createdUserId = await Promise.resolve({});
    return createdUserId || {};
  }

  async updateUser() {
    const updatedUserId = await Promise.resolve({});
    return updatedUserId || {};
  }

  async deleteUser() {
    const deletedUserId = await Promise.resolve({});
    return deletedUserId || {};
  }
}

module.exports = UsersService;
