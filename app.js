require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { limiter } = require('./middlewares/rateLimiter');
const { cors } = require('./middlewares/cors');
const routerUser = require('./routes/users');
const routerMovies = require('./routes/movies');
const { createUser, login, logout } = require('./controllers/users');
const { validateSignup, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { centralizedErrors } = require('./middlewares/centralizedErrors');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;
const { MONGO = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());

app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
app.post('/signup', validateSignup, createUser);
app.post('/signin', validateLogin, login);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(routerUser);
app.use(routerMovies);
app.use('/signout', logout);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошенной страницы не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
