const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rate-limiter');
const validator = require('./middlewares/validator');
const errorHandler = require('./middlewares/error-handler');
const pageNotFoundHandler = require('./middlewares/page-not-found');

const { MONGO_URL } = require('./config');

const router = require('./routes');

const { createUser, login } = require('./controllers/users');

const app = express();
mongoose.connect(MONGO_URL, { family: 4 });

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(requestLogger);
app.post('/signup', validator.createUser, createUser);
app.post('/signin', validator.login, login);
app.use('/', router);
app.use(pageNotFoundHandler);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
