// routes/users.js

const routerUser = require('express').Router();
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');
const { validateUserInfo } = require('../middlewares/validation');

routerUser.get('/users/me', getCurrentUser);
routerUser.patch('/users/me', validateUserInfo, updateProfile);

module.exports = routerUser;
