const Movie = require('../models/movie');
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
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN

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
    nameEN
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err)
        return next(new BadRequestError('Переданы некорректные данные при попытке добавления фильма'));
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
      console.log(movie)
      if (!movie) throw new NotFoundError('Фильм с указанным id не найден');
      if (!movie.owner.equals(userId)) {
        throw new ForbiddenError('Недостаточно прав для удаления данного фильма');
      }
      movie
        .deleteOne()
        .then(() => res.send({ message: 'Фильм успешно удалён' }))
        .catch(next);
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