const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/user');
// const { SUPER_SECRET_KEY } = require('../utils/secretKey');
const secretKey = require('../utils/secretKey');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');

const getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((data) => {
      if (!data) {
        next(new NotFoundError('Пользователь с указанным id не зарегистрирован'));
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      }
      if (!user) {
        next(new NotFoundError('Пользователь с указанным id не зарегистрирован'));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении информации о пользователе'));
      } else {
        next(err);
      }
    });
};

// signup
const createUser = (req, res, next) => {
  const { name, email } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send(
      {
        name: user.name, email: user.email, _id: user.id,
      },
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с указанным электронным адресом уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

// signin
const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError('Ошибка авторизации'))
    .then((user) => {
      bcrypt
        .compare(String(password), user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, secretKey);
            return res.status(200).send({ token, message: 'Успешная авторизация' });
          }
          return next(new UnauthorizedError('Ошибка авторизации'));
        });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUserInfo,
  updateUserInfo,
  login,
};
