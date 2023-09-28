const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_REGEX = /.+@.+\..+/;
const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;

// const LOCAL_HOST = 'localhost:3000';
// const LOCAL_HOST_HTTP = 'http://localhost:3000';
const LOCAL_HOST = 'localhost:3001';
const LOCAL_HOST_HTTP = 'http://localhost:3001';
const SERVER_HOST_HTTP = 'http://movies.diplom.api.nomoredomainsicu.ru';
const SERVER_HOST_HTTPS = 'https://movies.diplom.api.nomoredomainsicu.ru';
const FRONTEND_SERVER_HOST_HTTP = 'http://moviespoisk.diplom.nomoredomainsrocks.ru';
const FRONTEND_SERVER_HOST_HTTPS = 'https://moviespoisk.diplom.nomoredomainsrocks.ru';

const SUCCES_CONNECTION_TO_DB = 'Connected to DB';
const ERROR_CONNECTION_TO_DB = 'ERROR connection to DB';

const PAGE_NOT_FOUND = 'Страницы по запрошенному URL не существует';
const APP_ON_PORT = 'App listening on port';
const TOKEN_PREFIX = 'Bearer ';
const PASSWORD_PREFIX = '+password';

// succes message
const SUCCES_DELETE_FILM = 'Фильм успешно удалён';
const SUCCES_AUTHORIZATION = 'Успешная авторизация';

// error name
const E11000 = 11000;
const VALIDATION_ERROR = 'ValidationError';
const CAST_ERROR = 'CastError';
const CONFLICT_ERROR = 'ConflictError';

// error message
const INCORRECT_URL = 'Передан некорректный URL-адрес';
const INCORRECT_USER_ID = 'Передан некорректный id пользователя';

const UNAUTHORIZED_ERROR = 'Введены неверные авторизационные данные';
const INCORRECT_DATA_ADD_FILM_ERROR = 'Переданы некорректные данные при добавлении фильма';
const INCORRECT_DATA_DELETE_FILM_ERROR = 'Переданы некорректные данные при попытке удалить фильм';
const INCORRECT_DATA_UPDATE_USER_ERROR = 'Переданы некорректные данные при обновлении информации о пользователе';
const INCORRECT_DATA_CREATE_USER_ERROR = 'Переданы некорректные данные при создании пользователя';
const INCORRECT_EMAIL_ERROR = 'Передан некорректный адрес электронной почты';

const FILM_NOT_FOUND = 'Фильм с указанным id не найден';
const USER_NOT_FOUND = 'Пользователь с указанным id не найден';

const FORBIDDEN_DELETE_FILM_ERROR = 'Недостаточно прав для удаления данного фильма';

const USER_EMAIL_EXISTS = 'Пользователь с таким адресом электронной почты уже существует';

module.exports = {
  E11000,
  PASSWORD_PREFIX,
  URL_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  LOCAL_HOST,
  LOCAL_HOST_HTTP,
  SERVER_HOST_HTTP,
  SERVER_HOST_HTTPS,
  FRONTEND_SERVER_HOST_HTTP,
  FRONTEND_SERVER_HOST_HTTPS,
  SUCCES_CONNECTION_TO_DB,
  ERROR_CONNECTION_TO_DB,
  PAGE_NOT_FOUND,
  APP_ON_PORT,
  TOKEN_PREFIX,

  // succes message
  SUCCES_DELETE_FILM,
  SUCCES_AUTHORIZATION,

  // error name
  CONFLICT_ERROR,
  VALIDATION_ERROR,
  CAST_ERROR,

  // error message
  INCORRECT_URL,
  UNAUTHORIZED_ERROR,
  INCORRECT_DATA_ADD_FILM_ERROR,
  INCORRECT_DATA_DELETE_FILM_ERROR,
  INCORRECT_DATA_UPDATE_USER_ERROR,
  INCORRECT_DATA_CREATE_USER_ERROR,
  INCORRECT_EMAIL_ERROR,
  INCORRECT_USER_ID,
  FILM_NOT_FOUND,
  USER_NOT_FOUND,
  USER_EMAIL_EXISTS,
  FORBIDDEN_DELETE_FILM_ERROR,
};
