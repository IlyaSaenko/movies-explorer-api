/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const secretKey = require('../utils/secretKey');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  TOKEN_PREFIX,
  UNAUTHORIZED_ERROR,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log("generate token => " + jwt.sign('64ef4c68e236465951815ffe', 'fee940487b8c62e965228fbdae6563f6d733f5e101a56129a94c8d4cf8486fa9ac9c39aed429d2f09add8cbd56a284c9eb5ca785e61a7cf6902b0d5b312ab9fb'));
  // payload = jwt.verify(token, secretKey, { expiresIn: '7d' });
  // console.log("authorization " + authorization);
  if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
  }
  const token = authorization.replace(TOKEN_PREFIX, '');
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
    // console.log("payload " + payload._id + "\n");
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR);
  }
  req.user = payload;
  return next();
};
