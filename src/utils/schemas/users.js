const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userNameSchema = joi.string().max(80);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().max(100);
const userCreatedAtSchema = joi.date();
const userActiveSchema = joi.bool();

const createUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  createdAt: userCreatedAtSchema,
  active: userActiveSchema
};

const updateUserSchema = {
  name: userNameSchema,
  email: userEmailSchema,
  pasword: userPasswordSchema
};

module.exports = { userIdSchema, createUserSchema, updateUserSchema };
