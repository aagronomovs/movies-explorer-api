const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovieId, validateMovie } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

routerMovies.get('/movies', auth, getMovies);
routerMovies.post('/movies', auth, validateMovie, createMovie);
routerMovies.delete('/movies/_id', auth, validateMovieId, deleteMovie);

module.exports = routerMovies;