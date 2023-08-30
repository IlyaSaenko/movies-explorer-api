const jwt = require('jsonwebtoken');
const { SUPER_SECRET_KEY } = require('../utils/secretKey');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SUPER_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};
