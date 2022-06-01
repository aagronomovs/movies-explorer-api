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
const routers = require('./routes/index');
const { centralizedErrors } = require('./middlewares/centralizedErrors');

const { PORT = 3000, MONGO, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? `${MONGO}` : 'mongodb://localhost:27017/moviesdb-dev', {
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

app.use(routers);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrors);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
