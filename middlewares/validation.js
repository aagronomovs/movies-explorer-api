const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Мин. длина имени 2 символа',
        'string.max': 'Макс. длина имени 30 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Мин. длина имени 2 символа',
        'string.max': 'Макс. длина имени 30 символов',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    image: Joi.string().required()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error('Неправильный формат ссылки');
        }
        return value;
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    trailerLink: Joi.string().required()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error('Неправильный формат ссылки');
        }
        return value;
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    thumbnail: Joi.string().required()
      .custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error('Неправильный формат ссылки');
        }
        return value;
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUserInfo,
  validateLogin,
  validateSignup,
  validateMovie,
  validateMovieId,
};
