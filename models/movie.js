const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    required: true,
  },

  director: {
    type: String,
    minlength: 2,
    required: true,
  },

  duration: {
    type: Number,
    minlength: 2,
    required: true,
  },

  year: {
    type: String,
    minlength: 2,
    required: true,
  },

  description: {
    type: String,
    minlength: 2,
    required: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: 'Требуется ввести корректный URL',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: 'Требуется ввести корректный URL',
    },
  },

  thumbnail: {
    type: String,
    ref: 'user',
    required: true,
    validate: {
      validator: (link) => URL_REGEX.test(link),
      message: 'Требуется ввести корректный URL',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    minlength: 2,
    required: true,
  },

  nameEN: {
    type: String,
    minlength: 2,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
