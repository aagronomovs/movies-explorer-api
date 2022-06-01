const routers = require('express').Router();
const routerUser = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { validateLogin, validateSignup } = require('../middlewares/validation');
const NotFoundError = require('../errors/notFoundError');

routers.post('/signup', validateSignup, createUser);
routers.post('/signin', validateLogin, login);
routers.post('/signout', logout);
routers.use(auth);
routers.use('/', routerUser);
routers.use('/', routerMovies);

routers.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошенной страницы не существует'));
});

module.exports = routers;
