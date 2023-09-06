/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { errorHandler } = require('./middlewares/errorHandler');
const limiter = require('./middlewares/reqLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const { PORT = 3000 } = process.env;
const DB_URL = 'mongodb://127.0.0.1:27017/filmsdb';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
	origin: [
		'localhost:3000',
		'http://localhost:3000',
		'http://movies.diplom.api.nomoredomainsicu.ru'
	],
	credentials: true,
	maxAge: 30,
}));

app.use(helmet());

mongoose
	.connect(DB_URL)
	.then(() => {
		console.log('Connected to DB');
	})
	.catch(() => {
		console.log('ERROR connection to DB');
	});

app.use(requestLogger);

app.use(limiter);

// app.get('/crash-test', () => {
// 	setTimeout(() => {
// 		throw new Error('Сервер сейчас упадёт');
// 	}, 0);
// });

app.use(signupRouter);
app.use(signinRouter);

app.use(auth);
app.use(router);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});