// const router = require('express').Router();

// const movieRouter = require('./movies');
// const userRouter = require('./users');

// router.use(movieRouter);
// router.use(userRouter);

// module.exports = router;

const router = require('express').Router();

const routeSignup = require('./signup');
const routeSignin = require('./signin');

const auth = require('../middlewares/auth');

const routeUsers = require('./users');
const routeMovies = require('./movies');

const NOT_FOUND_ERROR = require('../errors/notFoundError');

router.use('/', routeSignup);
router.use('/', routeSignin);

router.use(auth);

router.use('/users', routeUsers);
router.use('/movies', routeMovies);

router.use((req, res, next) => next(new NOT_FOUND_ERROR('Страницы по запрошенному URL не существует')));

module.exports = router;