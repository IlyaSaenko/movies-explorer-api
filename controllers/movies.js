const Movie  = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при добавлении фильма'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => new NotFoundError('Фильм с указанным id не найден'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Недостаточно прав для удаления данного фильма"));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм успешно удалён' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при попытке удалить фильм'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie
};