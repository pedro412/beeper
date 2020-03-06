const joi = require('@hapi/joi');
const { userIdSchema } = require('./users');

const beeperIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const beeperNameSchema = joi.string().max(80);
const isActiveSchema = joi.boolean();

const createBeeper = {
  name: beeperNameSchema.required(),
  userId: userIdSchema,
  createdAt: joi.date(),
  lastUpdate: joi.date(),
  isActive: isActiveSchema
};

const updateBeeper = {
  name: beeperNameSchema,
  isActive: isActiveSchema,
  lastUpdate: joi.date()
};

module.exports = { beeperIdSchema, createBeeper, updateBeeper };
