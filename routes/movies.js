// const router = require('express').Router();
// const { validateDeleteMovie, validateCreateMovie } = require('../utils/validation');
// const {
//   deleteMovie, createMovie, getAllMovies,
// } = require('../controllers/movies');

// router.get('/movies', getAllMovies);

// router.post('/movies', validateCreateMovie, createMovie);

// router.delete('/movies/:_id', validateDeleteMovie, deleteMovie);

// module.exports = router;

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