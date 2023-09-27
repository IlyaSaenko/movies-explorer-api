const router = require('express').Router();

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', validateCreateMovie, createMovie);
router.get('/', getAllMovies);
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
