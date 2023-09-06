/* eslint-disable no-console */
/* eslint-disable max-len */
const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const {
  VALIDATION_ERROR,
  INCORRECT_DATA_ADD_FILM_ERROR,
  INCORRECT_DATA_DELETE_FILM_ERROR,
  FILM_NOT_FOUND,
  FORBIDDEN_DELETE_FILM_ERROR,
  SUCCES_DELETE_FILM,
  CAST_ERROR,
} = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  const owner = req.user;
  Movie.find({ owner })
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,

  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        console.log(err);
        return next(new BadRequestError(INCORRECT_DATA_ADD_FILM_ERROR));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { id: movieId } = req.params;
  const userId = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      console.log(movie);
      if (!movie) throw new NotFoundError(FILM_NOT_FOUND);
      if (!movie.owner.equals(userId)) {
        throw new ForbiddenError(FORBIDDEN_DELETE_FILM_ERROR);
      }
      movie
        .deleteOne()
        .then(() => res.send({ message: SUCCES_DELETE_FILM }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        return next(new BadRequestError(INCORRECT_DATA_DELETE_FILM_ERROR));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
