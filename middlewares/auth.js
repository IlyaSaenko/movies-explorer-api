/* eslint-disable no-console */
/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const secretKey = require('../utils/secretKey');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("generate token => " + jwt.sign('64f21ff82ccb9ae7b2b20bb1', 'fee940487b8c62e965228fbdae6563f6d733f5e101a56129a94c8d4cf8486fa9ac9c39aed429d2f09add8cbd56a284c9eb5ca785e61a7cf6902b0d5b312ab9fb'));
  //     payload = jwt.verify(token, secretKey, { expiresIn: '7d' });

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Неправильные почта или пароль - нет хэдера authorization');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
    console.log(payload);
  } catch (err) {
    throw new UnauthorizedError('Неправильные почта или пароль!!!!!');
  }
  req.user = payload;
  return next();
};
