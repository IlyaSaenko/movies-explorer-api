const router = require('express').Router();

const { validateChangeUserInfo } = require('../utils/validation');
const {
  updateUserInfo, getCurrentUserInfo,
} = require('../controllers/users');

router.get('/users/me', getCurrentUserInfo);

router.patch('/users/me', validateChangeUserInfo, updateUserInfo);

module.exports = router;