const centralizedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка на сервере';
  res
    .status(statusCode)
    .send({ message });
  return next();
};

module.exports = { centralizedErrors };
