const router = require('express').Router();

const { validateLogin } = require('../utils/validation');
const { login } = require('../controllers/users');

router.post('/signin', validateLogin, login);

module.exports = router;
