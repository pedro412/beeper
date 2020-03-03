const express = require('express');

const coordinatesApi = app => {
  const router = express.Router();
  app.use('/coordinates', router);

  router.get('/', (req, res) => {
    const { lat, lng } = req.query;

    return res.status(200).json({
      sucess: true,
      message: 'coordinate save successfully',
      data: { lat, lng }
    });
  });
};

module.exports = coordinatesApi;
