const MongoLib = require('../lib/mongo');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUsers({ active }) {
    const query = active && { active: { $eq: JSON.parse(active) } };

    const users = await this.mongoDB.getAll(this.collection, query);
    return users || [];
  }

  async getUser({ userId }) {
    const user = await await this.mongoDB.get(this.collection, userId);
    return user || {};
  }

  async createUser({ user }) {
    const createdUserId = this.mongoDB.create(this.collection, user);
    return createdUserId || {};
  }

  async updateUser({ userId, user } = {}) {
    const updatedUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );
    return updatedUserId || {};
  }

  async deleteUser() {
    const deletedUserId = await Promise.resolve({});
    return deletedUserId || {};
  }
}

module.exports = UsersService;
