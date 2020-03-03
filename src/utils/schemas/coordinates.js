const joi = require('@hapi/joi');

const coordinateSimIdSchema = joi.string();
const coordinateLatitudSchema = joi.string().max(80);
const coordinateLongitudSchema = joi.string().max(80);
const coordinateGroundSpeedSchema = joi.string().max(80);

const postCoordinateSchema = {
  simId: coordinateSimIdSchema.required(),
  latitud: coordinateLatitudSchema.required(),
  longitud: coordinateLongitudSchema.required(),
  groundSpeed: coordinateGroundSpeedSchema.required()
};

module.exports = { postCoordinateSchema };
