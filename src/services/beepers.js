const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');

class BeepersService {
  constructor() {
    this.collection = 'beepers';
    this.mongoDB = new MongoLib();
  }

  async getBeepers({ userId }) {
    const query = { userId: ObjectId(userId) };
    const beepers = this.mongoDB.getAll(this.collection, query);
    return beepers || [];
  }

  async createBeeper({ beeper }) {
    const { name, userId } = beeper;

    const validBeeper = {
      name,
      userId,
      createdAt: Date.now(),
      lastUpdate: Date.now(),
      isActive: true
    };

    const createdBeeperId = this.mongoDB.create(this.collection, validBeeper);
    return createdBeeperId || {};
  }

  async updateBeeper() {}

  async deleteBeeper({ beeperId }) {
    const deletedBeeperId = this.mongoDB.delete(this.collection, beeperId);

    return deletedBeeperId || {};
  }
}

module.exports = BeepersService;
