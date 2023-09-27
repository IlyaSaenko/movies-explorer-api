const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { PASSWORD_REGEX, INCORRECT_URL } = require('./constants');

const linkValidator = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(INCORRECT_URL);
});

module.exports.validateChangeUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required().min(2),
    year: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    image: linkValidator,
    trailerLink: linkValidator,
    thumbnail: linkValidator,
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_REGEX),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(PASSWORD_REGEX),
  }),
});
