const express = require('express');
const UsersService = require('../services/users');
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema
} = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');

const usersApi = app => {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.get('/', async (req, res, next) => {
    const { active } = req.query;

    try {
      const users = await usersService.getUsers({ active });

      res.status(200).json({
        success: true,
        message: 'users listed',
        data: { users: users }
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:userId',
    validationHandler({ userId: userIdSchema }, 'params'),
    async (req, res, next) => {
      const { userId } = req.params;
      try {
        const user = await usersService.getUser({ userId });

        res.status(200).json({
          success: true,
          message: 'user listed',
          data: { user: user }
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      user.createdAt = Date.now();
      user.active = true;

      try {
        const createdUserId = await usersService.createUser({ user });

        res.status(201).json({
          success: true,
          message: 'user saved',
          data: createdUserId
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
};

module.exports = usersApi;
