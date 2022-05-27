const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

// Получить все сохраненные фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      next(err);
    });
};

// Создать фильмы с переданными параметрами
module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Удалить фильмы по id
module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => new NotFoundError('Фильм с указанным id не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(movie._id.toString())
          .then((answer) => res.send(answer));
      } else {
        next(new ForbiddenError('Нет прав на удаление'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};
