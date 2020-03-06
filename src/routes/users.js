const express = require('express');
const UsersService = require('../services/users');
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const passport = require('passport');
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const passportConf = require('../passport');

const signToken = userId => {
  return jwt.sign(
    {
      iss: 'pointlify.com',
      sub: userId,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    config.authJwtSecret
  );
};

const usersApi = app => {
  const router = express.Router();
  app.use('/users', router);

  const usersService = new UsersService();

  router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userExist = await usersService.getUser({ email });

      if (!userExist) {
        return res.status(401).json({
          success: false,
          message: 'wrong credentials'
        });
      }

      if (!bcrypt.compareSync(password, userExist.password)) {
        console.log('here');

        return res.status(401).json({
          success: false,
          message: 'wrong credentials'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'login success',
        token: signToken(userExist._id),
        userName: userExist.name
      });
    } catch (error) {
      next(error);
    }
  });

  router.post(
    '/',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;

      try {
        const userExist = await usersService.getUser({ email: user.email });

        if (userExist !== undefined) {
          return res.status(400).json({
            success: false,
            message: 'Email is already registered'
          });
        }

        const createdUserId = await usersService.createUser({ user });

        const token = signToken(createdUserId);

        res.status(201).json({
          success: true,
          message: 'user saved',
          data: { user: { userId: createdUserId, token } }
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    validationHandler(updateUserSchema),
    async (req, res, next) => {
      const { userId } = req.params;
      const { body: user } = req;
      try {
        const updatedUserId = await usersService.updateUser({ userId, user });

        res.status(200).json({
          success: true,
          message: 'user updated',
          data: updatedUserId
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async (req, res, next) => {
      try {
        const deletedUserId = await Promise.resolve({});

        res.status(200).json({
          success: true,
          message: 'user deleted',
          data: deletedUserId
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/secret',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      console.log(req.user);

      res.json({
        secret: 'resource'
      });
    }
  );
};

module.exports = usersApi;
