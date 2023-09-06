/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const route = require('./routes/index');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/reqLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  LOCAL_HOST,
  LOCAL_HOST_HTTP,
  SERVER_HOST_HTTP,
  SERVER_HOST_HTTPS,
  SUCCES_CONNECTION_TO_DB,
  ERROR_CONNECTION_TO_DB,
  PAGE_NOT_FOUND,
  APP_ON_PORT,
} = require('./utils/constants');

const { PORT, DB_ADRESS } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    LOCAL_HOST,
    LOCAL_HOST_HTTP,
    SERVER_HOST_HTTP,
    SERVER_HOST_HTTPS,
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(helmet());

mongoose
  .connect(DB_ADRESS)
  .then(() => {
    console.log(SUCCES_CONNECTION_TO_DB);
  })
  .catch(() => {
    console.log(ERROR_CONNECTION_TO_DB);
  });

app.use(requestLogger);

app.use(limiter);

app.use(route);

app.use((req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${APP_ON_PORT} ${PORT}`);
});
