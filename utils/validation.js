// const { celebrate, Joi } = require('celebrate');
// const { URL_REGEX,  EMAIL_REGEX, PASSWORD_REGEX } = require('../utils/constants');

// const validateCreateUser = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().pattern(PASSWORD_REGEX),
//     name: Joi.string().required().min(2).max(30),
//   }),
// });

// const validateLogin = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().pattern(PASSWORD_REGEX),
//   }),
// });

// const validateChangeUserInfo = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().pattern(EMAIL_REGEX),
//     name: Joi.string().required().min(2).max(30),
//   }),
// });

// const validateCreateMovie = celebrate({
//   body: Joi.object().keys({
//     country: Joi.string().required(),
//     director: Joi.string().required(),
//     duration: Joi.number().required(),
//     year: Joi.string().required(),
//     description: Joi.string().required(),
//     image: Joi.string().required().pattern(URL_REGEX),
//     trailerLink: Joi.string().required().pattern(URL_REGEX),
//     thumbnail: Joi.string().required().pattern(URL_REGEX),
//     movieId: Joi.number().required(),
//     nameRU: Joi.string().required(),
//     nameEN: Joi.string().required(),
//   }),
// });

// const validateDeleteMovie = celebrate({
//   params: Joi.object().keys({
//     _id: Joi.string().length(24).hex().required(),
//   }),
// });

// module.exports = {
//   validateCreateUser,
//   validateLogin,
//   validateChangeUserInfo,
//   validateCreateMovie,
//   validateDeleteMovie
// };

const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const linkValidator = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Некорректная ссылка');
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
    country: Joi.string().min(2),
    director: Joi.string().min(2),
    duration: Joi.number(),
    year: Joi.string().min(2),
    description: Joi.string().min(2),
    image: linkValidator,
    trailerLink: linkValidator,
    thumbnail: linkValidator,
    nameRU: Joi.string().min(2),
    nameEN: Joi.string().min(2),
    movieId: Joi.number(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
