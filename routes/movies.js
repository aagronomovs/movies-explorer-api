const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovieId, validateMovie } = require('../middlewares/validation');

routerMovies.get('/movies', getMovies);
routerMovies.post('/movies', validateMovie, createMovie);
routerMovies.delete('/movies/:_id', validateMovieId, deleteMovie);

module.exports = routerMovies;
