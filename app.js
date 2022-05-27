const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralizedErrors } = require('./middlewares/centralizedErrors');
const NotFoundError = require('./errors/notFoundError');
const routerUser = require('./routes/users');
const routerMovies = require('./routes/movies');
const { limiter } = require('./middlewares/rateLimiter');
const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb', {
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

app.use(routerUser);
app.use(routerMovies);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошенной страницы не существует'));
});

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})
