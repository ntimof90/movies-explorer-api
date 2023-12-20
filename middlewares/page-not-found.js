const NotFoundError = require('../errors/not-found-error');

module.exports = (req, res, next) => {
  const e = new NotFoundError('Страница не найдена');
  next(e);
};
