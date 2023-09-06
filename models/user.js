const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const UnauthorizedError = require('../errors/unauthorizedError');
const { UNAUTHORIZED_ERROR, PASSWORD_PREFIX, INCORRECT_EMAIL_ERROR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, INCORRECT_EMAIL_ERROR],

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select(PASSWORD_PREFIX)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_ERROR);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(UNAUTHORIZED_ERROR);
          }
          return user;
        });
    });
};

exports.User = mongoose.model('user', userSchema);
