// const signupRouter = require('express').Router();

// const { validateCreateUser } = require('../utils/validation');
// const { createUser } = require('../controllers/users');

// module.exports = signupRouter.post('/signup', validateCreateUser, createUser);

const router = require('express').Router();

const { validateCreateUser } = require('../utils/validation');
const { createUser } = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);

module.exports = router;