const routerUser = require('express').Router();
const {
  createUser,
  getCurrentUser,
  updateProfile,
  login,
  logout,
} = require('../controllers/users');
const { validateUserInfo, validateLogin, validateSignup } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

routerUser.get('/users/me', auth, getCurrentUser);
routerUser.patch('/users/me', auth, validateUserInfo, updateProfile);

routerUser.post('/signin',validateLogin, login);
routerUser.post('signup', validateSignup, createUser);
routerUser.post('/signout', auth, logout);

module.exports = routerUser;