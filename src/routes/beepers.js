const express = require('express');
const BeepersService = require('../services/beepers');
const validationHandler = require('../utils/middleware/validationHandler');
const {
  beeperIdSchema,
  createBeeperSchema
} = require('../utils/schemas/beepers');
const { userIdSchema } = require('../utils/schemas/users');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const passportConf = require('../passport');

const beepersApi = app => {
  const router = express.Router();
  app.use('/beepers', router);

  const beepersService = new BeepersService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { _id } = req.user;

      try {
        const beepers = await beepersService.getBeepers({ userId: _id });

        res.status(200).json({
          success: true,
          message: 'beepers listed',
          data: beepers
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createBeeperSchema),
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { body: beeper } = req;
      const { _id } = req.user;

      beeper.userId = _id;

      try {
        const createdBeeperId = await beepersService.createBeeper({ beeper });

        res.status(201).json({
          success: true,
          message: 'beeper created',
          data: createdBeeperId
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:beeperId',
    validationHandler(beeperIdSchema),
    async (req, res, next) => {
      const { beeperId } = req.params;

      try {
        const deletedBeeperId = await beepersService.deleteBeeper({ beeperId });

        res.status(200).json({
          success: true,
          message: 'deleted beeper',
          data: deletedBeeperId
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = beepersApi;
