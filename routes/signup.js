const router = require('express').Router();

const { validateCreateUser } = require('../utils/validation');
const { createUser } = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);

module.exports = router;
