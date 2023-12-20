const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  let payload;
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new AuthError('Неверный логин и пароль');
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    let err = e;
    if (e.name === 'JsonWebTokenError') err = new AuthError('Неверный JWT');
    return next(err);
  }
  req.user = payload;
  return next();
};
