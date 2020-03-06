const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async getUserById({ _id }) {
    const user = await this.mongoDB.get(this.collection, _id);
    return user;
  }

  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const toBeSaved = {
      name,
      email,
      password: hashedPassword,
      cratedAt: Date.now(),
      active: true,
      isAdmin: true
    };

    const createdUserId = this.mongoDB.create(this.collection, toBeSaved);

    return createdUserId || {};
  }
}

module.exports = UsersService;
